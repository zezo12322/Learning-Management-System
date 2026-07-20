import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/features/notifications/presentation/manager/notifications_state.dart';

class NotificationsCubit extends Cubit<NotificationsState> {
  NotificationsCubit() : super(NotificationsLoading());

  /// Shell implementation: the backend has no notifications endpoint yet
  /// (see mobile/MISSING_SCREENS_SPEC.md section 2). Wire a
  /// NotificationsRepository backed by firebase_messaging + a local Hive store
  /// (and later GET /notifications) here — only this method needs to change.
  Future<void> load() async {
    emit(NotificationsEmpty());
  }
}
