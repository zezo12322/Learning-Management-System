import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_context_entity.dart';
import 'package:optimatech_lms/features/chatbot/presentation/manager/chat_cubit/chat_cubit.dart';
import 'package:optimatech_lms/features/chatbot/presentation/widgets/chatbot_bottom_sheet.dart';

class GlobalChatbotFab extends StatelessWidget {
  final String? currentScreen;
  final String? courseId;
  final String? lessonId;

  const GlobalChatbotFab({
    super.key,
    this.currentScreen,
    this.courseId,
    this.lessonId,
  });

  void _openChatbot(BuildContext context) {
    final contextEntity = ChatContextEntity(
      currentScreen: currentScreen,
      courseId: courseId,
      lessonId: lessonId,
    );

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) {
        return BlocProvider<ChatCubit>(
          create: (_) => getIt<ChatCubit>(),
          child: ChatbotBottomSheet(contextEntity: contextEntity),
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
