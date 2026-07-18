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
      final enrolledResult = await DefaultConnector.instance.getMyEnrolledCourseCategories().execute();
      final enrollments = enrolledResult.data.enrollments;

      final Set<String> categoryIds = {};
      final Set<String> excludeIds = {};

      for (var enrollment in enrollments) {
        final course = enrollment.course;
        if (course == null || course.deletedAt != null) continue;
        
        excludeIds.add(course.id);
        if (course.category != null) {
          categoryIds.add(course.category!.id);
        }
      }

      if (categoryIds.isEmpty) {
        final response = await DefaultConnector.instance.listPopularCourses().execute();
        return response.data.courses
            .map((e) => RecommendedCourseModel.fromPopularDataConnect(e))
            .toList();
      }

      final recommendedResult = await DefaultConnector.instance.listRecommendedCourses(
        categoryIds: categoryIds.toList(),
        excludeIds: excludeIds.toList(),
      ).execute();

      final recommendedCourses = recommendedResult.data.courses
          .map((e) => RecommendedCourseModel.fromDataConnect(e))
          .toList();

      if (recommendedCourses.isEmpty) {
        final response = await DefaultConnector.instance.listPopularCourses().execute();
        return response.data.courses
            .map((e) => RecommendedCourseModel.fromPopularDataConnect(e))
            .toList();
      }

      return recommendedCourses;
    } catch (e) {
      throw ServerException(
        message: 'Failed to fetch recommended courses: ${e.toString()}',
      );
    }
  }
}
