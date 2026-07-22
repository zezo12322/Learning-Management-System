import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_context_entity.dart';
import 'package:optimatech_lms/features/chatbot/domain/repositories/chat_repository.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_message_entity.dart';

/// UseCase responsible for executing the business logic of sending a chat message.
/// The Presentation layer (like a Bloc or Cubit) will call this class instead of 
/// interacting with the repository directly.
class SendMessageUseCase {
  final ChatRepository repository;

  const SendMessageUseCase(this.repository);

  /// Executes the use case by calling the repository.
  Future<Either<Failure, ChatMessageEntity>> call(SendMessageParams params) async {
    return await repository.sendMessage(
      text: params.text,
      context: params.context,
    );
  }
}

/// A simple parameter class to bundle the arguments needed to send a message.
/// We use this so our `call` method strictly takes one argument.
class SendMessageParams extends Equatable {
  final String text;
  final ChatContextEntity context;

  const SendMessageParams({
    required this.text,
    required this.context,
  });

  @override
  List<Object?> get props => [text, context];
}
