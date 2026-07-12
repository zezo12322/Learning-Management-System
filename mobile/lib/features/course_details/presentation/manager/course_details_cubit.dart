import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/features/course_details/domain/repositories/course_details_repository.dart';
import 'package:optimatech_lms/features/course_details/presentation/manager/course_details_state.dart';

class CourseDetailsCubit extends Cubit<CourseDetailsState> {
  final CourseDetailsRepository repository;

  CourseDetailsCubit(this.repository) : super(CourseDetailsInitial());

  Future<void> loadCurriculum(String courseId) async {
    emit(CourseDetailsLoading());
    try {
      final curriculum = await repository.getCourseCurriculum(courseId);
      emit(CourseDetailsLoaded(curriculum));
    } catch (e) {
      emit(CourseDetailsError(e.toString()));
    }
  }

  Future<void> enrollInCourse(String courseId) async {
    if (state is CourseDetailsLoaded) {
      final currentState = state as CourseDetailsLoaded;
      emit(currentState.copyWith(isEnrolling: true, enrollmentError: null, enrollmentSuccess: false));
      try {
        await repository.enrollInCourse(courseId);
        emit(currentState.copyWith(isEnrolling: false, enrollmentSuccess: true));
      } catch (e) {
        emit(currentState.copyWith(isEnrolling: false, enrollmentError: e.toString()));
      }
    }
  }
}
