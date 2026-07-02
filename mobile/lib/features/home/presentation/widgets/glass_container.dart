import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

import '../../../../core/utils/app_colors.dart';

Widget glassContainer({required Widget child}) {
  return Stack(
    clipBehavior: Clip.none,
    alignment: Alignment.bottomLeft,
    children: [
      Positioned.fill(
        child: IgnorePointer(
          child: Opacity(
            opacity: 0.9,
            child: Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                color: AppColors.whiteColor.withValues(alpha: 0.1),
                child: Lottie.asset(
                  'assets/lottie/burger.json',
                  fit: BoxFit.cover,
                  repeat: true,
                ),
              ),
            ),
          ),
        ),
      ),

      // --- Frosted Glass Layer ---
      Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              AppColors.primary.withValues(alpha: 0.8),
              AppColors.primary.withValues(alpha: 0.9),
              AppColors.primary.withValues(alpha: 0.1),
            ],
          ),
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 20),
          child: Container(
            decoration: BoxDecoration(
              color: AppColors.whiteColor.withValues(alpha: 0.1),
              boxShadow: [
                BoxShadow(
                  color: AppColors.blackColor.withValues(alpha: 0.4),
                  blurRadius: 80,
                  offset: const Offset(0, 40),
                ),
              ],
            ),
            padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 3),
            child: child,
          ),
        ),
      ),
    ],
  );
}
