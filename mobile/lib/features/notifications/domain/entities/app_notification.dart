class AppNotification {
  final String id;
  final String title;
  final String body;
  final bool isRead;

  const AppNotification({
    required this.id,
    required this.title,
    required this.body,
    this.isRead = false,
  });
}
