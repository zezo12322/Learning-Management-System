import 'package:firebase_data_connect/firebase_data_connect.dart';
import 'package:optimatech_lms/core/utils/money.dart';
import 'package:optimatech_lms/dataconnect_generated/generated.dart';
import 'package:optimatech_lms/features/courses/data/datasources/courses_remote_datasource/courses_remote_datasource.dart';
import 'package:optimatech_lms/features/courses/data/models/courses_model.dart';
import 'package:optimatech_lms/features/courses/data/models/enrolled_course_model.dart';

import '../../../../../core/error/exceptions.dart';
import 'package:optimatech_lms/core/error/user_facing_message.dart';

class CoursesRemoteDatasourceImpl extends CoursesRemoteDatasource{
  final DefaultConnector _connector;
  CoursesRemoteDatasourceImpl(this._connector);

  @override
  Future<List<CourseModel>> getPublishedCourses() async{
    try{
      final result = await _connector.listPublishedCourses().execute();
      return result.data.courses.map(CourseModel.fromConnectorResult).toList();
    } on DataConnectError catch (e) {
      throw CustomExceptions(message: userFacingMessage(e));
    } catch (e){
      throw CustomExceptions(message: userFacingMessage(e));
    }
  }

  @override
  Future<List<EnrolledCourseModel>> getContinueLearning() async {
    try {
      final result = await _connector.getMyContinueLearning().execute();
      final enrollments = result.data.enrollments
          .where((e) => e.course != null && e.course?.deletedAt == null)
          .map((e) => EnrolledCourseModel.fromConnectorResult(e))
          .toList();

      // Sort by highest progress first, identical to NestJS backend
      enrollments.sort((a, b) {
        if (b.completedLessons != a.completedLessons) {
          return b.completedLessons.compareTo(a.completedLessons);
        }
        return b.percentage.compareTo(a.percentage);
      });

      return enrollments;
    } on DataConnectError catch (e) {
      throw CustomExceptions(message: userFacingMessage(e));
    } catch (e) {
      throw CustomExceptions(message: userFacingMessage(e));
    }
  }

  @override
  Future<List<CourseModel>> getRecommended({int limit = 10}) async {
    try {
      final enrolledResult = await _connector.getMyEnrolledCourseCategories().execute();
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

      // If no interests to personalize on, fallback to popular (using listPopularCourses)
      if (categoryIds.isEmpty) {
        final popularResult = await _connector.listPopularCourses().execute();
        return popularResult.data.courses.map(
          (c) => CourseModel(
            id: c.id,
            title: c.title,
            price: egpFromPiastres(c.price),
            level: c.level.stringValue,
            thumbnail: c.thumbnail,
            tags: c.tags,
            category: Category(name: c.category.name),
            author: Author(name: c.author.name, avatar: c.author.avatar),
            avgRating: c.avgRating.toDouble(),
            ratingCount: c.ratingCount,
            enrollmentCount: 0,
          )
        ).toList();
      }

      final recommendedResult = await _connector.listRecommendedCourses(
        categoryIds: categoryIds.toList(),
        excludeIds: excludeIds.toList(),
      ).execute();

      final recommendedCourses = recommendedResult.data.courses.map(
        (c) => CourseModel(
          id: c.id,
          title: c.title,
          price: egpFromPiastres(c.price),
          level: c.level.stringValue,
          thumbnail: c.thumbnail,
          tags: c.tags,
          category: Category(name: c.category.name),
          author: Author(name: c.author.name, avatar: c.author.avatar),
          avgRating: c.avgRating.toDouble(),
          ratingCount: c.ratingCount,
          enrollmentCount: 0,
        )
      ).toList();

      if (recommendedCourses.isEmpty) {
        // Fallback to popular if the personalized query yielded nothing
        final popularResult = await _connector.listPopularCourses().execute();
        return popularResult.data.courses.map(
          (c) => CourseModel(
            id: c.id,
            title: c.title,
            price: egpFromPiastres(c.price),
            level: c.level.stringValue,
            thumbnail: c.thumbnail,
            tags: c.tags,
            category: Category(name: c.category.name),
            author: Author(name: c.author.name, avatar: c.author.avatar),
            avgRating: c.avgRating.toDouble(),
            ratingCount: c.ratingCount,
            enrollmentCount: 0,
          )
        ).toList();
      }

      return recommendedCourses;
    } on DataConnectError catch (e) {
      throw CustomExceptions(message: userFacingMessage(e));
    } catch (e) {
      throw CustomExceptions(message: userFacingMessage(e));
    }
  }
}