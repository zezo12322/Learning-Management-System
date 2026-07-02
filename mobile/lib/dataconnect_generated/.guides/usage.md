# Basic Usage

```dart
DefaultConnector.instance.GetQuizQuestions(getQuizQuestionsVariables).execute();
DefaultConnector.instance.StartQuizAttempt(startQuizAttemptVariables).execute();
DefaultConnector.instance.SubmitQuizAnswer(submitQuizAnswerVariables).execute();
DefaultConnector.instance.FinishQuizAttemptIfOpen(finishQuizAttemptIfOpenVariables).execute();
DefaultConnector.instance.GetExpiredAttempts().execute();
DefaultConnector.instance.GetUserQuizAttempts(getUserQuizAttemptsVariables).execute();
DefaultConnector.instance.GetQuizAttemptById(getQuizAttemptByIdVariables).execute();
DefaultConnector.instance.GetQuizQuestionPoints(getQuizQuestionPointsVariables).execute();
DefaultConnector.instance.GetAttemptAnswersWithCorrect(getAttemptAnswersWithCorrectVariables).execute();
DefaultConnector.instance.GetQuizSettings(getQuizSettingsVariables).execute();

```

## Optional Fields

Some operations may have optional fields. In these cases, the Flutter SDK exposes a builder method, and will have to be set separately.

Optional fields can be discovered based on classes that have `Optional` object types.

This is an example of a mutation with an optional field:

```dart
await DefaultConnector.instance.AdminUpdateRubricCriterion({ ... })
.criterionName(...)
.execute();
```

Note: the above example is a mutation, but the same logic applies to query operations as well. Additionally, `createMovie` is an example, and may not be available to the user.

