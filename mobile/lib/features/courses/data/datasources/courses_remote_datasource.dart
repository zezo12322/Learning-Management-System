import '../models/courses_model.dart';

abstract class CoursesRemoteDatasource {
  Future<List<CourseModel>> getPublishedCourses();
}