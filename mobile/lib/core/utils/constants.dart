import 'package:flutter/foundation.dart';

abstract class AppConstants{
  /// Set to true to test with local Firebase Emulators (Auth, DataConnect, Storage).
  static const bool useFirebaseEmulators = false;

  /// Set to true to point the app to your local NestJS backend (localhost:3001).
  /// Set to false to use the production API.
  static const bool useLocalBackend = false;

  /// Your Production API URL goes here!
  static const String prodApiUrl = 'https://learning-management-system-production-a97c.up.railway.app/api/v1';

  static String get localhost {
    if (defaultTargetPlatform == TargetPlatform.android) {
      return '10.0.2.2';
    }
    return 'localhost'; // iOS Simulator, Web, Desktop
  }

  static String get baseUrl => useLocalBackend ? 'http://$localhost:3001' : prodApiUrl;
  static const Duration connectionTimeout = Duration(seconds: 10);
  static const Duration receiveTimeout = Duration(seconds: 10);

  static const String translationsPath = 'assets/translations';
}