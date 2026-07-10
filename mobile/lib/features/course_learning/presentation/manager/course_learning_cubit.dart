import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/features/course_learning/domain/usecases/get_course_curriculum_usecase.dart';
import 'package:optimatech_lms/features/course_learning/domain/usecases/get_lecture_content_usecase.dart';
import 'course_learning_state.dart';

class CourseLearningCubit extends Cubit<CourseLearningState> {
  final GetCourseCurriculumUseCase getCourseCurriculumUseCase;
  final GetLectureContentUseCase getLectureContentUseCase;

  CourseLearningCubit({
    required this.getCourseCurriculumUseCase,
    required this.getLectureContentUseCase,
  }) : super(const CourseLearningState());

  Future<void> fetchCourseCurriculum(String courseId) async {
    emit(state.copyWith(curriculumState: Status.loading, errorMessage: null));
    final result = await getCourseCurriculumUseCase.call(courseId);
    result.fold(
      (failure) => emit(state.copyWith(curriculumState: Status.failure, errorMessage: failure.message)),
      (curriculum) => emit(state.copyWith(curriculumState: Status.loaded, curriculum: curriculum)),
    );
  }

  Future<void> fetchLectureContent(String lectureId) async {
    emit(state.copyWith(lectureState: Status.loading, errorMessage: null));
    final result = await getLectureContentUseCase.call(lectureId);
    result.fold(
      (failure) => emit(state.copyWith(lectureState: Status.failure, errorMessage: failure.message)),
      (lecture) => emit(state.copyWith(lectureState: Status.loaded, currentLecture: lecture)),
    );
  }
}
