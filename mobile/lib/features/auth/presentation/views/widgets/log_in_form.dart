import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/helper_function/build_snack_bar.dart';
import 'package:optimatech_lms/core/utils/app_validators.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/widgets/custom_text_field.dart';
import 'package:optimatech_lms/core/widgets/password_text_field.dart';
import 'package:optimatech_lms/core/widgets/primary_button.dart';
import 'package:optimatech_lms/features/auth/presentation/manager/login_cubit/log_in_cubit.dart';
import 'package:optimatech_lms/features/auth/presentation/views/sign_up_view.dart';
import 'package:optimatech_lms/features/auth/presentation/views/widgets/bottom_decor_strip.dart';
import 'package:optimatech_lms/features/auth/presentation/views/forgot_password_view.dart';
import 'package:optimatech_lms/features/auth/presentation/views/widgets/forget_password_bt.dart';
import 'package:optimatech_lms/features/auth/presentation/views/widgets/google_bt.dart';
import 'package:optimatech_lms/features/auth/presentation/views/widgets/or_divider.dart';
import 'package:optimatech_lms/features/auth/presentation/views/widgets/register_link.dart';
import 'package:optimatech_lms/features/auth/presentation/views/widgets/remember_me_checkbox.dart';
import 'package:optimatech_lms/features/auth/presentation/views/widgets/section_label.dart';
import 'package:optimatech_lms/features/home/presentation/views/home_view.dart';

import '../../manager/login_cubit/log_in_state.dart';

class LogInForm extends StatefulWidget {
  const LogInForm({super.key});

  @override
  State<LogInForm> createState() => _LogInFormState();
}

class _LogInFormState extends State<LogInForm> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  late final TextEditingController _emailController;
  late final TextEditingController _passwordController;
  AutovalidateMode _autovalidateMode = AutovalidateMode.disabled;

  bool _obscurePassword = true;
  bool _showClear = false;


  @override
  void initState() {
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
    super.initState();
  }

  void _onLogIn() {
    if (_formKey.currentState!.validate()) {
      context.read<LogInCubit>().login(
        email: _emailController.text.trim(),
        password: _passwordController.text.trim(),
      );
    } else {
      setState(() => _autovalidateMode = AutovalidateMode.always);
    }
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final cubit = context.read<LogInCubit>();
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16.w),
      child: Container(
        width: double.infinity,
        decoration: BoxDecoration(
          color: context.theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(32.r),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.06),
              blurRadius: 24,
              offset: const Offset(0, -6),
            )
          ],
        ),
        padding: EdgeInsets.fromLTRB(24.w, 32.h, 24.w, 0),
        child: BlocListener<LogInCubit, LogInState>(
          listener: (context, state) {
            if (state.status == LogInStatus.success) {
              Navigator.pushNamedAndRemoveUntil(context, HomeView.routeName, (route) => false,);
            }
            if (state.status == LogInStatus.failure && state.errorMessage != null) {
              buildSnackBar(context: context, text: state.errorMessage!, isError: true);
            }
          },
          child: Form(
            key: _formKey,
            autovalidateMode: _autovalidateMode,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SectionLabel(label: 'auth.login_screen.email_label'.tr()),
                Gap(8.h),
                BlocSelector<LogInCubit, LogInState, String?>(
                  selector: (state) => state.emailError,
                  builder: (context, error) {
                    return CustomTextField(
                      controller: _emailController,
                      hintText: 'auth.login_screen.email_hint'.tr(),
                      validator: AppValidators.validateEmail,
                      errorText: error,
                      prefixIcon: Icons.email_outlined,
                      showClear: _showClear,
                      onChanged: (value) {
                        cubit.emailChanged();
                        setState(() => _showClear = _emailController.text.isNotEmpty);
                      },
                      onClear: () {
                        _emailController.clear();
                        cubit.emailChanged();
                      },
                    );
                  },
                ),
                Gap(16.h),
                SectionLabel(label: 'auth.login_screen.password_label'.tr()),
                Gap(8.h),
                BlocSelector<LogInCubit, LogInState, String?>(
                  selector: (state) => state.passwordError,
                  builder: (context, error) {
                    return PasswordTextField(
                      controller: _passwordController,
                      hintText: 'auth.login_screen.password_hint'.tr(),
                      isObscure: _obscurePassword,
                      errorText: error,
                      onToggled: () =>
                          setState(() => _obscurePassword = !_obscurePassword),
                      onChanged: (_) => cubit.passwordChanged(),
                    );
                  },
                ),
                Gap(16.h),
                // ── Remember me + Forgot password ──────────
                Row(
                  children: [
                    BlocSelector<LogInCubit, LogInState, bool>(
                      selector: (state) => state.rememberMe,
                      builder: (context, isChecked) {
                        return RememberMeCheckbox(
                          value: isChecked,
                          onChanged: (v) => cubit.toggleRememberMe(v),
                        );
                      },
                    ),
                    const Spacer(),
                    ForgetPasswordBt(
                      onPressed: () {
                        Navigator.pushNamed(
                          context,
                          ForgotPasswordView.routeName,
                        );
                      },
                    ),
                  ],
                ),
                // ── Login button ───────────────────────────
                Gap(24.h),
                BlocSelector<LogInCubit, LogInState, bool>(
                  selector: (state) => state.status == LogInStatus.loading,
                  builder: (context, isLoading) {
                    return PrimaryButton(
                      text: 'auth.login_screen.login_btn'.tr(),
                      onPressed: () => _onLogIn(),
                      isLoading: isLoading,
                    );
                  },
                ),
                Gap(24.h),
                // ── Divider ────────────────────────────────
                const OrDivider(),
                Gap(20.h),
                // ── Google button ──────────────────────────
                GoogleButton(onPressed: () {
                  context.read<LogInCubit>().loginWithGoogle();
                },),
                Gap(28.h),
                // ── Register link ──────────────────────────
                RegisterLink(
                  onTap: () {
                    Navigator.pushNamed(context, SignUpView.routeName);
                  },
                ),
                // ── Bottom decorative strip ────────────────
                const BottomDecorStrip(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}