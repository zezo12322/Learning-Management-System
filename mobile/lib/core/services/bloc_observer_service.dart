import 'package:flutter/foundation.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:logger/logger.dart';

class BlocObserverService extends BlocObserver{
  var logger = Logger();
  @override
  void onChange(BlocBase bloc, Change change) {
    super.onChange(bloc, change);
    if(kDebugMode){
      logger.d(' State changed: ${bloc.runtimeType} -> $change');
    }
  }
}