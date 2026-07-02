import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/features/courses/presentation/views/courses_view.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/assignments_section.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/continue_learning_card.dart';
import 'package:optimatech_lms/core/widgets/app_header/app_header.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/glass_bottom_navbar.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/home_section_header.dart';
import 'package:optimatech_lms/core/widgets/app_search_filed.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/popular_courses_section.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/recommended_courses_section.dart';
import 'package:optimatech_lms/features/profile/presentation/views/profile_view.dart';
import 'package:optimatech_lms/features/wishlist/presentation/views/wishlist_view.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  static const String routeName = '/home';

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> with TickerProviderStateMixin {
  final TextEditingController _searchController = TextEditingController();

  int currentScreen = 0;
  late List<AnimationController> iconControllers;

  @override
  void initState() {
    super.initState();
    iconControllers = List.generate(
      4,
      (index) => AnimationController(
        vsync: this,
        duration: const Duration(milliseconds: 300),
      ),
    );
    iconControllers[currentScreen].forward();
  }

  @override
  void dispose() {
    // controller.dispose();
    for (var c in iconControllers) {
      c.dispose();
    }
    super.dispose();
  }

  // Function to handle tab selection in the bottom navigation bar
  void onTabTapped(int index) {
    if (index == currentScreen) return;
    setState(() => currentScreen = index);
    if (index >= 0 && index < iconControllers.length) {
      iconControllers[index].forward();
    }
    for (var i = 0; i < iconControllers.length; i++) {
      if (i != index) iconControllers[i].reverse();
    }
  }

  @override
  Widget build(BuildContext context) {
    // Build body depending on the current selected tab.
    Widget bodyWidget;
    if (currentScreen == 0) {
      bodyWidget = SafeArea(
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
                      title: 'UI/UX Design Principles',
                      image: 'assets/images/course_thumbnail.png',
                      progress: 0.65,
                      lessonsCompleted: 12,
                      totalLessons: 20,
                      timeLeft: '4h 30m left',
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
                    // ------------- Recommended Courses Section -------------
                    const RecommendedCoursesSection(),
                    Gap(24.h),
                  ],
                ),
              ),
            ),
          ],
        ),
      );
    } else if (currentScreen == 1) {
      bodyWidget = const CoursesView();
    } else if (currentScreen == 2) {
      bodyWidget = const WishlistView();
    } else if (currentScreen == 3) {
      bodyWidget = const ProfileView();
    } else {
      bodyWidget = const SizedBox.shrink();
    }

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: bodyWidget,
      bottomNavigationBar: GlassBottomNavBar(
        currentIndex: currentScreen,
        onTap: onTabTapped,
        items: [
          BottomNavItemData(
            label: 'Home',
            icon: const Icon(CupertinoIcons.home),
            filledIcon: const Icon(CupertinoIcons.house_fill),
          ),
          BottomNavItemData(
            label: 'Courses',
            icon: const Icon(CupertinoIcons.book_fill),
            filledIcon: const Icon(CupertinoIcons.book_fill),
          ),
          BottomNavItemData(
            label: 'wishlist',
            icon: const Icon(CupertinoIcons.heart),
            filledIcon: const Icon(CupertinoIcons.heart_fill),
          ),
          BottomNavItemData(
            label: 'Profile',
            icon: const Icon(CupertinoIcons.person_alt_circle),
            filledIcon: const Icon(Icons.person),
          ),
        ],
      ),
    );
  }
}
