import 'package:flutter/material.dart';

class HomeView extends StatelessWidget {
  const HomeView({super.key});

  static const String routeName = '/home';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Home')),
      body: const Padding(
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        child: Center(child: Text('Home'),),
      ),
    );
  }
}
