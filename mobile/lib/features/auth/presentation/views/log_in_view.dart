import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/features/auth/presentation/manager/login%20cubit/log_in_cubit.dart';
import 'package:optimatech_lms/features/auth/presentation/views/widgets/log_in_form.dart';
import 'package:optimatech_lms/features/auth/presentation/views/widgets/log_in_header.dart';

class LogInView extends StatelessWidget {
  const LogInView({super.key});

  static const String routeName = '/login';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SingleChildScrollView(
          child: Column(
            children: [
              const LogInHeader(),
              BlocProvider(
                create: (context) => getIt<LogInCubit>(),
                child: const LogInForm(),
              ),
              Gap(30.h),
            ],
          ),
        )
    );
  }
}