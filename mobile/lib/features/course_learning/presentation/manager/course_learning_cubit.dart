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
  String? _initialLectureId;

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

  /// [initialLectureId] opens a specific lecture instead of the first one —
  /// used when the learner taps a lesson in the course-details curriculum.
  Future<void> fetchCourseCurriculum(
    String courseId, {
    String? initialLectureId,
  }) async {
    _courseId = courseId;
    _lastRequestedLectureId = null;
    _initialLectureId = initialLectureId;

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

    // Honour the requested lecture when it exists in this curriculum; a stale
    // or unknown id falls back to the first lecture rather than failing.
    final requested = _initialLectureId;
    final target = requested == null
        ? lectures.first.id
        : lectures
            .firstWhere(
              (l) => l.id == requested,
              orElse: () => lectures.first,
            )
            .id;

    await fetchLectureContent(target);
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

  /// The playhead reaching the end of the video — now the only way a lecture is
  /// completed from this app.
  ///
  /// It used to route through a `markCurrentLectureAsCompleted` that posted a
  /// position large enough to trip the server's threshold regardless of what had
  /// been watched. That method is gone along with the bottom-bar button that
  /// called it. This reports the real position and the credited watch time and
  /// lets the server decide, matching the web player.
  Future<void> reportLectureFinished({
    required int lastWatchedSecond,
    required int watchedSeconds,
  }) async {
    final currentLectureId = state.currentLecture?.id;
    if (currentLectureId == null) return;

    await updateLectureProgressUseCase(
      lectureId: currentLectureId,
      lastWatchedSecond: lastWatchedSecond,
      watchedSeconds: watchedSeconds,
    );
  }

  Future<void> syncLectureHeartbeat(
    int currentSecond, {
    required int watchedSeconds,
  }) async {
    final currentLectureId = state.currentLecture?.id;
    if (currentLectureId == null) return;

    await updateLectureProgressUseCase(
      lectureId: currentLectureId,
      lastWatchedSecond: currentSecond,
      watchedSeconds: watchedSeconds,
    );
  }
}
