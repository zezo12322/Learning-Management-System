import 'package:optimatech_lms/dataconnect_generated/generated.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';

class CourseModel {
  final String id;
  final String title;
  final double price;
  final String level;
  final String? thumbnail;
  final List<String> tags;
  final Category category;
  final Author author;

  const CourseModel({
    required this.id,
    required this.title,
    required this.price,
    required this.level,
    this.thumbnail,
    required this.tags,
    required this.category,
    required this.author,
  });

  factory CourseModel.fromConnectorResult(
      ListPublishedCoursesCourses result,
      ) {
    return CourseModel(
      id: result.id,
      title: result.title,
      price: result.price.toDouble(),
      level: result.level.stringValue,
      thumbnail: result.thumbnail,
      tags: result.tags,
      category: Category(name: result.category.name),
      author: Author(
        name: result.author.name,
        avatar: result.author.avatar,
      ),
    );
  }

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