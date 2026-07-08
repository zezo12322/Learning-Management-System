import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/primary_button.dart';
import 'package:optimatech_lms/core/widgets/secondary_button.dart';

class LessonBottomBar extends StatelessWidget {
  const LessonBottomBar({
    super.key,
    this.isCompleted = false,
    this.onPrevious,
    this.onMarkComplete,
    this.onNext,
  });

  final bool isCompleted;
  final VoidCallback? onPrevious;
  final VoidCallback? onMarkComplete;
  final VoidCallback? onNext;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.fromLTRB(16.w, 12.h, 16.w, 16.h),
      decoration: BoxDecoration(
        color: context.theme.colorScheme.surface,
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
            child: SizedBox(
              height: 40.h,
              child: SecondaryButton(
                text: 'lesson_learning.actions.previous'.tr(),
                onPressed: onPrevious ?? () {},
              ),
            ),
          ),
          Gap(4.w),
          Flexible(
            child: _MarkCompleteButton(
              isCompleted: isCompleted,
              onTap: onMarkComplete,
            ),
          ),
          Gap(4.w),
          Expanded(
            child: SizedBox(
              height: 40.h,
              child: PrimaryButton(
                text: 'lesson_learning.actions.next'.tr(),
                onPressed: onNext ?? () {},
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _MarkCompleteButton extends StatelessWidget {
  const _MarkCompleteButton({required this.isCompleted, this.onTap});

  final bool isCompleted;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final primary = context.theme.colorScheme.primary;

    return TextButton(
      onPressed: onTap,
      style: TextButton.styleFrom(
        padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 10.h),
        minimumSize: Size.zero,
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Flexible(
            child: Text(
              'lesson_learning.actions.mark_complete'.tr(),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: context.textTheme.labelLarge?.copyWith(
                color: primary,
                fontWeight: FontWeights.bold,
                fontSize: 13.sp,
              ),
            ),
          ),
          Gap(4.w),
          Icon(Icons.check_circle_rounded, color: primary, size: 16.sp),
        ],
      ),
    );
  }
}