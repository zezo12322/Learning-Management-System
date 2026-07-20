import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';

import '../utils/constants.dart';
import 'dio_error_handler.dart';

class ApiService {
  late Dio _dio;

  ApiService() {
    _dio = Dio(
      BaseOptions(
        baseUrl: AppConstants.baseUrl,
        connectTimeout: AppConstants.connectionTimeout,
        receiveTimeout: AppConstants.receiveTimeout,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );

    // Network logging is DEBUG-ONLY. In release builds this interceptor is not
    // attached, so the Authorization bearer token and request/response bodies
    // (PII, quiz answers, progress) are never written to logcat. Even in debug,
    // request headers are omitted so the token doesn't leak into shared logs.
    if (kDebugMode) {
      // requestHeader/responseHeader default to false — deliberately left off so
      // the Authorization bearer token is never logged. responseBody defaults to
      // true (kept); requestBody enabled for debugging payloads.
      _dio.interceptors.add(
        PrettyDioLogger(
          requestBody: true,
        ),
      );
    }
  }

  Future<Response> get(String endpoint) async {
    try {
      return await _dio.get(endpoint);
    } on DioException catch (e) {
      throw DioErrorHandler.handleDioException(e);
    }
  }

  Future<Response> post(String endpoint, {dynamic data}) async {
    try {
      return await _dio.post(endpoint, data: data);
    } on DioException catch (e) {
      throw DioErrorHandler.handleDioException(e);
    }
  }

  Future<Response> put(String endpoint, {dynamic data}) async {
    try {
      return await _dio.put(endpoint, data: data);
    } on DioException catch (e) {
      throw DioErrorHandler.handleDioException(e);
    }
  }

  Future<Response> delete(String endpoint) async {
    try {
      return await _dio.delete(endpoint);
    } on DioException catch (e) {
      throw DioErrorHandler.handleDioException(e);
    }
  }

  void setAuthToken(String token) {
    _dio.options.headers['Authorization'] = 'Bearer $token';
  }

  void clearAuthToken() {
    _dio.options.headers.remove('Authorization');
  }
}