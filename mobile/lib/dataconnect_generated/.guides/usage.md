# Basic Usage

```dart
DefaultConnector.instance.MyCertificates().execute();
DefaultConnector.instance.VerifyCertificate(verifyCertificateVariables).execute();
DefaultConnector.instance.ListPublishedCourses().execute();
DefaultConnector.instance.GetCourseCurriculum(getCourseCurriculumVariables).execute();
DefaultConnector.instance.GetLectureContent(getLectureContentVariables).execute();
DefaultConnector.instance.GetUserLectureProgress(getUserLectureProgressVariables).execute();
DefaultConnector.instance.GetMyCourseProgress(getMyCourseProgressVariables).execute();
DefaultConnector.instance.GetCourseForEnrollment(getCourseForEnrollmentVariables).execute();
DefaultConnector.instance.AdminGetCourse(adminGetCourseVariables).execute();
DefaultConnector.instance.AdminListMyCourses().execute();

```

## Optional Fields

Some operations may have optional fields. In these cases, the Flutter SDK exposes a builder method, and will have to be set separately.

Optional fields can be discovered based on classes that have `Optional` object types.

This is an example of a mutation with an optional field:

```dart
await DefaultConnector.instance.AdminUpdateQuizOption({ ... })
.text(...)
.execute();
```

Note: the above example is a mutation, but the same logic applies to query operations as well. Additionally, `createMovie` is an example, and may not be available to the user.

