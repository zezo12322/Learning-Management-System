import 'package:easy_localization/easy_localization.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:google_sign_in/google_sign_in.dart';

class FirebaseAuthService {
  User? get currentUser => FirebaseAuth.instance.currentUser;

  Future<User> signInWithEmailPassword({required String email, required String password}) async{
    try{
      final credential = await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      return credential.user!;
    } on FirebaseAuthException catch (e){
      if (e.code == 'user-not-found' || e.code == 'wrong-password') {
        throw CustomExceptions(message: 'auth.error.invalidEmailOrPassword'.tr());
      }else if (e.code == 'invalid-credential') {
        throw CustomExceptions(message: 'auth.error.invalidCredential'.tr());
      }else if (e.code == 'network-request-failed') {
        throw CustomExceptions(message: 'auth.error.networkError'.tr());
      }else{
        throw CustomExceptions(message: 'auth.error.genericError'.tr());
      }
    } catch (e){
      throw CustomExceptions(message: 'auth.error.genericError'.tr());
    }
  }
  Future<User> signInWithGoogle() async {
    try{
      // Trigger the authentication flow
      final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();

      // Obtain the auth details from the request
      final GoogleSignInAuthentication? googleAuth = await googleUser?.authentication;

      // Create a new credential
      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth?.accessToken,
        idToken: googleAuth?.idToken,
      );

      // Once signed in, return the UserCredential
      return (await FirebaseAuth.instance.signInWithCredential(credential)).user!;
    }catch (e){
      throw CustomExceptions(message: 'auth.error.genericError'.tr());
    }
  }

  Future<void> sendPasswordResetEmail({required String email}) async {
    try {
      await FirebaseAuth.instance.sendPasswordResetEmail(email: email);
    } on FirebaseAuthException catch (e) {
      // Don't reveal whether an account exists — treat "user-not-found" as
      // success so the UI shows a neutral "check your email" message.
      if (e.code == 'user-not-found') return;
      if (e.code == 'invalid-email') {
        throw CustomExceptions(message: 'auth.validation.email_not_match'.tr());
      } else if (e.code == 'network-request-failed') {
        throw CustomExceptions(message: 'auth.error.networkError'.tr());
      } else {
        throw CustomExceptions(message: 'auth.error.genericError'.tr());
      }
    } catch (e) {
      throw CustomExceptions(message: 'auth.error.genericError'.tr());
    }
  }

  Future<User> createUserWithEmailPassword({required String email, required String password}) async{
    try{
      final credential = await FirebaseAuth.instance.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      return credential.user!;
    } on FirebaseAuthException catch (e){
      if (e.code == 'weak-password') {
        throw CustomExceptions(message: 'auth.error.weakPassword'.tr());
      } else if (e.code == 'email-already-in-use') {
        throw CustomExceptions(message: 'auth.error.emailAlreadyInUse'.tr());
      }else if (e.code == 'network-request-failed') {
        throw CustomExceptions(message: 'auth.error.networkError'.tr());
      }else{
        throw CustomExceptions(message: 'auth.error.genericError'.tr());
      }
    } catch (e){
      throw CustomExceptions(message: 'auth.error.genericError'.tr());
    }
  }
}


