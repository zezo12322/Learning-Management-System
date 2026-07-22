import 'package:optimatech_lms/features/chatbot/domain/entities/chat_message_entity.dart';

/// Data Model for [ChatMessageEntity].
/// This class handles the serialization (to JSON) and deserialization (from JSON)
/// of chat messages when communicating with external APIs or local storage.
class ChatMessageModel extends ChatMessageEntity {
  const ChatMessageModel({
    required super.id,
    required super.text,
    required super.sender,
    required super.timestamp,
  });

  /// Factory constructor to create a [ChatMessageModel] from a JSON map.
  factory ChatMessageModel.fromJson(Map<String, dynamic> json) {
    return ChatMessageModel(
      id: json['id'] as String,
      text: json['text'] as String,
      sender: json['sender'] == 'bot' ? ChatSender.bot : ChatSender.user,
      timestamp: DateTime.parse(json['timestamp'] as String),
    );
  }

  /// Converts the [ChatMessageModel] instance back into a JSON map.
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'text': text,
      'sender': sender == ChatSender.bot ? 'bot' : 'user',
      'timestamp': timestamp.toIso8601String(),
    };
  }
}
