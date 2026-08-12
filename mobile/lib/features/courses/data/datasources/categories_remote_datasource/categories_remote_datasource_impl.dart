import 'package:firebase_data_connect/firebase_data_connect.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/dataconnect_generated/generated.dart';
import 'package:optimatech_lms/features/courses/data/datasources/categories_remote_datasource/categories_remote_datasource.dart';
import 'package:optimatech_lms/features/courses/data/models/category_model.dart';
import 'package:optimatech_lms/core/error/user_facing_message.dart';

class CategoriesRemoteDatasourceImpl extends CategoriesRemoteDatasource{
  final DefaultConnector _connector;
  CategoriesRemoteDatasourceImpl(this._connector);

  @override
  Future<List<CategoryModel>> getCategories() async{
    try{
      final result = await _connector.listCategories().execute();
      return result.data.categories.map(CategoryModel.fromConnectorResult).toList();
    } on DataConnectError catch (e) {
      throw CustomExceptions(message: userFacingMessage(e));
    } catch (e){
      throw CustomExceptions(message: userFacingMessage(e));
    }
  }
}