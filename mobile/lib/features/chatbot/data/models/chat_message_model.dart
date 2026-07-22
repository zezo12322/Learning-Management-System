import 'package:optimatech_lms/features/chatbot/domain/entities/chat_message_entity.dart';
import 'package:optimatech_lms/features/chatbot/data/models/citation_model.dart';

/// The Data Model representation of a ChatMessageEntity.
class ChatMessageModel extends ChatMessageEntity {
  const ChatMessageModel({
    required super.id,
    required super.text,
    required super.sender,
    required super.timestamp,
    super.grounded,
    super.scopeUsed,
    super.citations,
  });

  /// Factory constructor to parse the RAG JSON response into a model.
  factory ChatMessageModel.fromJson(Map<String, dynamic> json) {
    var citationsList = <CitationModel>[];
    if (json['citations'] != null) {
      citationsList = List<CitationModel>.from(
        (json['citations'] as List).map((x) => CitationModel.fromJson(x)),
      );
    }

    return ChatMessageModel(
      id: json['session_id'] ?? json['request_id'] ?? DateTime.now().millisecondsSinceEpoch.toString(),
      text: json['answer'] ?? '',
      sender: ChatSender.bot, // API response is always from the bot
      timestamp: DateTime.now(), // Use current time since API doesn't return timestamp
      grounded: json['grounded'] ?? true,
      scopeUsed: json['scope_used'],
      citations: citationsList,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'answer': text,
      'sender': sender.toString(),
      'timestamp': timestamp.toIso8601String(),
      'grounded': grounded,
      'scope_used': scopeUsed,
      'citations': citations.map((c) => (c as CitationModel).toJson()).toList(),
    };
  }
}
