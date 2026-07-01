import 'package:firebase_data_connect/firebase_data_connect.dart';
import 'package:optimatech_lms/dataconnect_generated/generated.dart';
import 'package:optimatech_lms/features/courses/data/datasources/courses_remote_datasource.dart';
import 'package:optimatech_lms/features/courses/data/models/courses_model.dart';

import '../../../../core/error/exceptions.dart';

class CoursesRemoteDatasourceImpl extends CoursesRemoteDatasource{
  final DefaultConnector _connector;
  CoursesRemoteDatasourceImpl(this._connector);

  @override
  Future<List<CourseModel>> getPublishedCourses() async{
    try{
      final result = await _connector.listPublishedCourses().execute(fetchPolicy: QueryFetchPolicy.serverOnly);

      return result.data.courses.map(CourseModel.fromConnectorResult).toList();
    } on DataConnectError catch (e) {
      throw CustomExceptions(message: e.message ?? 'Data Connect error');
    } catch (e){
      throw CustomExceptions(message: 'Failed to fetch courses: $e');
    }
  }
}