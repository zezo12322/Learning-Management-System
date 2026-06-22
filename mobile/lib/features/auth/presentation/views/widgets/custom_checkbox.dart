import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class CustomCheckbox extends StatelessWidget {
  const CustomCheckbox({
    super.key,
    required this.value, required this.onChanged,
  });

  final bool value;
  final ValueChanged<bool> onChanged;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => onChanged(!value),
      behavior: HitTestBehavior.opaque,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        width: 20.r,
        height: 20.r,
        decoration: BoxDecoration(
          color: value ? context.theme.colorScheme.primary : Colors.transparent,
          border:  Border.all(
            color: value
                ? context.theme.colorScheme.primary
                : context.theme.colorScheme.outline,
            width: 1.5,
          ),
          borderRadius: BorderRadius.circular(4.r),
        ),
        child: value
            ? Icon(
          Icons.check_rounded,
          color: Colors.white,
          size: 16.r,
        )
            : null,
      ),
    );
  }
}
