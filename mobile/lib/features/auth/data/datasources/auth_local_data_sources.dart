import 'package:optimatech_lms/core/services/secure_storage_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

abstract class AuthLocalDataSources {
  Future<void> setRememberMeState(bool isChecked);
  Future<bool> getRememberMeState();
  Future<void> saveToken({required String token});
  Future<String?> getToken();
  Future<void> deleteToken();
}

class AuthLocalDataSourcesImpl extends AuthLocalDataSources{
  
  final SharedPreferences sharedPreferences;
  final SecureStorageService secureStorageService;
  AuthLocalDataSourcesImpl({required this.sharedPreferences, required this.secureStorageService});
  
  static const String _rememberKey = 'remember_key';
  @override
  Future<bool> getRememberMeState() async {
    final isChecked = sharedPreferences.getBool(_rememberKey);
    return isChecked ?? false;
  }

  @override
  Future<void> setRememberMeState(bool isChecked) async{
    await sharedPreferences.setBool(_rememberKey, isChecked);
  }

  @override
  Future<void> saveToken({required String token}) async {
    await secureStorageService.saveAuthToken(token);
  }

  @override
  Future<String?> getToken() async {
    return await secureStorageService.getAuthToken();
  }

  @override
  Future<void> deleteToken() async {
    await secureStorageService.deleteAuthToken();
  }
}