part of 'generated.dart';

class AdminCreateCategoryVariablesBuilder {
  String name;
  Optional<String> _description = Optional.optional(nativeFromJson, nativeToJson);

  final FirebaseDataConnect _dataConnect;  AdminCreateCategoryVariablesBuilder description(String? t) {
   _description.value = t;
   return this;
  }

  AdminCreateCategoryVariablesBuilder(this._dataConnect, {required  this.name,});
  Deserializer<AdminCreateCategoryData> dataDeserializer = (dynamic json)  => AdminCreateCategoryData.fromJson(jsonDecode(json));
  Serializer<AdminCreateCategoryVariables> varsSerializer = (AdminCreateCategoryVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminCreateCategoryData, AdminCreateCategoryVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminCreateCategoryData, AdminCreateCategoryVariables> ref() {
    AdminCreateCategoryVariables vars= AdminCreateCategoryVariables(name: name,description: _description,);
    return _dataConnect.mutation("AdminCreateCategory", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminCreateCategoryCategoryInsert {
  final String id;
  AdminCreateCategoryCategoryInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateCategoryCategoryInsert otherTyped = other as AdminCreateCategoryCategoryInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminCreateCategoryCategoryInsert({
    required this.id,
  });
}

@immutable
class AdminCreateCategoryData {
  final AdminCreateCategoryCategoryInsert category_insert;
  AdminCreateCategoryData.fromJson(dynamic json):
  
  category_insert = AdminCreateCategoryCategoryInsert.fromJson(json['category_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateCategoryData otherTyped = other as AdminCreateCategoryData;
    return category_insert == otherTyped.category_insert;
    
  }
  @override
  int get hashCode => category_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['category_insert'] = category_insert.toJson();
    return json;
  }

  AdminCreateCategoryData({
    required this.category_insert,
  });
}

@immutable
class AdminCreateCategoryVariables {
  final String name;
  late final Optional<String>description;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminCreateCategoryVariables.fromJson(Map<String, dynamic> json):
  
  name = nativeFromJson<String>(json['name']) {
  
  
  
    description = Optional.optional(nativeFromJson, nativeToJson);
    description.value = json['description'] == null ? null : nativeFromJson<String>(json['description']);
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateCategoryVariables otherTyped = other as AdminCreateCategoryVariables;
    return name == otherTyped.name && 
    description == otherTyped.description;
    
  }
  @override
  int get hashCode => Object.hashAll([name.hashCode, description.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['name'] = nativeToJson<String>(name);
    if(description.state == OptionalState.set) {
      json['description'] = description.toJson();
    }
    return json;
  }

  AdminCreateCategoryVariables({
    required this.name,
    required this.description,
  });
}

