import 'dart:convert';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/features/chatbot/data/models/chat_message_model.dart';
import 'chat_local_data_source.dart';

class ChatLocalDataSourceImpl implements ChatLocalDataSource {
  final SharedPreferences sharedPreferences;

  ChatLocalDataSourceImpl({required this.sharedPreferences});

  /// Cache key for a conversation, scoped to the signed-in account.
  ///
  /// The uid is part of the key because these keys used to carry only the
  /// course or video id: sign-out did not clear them, so the next person to
  /// sign in on the same device and open the same course was shown the previous
  /// account's AI tutor transcript. Sign-out clears them now
  /// (`core/services/session_cleanup_service.dart`) — the uid is what makes a
  /// missed clear harmless rather than a disclosure.
  ///
  /// A signed-out caller gets the `anon` bucket, which is never read by a
  /// signed-in one.
  String _key({required String courseId, String? videoId}) {
    final uid = FirebaseAuth.instance.currentUser?.uid ?? 'anon';
    final scope = (videoId != null && videoId.isNotEmpty)
        ? 'video_$videoId'
        : 'course_$courseId';
    return 'chat_history_${uid}_$scope';
  }

  @override
  Future<void> saveChatHistory({
    required String courseId,
    String? videoId,
    required List<ChatMessageModel> messages,
  }) async {
    try {
      final String jsonString = jsonEncode(
        messages.map((message) => message.toJson()).toList(),
      );
      await sharedPreferences.setString(
        _key(courseId: courseId, videoId: videoId),
        jsonString,
      );
    } catch (e) {
      throw const CustomExceptions(message: 'Failed to save chat history.');
    }
  }

  @override
  Future<List<ChatMessageModel>> getChatHistory({
    required String courseId,
    String? videoId,
  }) async {
    try {
      final jsonString =
          sharedPreferences.getString(_key(courseId: courseId, videoId: videoId));
      if (jsonString != null) {
        final List<dynamic> jsonList = jsonDecode(jsonString);
        return jsonList.map((json) => ChatMessageModel.fromJson(json)).toList();
      }
      return [];
    } catch (e) {
      throw const CustomExceptions(message: 'Failed to load chat history.');
    }
  }
}
