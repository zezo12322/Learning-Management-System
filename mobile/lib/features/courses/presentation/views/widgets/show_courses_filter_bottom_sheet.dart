import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/features/courses/presentation/views/widgets/courses_filter_bottom_sheet.dart';
import 'package:optimatech_lms/features/courses/presentation/views/widgets/courses_filter_sheet_result.dart';

Future<CoursesFilterSheetResult?> showCoursesFilterBottomSheet(BuildContext context) {
  return showModalBottomSheet<CoursesFilterSheetResult>(
    context: context,
    isScrollControlled: true,
    backgroundColor: context.theme.colorScheme.surface,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(
        top: Radius.circular(24.r),
      ),
    ),
    builder: (_) => CoursesFilterBottomSheet(
      initialFilter: CoursesFilterSheetResult.initial(),
    ),
  );
}