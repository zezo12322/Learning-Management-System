import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_message_entity.dart';
import 'package:optimatech_lms/features/chatbot/domain/repositories/chat_repository.dart';

class GetChatHistoryUseCase {
  final ChatRepository repository;

  const GetChatHistoryUseCase(this.repository);

  Future<Either<Failure, List<ChatMessageEntity>>> call({
    required String courseId,
    String? videoId,
  }) async {
    return await repository.getChatHistory(
      courseId: courseId,
      videoId: videoId,
    );
  }
}
