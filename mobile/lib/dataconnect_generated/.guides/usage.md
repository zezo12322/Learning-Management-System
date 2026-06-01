# Basic Usage

```dart
DefaultConnector.instance.ListPublishedCourses().execute();
DefaultConnector.instance.GetCourseCurriculum(getCourseCurriculumVariables).execute();
DefaultConnector.instance.GetPendingSubmissions().execute();
DefaultConnector.instance.SubmitMission(submitMissionVariables).execute();
DefaultConnector.instance.GradeSubmission(gradeSubmissionVariables).execute();
DefaultConnector.instance.AddCriterionScore(addCriterionScoreVariables).execute();
DefaultConnector.instance.MySubmissions().execute();
DefaultConnector.instance.GetQuizQuestions(getQuizQuestionsVariables).execute();
DefaultConnector.instance.StartQuizAttempt(startQuizAttemptVariables).execute();
DefaultConnector.instance.SubmitQuizAnswer(submitQuizAnswerVariables).execute();

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

