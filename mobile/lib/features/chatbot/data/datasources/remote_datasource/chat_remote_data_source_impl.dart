import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/core/network/api_service.dart';
import 'package:optimatech_lms/features/chatbot/data/models/chat_context_model.dart';
import 'package:optimatech_lms/features/chatbot/data/models/chat_message_model.dart';
import 'package:uuid/uuid.dart';

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
        // Never log the token. `print` is not stripped from release builds, so
        // the previous `print(token)` here wrote a live bearer credential into
        // the device log on every message — undoing the deliberate hygiene in
        // ApiService, where the network logger is kDebugMode-gated and request
        // headers are omitted for exactly this reason.
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

    await _setAuthToken();
    final requestId = uuid.v4();
    final payload = context.toJson(text, requestId);

    // Failures propagate. There used to be a catch-all here that swallowed
    // every exception and returned a fabricated bot message — "I am a simulated
    // AI response!" — with `grounded: true`, which the cubit then appended and
    // persisted like any real answer. `ChatRepositoryImpl` already maps
    // exceptions to a `ServerFailure` and the UI already has a failure path;
    // it simply never saw one. Showing an invented answer as if the model had
    // produced it is worse than showing an error.
    final response = await apiService.post(
      '/ai/lectures/${context.videoId}/chat',
      data: payload,
    );

    final status = response.statusCode ?? 0;
    if (status < 200 || status >= 300) {
      throw CustomExceptions(message: 'errors.server'.tr());
    }

    return ChatMessageModel.fromJson(response.data);
  }
}
