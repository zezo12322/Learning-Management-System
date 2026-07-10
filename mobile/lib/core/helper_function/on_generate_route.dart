import 'package:flutter/material.dart';
import 'package:optimatech_lms/core/widgets/not_found_view.dart';
import 'package:optimatech_lms/features/auth/presentation/views/log_in_view.dart';
import 'package:optimatech_lms/features/auth/presentation/views/sign_up_view.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/course_learning_view.dart';
import 'package:optimatech_lms/features/course_details/presentation/views/course_details_view.dart';
import 'package:optimatech_lms/features/courses/presentation/views/courses_view.dart';
import 'package:optimatech_lms/features/home/presentation/views/home_view.dart';
import 'package:optimatech_lms/features/profile/presentation/views/profile_view.dart';
import 'package:optimatech_lms/features/splash/presentation/views/splash_view.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';

Route<dynamic> generateRoute(RouteSettings settings) {
  switch (settings.name) {
    case SplashView.routeName:
      return MaterialPageRoute(builder: (_) => const SplashView());
    case LogInView.routeName:
      return MaterialPageRoute(builder: (_) => const LogInView());
    case SignUpView.routeName:
      return MaterialPageRoute(builder: (_) => const SignUpView());
    case HomeView.routeName:
      return MaterialPageRoute(builder: (_) => const HomeView());
    case CoursesView.routeName:
      return MaterialPageRoute(builder: (_) => const CoursesView());
    case CourseLearningView.routeName:
      final courseId = settings.arguments as String;
      return MaterialPageRoute(builder: (_) => CourseLearningView(courseId: courseId,));
    case CourseDetailsView.routeName:
      final course = settings.arguments as CourseEntity;
      return MaterialPageRoute(
        builder: (_) => CourseDetailsView(course: course),
      );
    case ProfileView.routeName:
      return MaterialPageRoute(builder: (_) => const ProfileView());
    default:
      debugPrint('⚠️ Unknown route: ${settings.name}');
      return MaterialPageRoute(builder: (_) => const NotFoundView());
  }
}
