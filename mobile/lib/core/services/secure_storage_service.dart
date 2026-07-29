import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorageService {
  SecureStorageService({required FlutterSecureStorage storage})
      : _storage = storage;

  final FlutterSecureStorage _storage;

  static const String _authTokenKey = 'auth_token';
  static const String _refreshTokenKey = 'refresh_token';
  static const String _userIdKey = 'user_id';

  // ---- Auth token ----
  Future<void> saveAuthToken(String token) =>
      _storage.write(key: _authTokenKey, value: token);

  Future<String?> getAuthToken() => _storage.read(key: _authTokenKey);

  Future<void> deleteAuthToken() => _storage.delete(key: _authTokenKey);

  // ---- Refresh token ----
  Future<void> saveRefreshToken(String token) =>
      _storage.write(key: _refreshTokenKey, value: token);

  Future<String?> getRefreshToken() => _storage.read(key: _refreshTokenKey);

  Future<void> deleteRefreshToken() => _storage.delete(key: _refreshTokenKey);

  // ---- User id ----
  Future<void> saveUserId(String userId) =>
      _storage.write(key: _userIdKey, value: userId);

  Future<String?> getUserId() => _storage.read(key: _userIdKey);

  // ---- Generic key/value access ----
  Future<void> write({required String key, required String value}) =>
      _storage.write(key: key, value: value);

  Future<String?> read({required String key}) => _storage.read(key: key);

  Future<void> delete({required String key}) => _storage.delete(key: key);

  Future<bool> containsKey({required String key}) =>
      _storage.containsKey(key: key);

  /// Clears every value written by this service, e.g. on sign-out.
  Future<void> clearAll() => _storage.deleteAll();
}