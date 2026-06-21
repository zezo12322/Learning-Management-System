import 'package:firebase_auth/firebase_auth.dart';
import 'package:optimatech_lms/features/auth/domain/entities/user_entity.dart';

class UserModel{
  final String name;
  final String email;
  final String uId;
  
  UserModel({required this.name, required this.email, required this.uId});

  factory UserModel.fromFirebaseUser(User user) {
    return UserModel(
      name: user.displayName ?? '',
      email: user.email ?? '',
      uId: user.uid
    );
  }
  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
        name: json['name'],
        email: json['email'],
        uId: json['uId']
    );
  }
  factory UserModel.fromEntity(UserEntity userEntity){
    return UserModel(
      name: userEntity.name,
      email: userEntity.email,
      uId: userEntity.uId
    );
  }

  UserEntity toEntity(){
    return UserEntity(name: name, email: email, uId: uId);
  }
  Map<String, dynamic> toMap(){
    return{
      'name':name,
      'email': email,
      'uId': uId
    };
  }
}
