import 'package:optimatech_lms/features/course_details/data/models/course_curriculum_model.dart';
import 'package:optimatech_lms/features/course_details/domain/entities/course_curriculum_entity.dart';

abstract class CourseDetailsRemoteDataSource {
  Future<CourseCurriculumModel> getCourseCurriculum(String courseId);
}

class CourseDetailsRemoteDataSourceImpl
    implements CourseDetailsRemoteDataSource {
  const CourseDetailsRemoteDataSourceImpl();

  @override
  Future<CourseCurriculumModel> getCourseCurriculum(String courseId) async {
    try {
      // TODO: The backend team will place the Firebase Data Connect execution here:
      // final response = await defaultConnector.getCourseCurriculum(courseId: courseId).execute();
      // final json = response.data;
      // For now, returning an empty map as a placeholder for the backend payload
      // final Map<String, dynamic>? json = {};
      // return CourseCurriculumModel.fromConnectorResult(json, courseId);
      // For now, returning a mock curriculum as a placeholder for the backend payload
      return CourseCurriculumModel(
        courseId: courseId,
        sections: const [
          CourseSectionModel(
            id: 'sec_1',
            title: 'Section 1 - Introduction',
            lessons: [
              CourseLessonModel(
                id: 'les_1',
                number: 1,
                title: 'Why Flutter Development',
                duration: '15 Min',
                status: LessonStatus.completed,
              ),
              CourseLessonModel(
                id: 'les_2',
                number: 2,
                title: 'Setup Your Mac or Windows',
                duration: '10 Min',
                status: LessonStatus.completed,
              ),
              CourseLessonModel(
                id: 'les_3',
                number: 3,
                title: 'Introduction to Dart',
                duration: '25 Min',
                status: LessonStatus.active,
              ),
            ],
          ),
          CourseSectionModel(
            id: 'sec_2',
            title: 'Section 2 - Graphic Design',
            lessons: [
              CourseLessonModel(
                id: 'les_4',
                number: 4,
                title: 'Setup Your Graphic Design',
                duration: '15 Min',
                status: LessonStatus.locked,
              ),
              CourseLessonModel(
                id: 'les_5',
                number: 5,
                title: 'Graphic Design for Beginners',
                duration: '45 Min',
                status: LessonStatus.locked,
              ),
              CourseLessonModel(
                id: 'les_6',
                number: 6,
                title: 'Graphic Design for Advanced',
                duration: '30 Min',
                status: LessonStatus.locked,
              ),
            ],
          ),
        ],
      );
    } catch (e) {
      throw Exception('Failed to fetch course curriculum: $e');
    }
  }
}
