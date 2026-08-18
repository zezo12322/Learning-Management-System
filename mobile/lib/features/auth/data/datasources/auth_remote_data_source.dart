import 'package:easy_localization/easy_localization.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/core/network/api_service.dart';

abstract class AuthRemoteDataSource {
  Future<void> syncCurrentUser();
}

class AuthRemoteDataSourceImpl implements AuthRemoteDataSource {
  final ApiService apiService;

  AuthRemoteDataSourceImpl({required this.apiService});

  Future<void> _setAuthToken() async {
    final user = FirebaseAuth.instance.currentUser;
    if (user != null) {
      final token = await user.getIdToken();
      if (token != null) {
        apiService.setAuthToken(token);
      }
    }
  }

  @override
  Future<void> syncCurrentUser() async {
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) {
      throw CustomExceptions(message: 'auth.error.genericError'.tr());
    }

    try {
      await _setAuthToken();
      // NestJS route: POST /api/v1/me/sync
      await apiService.post('/me/sync', data: {
        'email': user.email,
        'name': user.displayName ?? '',
        if (user.photoURL != null) 'avatar': user.photoURL,
      });
    } on CustomExceptions {
      rethrow;
    } catch (e) {
      throw CustomExceptions(message: 'auth.error.genericError'.tr());
    }
  }
}