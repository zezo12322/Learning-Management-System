// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'courses_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

/// @nodoc
mixin _$CoursesState {
  CoursesStatus get status => throw _privateConstructorUsedError;
  List<CourseEntity> get allCourses => throw _privateConstructorUsedError;
  List<CourseEntity> get filteredCourses => throw _privateConstructorUsedError;
  int get selectedCategoryIndex => throw _privateConstructorUsedError;
  CourseFilterChip get selectedFilter => throw _privateConstructorUsedError;
  Set<String> get bookmarkedIds => throw _privateConstructorUsedError;
  String? get errorMessage => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $CoursesStateCopyWith<CoursesState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CoursesStateCopyWith<$Res> {
  factory $CoursesStateCopyWith(
          CoursesState value, $Res Function(CoursesState) then) =
      _$CoursesStateCopyWithImpl<$Res, CoursesState>;
  @useResult
  $Res call(
      {CoursesStatus status,
      List<CourseEntity> allCourses,
      List<CourseEntity> filteredCourses,
      int selectedCategoryIndex,
      CourseFilterChip selectedFilter,
      Set<String> bookmarkedIds,
      String? errorMessage});
}

/// @nodoc
class _$CoursesStateCopyWithImpl<$Res, $Val extends CoursesState>
    implements $CoursesStateCopyWith<$Res> {
  _$CoursesStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? status = null,
    Object? allCourses = null,
    Object? filteredCourses = null,
    Object? selectedCategoryIndex = null,
    Object? selectedFilter = null,
    Object? bookmarkedIds = null,
    Object? errorMessage = freezed,
  }) {
    return _then(_value.copyWith(
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as CoursesStatus,
      allCourses: null == allCourses
          ? _value.allCourses
          : allCourses // ignore: cast_nullable_to_non_nullable
              as List<CourseEntity>,
      filteredCourses: null == filteredCourses
          ? _value.filteredCourses
          : filteredCourses // ignore: cast_nullable_to_non_nullable
              as List<CourseEntity>,
      selectedCategoryIndex: null == selectedCategoryIndex
          ? _value.selectedCategoryIndex
          : selectedCategoryIndex // ignore: cast_nullable_to_non_nullable
              as int,
      selectedFilter: null == selectedFilter
          ? _value.selectedFilter
          : selectedFilter // ignore: cast_nullable_to_non_nullable
              as CourseFilterChip,
      bookmarkedIds: null == bookmarkedIds
          ? _value.bookmarkedIds
          : bookmarkedIds // ignore: cast_nullable_to_non_nullable
              as Set<String>,
      errorMessage: freezed == errorMessage
          ? _value.errorMessage
          : errorMessage // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$CoursesStateImplCopyWith<$Res>
    implements $CoursesStateCopyWith<$Res> {
  factory _$$CoursesStateImplCopyWith(
          _$CoursesStateImpl value, $Res Function(_$CoursesStateImpl) then) =
      __$$CoursesStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {CoursesStatus status,
      List<CourseEntity> allCourses,
      List<CourseEntity> filteredCourses,
      int selectedCategoryIndex,
      CourseFilterChip selectedFilter,
      Set<String> bookmarkedIds,
      String? errorMessage});
}

/// @nodoc
class __$$CoursesStateImplCopyWithImpl<$Res>
    extends _$CoursesStateCopyWithImpl<$Res, _$CoursesStateImpl>
    implements _$$CoursesStateImplCopyWith<$Res> {
  __$$CoursesStateImplCopyWithImpl(
      _$CoursesStateImpl _value, $Res Function(_$CoursesStateImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? status = null,
    Object? allCourses = null,
    Object? filteredCourses = null,
    Object? selectedCategoryIndex = null,
    Object? selectedFilter = null,
    Object? bookmarkedIds = null,
    Object? errorMessage = freezed,
  }) {
    return _then(_$CoursesStateImpl(
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as CoursesStatus,
      allCourses: null == allCourses
          ? _value._allCourses
          : allCourses // ignore: cast_nullable_to_non_nullable
              as List<CourseEntity>,
      filteredCourses: null == filteredCourses
          ? _value._filteredCourses
          : filteredCourses // ignore: cast_nullable_to_non_nullable
              as List<CourseEntity>,
      selectedCategoryIndex: null == selectedCategoryIndex
          ? _value.selectedCategoryIndex
          : selectedCategoryIndex // ignore: cast_nullable_to_non_nullable
              as int,
      selectedFilter: null == selectedFilter
          ? _value.selectedFilter
          : selectedFilter // ignore: cast_nullable_to_non_nullable
              as CourseFilterChip,
      bookmarkedIds: null == bookmarkedIds
          ? _value._bookmarkedIds
          : bookmarkedIds // ignore: cast_nullable_to_non_nullable
              as Set<String>,
      errorMessage: freezed == errorMessage
          ? _value.errorMessage
          : errorMessage // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc

class _$CoursesStateImpl implements _CoursesState {
  const _$CoursesStateImpl(
      {this.status = CoursesStatus.initial,
      final List<CourseEntity> allCourses = const <CourseEntity>[],
      final List<CourseEntity> filteredCourses = const <CourseEntity>[],
      this.selectedCategoryIndex = 0,
      this.selectedFilter = CourseFilterChip.all,
      final Set<String> bookmarkedIds = const <String>{},
      this.errorMessage})
      : _allCourses = allCourses,
        _filteredCourses = filteredCourses,
        _bookmarkedIds = bookmarkedIds;

  @override
  @JsonKey()
  final CoursesStatus status;
  final List<CourseEntity> _allCourses;
  @override
  @JsonKey()
  List<CourseEntity> get allCourses {
    if (_allCourses is EqualUnmodifiableListView) return _allCourses;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_allCourses);
  }

  final List<CourseEntity> _filteredCourses;
  @override
  @JsonKey()
  List<CourseEntity> get filteredCourses {
    if (_filteredCourses is EqualUnmodifiableListView) return _filteredCourses;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_filteredCourses);
  }

  @override
  @JsonKey()
  final int selectedCategoryIndex;
  @override
  @JsonKey()
  final CourseFilterChip selectedFilter;
  final Set<String> _bookmarkedIds;
  @override
  @JsonKey()
  Set<String> get bookmarkedIds {
    if (_bookmarkedIds is EqualUnmodifiableSetView) return _bookmarkedIds;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableSetView(_bookmarkedIds);
  }

  @override
  final String? errorMessage;

  @override
  String toString() {
    return 'CoursesState(status: $status, allCourses: $allCourses, filteredCourses: $filteredCourses, selectedCategoryIndex: $selectedCategoryIndex, selectedFilter: $selectedFilter, bookmarkedIds: $bookmarkedIds, errorMessage: $errorMessage)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CoursesStateImpl &&
            (identical(other.status, status) || other.status == status) &&
            const DeepCollectionEquality()
                .equals(other._allCourses, _allCourses) &&
            const DeepCollectionEquality()
                .equals(other._filteredCourses, _filteredCourses) &&
            (identical(other.selectedCategoryIndex, selectedCategoryIndex) ||
                other.selectedCategoryIndex == selectedCategoryIndex) &&
            (identical(other.selectedFilter, selectedFilter) ||
                other.selectedFilter == selectedFilter) &&
            const DeepCollectionEquality()
                .equals(other._bookmarkedIds, _bookmarkedIds) &&
            (identical(other.errorMessage, errorMessage) ||
                other.errorMessage == errorMessage));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType,
      status,
      const DeepCollectionEquality().hash(_allCourses),
      const DeepCollectionEquality().hash(_filteredCourses),
      selectedCategoryIndex,
      selectedFilter,
      const DeepCollectionEquality().hash(_bookmarkedIds),
      errorMessage);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$CoursesStateImplCopyWith<_$CoursesStateImpl> get copyWith =>
      __$$CoursesStateImplCopyWithImpl<_$CoursesStateImpl>(this, _$identity);
}

abstract class _CoursesState implements CoursesState {
  const factory _CoursesState(
      {final CoursesStatus status,
      final List<CourseEntity> allCourses,
      final List<CourseEntity> filteredCourses,
      final int selectedCategoryIndex,
      final CourseFilterChip selectedFilter,
      final Set<String> bookmarkedIds,
      final String? errorMessage}) = _$CoursesStateImpl;

  @override
  CoursesStatus get status;
  @override
  List<CourseEntity> get allCourses;
  @override
  List<CourseEntity> get filteredCourses;
  @override
  int get selectedCategoryIndex;
  @override
  CourseFilterChip get selectedFilter;
  @override
  Set<String> get bookmarkedIds;
  @override
  String? get errorMessage;
  @override
  @JsonKey(ignore: true)
  _$$CoursesStateImplCopyWith<_$CoursesStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
