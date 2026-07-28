part of 'generated.dart';

class DeleteUserRecordFnVariablesBuilder {
  String uid;

  final FirebaseDataConnect _dataConnect;
  DeleteUserRecordFnVariablesBuilder(this._dataConnect, {required  this.uid,});
  Deserializer<DeleteUserRecordFnData> dataDeserializer = (dynamic json)  => DeleteUserRecordFnData.fromJson(jsonDecode(json));
  Serializer<DeleteUserRecordFnVariables> varsSerializer = (DeleteUserRecordFnVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<DeleteUserRecordFnData, DeleteUserRecordFnVariables>> execute() {
    return ref().execute();
  }

  MutationRef<DeleteUserRecordFnData, DeleteUserRecordFnVariables> ref() {
    DeleteUserRecordFnVariables vars= DeleteUserRecordFnVariables(uid: uid,);
    return _dataConnect.mutation("DeleteUserRecordFn", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class DeleteUserRecordFnUserDelete {
  final String id;
  DeleteUserRecordFnUserDelete.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final DeleteUserRecordFnUserDelete otherTyped = other as DeleteUserRecordFnUserDelete;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  DeleteUserRecordFnUserDelete({
    required this.id,
  });
}

@immutable
class DeleteUserRecordFnData {
  final DeleteUserRecordFnUserDelete? user_delete;
  DeleteUserRecordFnData.fromJson(dynamic json):
  
  user_delete = json['user_delete'] == null ? null : DeleteUserRecordFnUserDelete.fromJson(json['user_delete']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final DeleteUserRecordFnData otherTyped = other as DeleteUserRecordFnData;
    return user_delete == otherTyped.user_delete;
    
  }
  @override
  int get hashCode => user_delete.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (user_delete != null) {
      json['user_delete'] = user_delete!.toJson();
    }
    return json;
  }

  DeleteUserRecordFnData({
    this.user_delete,
  });
}

@immutable
class DeleteUserRecordFnVariables {
  final String uid;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  DeleteUserRecordFnVariables.fromJson(Map<String, dynamic> json):
  
  uid = nativeFromJson<String>(json['uid']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final DeleteUserRecordFnVariables otherTyped = other as DeleteUserRecordFnVariables;
    return uid == otherTyped.uid;
    
  }
  @override
  int get hashCode => uid.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['uid'] = nativeToJson<String>(uid);
    return json;
  }

  DeleteUserRecordFnVariables({
    required this.uid,
  });
}

