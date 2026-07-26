import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/features/courses/presentation/views/courses_view.dart';
import 'package:optimatech_lms/features/home/presentation/manager/home_courses_cubit/home_courses_cubit.dart';
import 'package:optimatech_lms/features/home/presentation/views/home_body.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/glass_bottom_navbar.dart';
import 'package:optimatech_lms/features/profile/presentation/views/profile_view.dart';
import 'package:optimatech_lms/features/wishlist/presentation/views/wishlist_view.dart';
import 'package:optimatech_lms/features/chatbot/presentation/widgets/global_chatbot_fab.dart';

// ============================================================================
// HomeView — Root widget for the Home screen.
// Provides HomeCoursesCubit via BlocProvider using getIt, and triggers a concurrent
// data fetch immediately via the cascade operator.
// ============================================================================

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  static const String routeName = '/home';

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> with TickerProviderStateMixin {
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
    for (var c in iconControllers) {
      c.dispose();
    }
    super.dispose();
  }

  // Handles bottom navigation tab selection and icon animations
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
    // Depend on the locale so a live language switch rebuilds this widget
    // (and re-translates the bottom-nav labels below, which use context-less
    // `.tr()` and wouldn't otherwise refresh until navigation).
    context.locale;

    // Build the body widget depending on the currently selected tab
    Widget bodyWidget;
    if (currentScreen == 0) {
      bodyWidget = BlocProvider<HomeCoursesCubit>(
        create: (context) => getIt<HomeCoursesCubit>()..fetchHomeCourses(),
        child: HomeBody(
          onProfileTap: () => onTabTapped(3),
        ),
      );
    } else if (currentScreen == 1) {
      bodyWidget = const CoursesView();
    } else if (currentScreen == 2) {
      bodyWidget = const WishlistView();
    } else if (currentScreen == 3) {
      // Non-const so the Profile tab re-translates on a live language switch.
      bodyWidget = ProfileView();
    } else {
      bodyWidget = const SizedBox.shrink();
    }

    return Scaffold(
      extendBody: true,
      body: bodyWidget,
      floatingActionButton: const GlobalChatbotFab(courseId: 'UNKNOWN', videoId: 'UNKNOWN'),
      bottomNavigationBar: GlassBottomNavBar(
        currentIndex: currentScreen,
        onTap: onTabTapped,
        items: [
          BottomNavItemData(
            label: 'nav_bar.home'.tr(),
            icon: const Icon(CupertinoIcons.home),
            filledIcon: const Icon(CupertinoIcons.house_fill),
          ),
          BottomNavItemData(
            label: 'nav_bar.courses'.tr(),
            icon: const Icon(CupertinoIcons.book_fill),
            filledIcon: const Icon(CupertinoIcons.book_fill),
          ),
          BottomNavItemData(
            label: 'nav_bar.wishlist'.tr(),
            icon: const Icon(CupertinoIcons.heart),
            filledIcon: const Icon(CupertinoIcons.heart_fill),
          ),
          BottomNavItemData(
            label: 'nav_bar.profile'.tr(),
            icon: const Icon(CupertinoIcons.person_alt_circle),
            filledIcon: const Icon(Icons.person),
          ),
        ],
      ),
    );
  }
}
