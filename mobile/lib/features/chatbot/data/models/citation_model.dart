import 'package:optimatech_lms/features/chatbot/domain/entities/citation_entity.dart';

class CitationModel extends CitationEntity {
  const CitationModel({
    required super.videoId,
    required super.videoTitle,
    required super.startMs,
    required super.endMs,
    required super.label,
  });

  factory CitationModel.fromJson(Map<String, dynamic> json) {
    return CitationModel(
      videoId: json['video_id'] ?? '',
      videoTitle: json['video_title'] ?? '',
      startMs: json['start_ms'] ?? 0,
      endMs: json['end_ms'] ?? 0,
      label: json['label'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'video_id': videoId,
      'video_title': videoTitle,
      'start_ms': startMs,
      'end_ms': endMs,
      'label': label,
    };
  }
}
