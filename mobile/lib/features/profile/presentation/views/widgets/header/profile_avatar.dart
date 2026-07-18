import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/custom_cashed_network_image.dart';
import 'package:firebase_auth/firebase_auth.dart';

class ProfileAvatar extends StatelessWidget {
  const ProfileAvatar({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final photoURL = FirebaseAuth.instance.currentUser?.photoURL;

    return Stack(
      clipBehavior: Clip.none,
      children: [
        Container(
          width: 92.w,
          height: 92.w,
          padding: EdgeInsets.all(2.w),
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(
              color: context.theme.colorScheme.primary.withAlpha(50),
              width: 2,
            ),
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(999.r),
            child: CustomCachedNetworkImage(
              imagePath: photoURL,
            ),
          ),
        ),
        Positioned(
          right: 8.w,
          bottom: 8.h,
          child: Container(
            width: 14.w,
            height: 14.w,
            decoration: BoxDecoration(
              color: AppColors.success, // todo theme extension
              shape: BoxShape.circle,
              border: Border.all(
                color: context.theme.colorScheme.surface,
                width: 2,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
