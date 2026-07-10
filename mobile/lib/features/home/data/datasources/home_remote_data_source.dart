import 'package:optimatech_lms/features/home/data/models/continue_learning_model.dart';
import 'package:optimatech_lms/features/home/data/models/popular_course_model.dart';
import 'package:optimatech_lms/features/home/data/models/recommended_course_model.dart';

abstract class HomeRemoteDataSource {
  Future<List<ContinueLearningModel>> getContinueLearningCourses();
  Future<List<PopularCourseModel>> getPopularCourses();
  Future<List<RecommendedCourseModel>> getRecommendedCourses();
}
