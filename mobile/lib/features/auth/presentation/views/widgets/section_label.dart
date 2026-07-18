import 'package:flutter/material.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class SectionLabel extends StatelessWidget {
  final String label;
  const SectionLabel({super.key, required this.label});

  @override
  Widget build(BuildContext context) {
    return Text(
      label,
      style: context.textTheme.labelMedium,
    );
  }
}
