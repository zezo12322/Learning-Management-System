/// Domain-level mirror of the `LectureType` enum from the Firebase schema.
///
/// Kept separate from `dataconnect_generated` so domain entities have
/// zero Flutter/Firebase imports (see Data Models Reference — Mapping Rules).
enum LectureContentType {
  video,
  reading,
  interactive,
  quiz,
  unknown;

  factory LectureContentType.fromRaw(String raw) {
    switch (raw) {
      case 'VIDEO':
        return LectureContentType.video;
      case 'READING':
        return LectureContentType.reading;
      case 'INTERACTIVE':
        return LectureContentType.interactive;
      case 'QUIZ':
        return LectureContentType.quiz;
      default:
        return LectureContentType.unknown;
    }
  }

  String get raw {
    switch (this) {
      case LectureContentType.video:
        return 'VIDEO';
      case LectureContentType.reading:
        return 'READING';
      case LectureContentType.interactive:
        return 'INTERACTIVE';
      case LectureContentType.quiz:
        return 'QUIZ';
      case LectureContentType.unknown:
        return 'UNKNOWN';
    }
  }
}