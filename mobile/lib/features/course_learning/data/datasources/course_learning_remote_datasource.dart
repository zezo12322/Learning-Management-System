import 'package:firebase_data_connect/firebase_data_connect.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/dataconnect_generated/generated.dart';
import 'package:optimatech_lms/features/course_learning/data/models/curriculum_model.dart';
import 'package:optimatech_lms/features/course_learning/data/models/lecture_content_model.dart';

abstract class CourseLearningRemoteDataSource {
  Future<CourseCurriculumModel> getCourseCurriculum(String courseId);
  Future<LectureContentModel> getLectureContent(String lectureId);
  //Future<LectureProgressModel?> getUserLectureProgress(String lectureId);
  // Future<void> updateLectureProgress({
  //   required String lectureId,
  //   required int lastWatchedSecond,
  //   String? completedAtIso,
  // });
  // Future<bool> getCourseAccess(String courseId);
  // Future<bool> getCourseCompletionStatus(String courseId);
  // Future<void> markEnrollmentCompleted(String courseId);
}

class CourseLearningRemoteDataSourceImpl extends CourseLearningRemoteDataSource{
  final DefaultConnector defaultConnector;

  CourseLearningRemoteDataSourceImpl({required this.defaultConnector});

  @override
  Future<CourseCurriculumModel> getCourseCurriculum(String courseId) async{
    try{
      final result = await defaultConnector.getCourseCurriculum(courseId: courseId).execute();
      return CourseCurriculumModel.fromConnectorResult(result.data.course!);
    }on DataConnectError catch (e) {
      throw CustomExceptions(message: e.message ?? 'Data Connect error');
    } catch (e){
      throw CustomExceptions(message: 'Failed to fetch Course Curriculum: $e');
    }
  }

  @override
  Future<LectureContentModel> getLectureContent(String lectureId) async {
    try {
      final result = await defaultConnector.getLectureContent(
          lectureId: lectureId).execute();
      return LectureContentModel.fromConnectorResult(result.data);
    } on DataConnectError catch (e) {
      throw CustomExceptions(message: e.message ?? 'Data Connect error');
    } catch (e) {
      throw CustomExceptions(message: 'Failed to fetch Lecture Content: $e');
    }
  }
}