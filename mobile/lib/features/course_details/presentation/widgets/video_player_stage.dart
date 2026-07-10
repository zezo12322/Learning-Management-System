import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';

class VideoPlayerStage extends StatefulWidget {
  const VideoPlayerStage({
    super.key,
    required this.lessonTitle,
    required this.onBack,
  });

  final String lessonTitle;
  final VoidCallback onBack;

  @override
  State<VideoPlayerStage> createState() => _VideoPlayerStageState();
}

class _VideoPlayerStageState extends State<VideoPlayerStage> {
  bool _isPlaying = false;
  double _progress = 0.31;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return ColoredBox(
      color: const Color(0xFF0F172A),
      child: SafeArea(
        bottom: false,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: EdgeInsets.fromLTRB(8.w, 4.h, 16.w, 8.h),
              child: Row(
                children: [
                  IconButton(
                    onPressed: widget.onBack,
                    icon: Icon(
                      Icons.arrow_back_ios_new_rounded,
                      color: Colors.white,
                      size: 20.sp,
                    ),
                  ),
                  Expanded(
                    child: Text(
                      widget.lessonTitle,
                      style: TextStyles.labelLarge.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeights.semiBold,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
            ),
            AspectRatio(
              aspectRatio: 16 / 9,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Container(
                    width: double.infinity,
                    decoration: const BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Color(0xFF1E293B),
                          Color(0xFF0F172A),
                        ],
                      ),
                    ),
                    child: Icon(
                      Icons.play_lesson_outlined,
                      size: 48.sp,
                      color: Colors.white.withValues(alpha: 0.15),
                    ),
                  ),
                  if (!_isPlaying)
                    GestureDetector(
                      onTap: () => setState(() => _isPlaying = true),
                      child: Container(
                        width: 56.w,
                        height: 56.w,
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: 0.2),
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: Colors.white.withValues(alpha: 0.4),
                          ),
                        ),
                        child: Icon(
                          Icons.play_arrow_rounded,
                          color: Colors.white,
                          size: 32.sp,
                        ),
                      ),
                    ),
                  Positioned(
                    left: 0,
                    right: 0,
                    bottom: 0,
                    child: Container(
                      padding: EdgeInsets.fromLTRB(12.w, 24.h, 12.w, 10.h),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.bottomCenter,
                          end: Alignment.topCenter,
                          colors: [
                            Colors.black.withValues(alpha: 0.75),
                            Colors.transparent,
                          ],
                        ),
                      ),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Row(
                            children: [
                              _ControlIcon(
                                icon: _isPlaying
                                    ? Icons.pause_rounded
                                    : Icons.play_arrow_rounded,
                                onTap: () =>
                                    setState(() => _isPlaying = !_isPlaying),
                              ),
                              Gap(12.w),
                              _ControlIcon(
                                icon: Icons.replay_10_rounded,
                                onTap: () {},
                              ),
                              Gap(12.w),
                              _ControlIcon(
                                icon: Icons.forward_10_rounded,
                                onTap: () {},
                              ),
                              const Spacer(),
                              Text(
                                '05:32 / 18:45',
                                style: TextStyles.labelSmall.copyWith(
                                  color: Colors.white.withValues(alpha: 0.9),
                                ),
                              ),
                              Gap(8.w),
                              _ControlIcon(
                                icon: Icons.fullscreen_rounded,
                                onTap: () {},
                              ),
                            ],
                          ),
                          Gap(8.h),
                          SliderTheme(
                            data: SliderTheme.of(context).copyWith(
                              trackHeight: 3.h,
                              thumbShape: RoundSliderThumbShape(
                                enabledThumbRadius: 6.r,
                              ),
                              overlayShape: RoundSliderOverlayShape(
                                overlayRadius: 12.r,
                              ),
                              activeTrackColor: colorScheme.primary,
                              inactiveTrackColor:
                                  Colors.white.withValues(alpha: 0.25),
                              thumbColor: colorScheme.primary,
                            ),
                            child: Slider(
                              value: _progress,
                              onChanged: (value) =>
                                  setState(() => _progress = value),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ControlIcon extends StatelessWidget {
  const _ControlIcon({
    required this.icon,
    required this.onTap,
  });

  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Icon(
        icon,
        color: Colors.white,
        size: 22.sp,
      ),
    );
  }
}
