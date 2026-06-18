import 'package:flutter/material.dart';
import 'package:optimatech_lms/features/splash/presentation/views/widgets/splash_content_section.dart';
import 'package:optimatech_lms/features/splash/presentation/views/widgets/splash_header_section.dart';
import 'package:optimatech_lms/features/splash/presentation/views/widgets/splash_trailing_section.dart';

class SplashView extends StatelessWidget {
  const SplashView({super.key});

  static const String routeName = '/';
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          SizedBox(height: 40,),
          SplashHeaderSection(),
          SplashContentSection(),
          SplashTrailingSection(),
          SizedBox(height: 40,),
        ],
      ),
    );
  }
}
