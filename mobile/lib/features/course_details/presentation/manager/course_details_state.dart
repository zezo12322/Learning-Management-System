import 'package:equatable/equatable.dart';
import 'package:optimatech_lms/features/course_details/domain/entities/course_curriculum_entity.dart';

abstract class CourseDetailsState extends Equatable {
  const CourseDetailsState();

  @override
  List<Object?> get props => [];
}

class CourseDetailsInitial extends CourseDetailsState {}

class CourseDetailsLoading extends CourseDetailsState {}

class CourseDetailsLoaded extends CourseDetailsState {
  final CourseCurriculumEntity curriculum;
  final bool isEnrolling;
  final bool enrollmentSuccess;
  final String? enrollmentError;

  /// Paid-course checkout: true while the Paymob checkout URL is being fetched.
  final bool isPurchasing;

  /// One-shot: set right after the checkout URL is fetched; the view opens it
  /// in the browser and immediately consumes it (resets on every copyWith
  /// unless explicitly passed, like [enrollmentError]).
  final String? checkoutUrl;
  final String? purchaseError;

  /// True while polling the enrollment endpoint after returning from Paymob.
  final bool isConfirmingPayment;

  /// One-shot: the user came back from Paymob but the webhook hasn't enrolled
  /// them yet (payment may still be processing or was abandoned).
  final bool paymentPending;

  const CourseDetailsLoaded(
    this.curriculum, {
    this.isEnrolling = false,
    this.enrollmentSuccess = false,
    this.enrollmentError,
    this.isPurchasing = false,
    this.checkoutUrl,
    this.purchaseError,
    this.isConfirmingPayment = false,
    this.paymentPending = false,
  });

  CourseDetailsLoaded copyWith({
    CourseCurriculumEntity? curriculum,
    bool? isEnrolling,
    bool? enrollmentSuccess,
    String? enrollmentError,
    bool? isPurchasing,
    String? checkoutUrl,
    String? purchaseError,
    bool? isConfirmingPayment,
    bool paymentPending = false,
  }) {
    return CourseDetailsLoaded(
      curriculum ?? this.curriculum,
      isEnrolling: isEnrolling ?? this.isEnrolling,
      enrollmentSuccess: enrollmentSuccess ?? this.enrollmentSuccess,
      enrollmentError: enrollmentError,
      isPurchasing: isPurchasing ?? this.isPurchasing,
      checkoutUrl: checkoutUrl,
      purchaseError: purchaseError,
      isConfirmingPayment: isConfirmingPayment ?? this.isConfirmingPayment,
      paymentPending: paymentPending,
    );
  }

  @override
  List<Object?> get props => [
        curriculum,
        isEnrolling,
        enrollmentSuccess,
        enrollmentError,
        isPurchasing,
        checkoutUrl,
        purchaseError,
        isConfirmingPayment,
        paymentPending,
      ];
}

class CourseDetailsError extends CourseDetailsState {
  final String message;

  const CourseDetailsError(this.message);

  @override
  List<Object?> get props => [message];
}
