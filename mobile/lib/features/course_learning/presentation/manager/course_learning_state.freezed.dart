// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'course_learning_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

/// @nodoc
mixin _$CourseLearningState {
  Status get curriculumState => throw _privateConstructorUsedError;
  Status get lectureState => throw _privateConstructorUsedError;
  CourseCurriculumEntity? get curriculum => throw _privateConstructorUsedError;
  LectureContentEntity? get currentLecture =>
      throw _privateConstructorUsedError;
  String? get errorMessage => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $CourseLearningStateCopyWith<CourseLearningState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CourseLearningStateCopyWith<$Res> {
  factory $CourseLearningStateCopyWith(
          CourseLearningState value, $Res Function(CourseLearningState) then) =
      _$CourseLearningStateCopyWithImpl<$Res, CourseLearningState>;
  @useResult
  $Res call(
      {Status curriculumState,
      Status lectureState,
      CourseCurriculumEntity? curriculum,
      LectureContentEntity? currentLecture,
      String? errorMessage});
}

/// @nodoc
class _$CourseLearningStateCopyWithImpl<$Res, $Val extends CourseLearningState>
    implements $CourseLearningStateCopyWith<$Res> {
  _$CourseLearningStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? curriculumState = null,
    Object? lectureState = null,
    Object? curriculum = freezed,
    Object? currentLecture = freezed,
    Object? errorMessage = freezed,
  }) {
    return _then(_value.copyWith(
      curriculumState: null == curriculumState
          ? _value.curriculumState
          : curriculumState // ignore: cast_nullable_to_non_nullable
              as Status,
      lectureState: null == lectureState
          ? _value.lectureState
          : lectureState // ignore: cast_nullable_to_non_nullable
              as Status,
      curriculum: freezed == curriculum
          ? _value.curriculum
          : curriculum // ignore: cast_nullable_to_non_nullable
              as CourseCurriculumEntity?,
      currentLecture: freezed == currentLecture
          ? _value.currentLecture
          : currentLecture // ignore: cast_nullable_to_non_nullable
              as LectureContentEntity?,
      errorMessage: freezed == errorMessage
          ? _value.errorMessage
          : errorMessage // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$CourseLearningStateImplCopyWith<$Res>
    implements $CourseLearningStateCopyWith<$Res> {
  factory _$$CourseLearningStateImplCopyWith(_$CourseLearningStateImpl value,
          $Res Function(_$CourseLearningStateImpl) then) =
      __$$CourseLearningStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {Status curriculumState,
      Status lectureState,
      CourseCurriculumEntity? curriculum,
      LectureContentEntity? currentLecture,
      String? errorMessage});
}

/// @nodoc
class __$$CourseLearningStateImplCopyWithImpl<$Res>
    extends _$CourseLearningStateCopyWithImpl<$Res, _$CourseLearningStateImpl>
    implements _$$CourseLearningStateImplCopyWith<$Res> {
  __$$CourseLearningStateImplCopyWithImpl(_$CourseLearningStateImpl _value,
      $Res Function(_$CourseLearningStateImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? curriculumState = null,
    Object? lectureState = null,
    Object? curriculum = freezed,
    Object? currentLecture = freezed,
    Object? errorMessage = freezed,
  }) {
    return _then(_$CourseLearningStateImpl(
      curriculumState: null == curriculumState
          ? _value.curriculumState
          : curriculumState // ignore: cast_nullable_to_non_nullable
              as Status,
      lectureState: null == lectureState
          ? _value.lectureState
          : lectureState // ignore: cast_nullable_to_non_nullable
              as Status,
      curriculum: freezed == curriculum
          ? _value.curriculum
          : curriculum // ignore: cast_nullable_to_non_nullable
              as CourseCurriculumEntity?,
      currentLecture: freezed == currentLecture
          ? _value.currentLecture
          : currentLecture // ignore: cast_nullable_to_non_nullable
              as LectureContentEntity?,
      errorMessage: freezed == errorMessage
          ? _value.errorMessage
          : errorMessage // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc

class _$CourseLearningStateImpl implements _CourseLearningState {
  const _$CourseLearningStateImpl(
      {this.curriculumState = Status.initial,
      this.lectureState = Status.initial,
      this.curriculum,
      this.currentLecture,
      this.errorMessage});

  @override
  @JsonKey()
  final Status curriculumState;
  @override
  @JsonKey()
  final Status lectureState;
  @override
  final CourseCurriculumEntity? curriculum;
  @override
  final LectureContentEntity? currentLecture;
  @override
  final String? errorMessage;

  @override
  String toString() {
    return 'CourseLearningState(curriculumState: $curriculumState, lectureState: $lectureState, curriculum: $curriculum, currentLecture: $currentLecture, errorMessage: $errorMessage)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CourseLearningStateImpl &&
            (identical(other.curriculumState, curriculumState) ||
                other.curriculumState == curriculumState) &&
            (identical(other.lectureState, lectureState) ||
                other.lectureState == lectureState) &&
            (identical(other.curriculum, curriculum) ||
                other.curriculum == curriculum) &&
            (identical(other.currentLecture, currentLecture) ||
                other.currentLecture == currentLecture) &&
            (identical(other.errorMessage, errorMessage) ||
                other.errorMessage == errorMessage));
  }

  @override
  int get hashCode => Object.hash(runtimeType, curriculumState, lectureState,
      curriculum, currentLecture, errorMessage);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$CourseLearningStateImplCopyWith<_$CourseLearningStateImpl> get copyWith =>
      __$$CourseLearningStateImplCopyWithImpl<_$CourseLearningStateImpl>(
          this, _$identity);
}

abstract class _CourseLearningState implements CourseLearningState {
  const factory _CourseLearningState(
      {final Status curriculumState,
      final Status lectureState,
      final CourseCurriculumEntity? curriculum,
      final LectureContentEntity? currentLecture,
      final String? errorMessage}) = _$CourseLearningStateImpl;

  @override
  Status get curriculumState;
  @override
  Status get lectureState;
  @override
  CourseCurriculumEntity? get curriculum;
  @override
  LectureContentEntity? get currentLecture;
  @override
  String? get errorMessage;
  @override
  @JsonKey(ignore: true)
  _$$CourseLearningStateImplCopyWith<_$CourseLearningStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
