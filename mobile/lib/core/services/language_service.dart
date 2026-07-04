import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';

enum AppLanguage{ en, ar }

class LanguageService {
  static Future<void> changeLanguage(BuildContext context, AppLanguage languageCode,) async {
    await context.setLocale(Locale(languageCode.name));
  }

  static bool isArabic(BuildContext context) {
    return context.locale.languageCode == AppLanguage.ar.name;
  }
}