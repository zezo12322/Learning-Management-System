import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';

// Generic Use Case for Home Feature
abstract class HomeUseCase<T, Params> {
  Future<Either<Failure, T>> call(Params? params);
}

class NoParams {}
