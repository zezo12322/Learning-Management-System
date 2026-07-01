import 'package:optimatech_lms/features/courses/data/models/category_model.dart';

abstract class CategoriesRemoteDatasource {
  Future<List<CategoryModel>> getCategories();
}