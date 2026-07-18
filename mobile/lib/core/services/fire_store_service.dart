import 'package:cloud_firestore/cloud_firestore.dart';

class FireStoreService {

  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Future<void> addData({required String collectionPath, String? docId, required Map<String, dynamic> data, bool merge = false}) async{
    if(docId != null){
      await _firestore.collection(collectionPath).doc(docId).set(data, SetOptions(merge: merge));
    }else{
      await _firestore.collection(collectionPath).add(data);
    }
  }

  Future<Map<String, dynamic>> getDataById({required String collectionPath, required String docId}) async{
    final DocumentSnapshot snapshot = await _firestore.collection(collectionPath).doc(docId).get();
    return snapshot.data() as Map<String, dynamic>;
  }

  Future<List<Map<String, dynamic>>> getDataByCollection({required String collectionPath}) async{
    final QuerySnapshot<Map<String, dynamic>> snapshot = await _firestore.collection(collectionPath).get();
    return snapshot.docs.map((doc) => doc.data()).toList();
  }
}