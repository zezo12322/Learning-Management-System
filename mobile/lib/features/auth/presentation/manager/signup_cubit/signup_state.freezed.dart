// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'signup_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

/// @nodoc
mixin _$SignupState {
  SignupStatus get status => throw _privateConstructorUsedError;
  String? get fullNameError => throw _privateConstructorUsedError;
  String? get emailError => throw _privateConstructorUsedError;
  String? get phoneError => throw _privateConstructorUsedError;
  String? get passwordError => throw _privateConstructorUsedError;
  String? get confirmPasswordError => throw _privateConstructorUsedError;
  String? get errorMessage => throw _privateConstructorUsedError;
  bool get isAgree => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $SignupStateCopyWith<SignupState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SignupStateCopyWith<$Res> {
  factory $SignupStateCopyWith(
          SignupState value, $Res Function(SignupState) then) =
      _$SignupStateCopyWithImpl<$Res, SignupState>;
  @useResult
  $Res call(
      {SignupStatus status,
      String? fullNameError,
      String? emailError,
      String? phoneError,
      String? passwordError,
      String? confirmPasswordError,
      String? errorMessage,
      bool isAgree});
}

/// @nodoc
class _$SignupStateCopyWithImpl<$Res, $Val extends SignupState>
    implements $SignupStateCopyWith<$Res> {
  _$SignupStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? status = null,
    Object? fullNameError = freezed,
    Object? emailError = freezed,
    Object? phoneError = freezed,
    Object? passwordError = freezed,
    Object? confirmPasswordError = freezed,
    Object? errorMessage = freezed,
    Object? isAgree = null,
  }) {
    return _then(_value.copyWith(
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as SignupStatus,
      fullNameError: freezed == fullNameError
          ? _value.fullNameError
          : fullNameError // ignore: cast_nullable_to_non_nullable
              as String?,
      emailError: freezed == emailError
          ? _value.emailError
          : emailError // ignore: cast_nullable_to_non_nullable
              as String?,
      phoneError: freezed == phoneError
          ? _value.phoneError
          : phoneError // ignore: cast_nullable_to_non_nullable
              as String?,
      passwordError: freezed == passwordError
          ? _value.passwordError
          : passwordError // ignore: cast_nullable_to_non_nullable
              as String?,
      confirmPasswordError: freezed == confirmPasswordError
          ? _value.confirmPasswordError
          : confirmPasswordError // ignore: cast_nullable_to_non_nullable
              as String?,
      errorMessage: freezed == errorMessage
          ? _value.errorMessage
          : errorMessage // ignore: cast_nullable_to_non_nullable
              as String?,
      isAgree: null == isAgree
          ? _value.isAgree
          : isAgree // ignore: cast_nullable_to_non_nullable
              as bool,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$SignupStateImplCopyWith<$Res>
    implements $SignupStateCopyWith<$Res> {
  factory _$$SignupStateImplCopyWith(
          _$SignupStateImpl value, $Res Function(_$SignupStateImpl) then) =
      __$$SignupStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {SignupStatus status,
      String? fullNameError,
      String? emailError,
      String? phoneError,
      String? passwordError,
      String? confirmPasswordError,
      String? errorMessage,
      bool isAgree});
}

/// @nodoc
class __$$SignupStateImplCopyWithImpl<$Res>
    extends _$SignupStateCopyWithImpl<$Res, _$SignupStateImpl>
    implements _$$SignupStateImplCopyWith<$Res> {
  __$$SignupStateImplCopyWithImpl(
      _$SignupStateImpl _value, $Res Function(_$SignupStateImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? status = null,
    Object? fullNameError = freezed,
    Object? emailError = freezed,
    Object? phoneError = freezed,
    Object? passwordError = freezed,
    Object? confirmPasswordError = freezed,
    Object? errorMessage = freezed,
    Object? isAgree = null,
  }) {
    return _then(_$SignupStateImpl(
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as SignupStatus,
      fullNameError: freezed == fullNameError
          ? _value.fullNameError
          : fullNameError // ignore: cast_nullable_to_non_nullable
              as String?,
      emailError: freezed == emailError
          ? _value.emailError
          : emailError // ignore: cast_nullable_to_non_nullable
              as String?,
      phoneError: freezed == phoneError
          ? _value.phoneError
          : phoneError // ignore: cast_nullable_to_non_nullable
              as String?,
      passwordError: freezed == passwordError
          ? _value.passwordError
          : passwordError // ignore: cast_nullable_to_non_nullable
              as String?,
      confirmPasswordError: freezed == confirmPasswordError
          ? _value.confirmPasswordError
          : confirmPasswordError // ignore: cast_nullable_to_non_nullable
              as String?,
      errorMessage: freezed == errorMessage
          ? _value.errorMessage
          : errorMessage // ignore: cast_nullable_to_non_nullable
              as String?,
      isAgree: null == isAgree
          ? _value.isAgree
          : isAgree // ignore: cast_nullable_to_non_nullable
              as bool,
    ));
  }
}

/// @nodoc

class _$SignupStateImpl implements _SignupState {
  const _$SignupStateImpl(
      {this.status = SignupStatus.initial,
      this.fullNameError,
      this.emailError,
      this.phoneError,
      this.passwordError,
      this.confirmPasswordError,
      this.errorMessage,
      this.isAgree = false});

  @override
  @JsonKey()
  final SignupStatus status;
  @override
  final String? fullNameError;
  @override
  final String? emailError;
  @override
  final String? phoneError;
  @override
  final String? passwordError;
  @override
  final String? confirmPasswordError;
  @override
  final String? errorMessage;
  @override
  @JsonKey()
  final bool isAgree;

  @override
  String toString() {
    return 'SignupState(status: $status, fullNameError: $fullNameError, emailError: $emailError, phoneError: $phoneError, passwordError: $passwordError, confirmPasswordError: $confirmPasswordError, errorMessage: $errorMessage, isAgree: $isAgree)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$SignupStateImpl &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.fullNameError, fullNameError) ||
                other.fullNameError == fullNameError) &&
            (identical(other.emailError, emailError) ||
                other.emailError == emailError) &&
            (identical(other.phoneError, phoneError) ||
                other.phoneError == phoneError) &&
            (identical(other.passwordError, passwordError) ||
                other.passwordError == passwordError) &&
            (identical(other.confirmPasswordError, confirmPasswordError) ||
                other.confirmPasswordError == confirmPasswordError) &&
            (identical(other.errorMessage, errorMessage) ||
                other.errorMessage == errorMessage) &&
            (identical(other.isAgree, isAgree) || other.isAgree == isAgree));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType,
      status,
      fullNameError,
      emailError,
      phoneError,
      passwordError,
      confirmPasswordError,
      errorMessage,
      isAgree);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$SignupStateImplCopyWith<_$SignupStateImpl> get copyWith =>
      __$$SignupStateImplCopyWithImpl<_$SignupStateImpl>(this, _$identity);
}

abstract class _SignupState implements SignupState {
  const factory _SignupState(
      {final SignupStatus status,
      final String? fullNameError,
      final String? emailError,
      final String? phoneError,
      final String? passwordError,
      final String? confirmPasswordError,
      final String? errorMessage,
      final bool isAgree}) = _$SignupStateImpl;

  @override
  SignupStatus get status;
  @override
  String? get fullNameError;
  @override
  String? get emailError;
  @override
  String? get phoneError;
  @override
  String? get passwordError;
  @override
  String? get confirmPasswordError;
  @override
  String? get errorMessage;
  @override
  bool get isAgree;
  @override
  @JsonKey(ignore: true)
  _$$SignupStateImplCopyWith<_$SignupStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
