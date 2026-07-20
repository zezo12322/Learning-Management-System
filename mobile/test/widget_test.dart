// Minimal smoke test.
//
// The full app widget (OptimaTechLMS) requires Firebase, EasyLocalization and
// ScreenUtil initialization, so a proper end-to-end widget test needs those
// dependencies mocked. This placeholder replaces the old default counter
// template (which referenced a non-existent `MyApp`) with a valid, compiling
// test. Replace it with real widget tests as the mobile test suite grows.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('smoke: a basic widget renders', (WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(home: Scaffold(body: Text('OptimaTech'))),
    );

    expect(find.text('OptimaTech'), findsOneWidget);
  });
}
