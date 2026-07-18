import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/courses/domain/entities/category_entity.dart';

abstract class CategoriesRepository {
  Future<Either<Failure, List<CategoryEntity>>> getCategories();
}