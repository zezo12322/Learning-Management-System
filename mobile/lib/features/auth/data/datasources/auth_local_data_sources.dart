import 'package:shared_preferences/shared_preferences.dart';

abstract class AuthLocalDataSources {
  Future<void> setRememberMeState(bool isChecked);
  Future<bool> getRememberMeState();
}

class AuthLocalDataSourcesImpl extends AuthLocalDataSources{
  
  final SharedPreferences sharedPreferences;
  AuthLocalDataSourcesImpl({required this.sharedPreferences});
  
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
  
}