import 'package:equatable/equatable.dart';

/// Holds the user's current context to be sent as the RAG request payload.
class ChatContextEntity extends Equatable {
  final String tenantId;
  final String userId;
  final String courseId;
  final String videoId;
  final String sessionId;
  final int playbackMs;

  const ChatContextEntity({
    required this.tenantId,
    required this.userId,
    required this.courseId,
    required this.videoId,
    required this.sessionId,
    required this.playbackMs,
  });

  @override
  List<Object?> get props => [
        tenantId,
        userId,
        courseId,
        videoId,
        sessionId,
        playbackMs,
      ];
}
