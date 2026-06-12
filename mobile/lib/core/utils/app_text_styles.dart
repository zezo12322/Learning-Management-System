import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

abstract final class FontWeights {
  static const regular = FontWeight.w400;
  static const medium = FontWeight.w500;
  static const semiBold = FontWeight.w600;
  static const bold = FontWeight.w700;
}

abstract final class TextStyles {
  // Display
  static final TextStyle displayLarge = TextStyle(
    fontSize: 40.sp,
    fontWeight: FontWeights.bold,
    height: 1.3,
  );

  // Titles
  static final TextStyle titleLarge = TextStyle(
    fontSize: 32.sp,
    fontWeight: FontWeights.bold,
    height: 1.4,
  );

  static final TextStyle titleMedium = TextStyle(
    fontSize: 24.sp,
    fontWeight: FontWeights.bold,
    height: 1.4,
  );

  static final TextStyle titleSmall = TextStyle(
    fontSize: 20.sp,
    fontWeight: FontWeights.semiBold,
    height: 1.4,
  );

  // Body
  static final TextStyle bodyLarge = TextStyle(
    fontSize: 16.sp,
    fontWeight: FontWeights.regular,
    height: 1.5,
  );

  static final TextStyle bodyMedium = TextStyle(
    fontSize: 14.sp,
    fontWeight: FontWeights.regular,
    height: 1.5,
  );

  static final TextStyle bodySmall = TextStyle(
    fontSize: 12.sp,
    fontWeight: FontWeights.regular,
    height: 1.4,
  );

  // Labels
  static final TextStyle labelLarge = TextStyle(
    fontSize: 14.sp,
    fontWeight: FontWeights.semiBold,
    height: 1.4,
  );

  static final TextStyle labelMedium = TextStyle(
    fontSize: 12.sp,
    fontWeight: FontWeights.semiBold,
    height: 1.4,
  );

  static final TextStyle labelSmall = TextStyle(
    fontSize: 11.sp,
    fontWeight: FontWeights.medium,
    height: 1.4,
  );
}
