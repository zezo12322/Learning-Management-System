import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/features/chatbot/data/models/chat_message_model.dart';
import 'chat_local_data_source.dart';

class ChatLocalDataSourceImpl implements ChatLocalDataSource {
  final SharedPreferences sharedPreferences;

  ChatLocalDataSourceImpl({required this.sharedPreferences});

  @override
  Future<void> saveChatHistory({
    required String videoId,
    required List<ChatMessageModel> messages,
  }) async {
    try {
      final String jsonString = jsonEncode(
        messages.map((message) => message.toJson()).toList(),
      );
      await sharedPreferences.setString('chat_history_$videoId', jsonString);
    } catch (e) {
      throw CustomExceptions(message: 'Failed to save chat history.');
    }
  }

  @override
  Future<List<ChatMessageModel>> getChatHistory({required String videoId}) async {
    try {
      final jsonString = sharedPreferences.getString('chat_history_$videoId');
      if (jsonString != null) {
        final List<dynamic> jsonList = jsonDecode(jsonString);
        return jsonList.map((json) => ChatMessageModel.fromJson(json)).toList();
      }
      return [];
    } catch (e) {
      throw CustomExceptions(message: 'Failed to load chat history.');
    }
  }
}
