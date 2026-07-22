import 'package:optimatech_lms/features/chatbot/domain/entities/chat_context_entity.dart';

/// Data Model for [ChatContextEntity].
/// Responsible for formatting the user's context into a JSON structure
/// that the backend API expects when a new message is sent.
class ChatContextModel extends ChatContextEntity {
  const ChatContextModel({
    super.currentScreen,
    super.courseId,
    super.lessonId,
  });

  /// Converts the context into a JSON map. 
  /// Null fields are omitted to keep the payload clean.
  Map<String, dynamic> toJson() {
    return {
      if (currentScreen != null) 'currentScreen': currentScreen,
      if (courseId != null) 'courseId': courseId,
      if (lessonId != null) 'lessonId': lessonId,
    };
  }
}
