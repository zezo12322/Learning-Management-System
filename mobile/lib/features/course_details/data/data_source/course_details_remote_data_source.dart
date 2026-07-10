import 'package:optimatech_lms/features/course_details/data/models/course_curriculum_model.dart';

abstract class CourseDetailsRemoteDataSource {
  Future<CourseCurriculumModel> getCourseCurriculum(String courseId);
}

class CourseDetailsRemoteDataSourceImpl implements CourseDetailsRemoteDataSource {
  const CourseDetailsRemoteDataSourceImpl();

  @override
  Future<CourseCurriculumModel> getCourseCurriculum(String courseId) async {
    try {
      // TODO: The backend team will place the Firebase Data Connect execution here:
      // final response = await defaultConnector.getCourseCurriculum(courseId: courseId).execute();
      // final json = response.data;
      
      // For now, returning an empty map as a placeholder for the backend payload
      final Map<String, dynamic>? json = {};
      
      return CourseCurriculumModel.fromConnectorResult(json, courseId);
    } catch (e) {
      throw Exception('Failed to fetch course curriculum: $e');
    }
  }
}
