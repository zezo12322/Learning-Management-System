# Basic Usage

```dart
DefaultConnector.instance.EnrollInCourse(enrollInCourseVariables).execute();
DefaultConnector.instance.EnrollInMission(enrollInMissionVariables).execute();
DefaultConnector.instance.UpdateLectureProgress(updateLectureProgressVariables).execute();
DefaultConnector.instance.AdminUpsertLectureProgress(adminUpsertLectureProgressVariables).execute();
DefaultConnector.instance.GetLectureDuration(getLectureDurationVariables).execute();
DefaultConnector.instance.GetCourseCompletionStatus(getCourseCompletionStatusVariables).execute();
DefaultConnector.instance.GetCourseCompletionStatusForUser(getCourseCompletionStatusForUserVariables).execute();
DefaultConnector.instance.GetUserEnrollmentForCourseByUser(getUserEnrollmentForCourseByUserVariables).execute();
DefaultConnector.instance.UpdateEnrollmentStatus(updateEnrollmentStatusVariables).execute();
DefaultConnector.instance.GetUserEnrollmentForCourse(getUserEnrollmentForCourseVariables).execute();

```

## Optional Fields

Some operations may have optional fields. In these cases, the Flutter SDK exposes a builder method, and will have to be set separately.

Optional fields can be discovered based on classes that have `Optional` object types.

This is an example of a mutation with an optional field:

```dart
await DefaultConnector.instance.AdminUpdateLecture({ ... })
.title(...)
.execute();
```

Note: the above example is a mutation, but the same logic applies to query operations as well. Additionally, `createMovie` is an example, and may not be available to the user.

