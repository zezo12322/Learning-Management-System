import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_context_entity.dart';

/// The contract for chatting capabilities. 
/// The Domain layer doesn't care HOW messages are sent (Firebase, Gemini API, HTTP, etc.),
/// it only defines WHAT needs to be done. The Data layer will implement this contract.
abstract class ChatRepository {
  /// Sends the user's [text] input along with their current [context] to the AI.
  /// Returns a Failure if an error occurs (like no internet), or a Stream of Strings
  /// to allow for a "typing" effect as the AI streams its response token-by-token.
  Future<Either<Failure, Stream<String>>> sendMessage({
    required String text,
    required ChatContextEntity context,
  });
}
