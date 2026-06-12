import 'package:flutter/material.dart';
import 'package:optimatech_lms/core/widgets/secondary_button.dart';

class HomeView extends StatelessWidget {
  const HomeView({super.key});

  static const String routeName = '/home';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Home')),
      body: Center(
        child: SecondaryButton(
          text: 'Home Feature',
          onPressed: (){},
        ),
      ),
    );
  }
}
