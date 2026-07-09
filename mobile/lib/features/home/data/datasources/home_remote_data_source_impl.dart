import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/dataconnect_generated/generated.dart';
import 'package:optimatech_lms/features/home/data/datasources/home_remote_data_source.dart';
import 'package:optimatech_lms/features/home/data/models/continue_learning_model.dart';
import 'package:optimatech_lms/features/home/data/models/popular_course_model.dart';
import 'package:optimatech_lms/features/home/data/models/recommended_course_model.dart';

class HomeRemoteDataSourceImpl implements HomeRemoteDataSource {
  @override
  Future<List<ContinueLearningModel>> getContinueLearningCourses() async {
    try {
      final response =
          await DefaultConnector.instance.getMyContinueLearning().execute();
      final data = response.data;

      if (data.enrollments.isEmpty) {
        return [];
      }

      return data.enrollments
          .where((e) => e.course != null)
          .map((e) => ContinueLearningModel.fromDataConnect(e.course!))
          .toList();
    } catch (e) {
      if (e is ServerException) rethrow;
      throw ServerException(
        message: 'Failed to fetch continue learning data: ${e.toString()}',
      );
    }
  }

  @override
  Future<List<PopularCourseModel>> getPopularCourses() async {
    try {
      final response =
          await DefaultConnector.instance.listPopularCourses().execute();
      final data = response.data;

      if (data.courses.isEmpty) {
        return [];
      }

      return data.courses
          .map((e) => PopularCourseModel.fromDataConnect(e))
          .toList();
    } catch (e) {
      throw ServerException(
        message: 'Failed to fetch popular courses: ${e.toString()}',
      );
    }
  }

  @override
  Future<List<RecommendedCourseModel>> getRecommendedCourses() async {
    try {
      final response =
          await DefaultConnector.instance.listPopularCourses().execute();

      final data = response.data;

      if (data.courses.isEmpty) {
        return [];
      }

      return data.courses
          .map((e) => RecommendedCourseModel.fromPopularDataConnect(e))
          .toList();
    } catch (e) {
      throw ServerException(
        message: 'Failed to fetch recommended courses: ${e.toString()}',
      );
    }
  }
}
