import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/features/splash/presentation/views/widgets/splash_content_section.dart';
import 'package:optimatech_lms/features/splash/presentation/views/widgets/splash_header_section.dart';
import 'package:optimatech_lms/features/splash/presentation/views/widgets/splash_trailing_section.dart';

class SplashView extends StatelessWidget {
  const SplashView({super.key});

  static const String routeName = '/';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          Gap(40.h,),
          const SplashHeaderSection(),
          const SplashContentSection(),
          const SplashTrailingSection(),
          Gap(40.h,),
        ],
      ),
    );
  }
}
