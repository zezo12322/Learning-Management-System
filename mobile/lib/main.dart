import 'package:easy_localization/easy_localization.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:optimatech_lms/core/utils/constants.dart';
import 'package:optimatech_lms/core/config/firebase_options.dart';
import 'package:optimatech_lms/core/helper_function/on_generate_route.dart';
import 'package:optimatech_lms/core/services/bloc_observer_service.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/core/utils/app_theme.dart';
import 'package:optimatech_lms/features/splash/presentation/views/splash_view.dart';
import 'features/profile/presentation/manager/theme/theme_cubit.dart';

Future<void> main() async {
  WidgetsFlutterBinding
      .ensureInitialized(); // Ensure Flutter bindings are initialized (required for async operations in main)

  // Initialize Firebase
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  // Firebase Emulators removed - connecting to production data

  Bloc.observer = BlocObserverService();
  // Initialize Hive (Offline Storage)
  await Hive.initFlutter();

  // Localization
  await EasyLocalization.ensureInitialized();

  await setupDependencies();

  runApp(
    EasyLocalization(
      supportedLocales: const [
        Locale('en'),
        Locale('ar'),
      ],
      path: AppConstants.translationsPath,
      fallbackLocale: const Locale('en'),
      child: BlocProvider(
        create: (context) => getIt<ThemeCubit>()..loadTheme(),
        child: const OptimaTechLMS(),
      ),
    ),
  );
}

class OptimaTechLMS extends StatelessWidget {
  const OptimaTechLMS({super.key});

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(393, 852),
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (context, child) {
        return BlocBuilder<ThemeCubit, ThemeMode>(
          builder: (context, themeMode) {
            return MaterialApp(
              debugShowCheckedModeBanner: false,
              // Localization
              locale: context.locale,
              supportedLocales: context.supportedLocales,
              localizationsDelegates: context.localizationDelegates,
              // Theme
              themeMode: themeMode,
              // Locale-aware: the bundled Poppins family has no Arabic glyphs,
              // so Arabic gets the platform's own Arabic face instead of
              // per-glyph substitution. `context.locale` above already rebuilds
              // this on a language switch.
              theme: AppTheme.light(context.locale),
              darkTheme: AppTheme.dark(context.locale),
              // Routing
              onGenerateRoute: generateRoute,
              initialRoute: SplashView.routeName,
            );
          },
        );
      },
    );
  }
}
