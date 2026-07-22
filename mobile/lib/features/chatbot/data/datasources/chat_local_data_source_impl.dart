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
    required String courseId,
    String? videoId,
    required List<ChatMessageModel> messages,
  }) async {
    try {
      final String key = (videoId != null && videoId.isNotEmpty)
          ? 'chat_history_video_$videoId'
          : 'chat_history_course_$courseId';

      final String jsonString = jsonEncode(
        messages.map((message) => message.toJson()).toList(),
      );
      await sharedPreferences.setString(key, jsonString);
    } catch (e) {
      throw CustomExceptions(message: 'Failed to save chat history.');
    }
  }

  @override
  Future<List<ChatMessageModel>> getChatHistory({
    required String courseId,
    String? videoId,
  }) async {
    try {
      final String key = (videoId != null && videoId.isNotEmpty)
          ? 'chat_history_video_$videoId'
          : 'chat_history_course_$courseId';

      final jsonString = sharedPreferences.getString(key);
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
