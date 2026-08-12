import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/features/chatbot/presentation/manager/chat_cubit/chat_cubit.dart';
import 'package:optimatech_lms/features/chatbot/presentation/widgets/chatbot_bottom_sheet.dart';

/// Entry point to the AI tutor.
///
/// The tutor is **lecture-scoped**: the request goes to
/// `/ai/lectures/:videoId/chat`, and there is no course-level or app-level chat
/// endpoint behind it. Mounting it without a real lecture id produced
/// `/ai/lectures/UNKNOWN/chat` from the home screen and `/ai/lectures/null/chat`
/// from course details — both 404s, which the data source then turned into a
/// fabricated answer.
///
/// So [videoId] is required, and the button hides itself when it is empty
/// rather than opening a chat that cannot answer.
class GlobalChatbotFab extends StatelessWidget {
  final String courseId;
  final String? videoId;
  final int Function()? getPlaybackMs;
  final void Function(int startMs)? onCitationTap;

  const GlobalChatbotFab({
    super.key,
    required this.courseId,
    required this.videoId,
    this.getPlaybackMs,
    this.onCitationTap,
  });

  void _openChatbot(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) {
        return BlocProvider<ChatCubit>(
          create: (_) => getIt<ChatCubit>()..loadChatHistory(courseId: courseId, videoId: videoId),
          child: ChatbotBottomSheet(
            courseId: courseId,
            videoId: videoId,
            getPlaybackMs: getPlaybackMs,
            onCitationTap: onCitationTap,
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    if (videoId == null || videoId!.isEmpty) return const SizedBox.shrink();

    final theme = Theme.of(context);
    return FloatingActionButton(
      onPressed: () => _openChatbot(context),
      backgroundColor: theme.colorScheme.primary,
      child: Icon(Icons.smart_toy, color: theme.colorScheme.onPrimary),
    );
  }
}
