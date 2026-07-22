import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:easy_localization/easy_localization.dart';
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
        if (state is ChatError) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(state.message),
              backgroundColor: Theme.of(context).colorScheme.error,
              behavior: SnackBarBehavior.floating,
            ),
          );
        }
        
        if (state is ChatSuccess || state is ChatError || state is ChatLoading) {
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

        if (state is ChatLoading) {
          return const Center(
            child: CircularProgressIndicator(),
          );
        }

        if (state is ChatInitial && messages.isEmpty) {
          return Center(
            child: Text('chatbot.empty_state'.tr()),
          );
        }

        return ListView.builder(
          controller: _scrollController,
          reverse: true,
          padding: const EdgeInsets.all(16.0),
          itemCount: messages.length,
          itemBuilder: (context, index) {
            final msg = messages[messages.length - 1 - index];
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
