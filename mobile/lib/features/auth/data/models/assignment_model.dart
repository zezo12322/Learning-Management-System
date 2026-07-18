import 'package:flutter/material.dart';

class AssignmentModel {
  const AssignmentModel({
    required this.count,
    required this.status,
    required this.description,
    required this.icon,
    required this.iconColor,
  });

  final int count;
  final String status;
  final String description;
  final IconData icon;
  final Color iconColor;
}
