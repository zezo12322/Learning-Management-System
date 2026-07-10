import 'package:optimatech_lms/dataconnect_generated/generated.dart';
import 'package:optimatech_lms/features/home/domain/entities/student_progress_entity.dart';

class ContinueLearningModel extends StudentProgressEntity {
  const ContinueLearningModel({
    required super.watchedLessons,
    required super.totalLessons,
    required super.timeLeft,
    required super.progressPercent,
  });

  factory ContinueLearningModel.fromDataConnect(
    GetMyContinueLearningEnrollmentsCourse course,
  ) {
    // Zero client-side logic enforcement:
    // We await the backend to provide totalLessons, watchedLessons, and progressPercent directly.
    // For now, we set them to placeholder defaults (0).
    return const ContinueLearningModel(
      watchedLessons: 0,
      totalLessons: 0,
      timeLeft: '0 min',
      progressPercent: 0.0,
    );
  }
}
