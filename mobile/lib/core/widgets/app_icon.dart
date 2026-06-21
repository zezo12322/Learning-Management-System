import 'package:flutter/material.dart';

Widget appLogo({double? height = 16, double? width = 16, BoxFit? fit}){
  return Image.asset('assets/icons/app_icon.png', height: height, width: width, fit: fit,);
}