import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/features/profile/data/datasources/theme_local_data_source.dart';
import 'package:optimatech_lms/core/bloc/safe_emit.dart';

class ThemeCubit extends Cubit<ThemeMode> with SafeEmit<ThemeMode> {
  ThemeCubit({required ThemeLocalDataSource themeLocalDataSource})
      : _themeLocalDataSource = themeLocalDataSource,
        super(ThemeMode.system);

  final ThemeLocalDataSource _themeLocalDataSource;

  Future<void> loadTheme() async {
    final themeMode = await _themeLocalDataSource.getThemeMode();
    emit(themeMode);
  }

  Future<void> setTheme(ThemeMode mode) async {
    await _themeLocalDataSource.saveThemeMode(mode);
    emit(mode);
  }

  Future<void> toggleTheme() async {
    final newTheme = state == ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
    await _themeLocalDataSource.saveThemeMode(newTheme);
    emit(newTheme);
  }
}
