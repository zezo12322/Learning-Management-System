import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:intl/intl.dart';
import 'package:shimmer/shimmer.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_message_entity.dart';

class ChatBubbleWidget extends StatelessWidget {
  final ChatMessageEntity message;
  final void Function(int startMs)? onCitationTap;

  const ChatBubbleWidget({
    super.key, 
    required this.message,
    this.onCitationTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isUser = message.sender == ChatSender.user;

    // Dim the bubble if the response is not grounded (refusal)
    final double opacity = !isUser && !message.grounded ? 0.6 : 1.0;

    return Align(
      alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Opacity(
        opacity: opacity,
        child: Container(
          margin: const EdgeInsets.only(bottom: 12.0),
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
          constraints: BoxConstraints(
            maxWidth: MediaQuery.of(context).size.width * 0.85, // increased width for markdown
          ),
          decoration: BoxDecoration(
            color: isUser 
                ? theme.colorScheme.primary 
                : theme.colorScheme.surfaceDim,
            borderRadius: BorderRadius.circular(16).copyWith(
              bottomRight: isUser ? const Radius.circular(0) : null,
              bottomLeft: !isUser ? const Radius.circular(0) : null,
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Use Markdown for bot messages to render bullet points properly
              if (message.isLoading)
                Shimmer.fromColors(
                  baseColor: theme.colorScheme.onSurface.withOpacity(0.5),
                  highlightColor: theme.colorScheme.onSurface,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.auto_awesome, size: 16),
                      const SizedBox(width: 8),
                      Text(
                        'Thinking...',
                        style: TextStyle(
                          color: theme.colorScheme.onSurface,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                )
              else if (isUser)
                Text(
                  message.text.isEmpty ? '...' : message.text,
                  style: TextStyle(
                    color: theme.colorScheme.onPrimary,
                  ),
                )
              else
                MarkdownBody(
                  data: message.text.isEmpty ? '...' : message.text,
                  styleSheet: MarkdownStyleSheet(
                    p: TextStyle(color: theme.colorScheme.onSurface),
                    listBullet: TextStyle(color: theme.colorScheme.onSurface),
                  ),
                ),

              // Citations row
              if (!isUser && message.citations.isNotEmpty) ...[
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8.0,
                  runSpacing: 4.0,
                  children: message.citations.map((citation) {
                    return ActionChip(
                      label: Text(
                        citation.label,
                        style: const TextStyle(fontSize: 12),
                      ),
                      onPressed: () {
                        if (onCitationTap != null) {
                          onCitationTap!(citation.startMs);
                        }
                      },
                      visualDensity: VisualDensity.compact,
                      padding: EdgeInsets.zero,
                    );
                  }).toList(),
                ),
              ],

              const SizedBox(height: 4),
              Text(
                DateFormat('hh:mm a').format(message.timestamp),
                style: TextStyle(
                  fontSize: 10,
                  color: isUser 
                      ? theme.colorScheme.onPrimary.withOpacity(0.7) 
                      : theme.colorScheme.onSurface.withOpacity(0.5),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
