import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/foundation.dart';

import 'exceptions.dart';

/// Turns a caught error into something safe to show a user, in their language.
///
/// The data layer used to build messages like
/// `'Failed to fetch courses: DioException [connection error] …'` and throw
/// those, and `AppErrorWidget` renders whatever message it is handed — so an
/// Arabic learner was shown an English sentence with a Dart exception dump
/// stapled to it.
///
/// `DioErrorHandler` already maps network and status-code failures to
/// translated messages, so those are passed through unchanged. Anything else —
/// a `DataConnectError`, a parse failure, a null dereference — becomes a
/// generic translated message, with the real detail sent to the debug console
/// where it is useful and not to the screen.
String userFacingMessage(Object error) {
  if (kDebugMode) debugPrint('Handled error: $error');

  if (error is NetworkException) return error.message;
  if (error is UnauthorizedException) return error.message;
  if (error is ValidationException) return error.message;
  if (error is ServerException) return error.message;
  if (error is CustomExceptions) return error.message;

  return 'errors.server'.tr();
}
