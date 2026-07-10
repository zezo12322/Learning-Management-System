import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';

class ResourcesContent extends StatelessWidget {
  const ResourcesContent({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final resources = [
      ('Course Slides', Icons.slideshow_outlined, 'PDF • 2.4 MB'),
      ('Design Checklist', Icons.checklist_rounded, 'PDF • 890 KB'),
      ('Figma Template', Icons.design_services_outlined, 'FIG • 5.1 MB'),
      ('Color Palette Guide', Icons.palette_outlined, 'PDF • 1.2 MB'),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Downloadable Resources',
          style: TextStyles.titleSmall.copyWith(
            fontSize: 18.sp,
            color: colorScheme.onSurface,
          ),
        ),
        Gap(12.h),
        ...resources.map(
          (resource) => Container(
            margin: EdgeInsets.only(bottom: 8.h),
            padding: EdgeInsets.symmetric(horizontal: 14.w, vertical: 12.h),
            decoration: BoxDecoration(
              color: colorScheme.surface,
              borderRadius: BorderRadius.circular(12.r),
              border: Border.all(color: colorScheme.outline),
            ),
            child: Row(
              children: [
                Container(
                  width: 40.w,
                  height: 40.w,
                  decoration: BoxDecoration(
                    color: colorScheme.primary.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(10.r),
                  ),
                  child: Icon(
                    resource.$2,
                    size: 20.sp,
                    color: colorScheme.primary,
                  ),
                ),
                Gap(12.w),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        resource.$1,
                        style: TextStyles.labelMedium.copyWith(
                          color: colorScheme.onSurface,
                          fontWeight: FontWeights.semiBold,
                        ),
                      ),
                      Gap(2.h),
                      Text(
                        resource.$3,
                        style: TextStyles.labelSmall.copyWith(
                          color: colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                ),
                Icon(
                  Icons.download_outlined,
                  size: 22.sp,
                  color: colorScheme.primary,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
