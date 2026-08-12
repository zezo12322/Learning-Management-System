import 'package:flutter_bloc/flutter_bloc.dart';

/// Drops emits that arrive after the cubit has been closed.
///
/// Every cubit here does async work and then emits, and a user who navigates
/// back mid-request closes the cubit before the response lands — which makes
/// `emit` throw a `StateError`. Guarding at each call site means remembering it
/// at each call site, and the ones that were remembered
/// (`CourseDetailsCubit.buyCourse`, for instance) show it was easy to forget
/// everywhere else.
///
/// Overriding `emit` once per cubit covers every path in it, including the ones
/// added later.
///
/// This deliberately does not swallow anything else: a genuinely wrong state
/// transition still emits, and a closed cubit has no listeners left to tell.
mixin SafeEmit<S> on BlocBase<S> {
  @override
  void emit(S state) {
    if (isClosed) return;
    super.emit(state);
  }
}
