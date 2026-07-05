import 'package:optimatech_lms/dataconnect_generated/generated.dart';
import 'package:optimatech_lms/features/home/data/models/popular_course_model.dart';
import 'package:optimatech_lms/features/home/data/models/recommended_course_model.dart';
import 'package:optimatech_lms/features/home/data/models/student_progress_model.dart';

abstract class HomeRemoteDataSource {
  // Fetches the student's progress for the course they are currently learning.
  Future<StudentProgressModel?> getContinueLearningCourses();
  Future<List<PopularCourseModel>> getPopularCourses();
  Future<List<RecommendedCourseModel>> getRecommendedCourses();
}

class HomeRemoteDataSourceImpl implements HomeRemoteDataSource {
  @override
  Future<StudentProgressModel?> getContinueLearningCourses() async {
    try {
      final publishedResponse =
          await DefaultConnector.instance.listPublishedCourses().execute();
      final publishedData = publishedResponse.data;
      if (publishedData.courses.isEmpty) return null;

      final courseId = publishedData.courses.first.id;
      final curriculumResponse = await DefaultConnector.instance
          .getCourseCurriculum(courseId: courseId)
          .execute();
      final curriculum = curriculumResponse.data.course;
      if (curriculum == null) {
        return const StudentProgressModel(
          watchedLessons: 0,
          totalLessons: 0,
          timeLeft: '0 min',
          progressPercent: 0.0,
        );
      }

      final totalLessons = curriculum.courseSections_on_course.fold<int>(
        0,
        (sum, section) => sum + section.courseLectures_on_section.length,
      );
      final totalDurationMinutes =
          curriculum.courseSections_on_course.fold<int>(
        0,
        (sum, section) =>
            sum +
            section.courseLectures_on_section.fold<int>(
              0,
              (lectureSum, lecture) => lectureSum + (lecture.duration ?? 0),
            ),
      );
      final timeLeft =
          totalDurationMinutes > 0 ? '$totalDurationMinutes min' : '0 min';

      return StudentProgressModel(
        watchedLessons: 0,
        totalLessons: totalLessons,
        timeLeft: timeLeft,
        progressPercent: 0.0,
      );
    } catch (_) {
      return null;
    }
  }

  @override
  Future<List<PopularCourseModel>> getPopularCourses() async {
    final response =
        await DefaultConnector.instance.listPublishedCourses().execute();
    final data = response.data;
    if (data.courses.isEmpty) {
      return [];
    }

    return data.courses
        .map(
          (e) => PopularCourseModel.fromDataConnect(e.toJson()),
        )
        .toList();
  }

  @override
  Future<List<RecommendedCourseModel>> getRecommendedCourses() async {
    final response =
        await DefaultConnector.instance.listPublishedCourses().execute();
    final data = response.data;
    if (data.courses.isEmpty) {
      return [];
    }

    return data.courses
        .map(
          (e) => RecommendedCourseModel.fromDataConnect(e.toJson()),
        )
        .toList();
  }
}
