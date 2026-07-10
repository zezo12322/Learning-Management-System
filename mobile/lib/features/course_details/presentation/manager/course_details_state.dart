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

  const CourseDetailsLoaded(this.curriculum);

  @override
  List<Object?> get props => [curriculum];
}

class CourseDetailsError extends CourseDetailsState {
  final String message;

  const CourseDetailsError(this.message);

  @override
  List<Object?> get props => [message];
}
