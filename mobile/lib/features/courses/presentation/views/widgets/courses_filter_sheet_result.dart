import 'package:easy_localization/easy_localization.dart';
import 'package:optimatech_lms/features/courses/presentation/views/widgets/courses_filter_chips_row.dart';

enum CourseSortOption {
  newest,
  oldest,
  priceLowToHigh,
  priceHighToLow,
}

extension CourseSortOptionX on CourseSortOption {
  String get label {
    switch (this) {
      case CourseSortOption.newest:
        return 'courses.sort.newest'.tr();
      case CourseSortOption.oldest:
        return 'courses.sort.oldest'.tr();
      case CourseSortOption.priceLowToHigh:
        return 'courses.sort.priceLowToHigh'.tr();
      case CourseSortOption.priceHighToLow:
        return 'courses.sort.priceHighToLow'.tr();
    }
  }
}

class CoursesFilterSheetResult {
  final CourseFilterChip selectedFilter;
  final CourseSortOption selectedSort;

  const CoursesFilterSheetResult({
    required this.selectedFilter,
    required this.selectedSort,
  });

  factory CoursesFilterSheetResult.initial() {
    return const CoursesFilterSheetResult(
      selectedFilter: CourseFilterChip.all,
      selectedSort: CourseSortOption.newest,
    );
  }

  CoursesFilterSheetResult copyWith({
    CourseFilterChip? selectedFilter,
    CourseSortOption? selectedSort,
  }) {
    return CoursesFilterSheetResult(
      selectedFilter: selectedFilter ?? this.selectedFilter,
      selectedSort: selectedSort ?? this.selectedSort,
    );
  }
}