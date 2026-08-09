import 'dart:async';
import 'package:chewie/chewie.dart';
import 'package:easy_localization/easy_localization.dart' as esay;
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
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
  // Latch so "mark complete" fires once per video, not on every value tick
  // after the playhead reaches the end (which spammed PUT /lectures/:id/progress).
  bool _completedSent = false;

  /// Seconds of playback the server may credit, mirroring
  /// MAX_CREDITED_PLAYBACK_RATE in the backend's lecture-progress queue and the
  /// web player. Each tick credits how far the timeline moved, capped at what
  /// real elapsed time allows: 2x still completes a lecture, 8x credits only a
  /// quarter of what it covers, and a scrubber drag credits nothing because no
  /// real time passed. Starts at zero, which needs no resume seeding here
  /// because this player always opens a lecture from the beginning — position
  /// and credit therefore advance together.
  static const double _maxCreditedPlaybackRate = 2;
  double _creditedSeconds = 0;
  Duration _prevPosition = Duration.zero;
  DateTime _prevTick = DateTime.now();

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

    try {
      if (mounted) {
        setState(() {
          _isLoading = true;
          _hasError = false;
          _completedSent = false;
        });
      }

      // The manifest and the AES key are both served by our API behind
      // FirebaseAuthGuard, so the player has to carry the ID token — without it
      // the key request comes back 401 and playback dies on the first segment.
      // Segment URLs are pre-signed GCS links; they ignore this header.
      final idToken = await FirebaseAuth.instance.currentUser?.getIdToken();

      final controller = VideoPlayerController.networkUrl(
        Uri.parse(url),
        httpHeaders: {
          if (idToken != null) 'Authorization': 'Bearer $idToken',
        },
      );
      await controller.initialize();

      if (!mounted) {
        await controller.dispose();
        return;
      }

      // Fire "mark complete" exactly once when the playhead first reaches the
      // end. The listener ticks continuously, so without the _completedSent
      // latch this would call the endpoint on every subsequent tick.
      controller.addListener(() {
        if (!mounted || _completedSent) return;
        final value = controller.value;
        if (value.isInitialized &&
            value.position >= value.duration &&
            value.duration > Duration.zero) {
          _completedSent = true;
          // Reaching the end reports the position and the credited watch time
          // and lets the server decide. It used to post duration * 60 to force
          // completion, which meant dragging to the end finished a lecture
          // nobody had watched.
          context.read<CourseLearningCubit>().reportLectureFinished(
                lastWatchedSecond: value.position.inSeconds,
                watchedSeconds: _creditedSeconds.floor(),
              );
        }
      });

      _prevPosition = controller.value.position;
      _prevTick = DateTime.now();

      // Start the heartbeat timer (e.g. every 10 seconds)
      _heartbeatTimer?.cancel();
      _heartbeatTimer = Timer.periodic(const Duration(seconds: 10), (timer) {
        if (!mounted) return;
        final value = controller.value;
        final now = DateTime.now();
        final timelineDelta =
            (value.position - _prevPosition).inMilliseconds / 1000;
        final realDelta = now.difference(_prevTick).inMilliseconds / 1000;
        _prevPosition = value.position;
        _prevTick = now;

        if (value.isPlaying && timelineDelta > 0) {
          final allowed = realDelta * _maxCreditedPlaybackRate;
          _creditedSeconds += timelineDelta < allowed ? timelineDelta : allowed;
        }

        if (value.isPlaying) {
          context.read<CourseLearningCubit>().syncLectureHeartbeat(
                value.position.inSeconds,
                watchedSeconds: _creditedSeconds.floor(),
              );
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
              'lesson_learning.video.unavailable'.tr(),
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
      debugPrint('Video player initialization error: $e');
      debugPrint('Attempted URL: $url');
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
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(
                Icons.videocam_off_rounded,
                color: Colors.white70,
                size: 40,
              ),
              Gap(8.h),
              Text(
                'lesson_learning.video.unavailable'.tr(),
                textAlign: TextAlign.center,
                style:
                    context.textTheme.bodyMedium?.copyWith(color: Colors.white),
              ),
            ],
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
                    const Icon(
                      Icons.videocam_off_rounded,
                      color: Colors.white70,
                      size: 40,
                    ),
                    Gap(8.h),
                    Text(
                      'lesson_learning.video.unavailable'.tr(),
                      textAlign: TextAlign.center,
                      style: context.textTheme.bodyMedium?.copyWith(color: Colors.white),
                    ),
                    IconButton(
                      icon: const Icon(Icons.refresh, color: Colors.white70),
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