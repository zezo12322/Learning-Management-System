import 'dart:async';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_context_entity.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_message_entity.dart';
import 'package:optimatech_lms/features/chatbot/domain/usecases/send_message_usecase.dart';
import 'chat_state.dart';

/// Manages the state of the chatbot UI.
/// Interacts solely with the Domain layer ([SendMessageUseCase]).
class ChatCubit extends Cubit<ChatState> {
  final SendMessageUseCase sendMessageUseCase;
  
  // In-memory cache of the conversation history.
  final List<ChatMessageEntity> _messages = [];
  
  // Subscription for the streaming AI response to allow cancellation if needed.
  StreamSubscription<String>? _streamSubscription;

  ChatCubit(this.sendMessageUseCase) : super(ChatInitial());

  /// Sends a user message to the AI and listens to the streaming response.
  Future<void> sendMessage(String text, ChatContextEntity context) async {
    // 1. Create and add the User's message immediately for a snappy, responsive UI.
    final userMessage = ChatMessageEntity(
      id: DateTime.now().millisecondsSinceEpoch.toString(), // Simple unique ID
      text: text,
      sender: ChatSender.user,
      timestamp: DateTime.now(),
    );
    
    _messages.add(userMessage);
    // Emit a fresh instance of the list to trigger a UI rebuild.
    emit(ChatSuccess(List.from(_messages))); 
    
    // 2. Call the UseCase to send the message to the backend.
    final result = await sendMessageUseCase(
      SendMessageParams(text: text, context: context),
    );
    
    result.fold(
      (failure) {
        // 3a. On Failure: Emit error state so UI can show a snackbar or retry button.
        emit(ChatError(failure.message));
      },
      (stream) {
        // 3b. On Success: Handle the incoming Stream of strings for a "typing" effect.
        
        // Create an initial empty bot message placeholder in the list.
        final botMessageId = DateTime.now().millisecondsSinceEpoch.toString();
        var botMessageText = '';
        
        _messages.add(
          ChatMessageEntity(
            id: botMessageId,
            text: botMessageText,
            sender: ChatSender.bot,
            timestamp: DateTime.now(),
          ),
        );
        
        // Cancel any previous active stream just in case.
        _streamSubscription?.cancel();
        
        // Listen to the incoming chunks from the API stream.
        _streamSubscription = stream.listen(
          (chunk) {
            botMessageText += chunk;
            
            // Find the placeholder bot message and replace it with the accumulated text.
            final index = _messages.indexWhere((msg) => msg.id == botMessageId);
            if (index != -1) {
              _messages[index] = ChatMessageEntity(
                id: botMessageId,
                text: botMessageText,
                sender: ChatSender.bot,
                timestamp: DateTime.now(),
              );
              // Emit the updated list so the UI rebuilds character by character!
              emit(ChatSuccess(List.from(_messages)));
            }
          },
          onError: (error) {
            emit(ChatError(error.toString()));
          },
        );
      },
    );
  }
  
  @override
  Future<void> close() {
    // Clean up streams to prevent memory leaks when the Cubit is destroyed.
    _streamSubscription?.cancel();
    return super.close();
  }
}
