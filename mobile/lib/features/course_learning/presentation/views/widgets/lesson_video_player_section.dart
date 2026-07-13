import 'dart:async';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:chewie/chewie.dart';
import 'package:easy_localization/easy_localization.dart' as esay;
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/services/language_service.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/custom_app_bar.dart';
import 'package:optimatech_lms/features/course_learning/presentation/manager/course_learning_cubit.dart';
import 'package:video_player/video_player.dart';

class LessonVideoPlayerSection extends StatefulWidget {
  const LessonVideoPlayerSection({
    super.key,
    required this.url,
  });

  final String url;

  @override
  State<LessonVideoPlayerSection> createState() => _LessonVideoPlayerSectionState();
}

class _LessonVideoPlayerSectionState extends State<LessonVideoPlayerSection> {
  VideoPlayerController? _videoPlayerController;
  ChewieController? _chewieController;
  Timer? _heartbeatTimer;

  bool _hasError = false;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _initializePlayer();
  }

  @override
  void didUpdateWidget(covariant LessonVideoPlayerSection oldWidget) {
    super.didUpdateWidget(oldWidget);

    if (oldWidget.url != widget.url) {
      _reinitializePlayer();
    }
  }

  Future<void> _reinitializePlayer() async {
    _disposeControllers();
    if (!mounted) return;
    await _initializePlayer();
  }

  Future<void> _initializePlayer() async {
    final url = widget.url;

    if (url.isEmpty) {
      if (mounted) {
        setState(() {
          _hasError = false;
          _isLoading = false;
        });
      }
      return;
    }

    String finalUrl = '';

    try {
      if (mounted) {
        setState(() {
          _isLoading = true;
          _hasError = false;
        });
      }

      final user = FirebaseAuth.instance.currentUser;
      final token = await user?.getIdToken();

      // Temporary bypass: Use corsproxy to bypass Firebase Storage CORS restrictions during local testing.
      // Additionally, the database seeder inserted 'placeholder' instead of real videos.
      // If we detect a placeholder, we inject a real sample video so the UI can be tested!
      if (url.contains('placeholder')) {
        finalUrl = 'https://flutter.github.io/assets-for-api-docs/assets/videos/butterfly.mp4';
      } else {
        finalUrl = 'https://corsproxy.io/?${Uri.encodeComponent(url)}';
      }
      
      print('DEBUG VIDEO URL: $finalUrl');

      final controller = VideoPlayerController.networkUrl(
        Uri.parse(finalUrl),
      );
      await controller.initialize();

      if (!mounted) {
        await controller.dispose();
        return;
      }

      // Add a listener for video completion
      controller.addListener(() {
        if (!mounted) return;
        final value = controller.value;
        if (value.isInitialized && 
            value.position >= value.duration && 
            value.duration > Duration.zero) {
          context.read<CourseLearningCubit>().markCurrentLectureAsCompleted();
        }
      });

      // Start the heartbeat timer (e.g. every 10 seconds)
      _heartbeatTimer?.cancel();
      _heartbeatTimer = Timer.periodic(const Duration(seconds: 10), (timer) {
        if (!mounted) return;
        if (controller.value.isPlaying) {
          final currentSecond = controller.value.position.inSeconds;
          context.read<CourseLearningCubit>().syncLectureHeartbeat(currentSecond);
        }
      });

      final chewie = ChewieController(
        videoPlayerController: controller,
        aspectRatio: controller.value.aspectRatio == 0
            ? 16 / 9
            : controller.value.aspectRatio,
        autoPlay: true,
        allowedScreenSleep: false,
        materialProgressColors: ChewieProgressColors(
          playedColor: context.theme.colorScheme.primary,
          handleColor: Colors.white,
          bufferedColor: Colors.white24,
          backgroundColor: Colors.white12,
        ),
        placeholder: Container(
          color: Colors.black,
          child: Center(
            child: CircularProgressIndicator(
              color: context.theme.colorScheme.primary,
            ),
          ),
        ),
        errorBuilder: (context, errorMessage) {
          return Center(
            child: Text(
              'lesson_learning.video.error_lesson'.tr(),
              style: context.textTheme.bodyMedium?.copyWith(color: Colors.white),
            ),
          );
        },
      );

      _videoPlayerController = controller;
      _chewieController = chewie;

      if (mounted) {
        setState(() {
          _isLoading = false;
          _hasError = false;
        });
      }
    } catch (e) {
      print('Video player initialization error: $e');
      print('Attempted URL: $finalUrl');
      if (mounted) {
        setState(() {
          _hasError = true;
          _isLoading = false;
        });
      }
    }
  }

  void _disposeControllers() {
    _heartbeatTimer?.cancel();
    final chewie = _chewieController;
    final video = _videoPlayerController;

    _chewieController = null;
    _videoPlayerController = null;

    if (video != null && video.value.isPlaying) {
      video.pause();
    }
    
    chewie?.dispose();
    video?.dispose();
  }

  @override
  void dispose() {
    _disposeControllers();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.url.trim().isEmpty) {
      return AspectRatio(
        aspectRatio: 16 / 9,
        child: Container(
          color: Colors.black,
          alignment: Alignment.center,
          child: Text(
            'lesson_learning.video.error_lesson'.tr(),
            style: context.textTheme.bodyMedium?.copyWith(color: Colors.white),
          ),
        ),
      );
    }

    if (_hasError) {
      return AspectRatio(
        aspectRatio: 16 / 9,
        child: Container(
          color: Colors.black,
          child: Stack(
            children: [
              Positioned.directional(
                textDirection: LanguageService.isArabic(context) ? TextDirection.rtl : TextDirection.ltr,
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 8.h),
                  child: CustomBackButton(
                    backgroundColor: context.theme.colorScheme.surface.withValues(alpha: 0.1),
                    iconColor: Colors.white,
                  ),
                ),
              ),
              Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'lesson_learning.video.error_playing'.tr(),
                      style: context.textTheme.bodyMedium?.copyWith(color: Colors.white),
                    ),
                    IconButton(
                      icon: const Icon(Icons.refresh),
                      onPressed: _reinitializePlayer,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      );
    }

    if (_isLoading || _chewieController == null) {
      return const AspectRatio(
        aspectRatio: 16 / 9,
        child: ColoredBox(
          color: Colors.black,
          child: Center(
            child: CircularProgressIndicator(color: Color(0xFF6366F1)),
          ),
        ),
      );
    }

    return AspectRatio(
      aspectRatio: 16 / 9,
      child: Stack(
        children: [
          Chewie(controller: _chewieController!),
          Positioned.directional(
            textDirection: LanguageService.isArabic(context) ? TextDirection.rtl : TextDirection.ltr,
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 8.h),
              child: CustomBackButton(
                backgroundColor: context.theme.colorScheme.surface.withValues(alpha: 0.1),
              ),
            ),
          ),
        ],
      ),
    );
  }
}