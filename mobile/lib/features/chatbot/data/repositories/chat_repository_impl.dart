import 'package:dartz/dartz.dart';
import 'package:dio/dio.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/chatbot/data/datasources/chat_remote_data_source.dart';
import 'package:optimatech_lms/features/chatbot/data/models/chat_context_model.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_context_entity.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_message_entity.dart';
import 'package:optimatech_lms/features/chatbot/domain/repositories/chat_repository.dart';

class ChatRepositoryImpl implements ChatRepository {
  final ChatRemoteDataSource remoteDataSource;

  ChatRepositoryImpl({required this.remoteDataSource});

  @override
  Future<Either<Failure, ChatMessageEntity>> sendMessage({
    required String text,
    required ChatContextEntity context,
  }) async {
    try {
      // Map Domain Entity to Data Model
      final contextModel = ChatContextModel(
        tenantId: context.tenantId,
        userId: context.userId,
        courseId: context.courseId,
        videoId: context.videoId,
        sessionId: context.sessionId,
        playbackMs: context.playbackMs,
      );

      final responseModel = await remoteDataSource.sendMessage(
        text: text,
        context: contextModel,
      );

      return Right(responseModel);
    } on DioException catch (e) {
      return Left(ServerFailure(e.message ?? 'Network error occurred.'));
    } catch (e) {
      return Left(ServerFailure(e.toString()));
    }
  }
}
