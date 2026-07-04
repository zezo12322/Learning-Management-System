import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:skeletonizer/skeletonizer.dart';

class CustomCachedNetworkImage extends StatelessWidget {
  const CustomCachedNetworkImage({super.key, required this.imagePath});

  final String imagePath;
  @override
  Widget build(BuildContext context) {
    return CachedNetworkImage(
      imageUrl: imagePath ?? '',
      fit: BoxFit.cover,
      placeholder: (_,__) =>
          Skeletonizer(child: Image.asset('assets/images/placeholder.png',fit: BoxFit.cover),),
      errorWidget: (_,__,___) =>
          Image.asset('assets/images/placeholder.png', fit: BoxFit.fill),
    );
  }
}