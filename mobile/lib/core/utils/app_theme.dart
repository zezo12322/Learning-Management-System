import 'package:flutter/material.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';

class AppTheme {
  static final ThemeData light = ThemeData(
    useMaterial3: true,
    fontFamily: 'Poppins',

    colorScheme: const ColorScheme(
      brightness: Brightness.light,
      primary: AppColors.primary,
      onPrimary: Colors.white,
      secondary: AppColors.secondary,
      onSecondary: Colors.white,
      error: AppColors.error,
      onError: Colors.white,
      surface: AppColors.surface,
      onSurface: AppColors.textPrimary,
      surfaceDim: AppColors.disableBackground,
      onSurfaceVariant: AppColors.textSecondary,
      outline: AppColors.border,
    ),

    scaffoldBackgroundColor: AppColors.background,

    appBarTheme: const AppBarTheme(
      centerTitle: true,
      elevation: 0,
      backgroundColor: AppColors.surface,
      foregroundColor: AppColors.textPrimary,
      surfaceTintColor: Colors.transparent,
    ),

    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        minimumSize: const Size(double.infinity, 50),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        elevation: 0,
      ),
    ),

    cardTheme: CardThemeData(
      color: AppColors.surface,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
        side: const BorderSide(
          color: AppColors.border,
        ),
      ),
    ),

    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: AppColors.primary,
        side: const BorderSide(
          color: AppColors.border,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
        minimumSize: const Size(double.infinity, 50),
      ),
    ),

    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: AppColors.surface,
      contentPadding: const EdgeInsets.symmetric(
        horizontal: 16,
        vertical: 16,
      ),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(
          color: AppColors.border,
        ),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(
          color: AppColors.border,
        ),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(
          color: AppColors.primary,
          width: 1.5,
        ),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(
          color: AppColors.error,
        ),
      ),
      disabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(
          color: AppColors.border,
        ),
      ),
    ),

    dividerColor: AppColors.border,

    textTheme: TextTheme(
      displayLarge: TextStyles.displayLarge.copyWith(
        color: AppColors.textPrimary,
      ),

      titleLarge: TextStyles.titleLarge.copyWith(
        color: AppColors.textPrimary,
      ),
      titleMedium: TextStyles.titleMedium.copyWith(
        color: AppColors.textPrimary,
      ),
      titleSmall: TextStyles.titleSmall.copyWith(
        color: AppColors.textPrimary,
      ),

      bodyLarge: TextStyles.bodyLarge.copyWith(
        color: AppColors.textPrimary,
      ),
      bodyMedium: TextStyles.bodyMedium.copyWith(
        color: AppColors.textPrimary,
      ),
      bodySmall: TextStyles.bodySmall.copyWith(
        color: AppColors.textSecondary,
      ),

      labelLarge: TextStyles.labelLarge.copyWith(
        color: AppColors.textPrimary,
      ),
      labelMedium: TextStyles.labelMedium.copyWith(
        color: AppColors.textPrimary,
      ),
      labelSmall: TextStyles.labelSmall.copyWith(
        color: AppColors.textSecondary,
      ),
    ),
  );

  static final ThemeData dark = ThemeData(
    useMaterial3: true,
    fontFamily: 'Poppins',

    colorScheme: const ColorScheme(
      brightness: Brightness.dark,
      primary: AppColors.darkPrimary,
      onPrimary: Colors.white,
      secondary: AppColors.darkSecondary,
      onSecondary: Colors.white,
      error: AppColors.darkError,
      onError: Colors.white,
      surface: AppColors.darkSurface,
      onSurface: AppColors.darkTextPrimary,
      surfaceDim: AppColors.darkDisableBackground,
      onSurfaceVariant: AppColors.darkTextSecondary,
      outline: AppColors.darkBorder,
    ),

    scaffoldBackgroundColor: AppColors.darkBackground,

    appBarTheme: const AppBarTheme(
      centerTitle: true,
      elevation: 0,
      backgroundColor: AppColors.darkSurface,
      foregroundColor: AppColors.darkTextPrimary,
      surfaceTintColor: Colors.transparent,
    ),

    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.darkPrimary,
        foregroundColor: Colors.white,
        minimumSize: const Size(double.infinity, 50),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        elevation: 0,
      ),
    ),

    cardTheme: CardThemeData(
      color: AppColors.darkSurface,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
        side: const BorderSide(
          color: AppColors.darkBorder,
        ),
      ),
    ),

    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: AppColors.darkPrimary,
        side: const BorderSide(
          color: AppColors.darkBorder,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
        minimumSize: const Size(double.infinity, 50),
      ),
    ),

    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: AppColors.darkSurface,

      contentPadding: const EdgeInsets.symmetric(
        horizontal: 16,
        vertical: 16,
      ),

      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(
          color: AppColors.darkBorder,
        ),
      ),

      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(
          color: AppColors.darkBorder,
        ),
      ),

      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(
          color: AppColors.darkPrimary,
          width: 1.5,
        ),
      ),

      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(
          color: AppColors.darkError,
        ),
      ),

      disabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(
          color: AppColors.darkBorder,
        ),
      ),
    ),

    dividerColor: AppColors.darkBorder,
    textTheme: TextTheme(
      displayLarge: TextStyles.displayLarge.copyWith(
        color: AppColors.darkTextPrimary,
      ),

      titleLarge: TextStyles.titleLarge.copyWith(
        color: AppColors.darkTextPrimary,
      ),
      titleMedium: TextStyles.titleMedium.copyWith(
        color: AppColors.darkTextPrimary,
      ),
      titleSmall: TextStyles.titleSmall.copyWith(
        color: AppColors.darkTextPrimary,
      ),

      bodyLarge: TextStyles.bodyLarge.copyWith(
        color: AppColors.darkTextPrimary,
      ),
      bodyMedium: TextStyles.bodyMedium.copyWith(
        color: AppColors.darkTextPrimary,
      ),
      bodySmall: TextStyles.bodySmall.copyWith(
        color: AppColors.darkTextSecondary,
      ),

      labelLarge: TextStyles.labelLarge.copyWith(
        color: AppColors.darkTextPrimary,
      ),
      labelMedium: TextStyles.labelMedium.copyWith(
        color: AppColors.darkTextPrimary,
      ),
      labelSmall: TextStyles.labelSmall.copyWith(
        color: AppColors.darkTextSecondary,
      ),
    ),
  );
}