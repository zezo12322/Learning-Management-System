import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/helper_function/build_snack_bar.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/core/utils/app_validators.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/custom_text_field.dart';
import 'package:optimatech_lms/core/widgets/primary_button.dart';
import 'package:optimatech_lms/features/auth/presentation/manager/forgot_password_cubit/forgot_password_cubit.dart';
import 'package:optimatech_lms/features/auth/presentation/manager/forgot_password_cubit/forgot_password_state.dart';

class ForgotPasswordView extends StatelessWidget {
  const ForgotPasswordView({super.key});

  static const String routeName = '/forgot-password';

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<ForgotPasswordCubit>(),
      child: const _ForgotPasswordBody(),
    );
  }
}

class _ForgotPasswordBody extends StatefulWidget {
  const _ForgotPasswordBody();

  @override
  State<_ForgotPasswordBody> createState() => _ForgotPasswordBodyState();
}

class _ForgotPasswordBodyState extends State<_ForgotPasswordBody> {
  late final TextEditingController _emailController;
  bool _showClear = false;

  @override
  void initState() {
    _emailController = TextEditingController();
    super.initState();
  }

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  void _onSubmit() {
    FocusScope.of(context).unfocus();
    context
        .read<ForgotPasswordCubit>()
        .sendResetLink(email: _emailController.text.trim());
  }

  @override
  Widget build(BuildContext context) {
    final cubit = context.read<ForgotPasswordCubit>();
    return Scaffold(
      appBar: AppBar(
        title: Text('auth.forgot_password_screen.title'.tr()),
      ),
      body: SafeArea(
        child: BlocConsumer<ForgotPasswordCubit, ForgotPasswordState>(
          listener: (context, state) {
            if (state.status == ForgotPasswordStatus.failure &&
                state.errorMessage != null) {
              buildSnackBar(
                context: context,
                text: state.errorMessage!,
                isError: true,
              );
            }
          },
          builder: (context, state) {
            if (state.status == ForgotPasswordStatus.success) {
              return _SuccessContent(
                email: _emailController.text.trim(),
                onBackToLogin: () => Navigator.of(context).pop(),
              );
            }
            return SingleChildScrollView(
              padding: EdgeInsets.fromLTRB(24.w, 24.h, 24.w, 24.h),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'auth.forgot_password_screen.heading'.tr(),
                    style: context.textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Gap(8.h),
                  Text(
                    'auth.forgot_password_screen.subtitle'.tr(),
                    style: context.textTheme.bodyMedium?.copyWith(
                      color: context.theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                  Gap(28.h),
                  CustomTextField(
                    controller: _emailController,
                    hintText: 'auth.login_screen.email_hint'.tr(),
                    validator: AppValidators.validateEmail,
                    errorText: state.emailError,
                    prefixIcon: Icons.email_outlined,
                    showClear: _showClear,
                    onChanged: (value) {
                      cubit.emailChanged();
                      setState(
                          () => _showClear = _emailController.text.isNotEmpty);
                    },
                    onClear: () {
                      _emailController.clear();
                      cubit.emailChanged();
                      setState(() => _showClear = false);
                    },
                  ),
                  Gap(28.h),
                  PrimaryButton(
                    text: 'auth.forgot_password_screen.send_btn'.tr(),
                    onPressed: _onSubmit,
                    isLoading: state.status == ForgotPasswordStatus.loading,
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}

class _SuccessContent extends StatelessWidget {
  const _SuccessContent({required this.email, required this.onBackToLogin});

  final String email;
  final VoidCallback onBackToLogin;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: EdgeInsets.fromLTRB(24.w, 40.h, 24.w, 24.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            width: 88.r,
            height: 88.r,
            decoration: BoxDecoration(
              color: context.theme.colorScheme.primary.withOpacity(0.1),
              shape: BoxShape.circle,
            ),
            child: Icon(
              Icons.mark_email_read_outlined,
              size: 44.r,
              color: context.theme.colorScheme.primary,
            ),
          ),
          Gap(24.h),
          Text(
            'auth.forgot_password_screen.success_title'.tr(),
            textAlign: TextAlign.center,
            style: context.textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.bold,
            ),
          ),
          Gap(12.h),
          Text(
            'auth.forgot_password_screen.success_message'.tr(args: [email]),
            textAlign: TextAlign.center,
            style: context.textTheme.bodyMedium?.copyWith(
              color: context.theme.colorScheme.onSurfaceVariant,
            ),
          ),
          Gap(32.h),
          PrimaryButton(
            text: 'auth.forgot_password_screen.back_to_login'.tr(),
            onPressed: onBackToLogin,
          ),
        ],
      ),
    );
  }
}
