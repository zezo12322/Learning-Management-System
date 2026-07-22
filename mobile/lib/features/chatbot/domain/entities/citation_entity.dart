import 'package:equatable/equatable.dart';

class CitationEntity extends Equatable {
  final String videoId;
  final String videoTitle;
  final int startMs;
  final int endMs;
  final String label;

  const CitationEntity({
    required this.videoId,
    required this.videoTitle,
    required this.startMs,
    required this.endMs,
    required this.label,
  });

  @override
  List<Object?> get props => [videoId, videoTitle, startMs, endMs, label];
}
