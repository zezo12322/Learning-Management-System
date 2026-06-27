import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/features/auth/presentation/manager/login_cubit/log_in_cubit.dart';
import 'package:optimatech_lms/features/auth/presentation/views/widgets/log_in_form.dart';
import 'package:optimatech_lms/features/auth/presentation/views/widgets/log_in_header.dart';

class LogInView extends StatelessWidget {
  const LogInView({super.key});

  static const String routeName = '/login';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        bottom: false,
        child: SingleChildScrollView(
          child: Column(
            children: [
              const LogInHeader(),
              BlocProvider(
                create: (context) => getIt<LogInCubit>(),
                child: const LogInForm(),
              ),
              const Gap(kToolbarHeight * 0.5),
            ],
          ),
        ),
      ),
    );
  }
}