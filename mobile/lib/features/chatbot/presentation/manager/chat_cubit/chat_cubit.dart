import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:uuid/uuid.dart';
import 'package:optimatech_lms/core/services/firebase_auth_service.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_context_entity.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_message_entity.dart';
import 'package:optimatech_lms/features/chatbot/domain/usecases/send_message_usecase.dart';
import 'package:optimatech_lms/features/chatbot/domain/usecases/get_chat_history_usecase.dart';
import 'package:optimatech_lms/features/chatbot/domain/usecases/save_chat_history_usecase.dart';
import 'chat_state.dart';

class ChatCubit extends Cubit<ChatState> {
  final SendMessageUseCase sendMessageUseCase;
  final GetChatHistoryUseCase getChatHistoryUseCase;
  final SaveChatHistoryUseCase saveChatHistoryUseCase;
  
  final List<ChatMessageEntity> _messages = [];
  late String _sessionId;

  ChatCubit({
    required this.sendMessageUseCase,
    required this.getChatHistoryUseCase,
    required this.saveChatHistoryUseCase,
  }) : super(ChatInitial()) {
    // Generate a stable session ID per video chat session
    _sessionId = const Uuid().v4();
  }

  Future<void> loadChatHistory({required String courseId, String? videoId}) async {
    // Reset session scope to ensure strictly isolated chat history
    _sessionId = const Uuid().v4();
    _messages.clear();

    emit(ChatLoading());
    final result = await getChatHistoryUseCase(courseId: courseId, videoId: videoId);
    result.fold(
      (failure) {
        emit(ChatError(failure.message));
        emit(ChatSuccess(List.from(_messages))); // Fallback to existing
      },
      (history) {
        _messages.addAll(history);

        if (_messages.isEmpty) {
          final user = getIt<FirebaseAuthService>().currentUser;
          String userName = user?.displayName?.split(' ').first ?? '';
          if (userName.isEmpty && user?.email != null) {
            userName = user!.email!.split('@').first;
          }
          if (userName.isEmpty) {
            userName = 'Student';
          }
          final welcomeText = 'chatbot.welcome_message'.tr(namedArgs: {'name': userName});

          _messages.add(ChatMessageEntity(
            id: 'welcome_msg',
            text: welcomeText,
            sender: ChatSender.bot,
            timestamp: DateTime.now(),
          ));
        }

        emit(ChatSuccess(List.from(_messages)));
      },
    );
  }

  Future<void> sendMessage(String text, String courseId, String? videoId, int playbackMs) async {
    // 1. Get current User ID (Fallback to 'anonymous' if not logged in)
    final userId = getIt<FirebaseAuthService>().currentUser?.uid ?? 'anonymous';
    final tenantId = 'DEFAULT_TENANT'; // Could be dynamic in a multi-tenant setup

    // 2. Add User Message
    final userMessage = ChatMessageEntity(
      id: const Uuid().v4(),
      text: text,
      sender: ChatSender.user,
      timestamp: DateTime.now(),
    );
    
    _messages.add(userMessage);
    emit(ChatSuccess(List.from(_messages))); 

    // Save to local storage after adding user message
    final messagesToSave = _messages.where((m) => !m.isLoading).toList();
    await saveChatHistoryUseCase(SaveChatHistoryParams(
      courseId: courseId,
      videoId: videoId,
      messages: messagesToSave,
    ));

    // Emit optimistic bot loading message
    _messages.add(ChatMessageEntity(
      id: 'loading_placeholder',
      text: '',
      sender: ChatSender.bot,
      timestamp: DateTime.now(),
      isLoading: true,
    ));
    emit(ChatSuccess(List.from(_messages)));

    // 3. Build the RAG Context
    final contextEntity = ChatContextEntity(
      tenantId: tenantId,
      userId: userId,
      courseId: courseId,
      videoId: videoId,
      sessionId: _sessionId,
      playbackMs: playbackMs,
    );

    // 4. Call UseCase
    final result = await sendMessageUseCase(
      SendMessageParams(text: text, context: contextEntity),
    );
    
    result.fold(
      (failure) {
        _messages.removeWhere((m) => m.isLoading);
        emit(ChatError(failure.message));
        // Fallback to previous successful state to preserve messages
        emit(ChatSuccess(List.from(_messages)));
      },
      (botMessage) async {
        _messages.removeWhere((m) => m.isLoading);
        // 5. Append Bot Message
        _messages.add(botMessage);
        emit(ChatSuccess(List.from(_messages)));

        // Save to local storage after adding bot message
        final finalMessagesToSave = _messages.where((m) => !m.isLoading).toList();
        await saveChatHistoryUseCase(SaveChatHistoryParams(
          courseId: courseId,
          videoId: videoId,
          messages: finalMessagesToSave,
        ));
      },
    );
  }
}
