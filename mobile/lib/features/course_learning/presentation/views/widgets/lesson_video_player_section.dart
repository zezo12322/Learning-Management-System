import 'package:chewie/chewie.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
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
    final url = widget.url.trim();

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
        });
      }

      final controller = VideoPlayerController.networkUrl(Uri.parse(url));
      await controller.initialize();

      if (!mounted) {
        await controller.dispose();
        return;
      }

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
    } catch (_) {
      if (mounted) {
        setState(() {
          _hasError = true;
          _isLoading = false;
        });
      }
    }
  }

  void _disposeControllers() async {
    final chewie = _chewieController;
    final video = _videoPlayerController;

    _chewieController = null;
    _videoPlayerController = null;

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
      child: Chewie(controller: _chewieController!),
    );
  }
}