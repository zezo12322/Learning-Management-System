import 'package:equatable/equatable.dart';
import 'package:optimatech_lms/features/course_details/domain/entities/course_curriculum_entity.dart';

abstract class CourseDetailsState extends Equatable {
  const CourseDetailsState();

  @override
  List<Object?> get props => [];
}

class CourseDetailsInitial extends CourseDetailsState {}

class CourseDetailsLoading extends CourseDetailsState {}

class CourseDetailsLoaded extends CourseDetailsState {
  final CourseCurriculumEntity curriculum;
  final bool isEnrolling;
  final bool enrollmentSuccess;
  final String? enrollmentError;

  const CourseDetailsLoaded(
    this.curriculum, {
    this.isEnrolling = false,
    this.enrollmentSuccess = false,
    this.enrollmentError,
  });

  CourseDetailsLoaded copyWith({
    CourseCurriculumEntity? curriculum,
    bool? isEnrolling,
    bool? enrollmentSuccess,
    String? enrollmentError,
  }) {
    return CourseDetailsLoaded(
      curriculum ?? this.curriculum,
      isEnrolling: isEnrolling ?? this.isEnrolling,
      enrollmentSuccess: enrollmentSuccess ?? this.enrollmentSuccess,
      enrollmentError: enrollmentError,
    );
  }

  @override
  List<Object?> get props => [curriculum, isEnrolling, enrollmentSuccess, enrollmentError];
}

class CourseDetailsError extends CourseDetailsState {
  final String message;

  const CourseDetailsError(this.message);

  @override
  List<Object?> get props => [message];
}
