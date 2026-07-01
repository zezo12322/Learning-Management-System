import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';
import 'package:skeletonizer/skeletonizer.dart';

enum CourseStatus { inProgress, completed, newCourse, popular }

extension CourseStatusX on CourseStatus {
  String get label {
    switch (this) {
      case CourseStatus.inProgress:
        return 'In Progress';
      case CourseStatus.completed:
        return 'Completed';
      case CourseStatus.newCourse:
        return 'New';
      case CourseStatus.popular:
        return 'Popular';
    }
  }

  Color get color {
    switch (this) {
      case CourseStatus.inProgress:
        return AppColors.primary;
      case CourseStatus.completed:
        return AppColors.success;
      case CourseStatus.newCourse:
        return AppColors.secondary;
      case CourseStatus.popular:
        return AppColors.warning;
    }
  }
}

class CourseCard extends StatelessWidget {
  const CourseCard({
    super.key,
    required this.item,
    this.onTap,
    this.onBookmarkTap,
    this.onMoreTap,
  });

  final CourseEntity item;
  final VoidCallback? onTap;
  final VoidCallback? onBookmarkTap;
  final VoidCallback? onMoreTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: context.theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(20.r),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: IntrinsicHeight(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Thumbnail
              _CourseThumbnail(
                imagePath: item.thumbnail,
              ),
              // Content
              Expanded(
                child: Padding(
                  padding: EdgeInsets.only(top: 12.h, bottom: 12.h, right: 8.w),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            child: Text(
                              item.title,
                              style: context.textTheme.labelLarge?.copyWith(
                                fontWeight: FontWeight.w700,
                                overflow: TextOverflow.ellipsis,
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          Gap(4.w),
                          GestureDetector(
                            onTap: onBookmarkTap,
                            child: Icon(
                              item.isBookmarked
                                  ? Icons.bookmark_rounded
                                  : Icons.bookmark_border_rounded,
                              size: 20.r,
                              color: item.isBookmarked
                                  ? context.theme.colorScheme.primary
                                  : context.theme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                          SizedBox(width: 4.w),
                          GestureDetector(
                            onTap: onMoreTap,
                            child: Icon(
                              Icons.more_vert_rounded,
                              size: 20.r,
                              color: context.theme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 6.h),
                      // Instructor
                      Row(
                        children: [
                          CircleAvatar(
                            radius: 10.r,
                            backgroundColor: context.theme.colorScheme.primary.withOpacity(0.15),
                            child: Icon(
                              Icons.person_rounded,
                              size: 12.r,
                              color: context.theme.colorScheme.primary,
                            ),
                          ),
                          SizedBox(width: 6.w),
                          Expanded(
                            child: Text(
                              item.instructors[0].name,
                              style: context.textTheme.bodySmall?.copyWith(
                                fontWeight: FontWeight.w500,
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 6.h),
                      // Meta row: rating • level • lessons // Progress + status badge
                      Row(
                        children: [
                          Expanded(
                            child: RatingRow(courseItem: item,),
                          ),
                          // if (item.courseStatus != null) ...[
                          //   Gap(8.w),
                          //   //_StatusBadge(status: item.courseStatus),
                          // ],
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

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
          //'${courseItem.rating} (${_formatCount(courseItem.reviewCount)})',
          '${3.7} (500})',
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
            '${14} Lessons',
            // '${courseItem.lessonCount} Lessons',
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

class _CourseThumbnail extends StatelessWidget {
  const _CourseThumbnail({required this.imagePath});

  final String? imagePath;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20.r),
        child: SizedBox(
          width: 110.w,
          height: double.infinity,
          child: CachedNetworkImage(
            imageUrl: imagePath ?? '',
            fit: BoxFit.cover,
            placeholder: (_,__) =>
                Skeletonizer(child: Image.asset('assets/images/placeholder.png',fit: BoxFit.cover),),
            errorWidget: (_,__,___) =>
                Image.asset('assets/images/placeholder.png', fit: BoxFit.fill),
          ),
        ),
      ),
    );
  }
}


// class _StatusBadge extends StatelessWidget {
//   const _StatusBadge({required this.status});
//
//   final String status;
//
//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 4.h),
//       decoration: BoxDecoration(
//         color: status.color.withOpacity(0.12),
//         borderRadius: BorderRadius.circular(8.r),
//       ),
//       child: Text(
//         status.label,
//         style: context.textTheme.labelSmall?.copyWith(
//           color: status.color,
//           fontWeight: FontWeight.w600,
//           fontSize: 10.sp,
//         ),
//       ),
//     );
//   }
// }
