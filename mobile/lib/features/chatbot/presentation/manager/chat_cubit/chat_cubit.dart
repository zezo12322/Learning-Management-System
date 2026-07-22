import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:uuid/uuid.dart';
import 'package:optimatech_lms/core/services/firebase_auth_service.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_context_entity.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_message_entity.dart';
import 'package:optimatech_lms/features/chatbot/domain/usecases/send_message_usecase.dart';
import 'chat_state.dart';

class ChatCubit extends Cubit<ChatState> {
  final SendMessageUseCase sendMessageUseCase;

  final List<ChatMessageEntity> _messages = [];
  late final String _sessionId;

  ChatCubit(this.sendMessageUseCase) : super(ChatInitial()) {
    // Generate a stable session ID per video chat session
    _sessionId = const Uuid().v4();
  }

  Future<void> sendMessage(
      String text, String courseId, String videoId, int playbackMs) async {
    // 1. Get current User ID (Fallback to 'anonymous' if not logged in)
    final userId = getIt<FirebaseAuthService>().currentUser?.uid ?? 'anonymous';
    final tenantId =
        'DEFAULT_TENANT'; // Could be dynamic in a multi-tenant setup

    // 2. Add User Message
    final userMessage = ChatMessageEntity(
      id: const Uuid().v4(),
      text: text,
      sender: ChatSender.user,
      timestamp: DateTime.now(),
    );

    _messages.add(userMessage);
    emit(ChatSuccess(List.from(_messages)));

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
      (botMessage) {
        // 5. Append Bot Message
        _messages.add(botMessage);
        emit(ChatSuccess(List.from(_messages)));
      },
    );
  }
}
