import 'package:dio/dio.dart';
import 'package:optimatech_lms/features/chatbot/domain/entities/chat_message_entity.dart';
import 'package:uuid/uuid.dart';
import 'package:optimatech_lms/features/chatbot/data/models/chat_context_model.dart';
import 'package:optimatech_lms/features/chatbot/data/models/chat_message_model.dart';
import 'chat_remote_data_source.dart';

class ChatRemoteDataSourceImpl implements ChatRemoteDataSource {
  final Dio dio;
  final Uuid uuid = const Uuid();

  ChatRemoteDataSourceImpl({required this.dio});

  @override
  Future<ChatMessageModel> sendMessage({
    required String text,
    required ChatContextModel context,
  }) async {
    const String apiKey = 'YOUR_INTERNAL_API_KEY'; // To be moved to env config

    final requestId = uuid.v4();
    final payload = context.toJson(text, requestId);

    try {
      final response = await dio.post(
        'http://localhost:8000/v1/rag/chat', // Use backend URL from env
        data: payload,
        options: Options(
          headers: {
            'Content-Type': 'application/json',
            'X-Internal-Api-Key': apiKey,
          },
        ),
      );

      if (response.statusCode == 200) {
        return ChatMessageModel.fromJson(response.data);
      } else {
        throw Exception('Failed to send message: ${response.statusCode}');
      }
    } catch (e) {
      // MOCK FALLBACK: For UI testing while backend is offline
      await Future.delayed(const Duration(seconds: 2));
      return ChatMessageModel(
        id: uuid.v4(),
        text:
            'I am a simulated AI response! The real backend  is currently unreachable, but your frontend UI is working perfectly.',
        sender: ChatSender.bot,
        timestamp: DateTime.now(),
        grounded: true,
      );
    }
  }
}
