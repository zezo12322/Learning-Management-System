import 'package:flutter/material.dart';

class BottomDecorStrip extends StatelessWidget {
  const BottomDecorStrip({super.key});

  @override
  Widget build(BuildContext context) {
    return Transform.translate(
      offset: const Offset(0, 12),
      child: Image.asset('assets/images/decor_strip.png',),
    );
  }

}
