import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:optimatech_lms/features/home/presentation/views/home_view.dart';

class NotFoundView extends StatelessWidget {
  const NotFoundView({super.key});

  static const String routeName = '/not-found';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('navigation.not_found'.tr())),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.error_outline, size: 80, color: Colors.orange),
            const SizedBox(height: 16),
            Text(
              '404 - ${'navigation.not_found'.tr()}',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 8),
            Text(
              'navigation.not_found_msg'.tr(),
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () => Navigator.pushNamed(context, HomeView.routeName),
              child: Text('navigation.go_home'.tr()),
            ),
          ],
        ),
      ),
    );
  }
}