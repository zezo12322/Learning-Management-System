import 'package:easy_localization/easy_localization.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:optimatech_lms/core/config/firebase_options.dart';
import 'package:optimatech_lms/core/helper_function/on_generate_route.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/core/utils/app_theme.dart';
import 'package:optimatech_lms/core/utils/constants.dart';
import 'package:optimatech_lms/features/auth/presentation/views/log_in_view.dart';
import 'package:optimatech_lms/features/splash/presentation/views/splash_view.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized(); // Ensure Flutter bindings are initialized (required for async operations in main)

  // Initialize Firebase
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

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
      startLocale: const Locale('en'),
      child: const OptimaTechLMS(),
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
      builder: (context, child){
        return MaterialApp(
          debugShowCheckedModeBanner: false,
          // Localization
          locale: context.locale,
          supportedLocales: context.supportedLocales,
          localizationsDelegates: context.localizationDelegates,
          // Theme
          themeMode: ThemeMode.system,
          theme: AppTheme.light,
          darkTheme: AppTheme.dark,
          // Routing
          onGenerateRoute: generateRoute,
          initialRoute: LogInView.routeName,
        );
      },
    );
  }
}