import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/core/utils/constants.dart';
import 'package:optimatech_lms/features/course_details/domain/repositories/course_details_repository.dart';
import 'package:optimatech_lms/features/course_details/presentation/manager/course_details_state.dart';

class CourseDetailsCubit extends Cubit<CourseDetailsState> {
  final CourseDetailsRepository repository;

  CourseDetailsCubit(this.repository) : super(CourseDetailsInitial());

  Future<void> loadCurriculum(String courseId) async {
    emit(CourseDetailsLoading());
    try {
      final curriculum = await repository.getCourseCurriculum(courseId);
      emit(CourseDetailsLoaded(curriculum));
    } catch (e) {
      emit(CourseDetailsError(e.toString()));
    }
  }

  Future<void> enrollInCourse(String courseId) async {
    if (state is CourseDetailsLoaded) {
      final currentState = state as CourseDetailsLoaded;
      emit(currentState.copyWith(isEnrolling: true, enrollmentError: null, enrollmentSuccess: false));
      try {
        await repository.enrollInCourse(courseId);
        emit(currentState.copyWith(isEnrolling: false, enrollmentSuccess: true));
      } catch (e) {
        emit(currentState.copyWith(isEnrolling: false, enrollmentError: e.toString()));
      }
    }
  }

  /// Paid course: fetch the Paymob checkout URL from the backend and expose it
  /// as a one-shot [CourseDetailsLoaded.checkoutUrl] for the view to open.
  Future<void> buyCourse(String courseId, double price) async {
    // Closed beta: checkout is off (AppConstants.paymentsEnabled). The paid CTA
    // is already disabled, so this only guards against a future caller.
    if (!AppConstants.paymentsEnabled) return;
    if (state is! CourseDetailsLoaded) return;
    final currentState = state as CourseDetailsLoaded;
    if (currentState.isPurchasing || currentState.isEnrolling) return;
    emit(currentState.copyWith(isPurchasing: true));
    try {
      final checkoutUrl = await repository.createCourseCheckoutUrl(
        courseId: courseId,
        amountCents: (price * 100).round(),
      );
      if (isClosed || state is! CourseDetailsLoaded) return;
      emit((state as CourseDetailsLoaded)
          .copyWith(isPurchasing: false, checkoutUrl: checkoutUrl));
    } catch (e) {
      if (isClosed || state is! CourseDetailsLoaded) return;
      emit((state as CourseDetailsLoaded)
          .copyWith(isPurchasing: false, purchaseError: e.toString()));
    }
  }

  /// Called by the view right after launching the checkout URL so the
  /// one-shot value doesn't retrigger the listener.
  void consumeCheckoutUrl() {
    if (state is! CourseDetailsLoaded) return;
    final currentState = state as CourseDetailsLoaded;
    if (currentState.checkoutUrl == null) return;
    emit(currentState.copyWith());
  }

  /// Called when the app returns to the foreground after the user paid in the
  /// browser. Paymob's webhook enrolls the user server-side, which can lag the
  /// redirect by a few seconds — poll the enrollment endpoint briefly.
  /// On success this reuses [CourseDetailsLoaded.enrollmentSuccess] so the
  /// existing listener (snackbar + navigate to the course) kicks in.
  Future<void> confirmPaymentReturn(String courseId) async {
    if (state is! CourseDetailsLoaded) return;
    final currentState = state as CourseDetailsLoaded;
    if (currentState.isConfirmingPayment || currentState.enrollmentSuccess) {
      return;
    }
    emit(currentState.copyWith(isConfirmingPayment: true));

    for (var attempt = 0; attempt < 5; attempt++) {
      try {
        final enrolled = await repository.isEnrolledInCourse(courseId);
        if (isClosed) return;
        if (enrolled) {
          if (state is! CourseDetailsLoaded) return;
          emit((state as CourseDetailsLoaded)
              .copyWith(isConfirmingPayment: false, enrollmentSuccess: true));
          return;
        }
      } catch (_) {
        // Transient network error — keep polling.
      }
      await Future.delayed(const Duration(seconds: 2));
      if (isClosed) return;
    }

    if (state is! CourseDetailsLoaded) return;
    emit((state as CourseDetailsLoaded)
        .copyWith(isConfirmingPayment: false, paymentPending: true));
  }
}
