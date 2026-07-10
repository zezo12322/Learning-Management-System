import 'package:dio/dio.dart';
import 'package:easy_localization/easy_localization.dart';

import '../error/exceptions.dart';

class DioErrorHandler {
  static Exception handleDioException(DioException e) {
    switch (e.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.receiveTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.connectionError:
        return NetworkException(
          message: 'errors.network'.tr(),
        );

      case DioExceptionType.badResponse:
        return _handleStatusCode(e.response?.statusCode, e.response?.data);

      default:
        return ServerException(message: 'errors.server'.tr());
    }
  }

  static Exception _handleStatusCode(int? statusCode, dynamic data) {
    final message = data?['message'] ?? 'errors.unknown'.tr();
    switch (statusCode) {
      case 400:
        return ValidationException(message: message);
      case 401:
        return UnauthorizedException(message: message);
      case 403:
        return UnauthorizedException(message: 'errors.unauthorized_403'.tr());
      case 404:
        return ServerException(message: 'errors.not_found'.tr());
      case 422:
        return ValidationException(message: message);
      case 500:
      default:
        return ServerException(message: 'errors.server'.tr());
    }
  }
}