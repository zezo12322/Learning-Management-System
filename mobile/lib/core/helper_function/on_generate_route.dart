import 'package:flutter/material.dart';
import 'package:optimatech_lms/core/widgets/not_found_view.dart';
import 'package:optimatech_lms/features/auth/presentation/views/log_in_view.dart';
import 'package:optimatech_lms/features/auth/presentation/views/sign_up_view.dart';
import 'package:optimatech_lms/features/home/presentation/views/home_view.dart';
import 'package:optimatech_lms/features/splash/presentation/views/splash_view.dart';

Route<dynamic> generateRoute(RouteSettings settings){
  switch(settings.name){
    case SplashView.routeName:
      return MaterialPageRoute(builder: (_) => const SplashView());
    case LogInView.routeName:
      return MaterialPageRoute(builder: (_) => const LogInView());
    case SignUpView.routeName:
      return MaterialPageRoute(builder: (_) => const SignUpView());
    case HomeView.routeName:
      return MaterialPageRoute(builder: (_) => const HomeView());
    default:
      debugPrint('⚠️ Unknown route: ${settings.name}');
      return MaterialPageRoute(builder: (_) => const NotFoundView());
  }
}
