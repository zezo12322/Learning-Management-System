import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/primary_button.dart';
import 'package:optimatech_lms/core/widgets/secondary_button.dart';
import 'package:optimatech_lms/features/courses/presentation/views/widgets/courses_filter_chips_row.dart';
import 'package:optimatech_lms/features/courses/presentation/views/widgets/courses_filter_sheet_result.dart';

class CoursesFilterBottomSheet extends StatefulWidget {
  const CoursesFilterBottomSheet({
    super.key,
    required this.initialFilter,
  });

  final CoursesFilterSheetResult initialFilter;

  @override
  State<CoursesFilterBottomSheet> createState() =>
      _CoursesFilterBottomSheetState();
}

class _CoursesFilterBottomSheetState extends State<CoursesFilterBottomSheet> {
  late CourseFilterChip _selectedFilter;
  late CourseSortOption _selectedSort;

  @override
  void initState() {
    super.initState();
    _selectedFilter = widget.initialFilter.selectedFilter;
    _selectedSort = widget.initialFilter.selectedSort;
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: EdgeInsets.only(
          left: 16.w,
          right: 16.w,
          top: 12.h,
          bottom: MediaQuery.of(context).viewInsets.bottom + 16.h,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 48.w,
                height: 5.h,
                decoration: BoxDecoration(
                  color: context.theme.colorScheme.onSurface,
                  borderRadius: BorderRadius.circular(999.r),
                ),
              ),
            ),
            Gap(20.h),

            Text(
              'courses.filterSheet.title'.tr(),
              style: context.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w700,
              ),
            ),
            Gap(20.h),

            Text(
              'courses.filterSheet.courseStatus'.tr(),
              style: context.textTheme.labelLarge?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            Gap(12.h),

            CoursesFilterChipsRow(
              selected: _selectedFilter,
              onSelected: (chip) {
                setState(() {
                  _selectedFilter = chip;
                });
              },
            ),

            Gap(24.h),

            Text(
              'courses.filterSheet.sortBy'.tr(),
              style: context.textTheme.labelLarge?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            Gap(12.h),

            Wrap(
              spacing: 10.w,
              runSpacing: 10.h,
              children: CourseSortOption.values.map((sort) {
                final isSelected = _selectedSort == sort;

                return GestureDetector(
                  onTap: () {
                    setState(() {
                      _selectedSort = sort;
                    });
                  },
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 10.h),
                    decoration: BoxDecoration(
                      color: isSelected
                          ? context.theme.colorScheme.primary
                          : context.theme.colorScheme.surface,
                      borderRadius: BorderRadius.circular(15.r),
                      border: Border.all(
                        color: isSelected
                            ? context.theme.colorScheme.primary
                            : context.theme.colorScheme.outline,
                        width: 1.5,
                      ),
                    ),
                    child: Text(
                      sort.label,
                      style: context.textTheme.labelSmall?.copyWith(
                        color: isSelected
                            ? Colors.white
                            : context.theme.colorScheme.onSurfaceVariant,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),

            Gap(16.h),

            Row(
              children: [
                Expanded(
                  child: SecondaryButton(
                    text: 'courses.filterSheet.reset'.tr(),
                    onPressed: () {
                      setState(() {
                        _selectedFilter = CourseFilterChip.all;
                        _selectedSort = CourseSortOption.newest;
                      });
                    },
                  ),
                ),
                Gap(12.w),
                Expanded(
                  child: PrimaryButton(
                    text: 'courses.filterSheet.apply'.tr(),
                    onPressed: () {
                      Navigator.pop(
                        context,
                        CoursesFilterSheetResult(
                          selectedFilter: _selectedFilter,
                          selectedSort: _selectedSort,
                        ),
                      );
                    }
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}