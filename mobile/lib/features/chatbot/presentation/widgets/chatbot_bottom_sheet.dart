import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:optimatech_lms/features/chatbot/presentation/widgets/chat_input_field.dart';
import 'package:optimatech_lms/features/chatbot/presentation/widgets/chat_messages_list.dart';

class ChatbotBottomSheet extends StatelessWidget {
  final String courseId;
  final String? videoId;
  final int Function()? getPlaybackMs;
  final void Function(int startMs)? onCitationTap;

  const ChatbotBottomSheet({
    super.key, 
    required this.courseId, 
    this.videoId,
    this.getPlaybackMs,
    this.onCitationTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      height: MediaQuery.of(context).size.height * 0.85,
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        children: [
          // Header
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Icon(Icons.auto_awesome, color: theme.colorScheme.primary),
                    const SizedBox(width: 8),
                    Text(
                      'chatbot.title'.tr(),
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
                IconButton(
                  icon: const Icon(Icons.close),
                  onPressed: () => Navigator.of(context).pop(),
                ),
              ],
            ),
          ),
          const Divider(height: 1),

          // Messages List
          Expanded(
            child: ChatMessagesList(onCitationTap: onCitationTap),
          ),

          // Input Area
          ChatInputField(
            courseId: courseId,
            videoId: videoId,
            getPlaybackMs: getPlaybackMs,
          ),
        ],
      ),
    );
  }
}
