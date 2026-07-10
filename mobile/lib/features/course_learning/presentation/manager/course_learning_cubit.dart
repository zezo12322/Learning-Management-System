import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/features/course_learning/domain/entities/course_curriculum_entity.dart';
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

  List<CurriculumLectureEntity> get _flatLectures {
    final curriculum = state.curriculum;
    if (curriculum == null) return const [];
    return curriculum.sections.expand((section) => section.lectures).toList();
  }

  int get currentLectureIndex {
    final currentLectureId = state.currentLecture?.id;
    if (currentLectureId == null) return -1;

    return _flatLectures.indexWhere((lecture) => lecture.id == currentLectureId);
  }

  bool get hasPreviousLecture => currentLectureIndex > 0;

  bool get hasNextLecture {
    final index = currentLectureIndex;
    return index >= 0 && index < _flatLectures.length - 1;
  }

  String get currentLessonProgressLabel {
    final curriculum = state.curriculum;
    if (curriculum == null || state.currentLecture == null) return '';

    final index = currentLectureIndex;
    if (index < 0) return '';

    return 'Lesson ${index + 1} of ${_flatLectures.length}';
  }

  Future<void> fetchCourseCurriculum(String courseId) async {
    emit(
      state.copyWith(
        curriculumState: Status.loading,
        curriculumErrorMessage: null,
      ),
    );
    final result = await getCourseCurriculumUseCase.call(courseId);
    result.fold(
      (failure) => emit(state.copyWith(curriculumState: Status.failure, curriculumErrorMessage: failure.message)),
      (curriculum) async{
        emit(state.copyWith(curriculumState: Status.loaded, curriculum: curriculum));
        await _selectInitialLectureIfNeeded();
      },
    );
  }

  Future<void> fetchLectureContent(String lectureId) async {
    emit(state.copyWith(lectureState: Status.loading, lectureErrorMessage: null));
    final result = await getLectureContentUseCase.call(lectureId);
    result.fold(
      (failure) => emit(state.copyWith(lectureState: Status.failure, lectureErrorMessage: failure.message)),
      (lecture) => emit(state.copyWith(lectureState: Status.loaded, currentLecture: lecture)),
    );
  }

  Future<void> _selectInitialLectureIfNeeded() async {
    if (state.currentLecture != null) return;

    final lectures = _flatLectures;
    if (lectures.isEmpty) return;

    await fetchLectureContent(lectures.first.id);
  }

  Future<void> selectLectureById(String lectureId) async {
    if (state.currentLecture?.id == lectureId) return;
    await fetchLectureContent(lectureId);
  }

  Future<void> goToPreviousLecture() async {
    if (!hasPreviousLecture) return;

    final previousLecture = _flatLectures[currentLectureIndex - 1];
    await selectLectureById(previousLecture.id);
  }

  Future<void> goToNextLecture() async {
    if (!hasNextLecture) return;

    final nextLecture = _flatLectures[currentLectureIndex + 1];
    await selectLectureById(nextLecture.id);
  }

  Future<void> markCurrentLectureAsCompleted() async {
    /// placeholder لحين إضافة progress use case
    /// دلوقتي بنسيبه بدون implementation حقيقية بدل ما نكذب على الـ UI
  }
}
