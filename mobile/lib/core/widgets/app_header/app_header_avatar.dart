import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';

class AppHeaderAvatar extends StatelessWidget {
  const AppHeaderAvatar({required this.profilePicture, super.key});

  final String? profilePicture;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 52.w,
      height: 52.w,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          CircleAvatar(
            radius: 26.r,
            backgroundColor: AppColors.disableBackground,
            backgroundImage: (profilePicture != null && profilePicture!.isNotEmpty)
                ? NetworkImage(profilePicture!) as ImageProvider
                : const AssetImage('assets/images/placeholder.png'),
          ),
          Positioned(
            right: 2.w,
            bottom: 2.h,
            child: Container(
              width: 12.w,
              height: 12.w,
              decoration: BoxDecoration(
                color: AppColors.success,
                shape: BoxShape.circle,
                border: Border.all(
                  color: AppColors.surface,
                  width: 2,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
