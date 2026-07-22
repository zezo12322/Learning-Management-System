import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_message_entity.dart';
import 'package:optimatech_lms/features/chatbot/domain/repositories/chat_repository.dart';

class SaveChatHistoryUseCase {
  final ChatRepository repository;

  const SaveChatHistoryUseCase(this.repository);

  Future<Either<Failure, void>> call(SaveChatHistoryParams params) async {
    return await repository.saveChatHistory(
      videoId: params.videoId,
      messages: params.messages,
    );
  }
}

class SaveChatHistoryParams extends Equatable {
  final String videoId;
  final List<ChatMessageEntity> messages;

  const SaveChatHistoryParams({
    required this.videoId,
    required this.messages,
  });

  @override
  List<Object?> get props => [videoId, messages];
}
