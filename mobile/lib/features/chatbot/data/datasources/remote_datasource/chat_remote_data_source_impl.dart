import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/core/network/api_service.dart';
import 'package:optimatech_lms/features/chatbot/data/models/chat_context_model.dart';
import 'package:optimatech_lms/features/chatbot/data/models/chat_message_model.dart';
import 'package:uuid/uuid.dart';

import '../../../domain/entities/chat_message_entity.dart';
import 'chat_remote_data_source.dart';

class ChatRemoteDataSourceImpl implements ChatRemoteDataSource {
  final ApiService apiService;
  final Uuid uuid = const Uuid();

  ChatRemoteDataSourceImpl({required this.apiService});

  Future<void> _setAuthToken() async {
    final user = FirebaseAuth.instance.currentUser;
    if (user != null) {
      final token = await user.getIdToken();
      if (token != null) {
         print(token);
        apiService.setAuthToken(token);
      }
    }
  }

  @override
  Future<ChatMessageModel> sendMessage({
    required String text,
    required ChatContextModel context,
  }) async {
    final connectivityResult = await Connectivity().checkConnectivity();
    if (connectivityResult.contains(ConnectivityResult.none)) {
      throw CustomExceptions(message: 'chatbot.offline_error'.tr());
    }

    try {
      await _setAuthToken();
      final requestId = uuid.v4();
      final payload = context.toJson(text, requestId);

      final response = await apiService.post(
        '/ai/lectures/${context.videoId}/chat',
        data: payload,
      );

      if (response.statusCode == 200) {
        return ChatMessageModel.fromJson(response.data);
      } else {
        throw Exception('Failed to send message: ${response.statusCode}');
      }
    } catch (e) {
      print("=>>>>>>>>>>>>>>>>> $e");
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