import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/utils/app_validators.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/widgets/custom_text_field.dart';
import 'package:optimatech_lms/core/widgets/password_text_field.dart';
import 'package:optimatech_lms/core/widgets/primary_button.dart';
import 'package:flutter_svg/flutter_svg.dart';

class LogInView extends StatelessWidget {
  const LogInView({super.key});

  static const String routeName = '/login';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            const LogInHeader(),
            const LogInForm(),
            Gap(30.h),
          ],
        ),
      )
    );
  }
}

class LogInHeader extends StatelessWidget {
  const LogInHeader({super.key});

  @override
  Widget build(BuildContext context) {
    final topPadding = MediaQuery.of(context).padding.top;

    return Container(
      width: double.infinity,
      padding: EdgeInsets.only(
        top: topPadding + 16.h,
        left: 16.w,
        right: 16.w,
      ),
      child: SizedBox(
        height: 250.h,
        child: Stack(
          clipBehavior: Clip.none,
          children: [
            Positioned(
              left: 0,
              top: 12.h,
              child: Column(
                children: [
                  Row(
                    children: [
                      // App logo PNG
                      Image.asset(
                        'assets/icons/app_icon.png',
                        width: 40.r,
                        height: 40.r,
                        fit: BoxFit.contain,
                      ),
                      Gap(10.w),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'OptimaTech',
                            style: context.textTheme.labelLarge?.copyWith(
                              fontWeight: FontWeights.bold,
                            ),
                          ),
                          Text(
                            'Learn. Grow. Succeed.',
                            style: context.textTheme.bodySmall?.copyWith(
                              color: context.theme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  Gap(20.h),
                  Text(
                    'auth.login_screen.welcome'.tr(),
                    style: context.textTheme.displayLarge?.copyWith(height: 1),
                  ),
                  Gap(10.h),
                  Text(
                    'auth.login_screen.subtitle'.tr(),
                    style: context.textTheme.bodyMedium?.copyWith(
                      color: context.theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
            Positioned(
              right: -21.w,
              bottom: 0,
              child: Image.asset(
                'assets/images/login_illustrator.png',
                width: 250.w,
                height: 240.h,
                fit: BoxFit.cover,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

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
  bool _rememberMe = true;
  bool _isLoading = false;
  bool _showClear = false;

  String? _emailError;
  String? _passwordError;

  @override
  void initState() {
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
    super.initState();
  }

  void _onLogIn(){
    if(_formKey.currentState!.validate()){
      _emailError = _passwordError = null;
      setState(() => _isLoading = true);
      // TODO: getIt<LoginCubit>().login(email, password)
      Future.delayed(const Duration(seconds: 2), () {
        if (mounted) setState(() => _isLoading = false);
      });
    }else{
      _emailError = AppValidators.validateEmail(_emailController.text);
      _passwordError = AppValidators.validateEmail(_passwordController.text);
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
        child: Form(
          key: _formKey,
          autovalidateMode: _autovalidateMode,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _SectionLabel(label: 'auth.login_screen.email_label'.tr()),
              Gap(8.h),
              CustomTextField(
                controller: _emailController,
                hintText: 'auth.login_screen.email_hint'.tr(),
                validator: AppValidators.validateEmail,
                errorText: _emailError,
                prefixIcon: Icons.email_outlined,
                showClear: _showClear,
                onChanged: (value){
                  if (_emailError != null) {
                    setState(() => _emailError = null);
                  }
                  _showClear = _emailController.text.isNotEmpty;
                  if(_emailController.text.isNotEmpty){
                    setState(() => _showClear = true);
                  }else if (_emailController.text.isEmpty){
                    setState(() => _showClear = false);
                  }
                },
                onClear: () {
                  _emailController.clear();
                  setState(() => _emailError = null);
                },
              ),
              Gap(16.h),
              _SectionLabel(label: 'auth.login_screen.password_label'.tr()),
              Gap(8.h),
              PasswordTextField(
                controller: _passwordController,
                hintText: 'auth.login_screen.password_hint'.tr(),
                isObscure: _obscurePassword,
                errorText: _passwordError,
                onToggled: () =>
                    setState(() => _obscurePassword = !_obscurePassword),
                onChanged: (value){
                  if(_passwordError != null){
                    setState(() => _passwordError = null);
                  }
                },
              ),
              Gap(16.h),
              // ── Remember me + Forgot password ──────────
              Row(
                children: [
                  RememberMeCheckbox(
                    value: _rememberMe,
                    onChanged: (v)=> setState(() => _rememberMe = v),
                  ),
                  const Spacer(),
                  TextButton(
                    onPressed: (){
                      // TODO: navigate to ForgotPasswordView
                    },
                      style: TextButton.styleFrom(
                        padding: EdgeInsets.symmetric(horizontal: 8.w),
                        tapTargetSize: MaterialTapTargetSize.shrinkWrap
                      ),
                    child: Text(
                      'auth.login_screen.forgot_password'.tr(),
                      style: context.textTheme.labelMedium?.copyWith(
                        color: context.theme.colorScheme.primary,
                        fontWeight: FontWeights.bold,
                      ),
                    )
                  ),
                ],
              ),
              // ── Login button ───────────────────────────
              Gap(24.h),
              PrimaryButton(
                text: 'auth.login_screen.login_btn'.tr(),
                onPressed: _onLogIn,
                isLoading: _isLoading,
              ),
              Gap(24.h),
              // ── Divider ────────────────────────────────
              const _OrDivider(),
              Gap(20.h),
              // ── Google button ──────────────────────────
              _GoogleButton(),
              Gap(28.h),

              // ── Register link ──────────────────────────
              RegisterLink(
                onTap: () {
                  // TODO: Navigator.pushNamed(context, RegisterView.routeName)
                },
              ),
              // ── Bottom decorative strip ────────────────
              _BottomDecorStrip(),

            ],
          ),
        ),
      ),
    );
  }
}

class RegisterLink extends StatelessWidget {
  const RegisterLink({
    super.key,
    required this.onTap,
  });

  final VoidCallback onTap;
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            'auth.login_screen.no_account'.tr(),
            style: context.textTheme.bodySmall?.copyWith(
              fontWeight: FontWeights.bold
            ),
          ),
          Gap(4.w),
          GestureDetector(
            onTap: onTap,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'auth.login_screen.register'.tr(),
                  style: context.textTheme.bodySmall?.copyWith(
                    color: context.theme.colorScheme.primary,
                    fontWeight: FontWeights.bold,
                  ),
                ),
                Gap(2.w),
                Icon(
                  Icons.arrow_forward_ios_rounded,
                  size: 12.r,
                  color: context.theme.colorScheme.primary
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _SectionLabel extends StatelessWidget {
  final String label;
  const _SectionLabel({required this.label});

  @override
  Widget build(BuildContext context) {
    return Text(
      label,
      style: context.textTheme.labelMedium,
    );
  }
}

class RememberMeCheckbox  extends StatelessWidget {
  const RememberMeCheckbox ({super.key, required this.value, required this.onChanged});

  final bool value;
  final ValueChanged<bool> onChanged;
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => onChanged(!value),
      behavior: HitTestBehavior.opaque,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          AnimatedContainer(
            duration: const Duration(milliseconds: 180),
            width: 20.r,
            height: 20.r,
            decoration: BoxDecoration(
              color: value ? context.theme.colorScheme.primary : Colors.transparent,
              border:  Border.all(
                color: value
                  ? context.theme.colorScheme.primary
                  : context.theme.colorScheme.outline,
                width: 1.5,
              ),
              borderRadius: BorderRadius.circular(4.r),
            ),
            child: value
              ? Icon(
                  Icons.check_rounded,
                  color: Colors.white,
                  size: 16.r,
                )
              : null,
          ),
          Gap(8.w),
          Text(
            'auth.login_screen.remember_me'.tr(),
            style: context.textTheme.labelMedium?.copyWith(
              fontWeight: FontWeights.bold
            ),
          ),
        ],
      ),
    );
  }
}

class _OrDivider extends StatelessWidget {
  const _OrDivider();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const Expanded(child: Divider(),),
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 12.w),
          child: Text(
            'auth.login_screen.or_continue'.tr(),
            style: context.textTheme.bodySmall,
          ),
        ),
        const Expanded(child: Divider(),),
      ],
    );
  }
}

class _GoogleButton extends StatelessWidget {
  const _GoogleButton();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 56.h,
      child: ElevatedButton(
        onPressed: () {
          // TODO: Google sign-in
        },
        style: ElevatedButton.styleFrom(
          side: BorderSide.none,
          foregroundColor: context.theme.colorScheme.onSurface,
          backgroundColor: context.theme.colorScheme.surface,
          padding: EdgeInsets.zero,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SvgPicture.asset('assets/icons/google.svg', width: 32.r, height: 32.r,),
            Gap(12.w),
            Text(
              'auth.login_screen.google_btn'.tr(),
              style: context.textTheme.labelLarge,
            ),
          ],
        ),
      ),
    );
  }
}

class _BottomDecorStrip extends StatelessWidget {
  const _BottomDecorStrip();

  @override
  Widget build(BuildContext context) {
    return Transform.translate(
      offset: const Offset(0, 12),
        child: Image.asset('assets/images/decor_strip.png',),
    );
  }

}