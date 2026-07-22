import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_message_entity.dart';
import 'package:optimatech_lms/features/chatbot/presentation/manager/chat_cubit/chat_cubit.dart';
import 'package:optimatech_lms/features/chatbot/presentation/manager/chat_cubit/chat_state.dart';
import 'package:optimatech_lms/features/chatbot/presentation/widgets/chat_bubble_widget.dart';

class ChatMessagesList extends StatefulWidget {
  final void Function(int startMs)? onCitationTap;

  const ChatMessagesList({super.key, this.onCitationTap});

  @override
  State<ChatMessagesList> createState() => _ChatMessagesListState();
}

class _ChatMessagesListState extends State<ChatMessagesList> {
  final ScrollController _scrollController = ScrollController();

  void _scrollToBottom() {
    if (_scrollController.hasClients) {
      _scrollController.animateTo(
        0,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOut,
      );
    }
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<ChatCubit, ChatState>(
      listener: (context, state) {
        if (state is ChatSuccess || state is ChatError) {
          WidgetsBinding.instance.addPostFrameCallback((_) {
            _scrollToBottom();
          });
        }
      },
      builder: (context, state) {
        List<ChatMessageEntity> messages = [];

        if (state is ChatSuccess) {
          messages = state.messages;
        }

        if (state is ChatInitial && messages.isEmpty) {
          return const Center(
            child: Text('How can I help you today?'),
          );
        }

        return ListView.builder(
          controller: _scrollController,
          reverse: true,
          padding: const EdgeInsets.all(16.0),
          // +1 if loading to show a spinner at the bottom (index 0 in reversed list)
          itemCount: messages.length + (state is ChatLoading ? 1 : 0),
          itemBuilder: (context, index) {
            if (state is ChatLoading && index == 0) {
              return const Align(
                alignment: Alignment.centerLeft,
                child: Padding(
                  padding: EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
                  child: SizedBox(
                    width: 24,
                    height: 24,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  ),
                ),
              );
            }

            final actualIndex = state is ChatLoading ? index - 1 : index;
            final msg = messages[messages.length - 1 - actualIndex];
            return ChatBubbleWidget(
              message: msg,
              onCitationTap: widget.onCitationTap,
            );
          },
        );
      },
    );
  }
}
