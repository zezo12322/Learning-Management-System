import 'package:dartz/dartz.dart';
import 'package:dio/dio.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/chatbot/data/datasources/local_datasource/chat_local_data_source.dart';
import 'package:optimatech_lms/features/chatbot/data/datasources/remote_datasource/chat_remote_data_source.dart';
import 'package:optimatech_lms/features/chatbot/data/models/chat_context_model.dart';
import 'package:optimatech_lms/features/chatbot/data/models/chat_message_model.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_context_entity.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_message_entity.dart';
import 'package:optimatech_lms/features/chatbot/domain/repositories/chat_repository.dart';

class ChatRepositoryImpl implements ChatRepository {
  final ChatRemoteDataSource remoteDataSource;
  final ChatLocalDataSource localDataSource;

  ChatRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
  });

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

  @override
  Future<Either<Failure, List<ChatMessageEntity>>> getChatHistory({
    required String courseId,
    String? videoId,
  }) async {
    try {
      final localData = await localDataSource.getChatHistory(
        courseId: courseId,
        videoId: videoId,
      );
      return Right(localData);
    } on CustomExceptions catch (e) {
      return Left(CacheFailure(e.message));
    } catch (e) {
      return Left(CacheFailure(e.toString()));
    }
  }

  @override
  Future<Either<Failure, void>> saveChatHistory({
    required String courseId,
    String? videoId,
    required List<ChatMessageEntity> messages,
  }) async {
    try {
      final messageModels = messages.map((m) {
        return ChatMessageModel(
          id: m.id,
          text: m.text,
          sender: m.sender,
          timestamp: m.timestamp,
          grounded: m.grounded,
          scopeUsed: m.scopeUsed,
          citations: m.citations,
        );
      }).toList();

      await localDataSource.saveChatHistory(
        courseId: courseId,
        videoId: videoId,
        messages: messageModels,
      );
      return const Right(null);
    } on CustomExceptions catch (e) {
      return Left(CacheFailure(e.message));
    } catch (e) {
      return Left(CacheFailure(e.toString()));
    }
  }
}
