import 'package:optimatech_lms/features/chatbot/domain/entities/chat_context_entity.dart';

class ChatContextModel extends ChatContextEntity {
  const ChatContextModel({
    required super.tenantId,
    required super.userId,
    required super.courseId,
    required super.videoId,
    required super.sessionId,
    required super.playbackMs,
  });

  Map<String, dynamic> toJson(String message, String requestId) {
    return {
      'request_id': requestId,
      'tenant_id': tenantId,
      'user_id': userId,
      'course_id': courseId,
      'video_id': videoId,
      'session_id': sessionId,
      'playback_ms': playbackMs,
      'message': message,
    };
  }
}
