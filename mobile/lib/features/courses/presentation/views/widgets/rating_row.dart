import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';

class RatingRow extends StatelessWidget {
  const RatingRow({super.key, required this.courseItem});

  final CourseEntity courseItem;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(Icons.star_rounded, size: 14.r, color: AppColors.warning),
        SizedBox(width: 3.w),
        Text(
          '${courseItem.avgRating} (${courseItem.ratingCount})',
          style: context.textTheme.bodySmall?.copyWith(
            fontSize: 11.sp,
            fontWeight: FontWeight.w600,
          ),
        ),
        _dot(context),
        Flexible(
          child: Text(
            courseItem.level,
            style: context.textTheme.bodySmall?.copyWith(fontSize: 11.sp),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
        _dot(context),
        Flexible(
          child: Text(
            'courses.list.lessonsCount'.tr(
              namedArgs: {'count': '14',},
            ),
            style: context.textTheme.bodySmall?.copyWith(fontSize: 11.sp),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }

  Widget _dot(BuildContext context) => Padding(
    padding: EdgeInsets.symmetric(horizontal: 5.w),
    child: Text(
      '•',
      style: context.textTheme.bodySmall?.copyWith(
        color: context.theme.colorScheme.onSurfaceVariant,
      ),
    ),
  );
}
