import 'package:flutter/material.dart';

class AppTheme {
  // Brand Colors
  static const Color primaryColor = Color(0xFF2563EB);    // Blue
  static const Color secondaryColor = Color(0xFF7C3AED);  // Purple
  static const Color accentColor = Color(0xFF10B981);     // Green
  static const Color errorColor = Color(0xFFEF4444);

  // Arabic Font
  static const String fontFamily = 'Cairo';

  static ThemeData get lightTheme => ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: primaryColor,
          secondary: secondaryColor,
        ),
        fontFamily: fontFamily,
        useMaterial3: true,
        appBarTheme: const AppBarTheme(
          centerTitle: true,
          elevation: 0,
        ),
      );

  static ThemeData get darkTheme => ThemeData.dark().copyWith(
        colorScheme: ColorScheme.dark(
          primary: primaryColor,
          secondary: secondaryColor,
        ),
        textTheme: ThemeData.dark().textTheme.apply(
              fontFamily: fontFamily,
            ),
      );
}
