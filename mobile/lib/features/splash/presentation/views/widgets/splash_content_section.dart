import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class SplashContentSection extends StatelessWidget {
  const SplashContentSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          SizedBox(height: 32.h),
          // Illustration area — replace SvgPicture.asset() when you have the SVG
          const _IllustrationPlaceholder(),
          SizedBox(height: 40.h),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 32.w),
            child: Text(
              'Empowering learners worldwide\nwith accessible education.',
              textAlign: TextAlign.center,
              style: TextStyles.labelSmall.copyWith(
                color: context.theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _IllustrationPlaceholder extends StatelessWidget {
  const _IllustrationPlaceholder();

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.center,
      children: [
        // Background blob
        Container(
          width: 280.w,
          height: 280.w,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: AppColors.primary.withOpacity(0.07),
          ),
        ),
        // Replace this Container with:
        // SvgPicture.asset('assets/images/splash_illustration.svg', width: 260.w)
        Container(
          width: 260.w,
          height: 260.w,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: Colors.transparent,
          ),
          child: Icon(
            Icons.menu_book_rounded,
            size: 120.sp,
            color: AppColors.primary.withOpacity(0.25),
          ),
        ),
        // Floating badge — top right
        Positioned(
          top: 20.h,
          right: 16.w,
          child: _FloatingBadge(
            icon: Icons.play_arrow_rounded,
            color: Colors.white,
            iconColor: AppColors.primary,
          ),
        ),
        // Floating badge — left
        Positioned(
          left: 8.w,
          bottom: 60.h,
          child: _FloatingBadge(
            icon: Icons.menu_book_rounded,
            color: AppColors.secondary,
            iconColor: Colors.white,
          ),
        ),
        // Floating badge — bottom right
        Positioned(
          right: 8.w,
          bottom: 50.h,
          child: _FloatingBadge(
            icon: Icons.school_rounded,
            color: AppColors.primary,
            iconColor: Colors.white,
          ),
        ),
      ],
    );
  }
}

class _FloatingBadge extends StatelessWidget {
  const _FloatingBadge({
    required this.icon,
    required this.color,
    required this.iconColor,
  });

  final IconData icon;
  final Color color;
  final Color iconColor;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 52.w,
      height: 52.w,
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(14.r),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.10),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Icon(icon, color: iconColor, size: 26.sp),
    );
  }
}
