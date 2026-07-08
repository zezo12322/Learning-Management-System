import 'package:chewie/chewie.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:video_player/video_player.dart';

class LessonVideoPlayerSection extends StatefulWidget {
  const LessonVideoPlayerSection({
    super.key, required this.url,
  });

  final String url;

  @override
  State<LessonVideoPlayerSection> createState() => _LessonVideoPlayerSectionState();
}

class _LessonVideoPlayerSectionState extends State<LessonVideoPlayerSection> {
  late VideoPlayerController _videoPlayerController;
  ChewieController? _chewieController;
  bool _hasError = false;

  @override
  void initState() {
    _initializePlayer();
    super.initState();
  }

  Future<void> _initializePlayer() async {
    try {
      _videoPlayerController = VideoPlayerController.networkUrl(
        Uri.parse(widget.url),
      );

      await _videoPlayerController.initialize();

      if (mounted) {
        _chewieController = ChewieController(
          videoPlayerController: _videoPlayerController,
          aspectRatio: 16 / 9,
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
              child: CircularProgressIndicator(color: context.theme.colorScheme.primary),
            ),
          ),
          errorBuilder: (context, errorMessage) {
            return Center(
              child: Text(
                'lesson_learning.video.error_lesson'.tr(),
                style: context.textTheme.bodyMedium?.copyWith(color: Colors.white),
              )
            );
          },
        );
        setState(() {});
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _hasError = true;
          // print('error ========================================================>> $e');
        });
      }
    }
  }

  @override
  void dispose() {
    _videoPlayerController.dispose();
    _chewieController?.dispose();
    super.dispose();
  }
  @override
  Widget build(BuildContext context) {
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
                onPressed: () {
                  _hasError = false;
                  _videoPlayerController.dispose();
                  _chewieController?.dispose();
                  _initializePlayer();
                  setState(() {});
                },
              ),
            ],
          ),
        ),
      );
    }

    return AspectRatio(
      aspectRatio: 16 / 9,
      child: _chewieController != null && _chewieController!.videoPlayerController.value.isInitialized
        ? Chewie(controller: _chewieController!)
        : Container(
            color: Colors.black,
            child: const Center(
                child: CircularProgressIndicator(color: Color(0xFF6366F1))),
          ),
    );
  }
}