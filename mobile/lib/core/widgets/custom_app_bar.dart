import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

AppBar customAppBar ({String? title}){
  return AppBar(
    title: Text(title ?? ''),
    leadingWidth: 80,
    clipBehavior: Clip.none,
    leading: Padding(
      padding: EdgeInsets.symmetric(horizontal: 16.h),
      child: const CustomBackButton(),
    ),
  );
}

class CustomBackButton extends StatelessWidget {
  const CustomBackButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 48.w,
      height: 48.h,
      decoration: BoxDecoration(
        color: context.theme.colorScheme.surface,
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 5.r,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: IconButton(
        onPressed: () => Navigator.pop(context),
        icon: Icon(Icons.arrow_back, color: context.theme.colorScheme.onSurface,),
      ),
    );
  }
}