import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class CustomCourseLearningAppbar extends StatelessWidget implements PreferredSizeWidget {
  const CustomCourseLearningAppbar({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: Colors.transparent,
      surfaceTintColor: Colors.transparent,
      toolbarHeight: 0,
      systemOverlayStyle: const SystemUiOverlayStyle(
        statusBarBrightness: Brightness.light,
        statusBarIconBrightness: Brightness.light,
      ),
    );
  }

  @override
  Size get preferredSize => Size.zero;
}
