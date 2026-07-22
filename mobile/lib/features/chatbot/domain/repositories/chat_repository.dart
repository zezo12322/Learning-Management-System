import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_context_entity.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_message_entity.dart';
/// The contract for chatting capabilities. 
/// The Domain layer doesn't care HOW messages are sent (Firebase, Gemini API, HTTP, etc.),
/// it only defines WHAT needs to be done. The Data layer will implement this contract.
abstract class ChatRepository {
  /// Sends the user's [text] input along with their current [context] to the AI.
  Future<Either<Failure, ChatMessageEntity>> sendMessage({
    required String text,
    required ChatContextEntity context,
  });

  /// Retrieves the chat history for a specific video session.
  Future<Either<Failure, List<ChatMessageEntity>>> getChatHistory({
    required String videoId,
  });

  /// Saves the chat history for a specific video session.
  Future<Either<Failure, void>> saveChatHistory({
    required String videoId,
    required List<ChatMessageEntity> messages,
  });
}
