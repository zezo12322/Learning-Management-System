# Basic Usage

```dart
DefaultConnector.instance.InstructorDeleteCourse(instructorDeleteCourseVariables).execute();
DefaultConnector.instance.SuperAdminDeleteCourse(superAdminDeleteCourseVariables).execute();
DefaultConnector.instance.AdminCreateSession(adminCreateSessionVariables).execute();
DefaultConnector.instance.InstructorCancelSession(instructorCancelSessionVariables).execute();
DefaultConnector.instance.SuperAdminCancelSession(superAdminCancelSessionVariables).execute();
DefaultConnector.instance.AdminCreateSubscriptionTier(adminCreateSubscriptionTierVariables).execute();
DefaultConnector.instance.AdminDeprecateSubscriptionTier(adminDeprecateSubscriptionTierVariables).execute();
DefaultConnector.instance.AdminCreateCategory(adminCreateCategoryVariables).execute();
DefaultConnector.instance.GetUserClaims(getUserClaimsVariables).execute();
DefaultConnector.instance.MyCertificates().execute();

```

## Optional Fields

Some operations may have optional fields. In these cases, the Flutter SDK exposes a builder method, and will have to be set separately.

Optional fields can be discovered based on classes that have `Optional` object types.

This is an example of a mutation with an optional field:

```dart
await DefaultConnector.instance.UpdateMyProfile({ ... })
.bio(...)
.execute();
```

Note: the above example is a mutation, but the same logic applies to query operations as well. Additionally, `createMovie` is an example, and may not be available to the user.

