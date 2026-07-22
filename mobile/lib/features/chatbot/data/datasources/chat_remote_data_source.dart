import 'package:optimatech_lms/features/chatbot/data/models/chat_context_model.dart';

/// Abstract contract for the remote data source.
/// Defines the specific network calls required for the Chatbot feature
/// without committing to a specific HTTP client like Dio or http.
abstract class ChatRemoteDataSource {
  /// Sends a message and its context to the backend.
  /// Returns a [Stream] of strings representing the AI's response chunks
  /// as they are received over the network (e.g. Server-Sent Events).
  Future<Stream<String>> sendMessage({
    required String text,
    required ChatContextModel context,
  });
}
