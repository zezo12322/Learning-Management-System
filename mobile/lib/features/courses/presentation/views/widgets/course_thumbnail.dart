import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:skeletonizer/skeletonizer.dart';

class CourseThumbnail extends StatelessWidget {
  const CourseThumbnail({super.key, required this.imagePath});

  final String? imagePath;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20.r),
        child: SizedBox(
          width: 110.w,
          height: double.infinity,
          child: CachedNetworkImage(
            imageUrl: imagePath ?? '',
            fit: BoxFit.cover,
            placeholder: (_,__) =>
                Skeletonizer(child: Image.asset('assets/images/placeholder.png',fit: BoxFit.cover),),
            errorWidget: (_,__,___) =>
                Image.asset('assets/images/placeholder.png', fit: BoxFit.fill),
          ),
        ),
      ),
    );
  }
}
