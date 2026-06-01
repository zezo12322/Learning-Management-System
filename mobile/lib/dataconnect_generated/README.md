# dataconnect_generated SDK

## Installation
```sh
flutter pub get firebase_data_connect
flutterfire configure
```
For more information, see [Flutter for Firebase installation documentation](https://firebase.google.com/docs/data-connect/flutter-sdk#use-core).

## Data Connect instance
Each connector creates a static class, with an instance of the `DataConnect` class that can be used to connect to your Data Connect backend and call operations.

### Connecting to the emulator

```dart
String host = 'localhost'; // or your host name
int port = 9399; // or your port number
DefaultConnector.instance.dataConnect.useDataConnectEmulator(host, port);
```

You can also call queries and mutations by using the connector class.
## Queries

### MyCertificates
#### Required Arguments
```dart
// No required arguments
DefaultConnector.instance.myCertificates().execute();
```



#### Return Type
`execute()` returns a `QueryResult<MyCertificatesData, void>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

/// Result of a query request. Created to hold extra variables in the future.
class QueryResult<Data, Variables> extends OperationResult<Data, Variables> {
  QueryResult(super.dataConnect, super.data, super.ref);
}

final result = await DefaultConnector.instance.myCertificates();
MyCertificatesData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
final ref = DefaultConnector.instance.myCertificates().ref();
ref.execute();

ref.subscribe(...);
```


### VerifyCertificate
#### Required Arguments
```dart
String hash = ...;
DefaultConnector.instance.verifyCertificate(
  hash: hash,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<VerifyCertificateData, VerifyCertificateVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

/// Result of a query request. Created to hold extra variables in the future.
class QueryResult<Data, Variables> extends OperationResult<Data, Variables> {
  QueryResult(super.dataConnect, super.data, super.ref);
}

final result = await DefaultConnector.instance.verifyCertificate(
  hash: hash,
);
VerifyCertificateData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String hash = ...;

final ref = DefaultConnector.instance.verifyCertificate(
  hash: hash,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetPendingSubmissions
#### Required Arguments
```dart
// No required arguments
DefaultConnector.instance.getPendingSubmissions().execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetPendingSubmissionsData, void>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

/// Result of a query request. Created to hold extra variables in the future.
class QueryResult<Data, Variables> extends OperationResult<Data, Variables> {
  QueryResult(super.dataConnect, super.data, super.ref);
}

final result = await DefaultConnector.instance.getPendingSubmissions();
GetPendingSubmissionsData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
final ref = DefaultConnector.instance.getPendingSubmissions().ref();
ref.execute();

ref.subscribe(...);
```


### GetQuizQuestions
#### Required Arguments
```dart
String lectureId = ...;
DefaultConnector.instance.getQuizQuestions(
  lectureId: lectureId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetQuizQuestionsData, GetQuizQuestionsVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

/// Result of a query request. Created to hold extra variables in the future.
class QueryResult<Data, Variables> extends OperationResult<Data, Variables> {
  QueryResult(super.dataConnect, super.data, super.ref);
}

final result = await DefaultConnector.instance.getQuizQuestions(
  lectureId: lectureId,
);
GetQuizQuestionsData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String lectureId = ...;

final ref = DefaultConnector.instance.getQuizQuestions(
  lectureId: lectureId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetCourseSessions
#### Required Arguments
```dart
String courseId = ...;
DefaultConnector.instance.getCourseSessions(
  courseId: courseId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetCourseSessionsData, GetCourseSessionsVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

/// Result of a query request. Created to hold extra variables in the future.
class QueryResult<Data, Variables> extends OperationResult<Data, Variables> {
  QueryResult(super.dataConnect, super.data, super.ref);
}

final result = await DefaultConnector.instance.getCourseSessions(
  courseId: courseId,
);
GetCourseSessionsData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;

final ref = DefaultConnector.instance.getCourseSessions(
  courseId: courseId,
).ref();
ref.execute();

ref.subscribe(...);
```


### ListPublishedCourses
#### Required Arguments
```dart
// No required arguments
DefaultConnector.instance.listPublishedCourses().execute();
```



#### Return Type
`execute()` returns a `QueryResult<ListPublishedCoursesData, void>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

/// Result of a query request. Created to hold extra variables in the future.
class QueryResult<Data, Variables> extends OperationResult<Data, Variables> {
  QueryResult(super.dataConnect, super.data, super.ref);
}

final result = await DefaultConnector.instance.listPublishedCourses();
ListPublishedCoursesData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
final ref = DefaultConnector.instance.listPublishedCourses().ref();
ref.execute();

ref.subscribe(...);
```


### GetCourseCurriculum
#### Required Arguments
```dart
String courseId = ...;
DefaultConnector.instance.getCourseCurriculum(
  courseId: courseId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetCourseCurriculumData, GetCourseCurriculumVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

/// Result of a query request. Created to hold extra variables in the future.
class QueryResult<Data, Variables> extends OperationResult<Data, Variables> {
  QueryResult(super.dataConnect, super.data, super.ref);
}

final result = await DefaultConnector.instance.getCourseCurriculum(
  courseId: courseId,
);
GetCourseCurriculumData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;

final ref = DefaultConnector.instance.getCourseCurriculum(
  courseId: courseId,
).ref();
ref.execute();

ref.subscribe(...);
```


### MyPaymentHistory
#### Required Arguments
```dart
// No required arguments
DefaultConnector.instance.myPaymentHistory().execute();
```



#### Return Type
`execute()` returns a `QueryResult<MyPaymentHistoryData, void>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

/// Result of a query request. Created to hold extra variables in the future.
class QueryResult<Data, Variables> extends OperationResult<Data, Variables> {
  QueryResult(super.dataConnect, super.data, super.ref);
}

final result = await DefaultConnector.instance.myPaymentHistory();
MyPaymentHistoryData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
final ref = DefaultConnector.instance.myPaymentHistory().ref();
ref.execute();

ref.subscribe(...);
```


### MySubmissions
#### Required Arguments
```dart
// No required arguments
DefaultConnector.instance.mySubmissions().execute();
```



#### Return Type
`execute()` returns a `QueryResult<MySubmissionsData, void>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

/// Result of a query request. Created to hold extra variables in the future.
class QueryResult<Data, Variables> extends OperationResult<Data, Variables> {
  QueryResult(super.dataConnect, super.data, super.ref);
}

final result = await DefaultConnector.instance.mySubmissions();
MySubmissionsData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
final ref = DefaultConnector.instance.mySubmissions().ref();
ref.execute();

ref.subscribe(...);
```


### GetMe
#### Required Arguments
```dart
// No required arguments
DefaultConnector.instance.getMe().execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetMeData, void>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

/// Result of a query request. Created to hold extra variables in the future.
class QueryResult<Data, Variables> extends OperationResult<Data, Variables> {
  QueryResult(super.dataConnect, super.data, super.ref);
}

final result = await DefaultConnector.instance.getMe();
GetMeData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
final ref = DefaultConnector.instance.getMe().ref();
ref.execute();

ref.subscribe(...);
```

## Mutations

### EnrollInCourse
#### Required Arguments
```dart
String courseId = ...;
DefaultConnector.instance.enrollInCourse(
  courseId: courseId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<EnrollInCourseData, EnrollInCourseVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.enrollInCourse(
  courseId: courseId,
);
EnrollInCourseData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;

final ref = DefaultConnector.instance.enrollInCourse(
  courseId: courseId,
).ref();
ref.execute();
```


### EnrollInMission
#### Required Arguments
```dart
String missionId = ...;
DefaultConnector.instance.enrollInMission(
  missionId: missionId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<EnrollInMissionData, EnrollInMissionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.enrollInMission(
  missionId: missionId,
);
EnrollInMissionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String missionId = ...;

final ref = DefaultConnector.instance.enrollInMission(
  missionId: missionId,
).ref();
ref.execute();
```


### UpdateLectureProgress
#### Required Arguments
```dart
String lectureId = ...;
int lastWatchedSecond = ...;
DefaultConnector.instance.updateLectureProgress(
  lectureId: lectureId,
  lastWatchedSecond: lastWatchedSecond,
).execute();
```

#### Optional Arguments
We return a builder for each query. For UpdateLectureProgress, we created `UpdateLectureProgressBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class UpdateLectureProgressVariablesBuilder {
  ...
   UpdateLectureProgressVariablesBuilder completedAt(Timestamp? t) {
   _completedAt.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.updateLectureProgress(
  lectureId: lectureId,
  lastWatchedSecond: lastWatchedSecond,
)
.completedAt(completedAt)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<UpdateLectureProgressData, UpdateLectureProgressVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.updateLectureProgress(
  lectureId: lectureId,
  lastWatchedSecond: lastWatchedSecond,
);
UpdateLectureProgressData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String lectureId = ...;
int lastWatchedSecond = ...;

final ref = DefaultConnector.instance.updateLectureProgress(
  lectureId: lectureId,
  lastWatchedSecond: lastWatchedSecond,
).ref();
ref.execute();
```


### StartQuizAttempt
#### Required Arguments
```dart
String quizId = ...;
DefaultConnector.instance.startQuizAttempt(
  quizId: quizId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<StartQuizAttemptData, StartQuizAttemptVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.startQuizAttempt(
  quizId: quizId,
);
StartQuizAttemptData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String quizId = ...;

final ref = DefaultConnector.instance.startQuizAttempt(
  quizId: quizId,
).ref();
ref.execute();
```


### SubmitQuizAnswer
#### Required Arguments
```dart
String attemptId = ...;
String questionId = ...;
int selectedIndex = ...;
DefaultConnector.instance.submitQuizAnswer(
  attemptId: attemptId,
  questionId: questionId,
  selectedIndex: selectedIndex,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<SubmitQuizAnswerData, SubmitQuizAnswerVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.submitQuizAnswer(
  attemptId: attemptId,
  questionId: questionId,
  selectedIndex: selectedIndex,
);
SubmitQuizAnswerData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String attemptId = ...;
String questionId = ...;
int selectedIndex = ...;

final ref = DefaultConnector.instance.submitQuizAnswer(
  attemptId: attemptId,
  questionId: questionId,
  selectedIndex: selectedIndex,
).ref();
ref.execute();
```


### FinishQuizAttempt
#### Required Arguments
```dart
String attemptId = ...;
DefaultConnector.instance.finishQuizAttempt(
  attemptId: attemptId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<FinishQuizAttemptData, FinishQuizAttemptVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.finishQuizAttempt(
  attemptId: attemptId,
);
FinishQuizAttemptData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String attemptId = ...;

final ref = DefaultConnector.instance.finishQuizAttempt(
  attemptId: attemptId,
).ref();
ref.execute();
```


### CheckInToSession
#### Required Arguments
```dart
String sessionId = ...;
AttendanceStatus status = ...;
AttendanceMethod method = ...;
DefaultConnector.instance.checkInToSession(
  sessionId: sessionId,
  status: status,
  method: method,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<CheckInToSessionData, CheckInToSessionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.checkInToSession(
  sessionId: sessionId,
  status: status,
  method: method,
);
CheckInToSessionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String sessionId = ...;
AttendanceStatus status = ...;
AttendanceMethod method = ...;

final ref = DefaultConnector.instance.checkInToSession(
  sessionId: sessionId,
  status: status,
  method: method,
).ref();
ref.execute();
```


### LogPayment
#### Required Arguments
```dart
PaymentGateway gateway = ...;
String referenceId = ...;
DefaultConnector.instance.logPayment(
  gateway: gateway,
  referenceId: referenceId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<LogPaymentData, LogPaymentVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.logPayment(
  gateway: gateway,
  referenceId: referenceId,
);
LogPaymentData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
PaymentGateway gateway = ...;
String referenceId = ...;

final ref = DefaultConnector.instance.logPayment(
  gateway: gateway,
  referenceId: referenceId,
).ref();
ref.execute();
```


### AddPaymentItem
#### Required Arguments
```dart
String paymentId = ...;
double price = ...;
DefaultConnector.instance.addPaymentItem(
  paymentId: paymentId,
  price: price,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AddPaymentItem, we created `AddPaymentItemBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AddPaymentItemVariablesBuilder {
  ...
   AddPaymentItemVariablesBuilder courseId(String? t) {
   _courseId.value = t;
   return this;
  }
  AddPaymentItemVariablesBuilder missionId(String? t) {
   _missionId.value = t;
   return this;
  }
  AddPaymentItemVariablesBuilder subscriptionPlanId(String? t) {
   _subscriptionPlanId.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.addPaymentItem(
  paymentId: paymentId,
  price: price,
)
.courseId(courseId)
.missionId(missionId)
.subscriptionPlanId(subscriptionPlanId)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AddPaymentItemData, AddPaymentItemVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.addPaymentItem(
  paymentId: paymentId,
  price: price,
);
AddPaymentItemData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String paymentId = ...;
double price = ...;

final ref = DefaultConnector.instance.addPaymentItem(
  paymentId: paymentId,
  price: price,
).ref();
ref.execute();
```


### SubmitMission
#### Required Arguments
```dart
String missionId = ...;
String fileUrl = ...;
DefaultConnector.instance.submitMission(
  missionId: missionId,
  fileUrl: fileUrl,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<SubmitMissionData, SubmitMissionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.submitMission(
  missionId: missionId,
  fileUrl: fileUrl,
);
SubmitMissionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String missionId = ...;
String fileUrl = ...;

final ref = DefaultConnector.instance.submitMission(
  missionId: missionId,
  fileUrl: fileUrl,
).ref();
ref.execute();
```


### GradeSubmission
#### Required Arguments
```dart
String submissionId = ...;
AnyValue criteriaScores = ...;
DefaultConnector.instance.gradeSubmission(
  submissionId: submissionId,
  criteriaScores: criteriaScores,
).execute();
```

#### Optional Arguments
We return a builder for each query. For GradeSubmission, we created `GradeSubmissionBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class GradeSubmissionVariablesBuilder {
  ...
   GradeSubmissionVariablesBuilder feedback(String? t) {
   _feedback.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.gradeSubmission(
  submissionId: submissionId,
  criteriaScores: criteriaScores,
)
.feedback(feedback)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<GradeSubmissionData, GradeSubmissionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.gradeSubmission(
  submissionId: submissionId,
  criteriaScores: criteriaScores,
);
GradeSubmissionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String submissionId = ...;
AnyValue criteriaScores = ...;

final ref = DefaultConnector.instance.gradeSubmission(
  submissionId: submissionId,
  criteriaScores: criteriaScores,
).ref();
ref.execute();
```


### SyncUser
#### Required Arguments
```dart
String uid = ...;
String email = ...;
String name = ...;
DefaultConnector.instance.syncUser(
  uid: uid,
  email: email,
  name: name,
).execute();
```

#### Optional Arguments
We return a builder for each query. For SyncUser, we created `SyncUserBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class SyncUserVariablesBuilder {
  ...
   SyncUserVariablesBuilder avatar(String? t) {
   _avatar.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.syncUser(
  uid: uid,
  email: email,
  name: name,
)
.avatar(avatar)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<SyncUserData, SyncUserVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.syncUser(
  uid: uid,
  email: email,
  name: name,
);
SyncUserData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String uid = ...;
String email = ...;
String name = ...;

final ref = DefaultConnector.instance.syncUser(
  uid: uid,
  email: email,
  name: name,
).ref();
ref.execute();
```


### UpdateMyProfile
#### Required Arguments
```dart
// No required arguments
DefaultConnector.instance.updateMyProfile().execute();
```

#### Optional Arguments
We return a builder for each query. For UpdateMyProfile, we created `UpdateMyProfileBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class UpdateMyProfileVariablesBuilder {
  ...
 
  UpdateMyProfileVariablesBuilder bio(String? t) {
   _bio.value = t;
   return this;
  }
  UpdateMyProfileVariablesBuilder company(String? t) {
   _company.value = t;
   return this;
  }
  UpdateMyProfileVariablesBuilder phone(String? t) {
   _phone.value = t;
   return this;
  }
  UpdateMyProfileVariablesBuilder preferences(AnyValue? t) {
   _preferences.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.updateMyProfile()
.bio(bio)
.company(company)
.phone(phone)
.preferences(preferences)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<UpdateMyProfileData, UpdateMyProfileVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.updateMyProfile();
UpdateMyProfileData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
final ref = DefaultConnector.instance.updateMyProfile().ref();
ref.execute();
```

