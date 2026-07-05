import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';

class PopularCourseCard extends StatelessWidget {
  const PopularCourseCard({
    super.key,
    required this.title,
    required this.studentCount,
    required this.rating,
    required this.headerColor,
    required this.icon,
    this.onTap,
    required this.image,
  });
  final String title;
  final String studentCount;
  final double rating;
  final Color headerColor;
  final IconData icon;
  final String image;
  final VoidCallback? onTap;
  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Material(
      color: colorScheme.surface,
      borderRadius: BorderRadius.circular(18.r),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Container(
          width: 168.w,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(18.r),
            border: Border.all(color: colorScheme.outline),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              CourseHeader(
                courseImage: image,
                headerContainerColor: headerColor,
                headerContainerIcon: icon,
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(12.w, 12.h, 12.w, 0.h),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: TextStyles.labelLarge.copyWith(
                        fontSize: 14.sp,
                        fontWeight: FontWeights.bold,
                        color: colorScheme.onSurface,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    Gap(8.h),
                    Row(
                      children: [
                        Icon(
                          Icons.people_outline_rounded,
                          size: 14.sp,
                          color: colorScheme.onSurfaceVariant,
                        ),
                        Gap(4.w),
                        Expanded(
                          child: Text(
                            studentCount,
                            style: TextStyles.labelSmall.copyWith(
                              color: colorScheme.onSurfaceVariant,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        Gap(8.w),
                        Text(
                          '•',
                          style: TextStyles.labelSmall.copyWith(
                            color: colorScheme.onSurfaceVariant,
                          ),
                        ),
                        Gap(8.w),
                        Icon(
                          Icons.star_rounded,
                          size: 14.sp,
                          color: colorScheme.secondary,
                        ),
                        Gap(4.w),
                        Text(
                          rating.toStringAsFixed(1),
                          style: TextStyles.labelSmall.copyWith(
                            color: colorScheme.onSurfaceVariant,
                            fontWeight: FontWeights.semiBold,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class CourseHeader extends StatelessWidget {
  const CourseHeader({
    super.key,
    required this.courseImage,
    required this.headerContainerColor,
    required this.headerContainerIcon,
  });

  final String courseImage;
  final Color headerContainerColor;
  final IconData headerContainerIcon;

  @override
  Widget build(BuildContext context) {
    final String imagePath = courseImage.trim();
    final ImageProvider imageProvider;

    if (imagePath.isNotEmpty && imagePath.startsWith('http')) {
      imageProvider = NetworkImage(imagePath);
    } else if (imagePath.isNotEmpty) {
      imageProvider = AssetImage(imagePath);
    } else {
      imageProvider = const AssetImage('assets/images/student_illustrator.png');
    }

    final colorScheme = Theme.of(context).colorScheme;

    return Container(
      height: 130.h,
      width: double.infinity,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.vertical(top: Radius.circular(18.r)),
        image: DecorationImage(
          image: imageProvider,
          fit: BoxFit.cover,
        ),
      ),
      child: Stack(
        children: [
          Positioned(
            top: 14.h,
            left: 12.w,
            child: Container(
              width: 44.w,
              height: 44.w,
              decoration: BoxDecoration(
                color: headerContainerColor.withValues(alpha: 0.6),
                borderRadius: BorderRadius.circular(14.r),
              ),
              child: Icon(
                headerContainerIcon,
                size: 24.sp,
                color: colorScheme.onPrimary,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
