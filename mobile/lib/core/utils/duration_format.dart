import 'package:easy_localization/easy_localization.dart';

/// Formatting for lesson and course lengths.
///
/// **The API unit is seconds, not minutes.** `CourseLecture.duration` is written
/// by the transcoder from ffprobe as whole seconds
/// (`backend/src/transcoding/transcoding.processor.ts:203`), and the progress
/// endpoint compares it against `lastWatchedSecond`
/// (`backend/src/progress/progress.service.ts:66`). An earlier comment here said
/// "minutes by convention", and the app rendered the raw value with a `min`
/// suffix — so every lesson was displayed 60x too long, including the total
/// course length on the purchase screen.
///
/// Prefer [formatSeconds] at every call site that starts from an API value.
/// [formatMinutes] stays for values that are genuinely minutes (missions carry
/// `durationMinutes` in the schema, which really is minutes).
String formatMinutes(int minutes) {
  if (minutes <= 0) return '';
  final h = minutes ~/ 60;
  final m = minutes % 60;
  if (h == 0) return 'common.duration_m'.tr(args: ['$m']);
  // Keep the remainder: "4h 27m", never a truncated "4 hours".
  return 'common.duration_hm'.tr(args: ['$h', '$m']);
}

/// Formats a raw API duration (seconds) for display.
///
/// Rounds to the nearest minute, but never down to a bare "0 min" for a lecture
/// that does have length — a 40-second clip reads as "1 min", not as nothing.
String formatSeconds(int? seconds) {
  if (seconds == null || seconds <= 0) return '';
  final minutes = (seconds / 60).round();
  return formatMinutes(minutes < 1 ? 1 : minutes);
}
