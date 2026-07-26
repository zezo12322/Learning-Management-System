import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

/// AI Tutor screen — currently a UI shell ("coming soon").
///
/// The backend AI service (optimatech_ai_service) RAG layer is still a scaffold
/// (no working chat endpoint) and there is no NestJS proxy yet, so this screen
/// intentionally shows an unavailable state. When the backend is ready, add a
/// data source + cubit and flip this behind a config flag — see
/// mobile/MISSING_SCREENS_SPEC.md section 3 for the target request/response
/// contract (answer + timestamped citations).
class AiTutorView extends StatelessWidget {
  const AiTutorView({super.key, this.courseId, this.videoId});

  final String? courseId;
  final String? videoId;

  static const String routeName = '/ai-tutor';

  @override
  Widget build(BuildContext context) {
    final scheme = context.theme.colorScheme;
    return Scaffold(
      appBar: AppBar(title: Text('ai_tutor.title'.tr())),
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: EdgeInsets.all(28.w),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 96.r,
                  height: 96.r,
                  decoration: BoxDecoration(
                    color: scheme.primary.withOpacity(0.1),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(Icons.auto_awesome_outlined, size: 46.r, color: scheme.primary),
                ),
                Gap(24.h),
                Text(
                  'ai_tutor.coming_soon'.tr(),
                  textAlign: TextAlign.center,
                  style: context.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
                ),
                Gap(12.h),
                Text(
                  'ai_tutor.coming_soon_body'.tr(),
                  textAlign: TextAlign.center,
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: scheme.onSurfaceVariant,
                  ),
                ),
                Gap(20.h),
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 14.w, vertical: 8.h),
                  decoration: BoxDecoration(
                    color: scheme.surfaceContainerHighest,
                    borderRadius: BorderRadius.circular(999.r),
                  ),
                  child: Text(
                    'ai_tutor.disclaimer'.tr(),
                    style: context.textTheme.labelSmall?.copyWith(
                      color: scheme.onSurfaceVariant,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
