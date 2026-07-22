import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/features/chatbot/presentation/manager/chat_cubit/chat_cubit.dart';

class ChatInputField extends StatefulWidget {
  final String courseId;
  final String videoId;
  final int Function()? getPlaybackMs;

  const ChatInputField({
    super.key, 
    required this.courseId, 
    required this.videoId,
    this.getPlaybackMs,
  });

  @override
  State<ChatInputField> createState() => _ChatInputFieldState();
}

class _ChatInputFieldState extends State<ChatInputField> {
  final TextEditingController _textController = TextEditingController();

  void _sendMessage() {
    final text = _textController.text.trim();
    if (text.isEmpty) return;

    _textController.clear();
    
    // Read the dynamic video timestamp right before sending!
    final ms = widget.getPlaybackMs?.call() ?? 0;
    
    context.read<ChatCubit>().sendMessage(
      text, 
      widget.courseId, 
      widget.videoId, 
      ms,
    );
  }

  @override
  void dispose() {
    _textController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      padding: EdgeInsets.only(
        left: 16.0,
        right: 16.0,
        top: 12.0,
        bottom: MediaQuery.of(context).viewInsets.bottom + 16.0,
      ),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, -5),
          ),
        ],
      ),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: _textController,
              textInputAction: TextInputAction.send,
              onSubmitted: (_) => _sendMessage(),
              decoration: InputDecoration(
                hintText: 'Ask me anything...',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(24),
                  borderSide: BorderSide.none,
                ),
                filled: true,
                fillColor: theme.colorScheme.surfaceContainerHighest,
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: 20,
                  vertical: 14,
                ),
              ),
            ),
          ),
          const SizedBox(width: 8),
          Container(
            decoration: BoxDecoration(
              color: theme.colorScheme.primary,
              shape: BoxShape.circle,
            ),
            child: IconButton(
              icon: Icon(Icons.send, color: theme.colorScheme.onPrimary),
              onPressed: _sendMessage,
            ),
          ),
        ],
      ),
    );
  }
}
