import 'package:dartz/dartz.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/courses/data/datasources/categories_remote_datasource/categories_remote_datasource.dart';
import 'package:optimatech_lms/features/courses/domain/entities/category_entity.dart';
import 'package:optimatech_lms/features/courses/domain/repositories/categories_repository.dart';

class CategoriesRepositoryImpl extends CategoriesRepository {
  final CategoriesRemoteDatasource _remoteDatasource;
  CategoriesRepositoryImpl(this._remoteDatasource);

  @override
  Future<Either<Failure, List<CategoryEntity>>> getCategories() async{
    try{
      final categories = await _remoteDatasource.getCategories();
      return right(categories.map((c) => c.toEntity()).toList());
    }on CustomExceptions catch(e){
      return left(ServerFailure(e.message));
    }catch (e){
      return left(ServerFailure('auth.error.genericError'.tr()));
    }
  }
}