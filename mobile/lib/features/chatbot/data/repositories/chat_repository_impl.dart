import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/chatbot/data/datasources/chat_remote_data_source.dart';
import 'package:optimatech_lms/features/chatbot/data/models/chat_context_model.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_context_entity.dart';
import 'package:optimatech_lms/features/chatbot/domain/repositories/chat_repository.dart';

/// The concrete implementation of [ChatRepository] defined in the Domain layer.
/// This acts as the single source of truth for chat data, wrapping the data source
/// exceptions into clean, strictly typed [Failure] objects for the UI to handle.
class ChatRepositoryImpl implements ChatRepository {
  final ChatRemoteDataSource remoteDataSource;

  ChatRepositoryImpl({required this.remoteDataSource});

  @override
  Future<Either<Failure, Stream<String>>> sendMessage({
    required String text,
    required ChatContextEntity context,
  }) async {
    try {
      // Convert the pure Domain entity into a Data model for serialization.
      final contextModel = ChatContextModel(
        currentScreen: context.currentScreen,
        courseId: context.courseId,
        lessonId: context.lessonId,
      );

      // Execute the network request via the data source.
      final stream = await remoteDataSource.sendMessage(
        text: text,
        context: contextModel,
      );

      // If successful, return the result on the 'Right' side of the Either.
      return Right(stream);
    } on CustomExceptions catch (e) {
      // If a custom app exception is thrown, catch it and return a ServerFailure on the 'Left'.
      return Left(ServerFailure(e.message)); 
    } catch (e) {
      // Fallback for unexpected errors.
      return Left(ServerFailure(e.toString()));
    }
  }
}
