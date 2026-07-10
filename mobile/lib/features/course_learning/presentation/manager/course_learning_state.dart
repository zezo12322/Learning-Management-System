import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:optimatech_lms/features/course_learning/domain/entities/course_curriculum_entity.dart';
import 'package:optimatech_lms/features/course_learning/domain/entities/lecture_content_entity.dart';

part 'course_learning_state.freezed.dart';

enum Status { initial, loading, loaded, failure }


@freezed
class CourseLearningState with _$CourseLearningState {
  const factory CourseLearningState({
    @Default(Status.initial) Status curriculumState,
    @Default(Status.initial) Status lectureState,
    CourseCurriculumEntity? curriculum,
    LectureContentEntity? currentLecture,
    String? errorMessage,
  }) = _CourseLearningState;
}
