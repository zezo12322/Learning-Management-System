import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/features/chatbot/presentation/manager/chat_cubit/chat_cubit.dart';
import 'package:optimatech_lms/features/chatbot/presentation/widgets/chatbot_bottom_sheet.dart';

class GlobalChatbotFab extends StatelessWidget {
  final String courseId;
  final String videoId;
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
          create: (_) => getIt<ChatCubit>(),
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
    final theme = Theme.of(context);
    return FloatingActionButton(
      onPressed: () => _openChatbot(context),
      backgroundColor: theme.colorScheme.primary,
      child: Icon(Icons.smart_toy, color: theme.colorScheme.onPrimary),
    );
  }
}
