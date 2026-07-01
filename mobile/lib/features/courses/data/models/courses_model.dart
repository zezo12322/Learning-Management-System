import 'package:optimatech_lms/dataconnect_generated/generated.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';

import '../../domain/entities/courses_entity.dart';

class CourseModel {
  final String id;
  final String title;
  final int price;
  final String level;
  final String? thumbnail;
  final List<String> tags;
  final String categoryName;
  final List<CourseInstructorModel> instructors;

  const CourseModel({
    required this.id,
    required this.title,
    required this.price,
    required this.level,
    this.thumbnail,
    required this.tags,
    required this.categoryName,
    required this.instructors,
  });

  // ── from connector result ─────────────────────────────────────────────────

  /// Maps the SDK-generated [ListPublishedCoursesCourses] object directly.
  factory CourseModel.fromConnectorResult(ListPublishedCoursesCourses result) {
    return CourseModel(
      id: result.id,
      title: result.title,
      price: result.price,
      // EnumValue<CourseLevel> → readable string
      level: result.level.stringValue,
      thumbnail: result.thumbnail,
      tags: result.tags,
      categoryName: result.category.name,
      instructors: result.courseInstructors_on_course
          .map(
            (ci) => CourseInstructorModel(
          name: ci.user.name,
          avatar: ci.user.avatar,
        ),
      )
          .toList(),
    );
  }

  // ── from / to JSON (Hive offline cache) ──────────────────────────────────

  factory CourseModel.fromJson(Map<String, dynamic> json) {
    return CourseModel(
      id: json['id'] as String,
      title: json['title'] as String,
      price: json['price'] as int,
      level: json['level'] as String,
      thumbnail: json['thumbnail'] as String?,
      tags: List<String>.from(json['tags'] as List),
      categoryName: json['categoryName'] as String,
      instructors: (json['instructors'] as List)
          .map((e) => CourseInstructorModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'title': title,
    'price': price,
    'level': level,
    'thumbnail': thumbnail,
    'tags': tags,
    'categoryName': categoryName,
    'instructors': instructors.map((i) => i.toJson()).toList(),
  };

  // ── to entity ─────────────────────────────────────────────────────────────

  CourseEntity toEntity() => CourseEntity(
    id: id,
    title: title,
    price: price,
    courseStatus: 'PUBLISHED',
    language: '',
    level: level,
    thumbnail: thumbnail,
    categoryName: categoryName,
    tags: tags,
    instructors: instructors.map((i) => i.toEntity()).toList(),
  );
}

class CourseInstructorModel {
  final String name;
  final String? avatar;

  const CourseInstructorModel({required this.name, this.avatar});

  factory CourseInstructorModel.fromJson(Map<String, dynamic> json) =>
      CourseInstructorModel(
        name: json['name'] as String,
        avatar: json['avatar'] as String?,
      );

  Map<String, dynamic> toJson() => {'name': name, 'avatar': avatar};

  CourseInstructorEntity toEntity() =>
      CourseInstructorEntity(name: name, avatar: avatar);
}