import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

/// Firebase Service - طبقة مركزية للتعامل مع Firebase
class FirebaseService {
  static final FirebaseAuth _auth = FirebaseAuth.instance;
  static final FirebaseStorage _storage = FirebaseStorage.instance;
  static final FirebaseMessaging _messaging = FirebaseMessaging.instance;

  // Auth
  static FirebaseAuth get auth => _auth;
  static Stream<User?> get authStateChanges => _auth.authStateChanges();
  static User? get currentUser => _auth.currentUser;

  // Storage
  static FirebaseStorage get storage => _storage;

  // Messaging (FCM)
  static FirebaseMessaging get messaging => _messaging;

  /// تهيئة FCM وطلب الإذن
  static Future<String?> initializeFCM() async {
    // طلب إذن الإشعارات
    NotificationSettings settings = await _messaging.requestPermission(
      alert: true,
      announcement: false,
      badge: true,
      carPlay: false,
      criticalAlert: false,
      provisional: false,
      sound: true,
    );

    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      // الحصول على FCM Token
      final token = await _messaging.getToken();
      return token;
    }
    return null;
  }

  /// تسجيل الدخول بالإيميل والباسورد
  static Future<UserCredential> signInWithEmail({
    required String email,
    required String password,
  }) async {
    return await _auth.signInWithEmailAndPassword(
      email: email,
      password: password,
    );
  }

  /// تسجيل حساب جديد
  static Future<UserCredential> registerWithEmail({
    required String email,
    required String password,
  }) async {
    return await _auth.createUserWithEmailAndPassword(
      email: email,
      password: password,
    );
  }

  /// تسجيل الخروج
  static Future<void> signOut() async {
    await _auth.signOut();
  }

  /// إعادة تعيين كلمة المرور
  static Future<void> resetPassword(String email) async {
    await _auth.sendPasswordResetEmail(email: email);
  }
}
