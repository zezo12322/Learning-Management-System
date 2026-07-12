# Basic Usage

```dart
DefaultConnector.instance.LogPayment(logPaymentVariables).execute();
DefaultConnector.instance.AddPaymentItem(addPaymentItemVariables).execute();
DefaultConnector.instance.MyPaymentHistory().execute();
DefaultConnector.instance.GetPendingSubmissions().execute();
DefaultConnector.instance.GetMyPendingSubmissions().execute();
DefaultConnector.instance.AdminAddCourseInstructor(adminAddCourseInstructorVariables).execute();
DefaultConnector.instance.AdminRemoveCourseInstructor(adminRemoveCourseInstructorVariables).execute();
DefaultConnector.instance.GetCourseInstructors(getCourseInstructorsVariables).execute();
DefaultConnector.instance.GetMissionForEnrollment(getMissionForEnrollmentVariables).execute();
DefaultConnector.instance.SubmitMission(submitMissionVariables).execute();

```

## Optional Fields

Some operations may have optional fields. In these cases, the Flutter SDK exposes a builder method, and will have to be set separately.

Optional fields can be discovered based on classes that have `Optional` object types.

This is an example of a mutation with an optional field:

```dart
await DefaultConnector.instance.UpdateEnrollmentStatus({ ... })
.completedAt(...)
.execute();
```

Note: the above example is a mutation, but the same logic applies to query operations as well. Additionally, `createMovie` is an example, and may not be available to the user.

