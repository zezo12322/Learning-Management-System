import 'package:optimatech_lms/core/network/api_service.dart';
import 'package:optimatech_lms/features/course_details/data/models/course_curriculum_model.dart';
import 'package:optimatech_lms/features/course_details/domain/entities/course_curriculum_entity.dart';
import 'package:firebase_auth/firebase_auth.dart';

abstract class CourseDetailsRemoteDataSource {
  Future<CourseCurriculumModel> getCourseCurriculum(String courseId);
  Future<void> enrollInCourse(String courseId);
  Future<String> createCourseCheckoutUrl({
    required String courseId,
    required int amountCents,
  });
  Future<bool> isEnrolledInCourse(String courseId);
}

class CourseDetailsRemoteDataSourceImpl
    implements CourseDetailsRemoteDataSource {
  final ApiService apiService;

  const CourseDetailsRemoteDataSourceImpl({required this.apiService});

  @override
  Future<CourseCurriculumModel> getCourseCurriculum(String courseId) async {
    try {
      final user = FirebaseAuth.instance.currentUser;
      if (user != null) {
        final token = await user.getIdToken();
        if (token != null) {
          apiService.setAuthToken(token);
        }
      }
      final formattedCourseId = courseId.length == 32 && !courseId.contains('-')
          ? '${courseId.substring(0, 8)}-${courseId.substring(8, 12)}-${courseId.substring(12, 16)}-${courseId.substring(16, 20)}-${courseId.substring(20)}'
          : courseId;
      final response = await apiService.get('/catalog/courses/$formattedCourseId/curriculum');
      return CourseCurriculumModel.fromJson(response.data, courseId);
    } catch (e) {
      throw Exception('Failed to fetch course curriculum: $e');
    }
  }

  @override
  Future<void> enrollInCourse(String courseId) async {
    try {
      final user = FirebaseAuth.instance.currentUser;
      if (user != null) {
        final token = await user.getIdToken();
        if (token != null) {
          apiService.setAuthToken(token);
        }
      }
      final formattedCourseId = courseId.length == 32 && !courseId.contains('-')
          ? '${courseId.substring(0, 8)}-${courseId.substring(8, 12)}-${courseId.substring(12, 16)}-${courseId.substring(16, 20)}-${courseId.substring(20)}'
          : courseId;
      await apiService.post('/courses/$formattedCourseId/enroll', data: {});
    } catch (e) {
      throw Exception('Failed to enroll in course: $e');
    }
  }

  @override
  Future<String> createCourseCheckoutUrl({
    required String courseId,
    required int amountCents,
  }) async {
    try {
      final user = FirebaseAuth.instance.currentUser;
      if (user != null) {
        final token = await user.getIdToken();
        if (token != null) {
          apiService.setAuthToken(token);
        }
      }

      // Paymob requires every billing field to be present; fall back to the
      // same placeholders the backend uses when a field is unknown.
      final nameParts = (user?.displayName ?? '')
          .trim()
          .split(RegExp(r'\s+'))
          .where((part) => part.isNotEmpty)
          .toList();
      final billingData = {
        'apartment': 'NA',
        'email': user?.email ?? 'unknown@example.com',
        'floor': 'NA',
        'first_name': nameParts.isNotEmpty ? nameParts.first : 'Customer',
        'street': 'NA',
        'building': 'NA',
        'phone_number': user?.phoneNumber ?? '+201000000000',
        'shipping_method': 'NA',
        'postal_code': 'NA',
        'city': 'Cairo',
        'country': 'EG',
        'last_name':
            nameParts.length > 1 ? nameParts.sublist(1).join(' ') : 'Name',
        'state': 'NA',
      };

      final formattedCourseId = _formatUuid(courseId);
      // The endpoint answers 302 → Location = Paymob unified checkout URL.
      final response = await apiService.postNoRedirect(
        '/payments/checkout',
        data: {
          'amountCents': amountCents,
          'items': [
            {
              'targetType': 'COURSE',
              'courseId': formattedCourseId,
              'price': amountCents,
            },
          ],
          'billingData': billingData,
        },
      );

      final checkoutUrl = response.headers.value('location');
      if (checkoutUrl == null || checkoutUrl.isEmpty) {
        throw Exception('Checkout URL missing from payment response');
      }
      return checkoutUrl;
    } catch (e) {
      throw Exception('Failed to start course checkout: $e');
    }
  }

  @override
  Future<bool> isEnrolledInCourse(String courseId) async {
    try {
      final user = FirebaseAuth.instance.currentUser;
      if (user != null) {
        final token = await user.getIdToken();
        if (token != null) {
          apiService.setAuthToken(token);
        }
      }
      final formattedCourseId = _formatUuid(courseId);
      // Returns the enrollment object, or null/empty when not enrolled.
      final response =
          await apiService.get('/courses/$formattedCourseId/enrollment');
      final data = response.data;
      return data is Map && data['id'] != null;
    } catch (e) {
      throw Exception('Failed to check course enrollment: $e');
    }
  }

  String _formatUuid(String courseId) {
    return courseId.length == 32 && !courseId.contains('-')
        ? '${courseId.substring(0, 8)}-${courseId.substring(8, 12)}-${courseId.substring(12, 16)}-${courseId.substring(16, 20)}-${courseId.substring(20)}'
        : courseId;
  }
}

