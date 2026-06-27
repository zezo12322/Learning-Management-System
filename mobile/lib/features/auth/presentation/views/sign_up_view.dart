import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/core/widgets/custom_app_bar.dart';
import 'package:optimatech_lms/features/auth/presentation/manager/signup_cubit/signup_cubit.dart';
import 'package:optimatech_lms/features/auth/presentation/views/widgets/signup_form.dart';
import 'package:optimatech_lms/features/auth/presentation/views/widgets/signup_header.dart';

class SignUpView extends StatelessWidget {
  const SignUpView({super.key});

  static const String routeName = '/signup';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: customAppBar(),
      extendBodyBehindAppBar: true,
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            children: [
              Gap(kToolbarHeight + MediaQuery.of(context).padding.top),
              const SignupHeader(),
              Gap(8.h),
              BlocProvider(
                create: (context) => getIt<SignupCubit>(),
                child: const SignupForm(),
              ),
              const Gap(kToolbarHeight * 0.5),
            ],
          ),
        ),
      ),
    );
  }
}
