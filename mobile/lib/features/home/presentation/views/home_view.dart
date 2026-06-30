import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/assignments_section.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/continue_learning_card.dart';
import 'package:optimatech_lms/core/widgets/app_header/app_header.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/home_section_header.dart';
import 'package:optimatech_lms/core/widgets/app_search_filed.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/popular_courses_section.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/recommended_courses_section.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  static const String routeName = '/home';

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  int _selectedNavIndex = 0;
  final TextEditingController _searchController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            SliverToBoxAdapter(
              child: Padding(
                padding: EdgeInsets.fromLTRB(20.w, 12.h, 20.w, 0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // ------------- App Header -------------
                    AppHeader(
                      onNotificationTap: () {},
                      userName: 'Leonel Messi',
                      notificationCount: 10,
                    ),
                    Gap(20.h),

                    // ------------- Home Search Bar -------------
                    AppSearchField(
                      searchController: _searchController,
                      hintText: 'Search for courses, lessons, quizzes...',
                      prefixIcon: Icons.search_rounded,
                      suffixIcon: Icons.filter_list_rounded,
                      onSearch: () {},
                      onFilter: () {},
                      onClear: () {},
                    ),
                    Gap(24.h),

                    // ------------- Continue Learning Section -------------
                    HomeSectionHeader(
                      title: 'Continue Learning',
                      onViewAllTap: () {},
                    ),
                    Gap(14.h),
                    ContinueLearningCard(
                      onTap: () {},
                      onPlayTap: () {},
                    ),
                    // ------------- Popular Courses Section -------------
                    Gap(28.h),
                    const PopularCoursesSection(),
                    Gap(28.h),
                    // ------------- Assignments Section -------------
                    const AssignmentsSection(),
                    Gap(28.h),
                    const RecommendedCoursesSection(),
                    Gap(24.h),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: _HomeBottomNavigationBar(
        selectedIndex: _selectedNavIndex,
        onDestinationSelected: (index) {
          setState(() => _selectedNavIndex = index);
        },
      ),
    );
  }
}

class _HomeBottomNavigationBar extends StatelessWidget {
  const _HomeBottomNavigationBar({
    required this.selectedIndex,
    required this.onDestinationSelected,
  });

  final int selectedIndex;
  final ValueChanged<int> onDestinationSelected;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: const BoxDecoration(
        color: AppColors.surface,
        border: Border(
          top: BorderSide(color: AppColors.border),
        ),
      ),
      child: Theme(
        data: Theme.of(context).copyWith(
          navigationBarTheme: NavigationBarThemeData(
            height: 72.h,
            backgroundColor: AppColors.surface,
            indicatorColor: Colors.transparent,
            surfaceTintColor: Colors.transparent,
            shadowColor: Colors.transparent,
            elevation: 0,
            labelTextStyle: WidgetStateProperty.resolveWith((states) {
              if (states.contains(WidgetState.selected)) {
                return TextStyle(
                  fontSize: 12.sp,
                  fontWeight: FontWeight.w600,
                  color: AppColors.primary,
                  fontFamily: 'Poppins',
                );
              }
              return TextStyle(
                fontSize: 12.sp,
                fontWeight: FontWeight.w500,
                color: AppColors.textSecondary,
                fontFamily: 'Poppins',
              );
            }),
            iconTheme: WidgetStateProperty.resolveWith((states) {
              if (states.contains(WidgetState.selected)) {
                return IconThemeData(
                  color: AppColors.primary,
                  size: 24.sp,
                );
              }
              return IconThemeData(
                color: AppColors.textSecondary,
                size: 24.sp,
              );
            }),
          ),
        ),
        child: NavigationBar(
          selectedIndex: selectedIndex,
          onDestinationSelected: onDestinationSelected,
          destinations: const [
            NavigationDestination(
              icon: Icon(Icons.home_outlined),
              selectedIcon: Icon(Icons.home_rounded),
              label: 'Home',
            ),
            NavigationDestination(
              icon: Icon(Icons.menu_book_outlined),
              selectedIcon: Icon(Icons.menu_book_rounded),
              label: 'Courses',
            ),
            NavigationDestination(
              icon: Icon(Icons.bookmark_outline_rounded),
              selectedIcon: Icon(Icons.bookmark_rounded),
              label: 'Saved',
            ),
            NavigationDestination(
              icon: Icon(Icons.person_outline_rounded),
              selectedIcon: Icon(Icons.person_rounded),
              label: 'Profile',
            ),
          ],
        ),
      ),
    );
  }
}
