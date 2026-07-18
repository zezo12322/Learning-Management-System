import '../../models/courses_model.dart';
import '../../models/enrolled_course_model.dart';

abstract class CoursesRemoteDatasource {
  Future<List<CourseModel>> getPublishedCourses();
  Future<List<EnrolledCourseModel>> getContinueLearning();
  Future<List<CourseModel>> getRecommended({int limit = 10});
}