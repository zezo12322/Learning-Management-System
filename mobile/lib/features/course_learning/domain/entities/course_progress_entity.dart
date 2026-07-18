/// Entity produced by the `GetMyCourseProgress` query.
///
/// Firebase Tables: course_sections -> course_lectures -> lecture_progress
class CourseProgressEntity {
  final List<CourseProgressSectionEntity> sections;

  const CourseProgressEntity({required this.sections});

  int get totalLectures =>
      sections.fold(0, (sum, section) => sum + section.lectures.length);

  int get completedLectures => sections.fold(
    0,
        (sum, section) =>
    sum + section.lectures.where((l) => l.isCompleted).length,
  );

  double get progressPercent =>
      totalLectures == 0 ? 0.0 : completedLectures / totalLectures;

  /// True once every lecture up to and including [lectureId] has been
  /// completed by a *previous* lecture — used by the UI to decide whether
  /// a curriculum row should render as locked.
  bool isLectureUnlocked(String lectureId) {
    final flatIds = sections.expand((s) => s.lectures).toList();
    final index = flatIds.indexWhere((l) => l.id == lectureId);
    if (index <= 0) return true; // first lecture (or not found) is unlocked
    return flatIds.sublist(0, index).every((l) => l.isCompleted);
  }

  bool isLectureCompleted(String lectureId) {
    return sections
        .expand((s) => s.lectures)
        .firstWhere(
          (l) => l.id == lectureId,
      orElse: () => const CourseProgressLectureEntity(
        id: '',
        title: '',
        isCompleted: false,
      ),
    )
        .isCompleted;
  }
}

class CourseProgressSectionEntity {
  final String id;
  final String title;
  final List<CourseProgressLectureEntity> lectures;

  const CourseProgressSectionEntity({
    required this.id,
    required this.title,
    required this.lectures,
  });
}

class CourseProgressLectureEntity {
  final String id;
  final String title;
  final bool isCompleted;

  const CourseProgressLectureEntity({
    required this.id,
    required this.title,
    required this.isCompleted,
  });
}