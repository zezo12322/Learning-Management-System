import 'package:equatable/equatable.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_message_entity.dart';

/// Base state for the Chat feature.
abstract class ChatState extends Equatable {
  const ChatState();

  @override
  List<Object> get props => [];
}

/// The initial state when the chat screen is first opened and no messages exist.
class ChatInitial extends ChatState {}

/// State emitted while waiting for the initial connection or AI response.
class ChatLoading extends ChatState {}

/// State emitted when messages are successfully loaded or updated.
/// Contains the full list of messages to be rendered in the UI.
class ChatSuccess extends ChatState {
  final List<ChatMessageEntity> messages;

  const ChatSuccess(this.messages);

  @override
  List<Object> get props => [messages];
}

/// State emitted when an error occurs (e.g. network failure).
class ChatError extends ChatState {
  final String message;

  const ChatError(this.message);

  @override
  List<Object> get props => [message];
}
