import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/helper_function/build_snack_bar.dart';
import 'package:optimatech_lms/core/utils/app_validators.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/custom_text_field.dart';
import 'package:optimatech_lms/core/widgets/password_text_field.dart';
import 'package:optimatech_lms/core/widgets/primary_button.dart';
import 'package:optimatech_lms/features/auth/presentation/manager/signup_cubit/signup_cubit.dart';
import 'package:optimatech_lms/features/auth/presentation/manager/signup_cubit/signup_state.dart';
import 'package:optimatech_lms/features/auth/presentation/views/widgets/already_have_account.dart';
import 'package:optimatech_lms/features/auth/presentation/views/widgets/custom_checkbox.dart';
import 'package:optimatech_lms/features/auth/presentation/views/widgets/section_label.dart';
import 'package:optimatech_lms/features/auth/presentation/views/widgets/terms_and_privacy_text.dart';

class SignupForm extends StatefulWidget {
  const SignupForm({super.key});

  @override
  State<SignupForm> createState() => _SignupFormState();
}

class _SignupFormState extends State<SignupForm> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  late final TextEditingController _fullNameController;
  late final TextEditingController _emailController;
  late final TextEditingController _phoneController;
  late final TextEditingController _passwordController;
  late final TextEditingController _confirmPasswordController;
  AutovalidateMode _autovalidateMode = AutovalidateMode.disabled;

  bool _obscurePassword = true;
  bool _obscureConfirmPassword = true;

  @override
  void initState() {
    _fullNameController = TextEditingController();
    _emailController = TextEditingController();
    _phoneController = TextEditingController();
    _passwordController = TextEditingController();
    _confirmPasswordController = TextEditingController();
    super.initState();
  }

  void clearFields(){
    _fullNameController.clear();
    _emailController.clear();
    _phoneController.clear();
    _passwordController.clear();
    _confirmPasswordController.clear();
  }

  @override
  void dispose() {
    _fullNameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  void _onSignup() {
    if (_formKey.currentState!.validate()) {
      context.read<SignupCubit>().signup(
        fullName: _fullNameController.text.trim(),
        email: _emailController.text.trim(),
        phone: _phoneController.text.trim(),
        password: _passwordController.text,
      );
    } else {
      setState(() => _autovalidateMode = AutovalidateMode.always);
    }
  }
  @override
  Widget build(BuildContext context) {
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
            ),
          ],
        ),
        padding: EdgeInsets.fromLTRB(24.w, 16.h, 24.w, 0),
        child: BlocListener<SignupCubit, SignupState>(
          listener: (context, state) {
            if (state.status == SignupStatus.success) {
              buildSnackBar(context: context, text: 'auth.signup_screen.success'.tr());
              clearFields();
              Navigator.pop(context);
            }
            if (state.status == SignupStatus.failure && state.errorMessage != null) {
              buildSnackBar(context: context, isError: true, text: state.errorMessage!);
            }
          },
          child: Form(
            key: _formKey,
            autovalidateMode: _autovalidateMode,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SectionLabel(label: 'auth.signup_screen.full_name'.tr()),
                Gap(8.h),
                BlocSelector<SignupCubit, SignupState, String?>(
                  selector: (state) => state.fullNameError,
                  builder: (context, error) {
                    return CustomTextField(
                      controller: _fullNameController,
                      hintText: 'auth.signup_screen.enter_full_name'.tr(),
                      validator: AppValidators.validateFullName,
                      errorText: error,
                      prefixIcon: Icons.person_outline,
                      onChanged: (value) {
                        context.read<SignupCubit>().fullNameChanged();
                      },
                    );
                  },
                ),
                Gap(16.h),

                SectionLabel(label: 'auth.signup_screen.email'.tr()),
                Gap(8.h),
                BlocSelector<SignupCubit, SignupState, String?>(
                  selector: (state) => state.emailError,
                  builder: (context, error) {
                    return CustomTextField(
                      controller: _emailController,
                      hintText: 'auth.signup_screen.enter_email'.tr(),
                      validator: AppValidators.validateEmail,
                      errorText: error,
                      prefixIcon: Icons.email_outlined,
                      onChanged: (value) {
                        context.read<SignupCubit>().emailChanged();
                      },
                    );
                  },
                ),
                Gap(16.h),

                SectionLabel(label: 'auth.signup_screen.phone_number'.tr()),
                Gap(8.h),
                BlocSelector<SignupCubit, SignupState, String?>(
                  selector: (state) => state.phoneError,
                  builder: (context, error) {
                    return CustomTextField(
                      controller: _phoneController,
                      hintText: 'auth.signup_screen.enter_phone_number'.tr(),
                      validator: AppValidators.validatePhoneNumber,
                      maxLength: 11,
                      errorText: error,
                      prefixIcon: Icons.phone_outlined,
                      onChanged: (value) {
                        context.read<SignupCubit>().phoneChanged();
                      },
                    );
                  },
                ),
                Gap(16.h),

                SectionLabel(label: 'auth.signup_screen.password'.tr()),
                Gap(8.h),
                BlocSelector<SignupCubit, SignupState, String?>(
                  selector: (state) => state.passwordError,
                  builder: (context, error) {
                    return PasswordTextField(
                      controller: _passwordController,
                      hintText: 'auth.signup_screen.create_password'.tr(),
                      isObscure: _obscurePassword,
                      errorText: error,
                      onToggled: () {
                        setState(() => _obscurePassword = !_obscurePassword);
                      },
                      onChanged: (_) {
                        context.read<SignupCubit>().passwordChanged();
                      },
                    );
                  },
                ),
                Gap(16.h),

                SectionLabel(label: 'auth.signup_screen.confirm_password'.tr()),
                Gap(8.h),
                BlocSelector<SignupCubit, SignupState, String?>(
                  selector: (state) => state.confirmPasswordError,
                  builder: (context, error) {
                    return PasswordTextField(
                      controller: _confirmPasswordController,
                      hintText: 'auth.signup_screen.confirm_your_password'.tr(),
                      validator: (_) =>
                        AppValidators.validateConfirmPassword(
                          password: _passwordController.text,
                          confirmPassword: _confirmPasswordController.text,
                        ),
                      isObscure: _obscureConfirmPassword,
                      errorText: error,
                      onToggled: () {
                        setState(() => _obscureConfirmPassword = !_obscureConfirmPassword);
                      },
                      onChanged: (_) {
                        context.read<SignupCubit>().confirmPasswordChanged();
                      },
                    );
                  },
                ),
                Gap(10.h),
                // ── agree terms section ──────────
                Row(
                  children: [
                    BlocSelector<SignupCubit, SignupState, bool>(
                      selector: (state) => state.isAgree,
                      builder: (context, isAgree) {
                        return CustomCheckbox(
                          value: isAgree,
                          onChanged: (v) {
                            context.read<SignupCubit>().toggleTerms(v);
                          },
                        );
                      },
                    ),
                    Gap(8.w),
                    Flexible(
                      child: TermsAndPrivacyText(
                        onPrivacyTap: () {},
                        onTermsTap: () {},
                      ),
                    ),
                  ],
                ),
                Gap(16.h),
                BlocSelector<SignupCubit, SignupState, bool>(
                  selector: (state) => state.status == SignupStatus.loading,
                  builder: (context, isLoading) {
                    return PrimaryButton(
                      text: 'auth.signup_screen.create_account_button'.tr(),
                      onPressed: () => _onSignup(),
                      isLoading: isLoading,
                    );
                  },
                ),
                Gap(24.h),
                const Center(child: AlreadyHaveAccount()),
                Gap(24.h),
              ],
            ),
          ),
        ),
      ),
    );
  }
}