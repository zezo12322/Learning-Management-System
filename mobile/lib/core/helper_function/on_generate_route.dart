import 'package:flutter/material.dart';
import 'package:optimatech_lms/core/widgets/not_found_view.dart';
import 'package:optimatech_lms/features/auth/presentation/views/log_in_view.dart';
import 'package:optimatech_lms/features/auth/presentation/views/sign_up_view.dart';
import 'package:optimatech_lms/features/auth/presentation/views/forgot_password_view.dart';
import 'package:optimatech_lms/features/quiz/presentation/views/quiz_view.dart';
import 'package:optimatech_lms/features/notifications/presentation/views/notifications_view.dart';
import 'package:optimatech_lms/features/ai_tutor/presentation/views/ai_tutor_view.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/course_learning_view.dart';
import 'package:optimatech_lms/features/course_details/presentation/views/course_details_view.dart';
import 'package:optimatech_lms/features/courses/presentation/views/courses_view.dart';
import 'package:optimatech_lms/features/home/presentation/views/home_view.dart';
import 'package:optimatech_lms/features/profile/presentation/views/profile_view.dart';
import 'package:optimatech_lms/features/splash/presentation/views/splash_view.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';

import '../../features/courses/presentation/views/search_view.dart';

Route<dynamic> generateRoute(RouteSettings settings) {
  switch (settings.name) {
    case SplashView.routeName:
      return MaterialPageRoute(builder: (_) => const SplashView());
    case LogInView.routeName:
      return MaterialPageRoute(builder: (_) => const LogInView());
    case SignUpView.routeName:
      return MaterialPageRoute(builder: (_) => const SignUpView());
    case ForgotPasswordView.routeName:
      return MaterialPageRoute(builder: (_) => const ForgotPasswordView());
    case QuizView.routeName:
      final args = settings.arguments;
      if (args is! QuizViewArgs) return _badArgsRoute(settings);
      return MaterialPageRoute(builder: (_) => QuizView(args: args));
    case NotificationsView.routeName:
      return MaterialPageRoute(builder: (_) => const NotificationsView());
    case AiTutorView.routeName:
      return MaterialPageRoute(builder: (_) => const AiTutorView());
    case HomeView.routeName:
      return MaterialPageRoute(builder: (_) => const HomeView());
    case CoursesView.routeName:
      return MaterialPageRoute(builder: (_) => const CoursesView());
    case SearchView.routeName:
      return MaterialPageRoute(builder: (_) => const SearchView());
    case CourseLearningView.routeName:
      final args = settings.arguments;
      if (args is CourseLearningArgs) {
        return MaterialPageRoute(
          builder: (_) => CourseLearningView(
            courseId: args.courseId,
            initialLectureId: args.lectureId,
          ),
        );
      }
      if (args is! String) return _badArgsRoute(settings);
      return MaterialPageRoute(builder: (_) => CourseLearningView(courseId: args));
    case CourseDetailsView.routeName:
      final course = settings.arguments;
      if (course is! CourseEntity) return _badArgsRoute(settings);
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

/// Falls back to NotFoundView when a route is pushed with a missing or
/// wrong-typed argument, instead of throwing an uncaught cast error that
/// crashes the app.
Route<dynamic> _badArgsRoute(RouteSettings settings) {
  debugPrint(
    '⚠️ Route "${settings.name}" got invalid arguments: ${settings.arguments.runtimeType}',
  );
  return MaterialPageRoute(builder: (_) => const NotFoundView());
}
