import 'package:optimatech_lms/features/courses/domain/entities/category_entity.dart';

class CategoryModel {
  final String id;
  final String name;
  final String description;

  CategoryModel({
    required this.id,
    required this.name,
    required this.description,
  });

  factory CategoryModel.fromConnectorResult(ListCategoriesCategories result,) {
    return CategoryModel(
      id: result.id,
      name: result.title,
      description: result.description,
    );
  }

  factory CategoryModel.fromJson(Map<String, dynamic> json) {
    return CategoryModel(
      id: json['id'] as String,
      name: json['name'] as String,
      description: json['description'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
    };
  }

  CategoryEntity toEntity() {
    return CategoryEntity(
      id: id,
      name: name,
      description: description,
    );
  }

}
