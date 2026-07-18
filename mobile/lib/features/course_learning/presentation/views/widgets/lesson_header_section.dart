import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class LessonHeaderSection extends StatelessWidget {
  const LessonHeaderSection({
    super.key,
    required this.courseTitle,
    required this.lessonTitle,
    required this.durationLabel,
    required this.lessonProgressLabel,
    required this.statusLabel,
    this.isBookmarked = false,
    this.onBookmarkTap,
  });

  final String courseTitle;
  final String lessonTitle;
  final String durationLabel;
  final String lessonProgressLabel;
  final String statusLabel;
  final bool isBookmarked;
  final VoidCallback? onBookmarkTap;

  @override
  Widget build(BuildContext context) {
    final primary = context.theme.colorScheme.primary;
    final secondaryTextColor = context.theme.colorScheme.onSurfaceVariant;
    final items = <Widget>[];

    if (durationLabel.isNotEmpty) {
      items.add(_MetaItem(
        icon: Icons.access_time_rounded,
        label: durationLabel,
      ));
    }

    if (lessonProgressLabel.isNotEmpty) {
      if (items.isNotEmpty) items.add(_Dot(color: secondaryTextColor));
      items.add(_MetaItem(
        icon: Icons.smart_display_outlined,
        label: lessonProgressLabel,
      ));
    }

    if (items.isNotEmpty) items.add(_Dot(color: secondaryTextColor));
    items.add(_StatusChip(
      label: statusLabel,
      color: primary,
    ));

    return Row(
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                courseTitle,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: context.textTheme.bodyMedium?.copyWith(
                  color: secondaryTextColor,
                  fontWeight: FontWeights.bold,
                ),
              ),
              Gap(4.h),
              Text(
                lessonTitle,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: context.textTheme.titleSmall?.copyWith(
                  fontWeight: FontWeights.bold,
                ),
              ),
              Gap(10.h),
              Wrap(
                crossAxisAlignment: WrapCrossAlignment.center,
                spacing: 8.w,
                runSpacing: 8.h,
                children: items,
              )
              // Wrap(
              //   crossAxisAlignment: WrapCrossAlignment.center,
              //   spacing: 8.w,
              //   runSpacing: 8.h,
              //   children: [
              //     _MetaItem(
              //       icon: Icons.access_time_rounded,
              //       label: durationLabel,
              //     ),
              //     _Dot(color: secondaryTextColor),
              //     _MetaItem(
              //       icon: Icons.smart_display_outlined,
              //       label: lessonProgressLabel,
              //     ),
              //     _Dot(color: secondaryTextColor),
              //     _StatusChip(
              //       label: statusLabel,
              //       color: primary,
              //     ),
              //   ],
              // ),
            ],
          ),
        ),
        GestureDetector(
          onTap: onBookmarkTap,
          child: Container(
            width: 44.w,
            height: 44.w,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12.r),
              border: Border.all(
                color: context.theme.colorScheme.outline.withValues(alpha: 0.6),
              ),
            ),
            child: Icon(
              isBookmarked
                  ? Icons.bookmark_rounded
                  : Icons.bookmark_border_rounded,
              color: primary,
              size: 20.sp,
            ),
          ),
        ),
      ],
    );
  }
}

class _MetaItem extends StatelessWidget {
  const _MetaItem({
    required this.icon,
    required this.label,
  });

  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    final secondaryTextColor = context.theme.colorScheme.onSurfaceVariant;

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(
          icon,
          size: 16.sp,
          color: secondaryTextColor,
        ),
        Gap(6.w),
        Text(
          label,
          style: context.textTheme.bodySmall?.copyWith(
            color: secondaryTextColor,
            fontWeight: FontWeights.bold,
          ),
        ),
      ],
    );
  }
}

class _StatusChip extends StatelessWidget {
  const _StatusChip({
    required this.label,
    required this.color,
  });

  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 4.h),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(8.r),
      ),
      child: Text(
        label,
        style: context.textTheme.labelSmall?.copyWith(
          color: color,
          fontWeight: FontWeights.bold,
        ),
      ),
    );
  }
}

class _Dot extends StatelessWidget {
  const _Dot({required this.color});
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Text(
      '•',
      style: TextStyle(
        color: color,
        fontSize: 12.sp,
      ),
    );
  }
}