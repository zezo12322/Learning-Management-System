import 'package:dio/dio.dart';
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

    _dio.interceptors.add(
      PrettyDioLogger(
        requestHeader: true,
        requestBody: true,
        responseHeader: false,
        responseBody: true,
        error: true,
      )
    );
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