import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/features/course_learning/domain/entities/course_curriculum_entity.dart';
import 'package:optimatech_lms/features/course_learning/domain/usecases/get_course_curriculum_usecase.dart';
import 'package:optimatech_lms/features/course_learning/domain/usecases/get_lecture_content_usecase.dart';
import 'package:optimatech_lms/features/course_learning/domain/usecases/update_lecture_progress_usecase.dart';
import 'course_learning_state.dart';

class CourseLearningCubit extends Cubit<CourseLearningState> {
  final GetCourseCurriculumUseCase getCourseCurriculumUseCase;
  final GetLectureContentUseCase getLectureContentUseCase;
  final UpdateLectureProgressUseCase updateLectureProgressUseCase;

  CourseLearningCubit({
    required this.getCourseCurriculumUseCase,
    required this.getLectureContentUseCase,
    required this.updateLectureProgressUseCase,
  }) : super(const CourseLearningState());

  String? _courseId;
  String? _lastRequestedLectureId;

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
    _courseId = courseId;
    _lastRequestedLectureId = null;

    emit(
      state.copyWith(
        curriculumErrorMessage: null,
        lectureState: Status.initial,
        currentLecture: null,
        lectureErrorMessage: null,
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

  /// Retries the last curriculum fetch. Used by `AppErrorWidget.onRetry`.
  Future<void> retryFetchCurriculum() async {
    final courseId = _courseId;
    if (courseId == null) return;
    await fetchCourseCurriculum(courseId);
  }

  Future<void> fetchLectureContent(String lectureId) async {
    _lastRequestedLectureId = lectureId;

    emit(state.copyWith(lectureState: Status.loading, lectureErrorMessage: null));
    final result = await getLectureContentUseCase.call(lectureId);

    // If the user has since selected a different lecture, drop this response.
    if (_lastRequestedLectureId != lectureId) return;

    result.fold(
      (failure) => emit(state.copyWith(lectureState: Status.failure, lectureErrorMessage: failure.message)),
      (lecture) => emit(state.copyWith(lectureState: Status.loaded, currentLecture: lecture)),
    );
  }

  /// Retries the last lecture fetch. Used by `AppErrorWidget.onRetry`.
  Future<void> retryFetchLecture() async {
    final lectureId = _lastRequestedLectureId ?? state.currentLecture?.id;
    if (lectureId == null) return;
    await fetchLectureContent(lectureId);
  }

  Future<void> _selectInitialLectureIfNeeded() async {
    if (state.currentLecture != null) return;

    final lectures = _flatLectures;
    if (lectures.isEmpty) return;

    await fetchLectureContent(lectures.first.id);
  }

  Future<void> selectLectureById(String lectureId) async {
    final alreadyLoaded = state.currentLecture?.id == lectureId && state.lectureState == Status.loaded;
    if (alreadyLoaded) return;
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
    final currentLectureId = state.currentLecture?.id;
    if (currentLectureId == null) return;

    final duration = state.currentLecture?.duration ?? 0;
    
    // We optimistically mark it as complete by hitting the synchronous PUT endpoint.
    // The NestJS backend will accept this since it's the explicit "mark complete" action.
    await updateLectureProgressUseCase(
      lectureId: currentLectureId,
      lastWatchedSecond: duration > 0 ? (duration * 60) : 0, // Fallback if duration is in minutes
      completed: true,
    );
  }

  Future<void> syncLectureHeartbeat(int currentSecond) async {
    final currentLectureId = state.currentLecture?.id;
    if (currentLectureId == null) return;

    await updateLectureProgressUseCase(
      lectureId: currentLectureId,
      lastWatchedSecond: currentSecond,
      completed: false, // Don't aggressively mark as completed on heartbeat
    );
  }
}
