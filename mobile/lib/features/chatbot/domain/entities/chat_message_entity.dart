import 'package:equatable/equatable.dart';

/// Defines who sent the message (the human user or the AI bot).
enum ChatSender { user, bot }

/// Represents a single chat message inside the chatbot conversation.
/// This is a pure Domain entity, independent of any APIs or databases.
class ChatMessageEntity extends Equatable {
  final String id;
  final String text;
  final ChatSender sender;
  final DateTime timestamp;

  const ChatMessageEntity({
    required this.id,
    required this.text,
    required this.sender,
    required this.timestamp,
  });

  @override
  List<Object?> get props => [id, text, sender, timestamp];
}
