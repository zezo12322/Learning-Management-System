import 'package:easy_localization/easy_localization.dart';

/// Lesson/course lengths come back from the API as a bare number of **minutes**.
/// Formatting lived in two widgets that each re-derived the unit (one of them by
/// running a regex over a string), which is how a 267-minute course came to be
/// displayed as "266 hours". Both now go through here.
String formatMinutes(int minutes) {
  if (minutes <= 0) return '';
  final h = minutes ~/ 60;
  final m = minutes % 60;
  if (h == 0) return 'common.duration_m'.tr(args: ['$m']);
  // Keep the remainder: "4h 27m", never a truncated "4 hours".
  return 'common.duration_hm'.tr(args: ['$h', '$m']);
}
