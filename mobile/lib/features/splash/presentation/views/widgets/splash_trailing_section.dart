import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

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
    )..forward();

    _progressAnim = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    );
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
          SizedBox(height: 12.h),
          Text(
            'Loading...',
            style: TextStyles.labelSmall.copyWith(
              color: context.theme.colorScheme.primary,
            ),
          ),
        ],
      ),
    );
  }
}
