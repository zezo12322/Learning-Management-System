import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/secondary_button.dart';
import 'package:optimatech_lms/features/profile/presentation/manager/theme/theme_cubit.dart';

void buildChangeThemeDialog(BuildContext context) {
  showDialog(
    context: context,
    builder: (dialogContext) {
      return BlocBuilder<ThemeCubit, ThemeMode>(
        builder: (context, themeMode) {
          return Dialog(
            insetPadding: EdgeInsets.symmetric(horizontal: 24.w),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16.r),
            ),
            child: Padding(
              padding: EdgeInsets.all(20.r),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'profile.settings.select_theme'.tr(),
                    textAlign: TextAlign.center,
                    style: context.textTheme.titleSmall,
                  ),
                  Gap(10.h),

                  RadioMenuButton<ThemeMode>(
                    value: ThemeMode.system,
                    groupValue: themeMode,
                    onChanged: (value) {
                      if (value != null) {
                        context.read<ThemeCubit>().setTheme(value);
                      }
                    },
                    child: const Text('System'),
                  ),

                  RadioMenuButton<ThemeMode>(
                    value: ThemeMode.light,
                    groupValue: themeMode,
                    onChanged: (value) {
                      if (value != null) {
                        context.read<ThemeCubit>().setTheme(value);
                      }
                    },
                    child: const Text('Light Theme'),
                  ),

                  RadioMenuButton<ThemeMode>(
                    value: ThemeMode.dark,
                    groupValue: themeMode,
                    onChanged: (value) {
                      if (value != null) {
                        context.read<ThemeCubit>().setTheme(value);
                        //Navigator.pop(dialogContext);
                      }
                    },
                    child: const Text('Dark Theme'),
                  ),

                  Gap(10.h),

                  Align(
                    alignment: AlignmentDirectional.bottomEnd,
                    child: SizedBox(
                      width: MediaQuery.of(context).size.width * 0.25,
                      child: SecondaryButton(
                        text: 'common.dialog.cancel'.tr(),
                        onPressed: () {
                          Navigator.pop(dialogContext);
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      );
    },
  );
}