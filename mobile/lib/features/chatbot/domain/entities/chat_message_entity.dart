import 'package:equatable/equatable.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/citation_entity.dart';

/// Defines who sent the message (the human user or the AI bot).
enum ChatSender { user, bot }

/// Represents a single chat message inside the chatbot conversation.
/// This is a pure Domain entity, independent of any APIs or databases.
class ChatMessageEntity extends Equatable {
  final String id;
  final String text;
  final ChatSender sender;
  final DateTime timestamp;

  // RAG specific fields
  final bool grounded;
  final String? scopeUsed;
  final List<CitationEntity> citations;

  const ChatMessageEntity({
    required this.id,
    required this.text,
    required this.sender,
    required this.timestamp,
    this.grounded = true,
    this.scopeUsed,
    this.citations = const [],
  });

  @override
  List<Object?> get props => [
        id,
        text,
        sender,
        timestamp,
        grounded,
        scopeUsed,
        citations,
      ];
}
