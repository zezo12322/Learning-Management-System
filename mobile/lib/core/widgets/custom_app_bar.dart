import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String? title;
  final Widget? titleWidget;
  final bool showBackButton;
  final bool centerTitle;
  final List<Widget>? actions;
  final Widget? leading;
  final double toolbarHeight;

  const CustomAppBar({
    super.key,
    this.title,
    this.titleWidget,
    this.showBackButton = true,
    this.centerTitle = true,
    this.actions,
    this.leading,
    this.toolbarHeight = kToolbarHeight,
  });

  @override
  Widget build(BuildContext context) {
    return AppBar(
      centerTitle: centerTitle,
      automaticallyImplyLeading: false,
      elevation: 0,
      scrolledUnderElevation: 0,
      surfaceTintColor: Colors.transparent,
      clipBehavior: Clip.none,
      toolbarHeight: toolbarHeight,
      leadingWidth: showBackButton ? 80.w : null,
      title: titleWidget ?? Text(title ?? ''),
      leading: leading ??
          (showBackButton
              ? Padding(
            padding: EdgeInsets.symmetric(horizontal: 16.w),
            child: const CustomBackButton(),
          )
              : null),
      actions: actions,
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(toolbarHeight);
}

class CustomBackButton extends StatelessWidget {
  const CustomBackButton({super.key, this.backgroundColor, this.iconColor});
  final Color? backgroundColor;
  final Color? iconColor;
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 48.w,
      height: 48.h,
      decoration: BoxDecoration(
        color: backgroundColor ?? context.theme.colorScheme.surface,
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 5.r,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: IconButton(
        onPressed: () => Navigator.pop(context),
        icon: Icon(Icons.arrow_back, color: iconColor ?? context.theme.colorScheme.onSurface,),
      ),
    );
  }
}