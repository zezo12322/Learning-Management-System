import 'package:flutter/foundation.dart';

abstract class AppConstants{
  /// Set to true to test with local backend (NestJS/Firebase Emulators).
  /// Set to false to use REAL DATA (Production NestJS / Production Firebase).
  static const bool useEmulators = true;

  /// Your Production API URL goes here!
  static const String prodApiUrl = 'https://api.your-production-url.com';

  static String get localhost {
    if (defaultTargetPlatform == TargetPlatform.android) {
      return '10.0.2.2';
    }
    return 'localhost'; // iOS Simulator, Web, Desktop
  }

  static String get baseUrl => useEmulators ? 'http://$localhost:3001' : prodApiUrl;
  static const Duration connectionTimeout = Duration(seconds: 10);
  static const Duration receiveTimeout = Duration(seconds: 10);

  static const String translationsPath = 'assets/translations';
}