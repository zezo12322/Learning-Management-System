import 'package:easy_localization/easy_localization.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/secondary_button.dart';
import 'package:optimatech_lms/features/auth/presentation/views/log_in_view.dart';

/// Account deletion (KAN-95). Deleting the Firebase Auth user triggers the
/// `cleanupUserData` onDelete Cloud Function, which cascades the PostgreSQL
/// record and purges the user's Storage files. Firebase requires a recent
/// login before deletion, so we re-authenticate first — with the password for
/// email accounts, or Google for Google accounts.
void buildDeleteAccountDialog(BuildContext context) {
  showDialog<void>(
    context: context,
    barrierDismissible: false,
    builder: (_) => const _DeleteAccountDialog(),
  );
}

class _DeleteAccountDialog extends StatefulWidget {
  const _DeleteAccountDialog();

  @override
  State<_DeleteAccountDialog> createState() => _DeleteAccountDialogState();
}

class _DeleteAccountDialogState extends State<_DeleteAccountDialog> {
  final TextEditingController _passwordController = TextEditingController();
  bool _loading = false;
  bool _obscure = true;
  String? _error;

  bool get _isPasswordUser =>
      FirebaseAuth.instance.currentUser?.providerData
          .any((info) => info.providerId == 'password') ??
      false;

  @override
  void dispose() {
    _passwordController.dispose();
    super.dispose();
  }

  /// Re-authenticates the user before deletion. Returns false if the user
  /// aborted an interactive step (e.g. dismissed the Google picker).
  Future<bool> _reauthenticate(User user) async {
    final providers = user.providerData.map((info) => info.providerId).toList();

    if (providers.contains('password')) {
      final email = user.email;
      if (email == null) return false;
      final credential = EmailAuthProvider.credential(
        email: email,
        password: _passwordController.text.trim(),
      );
      await user.reauthenticateWithCredential(credential);
      return true;
    }

    if (providers.contains('google.com')) {
      final googleUser = await GoogleSignIn().signIn();
      if (googleUser == null) return false; // user cancelled the picker
      final googleAuth = await googleUser.authentication;
      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );
      await user.reauthenticateWithCredential(credential);
      return true;
    }

    // Unknown provider — attempt the deletion directly.
    return true;
  }

  Future<void> _confirmDelete() async {
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) {
      Navigator.of(context).pop();
      return;
    }
    if (_isPasswordUser && _passwordController.text.trim().isEmpty) {
      setState(() => _error = 'profile.delete.password_required'.tr());
      return;
    }

    setState(() {
      _loading = true;
      _error = null;
    });

    try {
      final reauthed = await _reauthenticate(user);
      if (!reauthed) {
        if (mounted) setState(() => _loading = false);
        return;
      }
      await user.delete();
      if (!mounted) return;
      // Clears the dialog and every route, then lands on the login screen.
      Navigator.of(context).pushNamedAndRemoveUntil(
        LogInView.routeName,
        (route) => false,
      );
    } on FirebaseAuthException catch (e) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = _mapError(e);
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _loading = false;
        _error = 'auth.error.genericError'.tr();
      });
    }
  }

  String _mapError(FirebaseAuthException e) {
    switch (e.code) {
      case 'wrong-password':
      case 'invalid-credential':
        return 'profile.delete.wrong_password'.tr();
      case 'network-request-failed':
        return 'auth.error.networkError'.tr();
      default:
        return 'auth.error.genericError'.tr();
    }
  }

  @override
  Widget build(BuildContext context) {
    final errorColor = context.theme.colorScheme.error;

    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20.r)),
      child: Padding(
        padding: EdgeInsets.all(24.r),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 64.w,
              height: 64.w,
              decoration: BoxDecoration(
                color: errorColor.withValues(alpha: 0.15),
                shape: BoxShape.circle,
              ),
              child: Icon(
                Icons.delete_forever_rounded,
                color: errorColor,
                size: 34.w,
              ),
            ),
            Gap(16.h),
            Text(
              'profile.delete.title'.tr(),
              style: context.textTheme.titleMedium,
              textAlign: TextAlign.center,
            ),
            Gap(10.h),
            Text(
              'profile.delete.warning'.tr(),
              style: context.textTheme.bodyMedium?.copyWith(
                color: context.theme.colorScheme.onSurfaceVariant,
              ),
              textAlign: TextAlign.center,
            ),
            if (_isPasswordUser) ...[
              Gap(16.h),
              TextField(
                controller: _passwordController,
                obscureText: _obscure,
                enabled: !_loading,
                onChanged: (_) {
                  if (_error != null) setState(() => _error = null);
                },
                decoration: InputDecoration(
                  labelText: 'profile.delete.password_label'.tr(),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12.r),
                  ),
                  suffixIcon: IconButton(
                    icon: Icon(
                      _obscure
                          ? Icons.visibility_off_outlined
                          : Icons.visibility_outlined,
                    ),
                    onPressed: () => setState(() => _obscure = !_obscure),
                  ),
                ),
              ),
            ],
            if (_error != null) ...[
              Gap(12.h),
              Text(
                _error!,
                style: context.textTheme.bodySmall?.copyWith(color: errorColor),
                textAlign: TextAlign.center,
              ),
            ],
            Gap(20.h),
            Row(
              children: [
                Expanded(
                  child: SecondaryButton(
                    text: 'common.dialog.cancel'.tr(),
                    isDisabled: _loading,
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                ),
                SizedBox(width: 12.w),
                Expanded(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: errorColor,
                      foregroundColor: Colors.white,
                      elevation: 0,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16.r),
                      ),
                    ),
                    onPressed: _loading ? null : _confirmDelete,
                    child: _loading
                        ? SizedBox(
                            width: 20.w,
                            height: 20.w,
                            child: const CircularProgressIndicator(
                              strokeWidth: 2,
                              color: Colors.white,
                            ),
                          )
                        : Text('profile.delete.confirm'.tr()),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
