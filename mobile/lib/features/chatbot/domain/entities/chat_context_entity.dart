import 'package:equatable/equatable.dart';

/// Holds the user's current context (like the screen they are on or the course they are viewing).
/// This context is sent to the AI so the bot can provide highly contextual, relevant answers.
class ChatContextEntity extends Equatable {
  /// e.g., 'CourseDetailsView' or 'VideoPlayerScreen'
  final String? currentScreen;
  /// ID of the course the user is currently interacting with, if any
  final String? courseId;
  /// ID of the specific lesson being watched, if any
  final String? lessonId;

  const ChatContextEntity({
    this.currentScreen,
    this.courseId,
    this.lessonId,
  });

  @override
  List<Object?> get props => [currentScreen, courseId, lessonId];
}
