import 'package:easy_localization/easy_localization.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/features/auth/data/datasources/auth_local_data_sources.dart';
import 'package:optimatech_lms/features/auth/presentation/views/log_in_view.dart';
import 'package:optimatech_lms/features/home/presentation/views/home_view.dart';

class SplashTrailingSection extends StatefulWidget {
  const SplashTrailingSection({super.key});

  @override
  State<SplashTrailingSection> createState() => _SplashTrailingSectionState();
}

class _SplashTrailingSectionState extends State<SplashTrailingSection>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _progressAnim;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2200),
    );

    _progressAnim = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    );

    _startSplashFlow();
  }

  Future<void> _startSplashFlow() async{
    await _controller.forward();
    if (!mounted) return;

    final isLoggedIn = FirebaseAuth.instance.currentUser != null;
    final isRemembered = await getIt<AuthLocalDataSources>().getRememberMeState();

    if (!mounted) return;
    if(isLoggedIn && isRemembered){
      Navigator.pushNamedAndRemoveUntil(context, HomeView.routeName, (r)=> false);
      return;
    }

    if(isLoggedIn && isRemembered){
      await FirebaseAuth.instance.signOut();
    }

    if (!mounted) return;
    Navigator.pushNamedAndRemoveUntil(context, LogInView.routeName, (r)=> false);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 72.w),
      child: Column(
        children: [
          AnimatedBuilder(
            animation: _progressAnim,
            builder: (context, _) {
              return ClipRRect(
                borderRadius: BorderRadius.circular(100.r),
                child: LinearProgressIndicator(
                  value: _progressAnim.value,
                  minHeight: 6.h,
                  backgroundColor: context.theme.colorScheme.outline,
                  valueColor: AlwaysStoppedAnimation<Color>(
                    context.theme.colorScheme.primary,
                  ),
                ),
              );
            },
          ),
          Gap(12.h),
          Text(
            'common.loading'.tr(),
            style: TextStyles.labelSmall.copyWith(
              color: context.theme.colorScheme.primary,
            ),
          ),
        ],
      ),
    );
  }
}
