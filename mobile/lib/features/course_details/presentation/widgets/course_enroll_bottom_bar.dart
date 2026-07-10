import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';

class CourseEnrollBottomBar extends StatelessWidget {
  const CourseEnrollBottomBar({
    super.key,
    required this.price,
    this.onEnroll,
  });

  final double price;
  final VoidCallback? onEnroll;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Container(
      padding: EdgeInsets.fromLTRB(
        16.w,
        12.h,
        16.w,
        12.h + MediaQuery.paddingOf(context).bottom,
      ),
      decoration: BoxDecoration(
        color: colorScheme.surface,
        border: Border(
          top: BorderSide(color: colorScheme.outline),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.06),
            blurRadius: 12,
            offset: const Offset(0, -4),
          ),
        ],
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'Price',
                  style: TextStyles.labelSmall.copyWith(
                    color: colorScheme.onSurfaceVariant,
                  ),
                ),
                Gap(2.h),
                Wrap(
                  crossAxisAlignment: WrapCrossAlignment.center,
                  spacing: 8.w,
                  runSpacing: 4.h,
                  children: [
                    Text(
                      '\$${price.toStringAsFixed(2)}',
                      style: TextStyles.titleSmall.copyWith(
                        fontSize: 20.sp,
                        fontWeight: FontWeights.bold,
                        color: colorScheme.onSurface,
                      ),
                    ),
                    Text(
                      '\$${(price * 1.25).toStringAsFixed(2)}',
                      style: TextStyles.labelMedium.copyWith(
                        color: colorScheme.onSurfaceVariant,
                        decoration: TextDecoration.lineThrough,
                        decorationColor: colorScheme.onSurfaceVariant,
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.symmetric(
                        horizontal: 8.w,
                        vertical: 3.h,
                      ),
                      decoration: BoxDecoration(
                        color: colorScheme.primary.withValues(alpha: 0.12),
                        borderRadius: BorderRadius.circular(20.r),
                      ),
                      child: Text(
                        '25% OFF',
                        style: TextStyles.labelSmall.copyWith(
                          color: colorScheme.primary,
                          fontWeight: FontWeights.bold,
                          fontSize: 10.sp,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          Gap(12.w),
          Container(
            width: 160.w,
            height: 48.h,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  colorScheme.primary,
                  Color.lerp(
                      colorScheme.primary, const Color(0xFF1E1B4B), 0.45)!,
                ],
              ),
              borderRadius: BorderRadius.circular(14.r),
            ),
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                onTap: onEnroll,
                borderRadius: BorderRadius.circular(14.r),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Enroll Now',
                      style: TextStyles.labelLarge.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeights.semiBold,
                      ),
                    ),
                    Gap(6.w),
                    Icon(
                      Icons.arrow_forward_rounded,
                      size: 18.sp,
                      color: Colors.white,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
