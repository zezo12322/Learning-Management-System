/// إعدادات البيئة المختلفة للتطبيق
enum Environment { development, staging, production }

class AppConfig {
  static Environment _environment = Environment.development;
  
  static void setEnvironment(Environment env) {
    _environment = env;
  }

  static String get apiBaseUrl {
    switch (_environment) {
      case Environment.development:
        return 'https://learning-management-system-production-a97c.up.railway.app/api/v1';
      case Environment.staging:
        return 'https://api-staging.optimatech.io/api/v1';
      case Environment.production:
        return 'https://api.optimatech.io/api/v1';
    }
  }

  static String get appName => 'OptimaTech LMS';
  static String get appVersion => '1.0.0';
  static bool get isDebug => _environment == Environment.development;
  
  static const int connectTimeoutMs = 15000;
  static const int receiveTimeoutMs = 30000;
}
