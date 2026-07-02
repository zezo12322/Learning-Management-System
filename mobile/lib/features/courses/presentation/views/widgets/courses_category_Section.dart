import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/features/courses/presentation/views/widgets/categories_list.dart';
import 'package:optimatech_lms/features/courses/presentation/views/widgets/section_header.dart';
import 'package:skeletonizer/skeletonizer.dart';


class CoursesCategorySection extends StatelessWidget {
  const CoursesCategorySection({
    super.key,
    required this.selectedIndex,
    required this.onSelected,
  });

  final int selectedIndex;
  final ValueChanged<int> onSelected;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16.h),
      child: Column(
        children: [
          SectionHeader(
            title: 'courses.categories.title'.tr(),
            actionLabel: 'courses.categories.viewAll'.tr(),
            onTap: () {},
          ),
          Gap(16.h),
          CategoriesList(
            selectedIndex: selectedIndex,
            onSelected: onSelected,
          ),
        ],
      ),
    );
  }
}