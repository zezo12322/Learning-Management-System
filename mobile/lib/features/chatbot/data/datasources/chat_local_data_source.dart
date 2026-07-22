import 'package:optimatech_lms/features/chatbot/data/models/chat_message_model.dart';

abstract class ChatLocalDataSource {
  Future<void> saveChatHistory({
    required String videoId,
    required List<ChatMessageModel> messages,
  });

  Future<List<ChatMessageModel>> getChatHistory({
    required String videoId,
  });
}
