import 'package:optimatech_lms/core/network/api_service.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/core/services/secure_storage_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Everything that has to be forgotten when an account stops using this device.
///
/// Sign-out used to delete only the auth token — the bulk clear was present but
/// commented out, and `SecureStorageService.clearAll()` had no callers at all.
/// That left three things behind for whoever signed in next:
///
/// * the AI tutor transcripts in `SharedPreferences`, which were keyed on
///   course/video with no account in the key — so the next user opening the same
///   course read the previous user's conversation;
/// * the "remember me" flag, which belonged to the account that set it;
/// * the bearer token on the shared `Dio` instance, which lives in memory and
///   survives a `FirebaseAuth.signOut()`.
///
/// Chat keys are namespaced per account now (see `ChatLocalDataSourceImpl`), so
/// a missed clear can no longer serve one account's history to another. This
/// runs anyway: defence in depth, and it also reclaims the space.
///
/// Deliberately tolerant of individual failures — a sign-out must complete even
/// if one store misbehaves, and leaving the user signed in would be worse than
/// leaving a stale key behind.
Future<void> clearSessionData() async {
  try {
    await getIt<SecureStorageService>().clearAll();
  } catch (_) {
    // Keychain/Keystore unavailable — continue; the sign-out still proceeds.
  }

  try {
    final prefs = getIt<SharedPreferences>();
    final staleKeys = prefs
        .getKeys()
        .where(
          (key) => key.startsWith('chat_history_') || key == 'remember_key',
        )
        .toList();
    for (final key in staleKeys) {
      await prefs.remove(key);
    }
  } catch (_) {
    // Same reasoning as above.
  }

  // In-memory, so this cannot fail — but it is the one that would otherwise let
  // the next account's first request go out with the previous account's token.
  getIt<ApiService>().clearAuthToken();
}
