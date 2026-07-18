import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

abstract class ThemeLocalDataSource {
  Future<void> saveThemeMode(ThemeMode themeMode);
  Future<ThemeMode> getThemeMode();
}

class ThemeLocalDataSourceImpl implements ThemeLocalDataSource {
  ThemeLocalDataSourceImpl(this.sharedPreferences);

  final SharedPreferences sharedPreferences;

  static const _themeKey = 'theme_mode';

  @override
  Future<void> saveThemeMode(ThemeMode themeMode) async {
    await sharedPreferences.setString(_themeKey, themeMode.name);
  }

  @override
  Future<ThemeMode> getThemeMode() async {
    final currentTheme = sharedPreferences.getString(_themeKey);

    switch (currentTheme) {
      case 'light':
        return ThemeMode.light;
      case 'dark':
        return ThemeMode.dark;
      case 'system':
      default:
        return ThemeMode.system;
    }
  }
}