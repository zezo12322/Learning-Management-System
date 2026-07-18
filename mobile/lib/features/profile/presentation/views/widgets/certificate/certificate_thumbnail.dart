import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/custom_cashed_network_image.dart';

class CertificateThumbnail extends StatelessWidget {
  const CertificateThumbnail({
    super.key,
    required this.imagePath,
  });

  final String imagePath;
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 110.w,
      height: 90.w,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20.r),
        child: SizedBox(
          width: 110.w,
          height: double.infinity,
          child: CustomCachedNetworkImage(imagePath: imagePath,),
        ),
      ),
    );
  }
}
