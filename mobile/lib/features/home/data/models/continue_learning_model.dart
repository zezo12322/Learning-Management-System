import 'package:optimatech_lms/dataconnect_generated/generated.dart';
import 'package:optimatech_lms/features/home/domain/entities/student_progress_entity.dart';

class ContinueLearningModel extends StudentProgressEntity {
  const ContinueLearningModel({
    required super.watchedLessons,
    required super.totalLessons,
    required super.timeLeft,
    required super.progressPercent,
    required super.courseId,
    required super.title,
    required super.thumbnail,
  });

  factory ContinueLearningModel.fromDataConnect(
    GetMyContinueLearningEnrollmentsCourse course,
  ) {
    int totalLessons = 0;
    int watchedLessons = 0;

    if (course.clSections != null) {
      for (var section in course.clSections!) {
        if (section.clLectures != null) {
          for (var lecture in section.clLectures!) {
            totalLessons++;
            if (lecture.clProgress != null && lecture.clProgress!.isNotEmpty) {
              if (lecture.clProgress!.first.completedAt != null) {
                watchedLessons++;
              }
            }
          }
        }
      }
    }

    final progressPercent = totalLessons > 0 
        ? (watchedLessons / totalLessons) 
        : 0.0;

    return ContinueLearningModel(
      watchedLessons: watchedLessons,
      totalLessons: totalLessons,
      timeLeft: '0 min', // Requires video duration calculation, omitted for now
      progressPercent: progressPercent,
      courseId: course.id,
      title: course.title,
      thumbnail: course.thumbnail ?? 'assets/images/student_illustrator.png',
    );
  }
}
