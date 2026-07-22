import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/features/chatbot/data/datasources/chat_remote_data_source.dart';
import 'package:optimatech_lms/features/chatbot/data/models/chat_context_model.dart';

/// The actual implementation of [ChatRemoteDataSource] using Dio.
/// Handles the raw HTTP request to the AI/Chatbot backend endpoint.
class ChatRemoteDataSourceImpl implements ChatRemoteDataSource {
  final Dio dio;

  ChatRemoteDataSourceImpl({required this.dio});

  @override
  Future<Stream<String>> sendMessage({
    required String text,
    required ChatContextModel context,
  }) async {
    try {
      // POST request to the backend with streaming response type enabled.
      final response = await dio.post(
        '/api/chat/send', // Dummy endpoint, update as needed
        data: {
          'text': text,
          'context': context.toJson(),
        },
        options: Options(
          responseType: ResponseType.stream, // Crucial for typing effect
        ),
      );

      // Cast the raw response data to a byte stream and decode it to strings.
      final stream = response.data.stream as Stream<List<int>>;
      return stream.map((data) => utf8.decode(data));
    } on DioException catch (e) {
      // Catch network/HTTP errors and wrap them in custom app exceptions.
      throw CustomExceptions(message: e.message ?? 'Failed to connect to Chatbot API');
    } catch (e) {
      // Catch any generic Dart errors.
      throw CustomExceptions(message: e.toString());
    }
  }
}
