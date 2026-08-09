import 'package:optimatech_lms/core/utils/money.dart';
import 'package:optimatech_lms/dataconnect_generated/generated.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';

class CourseModel {
  final String id;
  final String title;

  /// Price in **pounds**, converted from the API's piastres exactly once, in
  /// [CourseModel.fromConnectorResult]. See `core/utils/money.dart`.
  final double price;
  final String level;
  final String? thumbnail;
  final List<String> tags;
  final Category category;
  final Author author;
  final double avgRating;
  final int ratingCount;
  final int enrollmentCount;

  const CourseModel({
    required this.id,
    required this.title,
    required this.price,
    required this.level,
    this.thumbnail,
    required this.tags,
    required this.category,
    required this.author,
    required this.avgRating,
    required this.ratingCount,
    required this.enrollmentCount,
  });

  factory CourseModel.fromConnectorResult(
      ListPublishedCoursesCourses result,
      ) {
    return CourseModel(
      id: result.id,
      title: result.title,
      price: egpFromPiastres(result.price),
      level: result.level.stringValue,
      thumbnail: result.thumbnail,
      tags: result.tags,
      category: Category(name: result.category.name),
      author: Author(
        name: result.author.name,
        avatar: result.author.avatar,
      ),
      avgRating: result.avgRating.toDouble(),
      ratingCount: result.ratingCount,
      enrollmentCount: 0,
    );
  }

  /// Round-trips [toJson], which writes the already-converted pound value — so
  /// `price` is read verbatim here. Converting again would divide twice.
  factory CourseModel.fromJson(Map<String, dynamic> json) {
    return CourseModel(
      id: json['id'] as String,
      title: json['title'] as String,
      price: (json['price'] as num).toDouble(),
      level: json['level'] as String,
      thumbnail: json['thumbnail'] as String?,
      tags: List<String>.from(json['tags'] ?? const []),
      category: Category.fromJson(
        json['category'] as Map<String, dynamic>,
      ),
      author: Author.fromJson(
        json['author'] as Map<String, dynamic>,
      ),
      avgRating: (json['avgRating'] as num).toDouble(),
      ratingCount: json['ratingCount'] as int,
      enrollmentCount: json['enrollmentCount'] as int? ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'price': price,
      'level': level,
      'thumbnail': thumbnail,
      'tags': tags,
      'category': category.toJson(),
      'author': author.toJson(),
      'avgRating': avgRating,
      'ratingCount': ratingCount,
      'enrollmentCount': enrollmentCount,
    };
  }

  CourseEntity toEntity() {
    return CourseEntity(
      id: id,
      title: title,
      price: price,
      courseStatus: 'PUBLISHED',
      language: '',
      level: level,
      thumbnail: thumbnail,
      categoryName: category.name,
      tags: tags,
      instructors: [
        CourseInstructorEntity(
          name: author.name,
          avatar: author.avatar,
        ),
      ],
      avgRating: avgRating,
      ratingCount: ratingCount,
      enrollmentCount: enrollmentCount,
    );
  }
}

class Author {
  final String name;
  final String? avatar;

  const Author({
    required this.name,
    this.avatar,
  });

  factory Author.fromJson(Map<String, dynamic> json) {
    return Author(
      name: json['name'] as String,
      avatar: json['avatar'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'avatar': avatar,
    };
  }
}

class Category {
  final String name;

  const Category({
    required this.name,
  });

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
      name: json['name'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
    };
  }
}