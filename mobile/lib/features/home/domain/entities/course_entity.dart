import 'package:equatable/equatable.dart';

class CourseEntity extends Equatable {
  final String id;
  final String title;
  final double rating;
  final String image;
  const CourseEntity({
    required this.id,
    required this.title,
    required this.rating,
    required this.image,
  });
  @override
  List<Object?> get props => [id, title, rating, image];
}
