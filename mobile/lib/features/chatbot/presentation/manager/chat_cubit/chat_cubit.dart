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
  late final String _sessionId;

  ChatCubit({
    required this.sendMessageUseCase,
    required this.getChatHistoryUseCase,
    required this.saveChatHistoryUseCase,
  }) : super(ChatInitial()) {
    // Generate a stable session ID per video chat session
    _sessionId = const Uuid().v4();
  }

  Future<void> loadChatHistory(String videoId) async {
    emit(ChatLoading());
    final result = await getChatHistoryUseCase(videoId);
    result.fold(
      (failure) {
        emit(ChatError(failure.message));
        emit(ChatSuccess(List.from(_messages))); // Fallback to existing
      },
      (history) {
        _messages.clear();
        _messages.addAll(history);
        emit(ChatSuccess(List.from(_messages)));
      },
    );
  }

  Future<void> sendMessage(String text, String courseId, String videoId, int playbackMs) async {
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
    await saveChatHistoryUseCase(SaveChatHistoryParams(videoId: videoId, messages: _messages));

    // Emit loading state to show spinner while waiting for the LLM
    emit(ChatLoading());

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
        emit(ChatError(failure.message));
        // Fallback to previous successful state to preserve messages
        emit(ChatSuccess(List.from(_messages)));
      },
      (botMessage) async {
        // 5. Append Bot Message
        _messages.add(botMessage);
        emit(ChatSuccess(List.from(_messages)));

        // Save to local storage after adding bot message
        await saveChatHistoryUseCase(SaveChatHistoryParams(videoId: videoId, messages: _messages));
      },
    );
  }
}
