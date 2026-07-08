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

### GetUserClaims
#### Required Arguments
```dart
String uid = ...;
DefaultConnector.instance.getUserClaims(
  uid: uid,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetUserClaimsData, GetUserClaimsVariables>`
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

final result = await DefaultConnector.instance.getUserClaims(
  uid: uid,
);
GetUserClaimsData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String uid = ...;

final ref = DefaultConnector.instance.getUserClaims(
  uid: uid,
).ref();
ref.execute();

ref.subscribe(...);
```


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


### ListCategories
#### Required Arguments
```dart
// No required arguments
DefaultConnector.instance.listCategories().execute();
```



#### Return Type
`execute()` returns a `QueryResult<ListCategoriesData, void>`
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

final result = await DefaultConnector.instance.listCategories();
ListCategoriesData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
final ref = DefaultConnector.instance.listCategories().ref();
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


### SearchPublishedCourses
#### Required Arguments
```dart
String searchQuery = ...;
DefaultConnector.instance.searchPublishedCourses(
  searchQuery: searchQuery,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<SearchPublishedCoursesData, SearchPublishedCoursesVariables>`
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

final result = await DefaultConnector.instance.searchPublishedCourses(
  searchQuery: searchQuery,
);
SearchPublishedCoursesData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String searchQuery = ...;

final ref = DefaultConnector.instance.searchPublishedCourses(
  searchQuery: searchQuery,
).ref();
ref.execute();

ref.subscribe(...);
```


### ListPopularCourses
#### Required Arguments
```dart
// No required arguments
DefaultConnector.instance.listPopularCourses().execute();
```

#### Optional Arguments
We return a builder for each query. For ListPopularCourses, we created `ListPopularCoursesBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class ListPopularCoursesVariablesBuilder {
  ...
 
  ListPopularCoursesVariablesBuilder limit(int? t) {
   _limit.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.listPopularCourses()
.limit(limit)
.execute();
```

#### Return Type
`execute()` returns a `QueryResult<ListPopularCoursesData, ListPopularCoursesVariables>`
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

final result = await DefaultConnector.instance.listPopularCourses();
ListPopularCoursesData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
final ref = DefaultConnector.instance.listPopularCourses().ref();
ref.execute();

ref.subscribe(...);
```


### ListRecommendedCourses
#### Required Arguments
```dart
String categoryIds = ...;
String excludeIds = ...;
DefaultConnector.instance.listRecommendedCourses(
  categoryIds: categoryIds,
  excludeIds: excludeIds,
).execute();
```

#### Optional Arguments
We return a builder for each query. For ListRecommendedCourses, we created `ListRecommendedCoursesBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class ListRecommendedCoursesVariablesBuilder {
  ...
   ListRecommendedCoursesVariablesBuilder limit(int? t) {
   _limit.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.listRecommendedCourses(
  categoryIds: categoryIds,
  excludeIds: excludeIds,
)
.limit(limit)
.execute();
```

#### Return Type
`execute()` returns a `QueryResult<ListRecommendedCoursesData, ListRecommendedCoursesVariables>`
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

final result = await DefaultConnector.instance.listRecommendedCourses(
  categoryIds: categoryIds,
  excludeIds: excludeIds,
);
ListRecommendedCoursesData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String categoryIds = ...;
String excludeIds = ...;

final ref = DefaultConnector.instance.listRecommendedCourses(
  categoryIds: categoryIds,
  excludeIds: excludeIds,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetMyEnrolledCourseCategories
#### Required Arguments
```dart
// No required arguments
DefaultConnector.instance.getMyEnrolledCourseCategories().execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetMyEnrolledCourseCategoriesData, void>`
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

final result = await DefaultConnector.instance.getMyEnrolledCourseCategories();
GetMyEnrolledCourseCategoriesData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
final ref = DefaultConnector.instance.getMyEnrolledCourseCategories().ref();
ref.execute();

ref.subscribe(...);
```


### GetMyContinueLearning
#### Required Arguments
```dart
// No required arguments
DefaultConnector.instance.getMyContinueLearning().execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetMyContinueLearningData, void>`
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

final result = await DefaultConnector.instance.getMyContinueLearning();
GetMyContinueLearningData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
final ref = DefaultConnector.instance.getMyContinueLearning().ref();
ref.execute();

ref.subscribe(...);
```


### GetCourseVideos
#### Required Arguments
```dart
String courseId = ...;
DefaultConnector.instance.getCourseVideos(
  courseId: courseId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetCourseVideosData, GetCourseVideosVariables>`
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

final result = await DefaultConnector.instance.getCourseVideos(
  courseId: courseId,
);
GetCourseVideosData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;

final ref = DefaultConnector.instance.getCourseVideos(
  courseId: courseId,
).ref();
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


### GetLectureContent
#### Required Arguments
```dart
String lectureId = ...;
DefaultConnector.instance.getLectureContent(
  lectureId: lectureId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetLectureContentData, GetLectureContentVariables>`
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

final result = await DefaultConnector.instance.getLectureContent(
  lectureId: lectureId,
);
GetLectureContentData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String lectureId = ...;

final ref = DefaultConnector.instance.getLectureContent(
  lectureId: lectureId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetUserLectureProgress
#### Required Arguments
```dart
String lectureId = ...;
DefaultConnector.instance.getUserLectureProgress(
  lectureId: lectureId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetUserLectureProgressData, GetUserLectureProgressVariables>`
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

final result = await DefaultConnector.instance.getUserLectureProgress(
  lectureId: lectureId,
);
GetUserLectureProgressData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String lectureId = ...;

final ref = DefaultConnector.instance.getUserLectureProgress(
  lectureId: lectureId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetMyCourseProgress
#### Required Arguments
```dart
String courseId = ...;
DefaultConnector.instance.getMyCourseProgress(
  courseId: courseId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetMyCourseProgressData, GetMyCourseProgressVariables>`
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

final result = await DefaultConnector.instance.getMyCourseProgress(
  courseId: courseId,
);
GetMyCourseProgressData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;

final ref = DefaultConnector.instance.getMyCourseProgress(
  courseId: courseId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetCourseForEnrollment
#### Required Arguments
```dart
String courseId = ...;
DefaultConnector.instance.getCourseForEnrollment(
  courseId: courseId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetCourseForEnrollmentData, GetCourseForEnrollmentVariables>`
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

final result = await DefaultConnector.instance.getCourseForEnrollment(
  courseId: courseId,
);
GetCourseForEnrollmentData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;

final ref = DefaultConnector.instance.getCourseForEnrollment(
  courseId: courseId,
).ref();
ref.execute();

ref.subscribe(...);
```


### AdminGetCourse
#### Required Arguments
```dart
String courseId = ...;
DefaultConnector.instance.adminGetCourse(
  courseId: courseId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<AdminGetCourseData, AdminGetCourseVariables>`
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

final result = await DefaultConnector.instance.adminGetCourse(
  courseId: courseId,
);
AdminGetCourseData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;

final ref = DefaultConnector.instance.adminGetCourse(
  courseId: courseId,
).ref();
ref.execute();

ref.subscribe(...);
```


### AdminListMyCourses
#### Required Arguments
```dart
// No required arguments
DefaultConnector.instance.adminListMyCourses().execute();
```



#### Return Type
`execute()` returns a `QueryResult<AdminListMyCoursesData, void>`
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

final result = await DefaultConnector.instance.adminListMyCourses();
AdminListMyCoursesData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
final ref = DefaultConnector.instance.adminListMyCourses().ref();
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


### GetUserClaimsFn
#### Required Arguments
```dart
String uid = ...;
DefaultConnector.instance.getUserClaimsFn(
  uid: uid,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetUserClaimsFnData, GetUserClaimsFnVariables>`
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

final result = await DefaultConnector.instance.getUserClaimsFn(
  uid: uid,
);
GetUserClaimsFnData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String uid = ...;

final ref = DefaultConnector.instance.getUserClaimsFn(
  uid: uid,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetTargetUserRolesFn
#### Required Arguments
```dart
String uid = ...;
DefaultConnector.instance.getTargetUserRolesFn(
  uid: uid,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetTargetUserRolesFnData, GetTargetUserRolesFnVariables>`
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

final result = await DefaultConnector.instance.getTargetUserRolesFn(
  uid: uid,
);
GetTargetUserRolesFnData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String uid = ...;

final ref = DefaultConnector.instance.getTargetUserRolesFn(
  uid: uid,
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


### GetMyPendingSubmissions
#### Required Arguments
```dart
// No required arguments
DefaultConnector.instance.getMyPendingSubmissions().execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetMyPendingSubmissionsData, void>`
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

final result = await DefaultConnector.instance.getMyPendingSubmissions();
GetMyPendingSubmissionsData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
final ref = DefaultConnector.instance.getMyPendingSubmissions().ref();
ref.execute();

ref.subscribe(...);
```


### GetCourseInstructors
#### Required Arguments
```dart
String courseId = ...;
DefaultConnector.instance.getCourseInstructors(
  courseId: courseId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetCourseInstructorsData, GetCourseInstructorsVariables>`
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

final result = await DefaultConnector.instance.getCourseInstructors(
  courseId: courseId,
);
GetCourseInstructorsData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;

final ref = DefaultConnector.instance.getCourseInstructors(
  courseId: courseId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetLectureDuration
#### Required Arguments
```dart
String lectureId = ...;
DefaultConnector.instance.getLectureDuration(
  lectureId: lectureId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetLectureDurationData, GetLectureDurationVariables>`
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

final result = await DefaultConnector.instance.getLectureDuration(
  lectureId: lectureId,
);
GetLectureDurationData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String lectureId = ...;

final ref = DefaultConnector.instance.getLectureDuration(
  lectureId: lectureId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetCourseCompletionStatus
#### Required Arguments
```dart
String courseId = ...;
DefaultConnector.instance.getCourseCompletionStatus(
  courseId: courseId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetCourseCompletionStatusData, GetCourseCompletionStatusVariables>`
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

final result = await DefaultConnector.instance.getCourseCompletionStatus(
  courseId: courseId,
);
GetCourseCompletionStatusData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;

final ref = DefaultConnector.instance.getCourseCompletionStatus(
  courseId: courseId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetCourseCompletionStatusForUser
#### Required Arguments
```dart
String courseId = ...;
String userId = ...;
DefaultConnector.instance.getCourseCompletionStatusForUser(
  courseId: courseId,
  userId: userId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetCourseCompletionStatusForUserData, GetCourseCompletionStatusForUserVariables>`
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

final result = await DefaultConnector.instance.getCourseCompletionStatusForUser(
  courseId: courseId,
  userId: userId,
);
GetCourseCompletionStatusForUserData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;
String userId = ...;

final ref = DefaultConnector.instance.getCourseCompletionStatusForUser(
  courseId: courseId,
  userId: userId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetUserEnrollmentForCourseByUser
#### Required Arguments
```dart
String courseId = ...;
String userId = ...;
DefaultConnector.instance.getUserEnrollmentForCourseByUser(
  courseId: courseId,
  userId: userId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetUserEnrollmentForCourseByUserData, GetUserEnrollmentForCourseByUserVariables>`
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

final result = await DefaultConnector.instance.getUserEnrollmentForCourseByUser(
  courseId: courseId,
  userId: userId,
);
GetUserEnrollmentForCourseByUserData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;
String userId = ...;

final ref = DefaultConnector.instance.getUserEnrollmentForCourseByUser(
  courseId: courseId,
  userId: userId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetUserEnrollmentForCourse
#### Required Arguments
```dart
String courseId = ...;
DefaultConnector.instance.getUserEnrollmentForCourse(
  courseId: courseId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetUserEnrollmentForCourseData, GetUserEnrollmentForCourseVariables>`
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

final result = await DefaultConnector.instance.getUserEnrollmentForCourse(
  courseId: courseId,
);
GetUserEnrollmentForCourseData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;

final ref = DefaultConnector.instance.getUserEnrollmentForCourse(
  courseId: courseId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetUserEnrollmentForMission
#### Required Arguments
```dart
String missionId = ...;
DefaultConnector.instance.getUserEnrollmentForMission(
  missionId: missionId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetUserEnrollmentForMissionData, GetUserEnrollmentForMissionVariables>`
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

final result = await DefaultConnector.instance.getUserEnrollmentForMission(
  missionId: missionId,
);
GetUserEnrollmentForMissionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String missionId = ...;

final ref = DefaultConnector.instance.getUserEnrollmentForMission(
  missionId: missionId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetMissionForEnrollment
#### Required Arguments
```dart
String missionId = ...;
DefaultConnector.instance.getMissionForEnrollment(
  missionId: missionId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetMissionForEnrollmentData, GetMissionForEnrollmentVariables>`
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

final result = await DefaultConnector.instance.getMissionForEnrollment(
  missionId: missionId,
);
GetMissionForEnrollmentData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String missionId = ...;

final ref = DefaultConnector.instance.getMissionForEnrollment(
  missionId: missionId,
).ref();
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


### GetSubmissionForGrading
#### Required Arguments
```dart
String submissionId = ...;
DefaultConnector.instance.getSubmissionForGrading(
  submissionId: submissionId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetSubmissionForGradingData, GetSubmissionForGradingVariables>`
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

final result = await DefaultConnector.instance.getSubmissionForGrading(
  submissionId: submissionId,
);
GetSubmissionForGradingData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String submissionId = ...;

final ref = DefaultConnector.instance.getSubmissionForGrading(
  submissionId: submissionId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetEnrollmentForUserMission
#### Required Arguments
```dart
String userId = ...;
String missionId = ...;
DefaultConnector.instance.getEnrollmentForUserMission(
  userId: userId,
  missionId: missionId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetEnrollmentForUserMissionData, GetEnrollmentForUserMissionVariables>`
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

final result = await DefaultConnector.instance.getEnrollmentForUserMission(
  userId: userId,
  missionId: missionId,
);
GetEnrollmentForUserMissionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String userId = ...;
String missionId = ...;

final ref = DefaultConnector.instance.getEnrollmentForUserMission(
  userId: userId,
  missionId: missionId,
).ref();
ref.execute();

ref.subscribe(...);
```


### AdminGetMission
#### Required Arguments
```dart
String missionId = ...;
DefaultConnector.instance.adminGetMission(
  missionId: missionId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<AdminGetMissionData, AdminGetMissionVariables>`
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

final result = await DefaultConnector.instance.adminGetMission(
  missionId: missionId,
);
AdminGetMissionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String missionId = ...;

final ref = DefaultConnector.instance.adminGetMission(
  missionId: missionId,
).ref();
ref.execute();

ref.subscribe(...);
```


### AdminListMyMissions
#### Required Arguments
```dart
// No required arguments
DefaultConnector.instance.adminListMyMissions().execute();
```



#### Return Type
`execute()` returns a `QueryResult<AdminListMyMissionsData, void>`
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

final result = await DefaultConnector.instance.adminListMyMissions();
AdminListMyMissionsData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
final ref = DefaultConnector.instance.adminListMyMissions().ref();
ref.execute();

ref.subscribe(...);
```


### GetMissionTemplates
#### Required Arguments
```dart
String missionId = ...;
DefaultConnector.instance.getMissionTemplates(
  missionId: missionId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetMissionTemplatesData, GetMissionTemplatesVariables>`
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

final result = await DefaultConnector.instance.getMissionTemplates(
  missionId: missionId,
);
GetMissionTemplatesData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String missionId = ...;

final ref = DefaultConnector.instance.getMissionTemplates(
  missionId: missionId,
).ref();
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


### GetExpiredAttempts
#### Required Arguments
```dart
// No required arguments
DefaultConnector.instance.getExpiredAttempts().execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetExpiredAttemptsData, void>`
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

final result = await DefaultConnector.instance.getExpiredAttempts();
GetExpiredAttemptsData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
final ref = DefaultConnector.instance.getExpiredAttempts().ref();
ref.execute();

ref.subscribe(...);
```


### GetUserQuizAttempts
#### Required Arguments
```dart
String quizId = ...;
DefaultConnector.instance.getUserQuizAttempts(
  quizId: quizId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetUserQuizAttemptsData, GetUserQuizAttemptsVariables>`
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

final result = await DefaultConnector.instance.getUserQuizAttempts(
  quizId: quizId,
);
GetUserQuizAttemptsData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String quizId = ...;

final ref = DefaultConnector.instance.getUserQuizAttempts(
  quizId: quizId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetQuizAttemptById
#### Required Arguments
```dart
String attemptId = ...;
DefaultConnector.instance.getQuizAttemptById(
  attemptId: attemptId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetQuizAttemptByIdData, GetQuizAttemptByIdVariables>`
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

final result = await DefaultConnector.instance.getQuizAttemptById(
  attemptId: attemptId,
);
GetQuizAttemptByIdData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String attemptId = ...;

final ref = DefaultConnector.instance.getQuizAttemptById(
  attemptId: attemptId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetQuizQuestionPoints
#### Required Arguments
```dart
String quizId = ...;
DefaultConnector.instance.getQuizQuestionPoints(
  quizId: quizId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetQuizQuestionPointsData, GetQuizQuestionPointsVariables>`
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

final result = await DefaultConnector.instance.getQuizQuestionPoints(
  quizId: quizId,
);
GetQuizQuestionPointsData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String quizId = ...;

final ref = DefaultConnector.instance.getQuizQuestionPoints(
  quizId: quizId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetAttemptAnswersWithCorrect
#### Required Arguments
```dart
String attemptId = ...;
DefaultConnector.instance.getAttemptAnswersWithCorrect(
  attemptId: attemptId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetAttemptAnswersWithCorrectData, GetAttemptAnswersWithCorrectVariables>`
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

final result = await DefaultConnector.instance.getAttemptAnswersWithCorrect(
  attemptId: attemptId,
);
GetAttemptAnswersWithCorrectData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String attemptId = ...;

final ref = DefaultConnector.instance.getAttemptAnswersWithCorrect(
  attemptId: attemptId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetQuizSettings
#### Required Arguments
```dart
String quizId = ...;
DefaultConnector.instance.getQuizSettings(
  quizId: quizId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetQuizSettingsData, GetQuizSettingsVariables>`
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

final result = await DefaultConnector.instance.getQuizSettings(
  quizId: quizId,
);
GetQuizSettingsData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String quizId = ...;

final ref = DefaultConnector.instance.getQuizSettings(
  quizId: quizId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetQuestionOptions
#### Required Arguments
```dart
String questionId = ...;
DefaultConnector.instance.getQuestionOptions(
  questionId: questionId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetQuestionOptionsData, GetQuestionOptionsVariables>`
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

final result = await DefaultConnector.instance.getQuestionOptions(
  questionId: questionId,
);
GetQuestionOptionsData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String questionId = ...;

final ref = DefaultConnector.instance.getQuestionOptions(
  questionId: questionId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetOptionWithQuestion
#### Required Arguments
```dart
String optionId = ...;
DefaultConnector.instance.getOptionWithQuestion(
  optionId: optionId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetOptionWithQuestionData, GetOptionWithQuestionVariables>`
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

final result = await DefaultConnector.instance.getOptionWithQuestion(
  optionId: optionId,
);
GetOptionWithQuestionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String optionId = ...;

final ref = DefaultConnector.instance.getOptionWithQuestion(
  optionId: optionId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetActiveQuizSession
#### Required Arguments
```dart
String attemptId = ...;
DefaultConnector.instance.getActiveQuizSession(
  attemptId: attemptId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetActiveQuizSessionData, GetActiveQuizSessionVariables>`
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

final result = await DefaultConnector.instance.getActiveQuizSession(
  attemptId: attemptId,
);
GetActiveQuizSessionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String attemptId = ...;

final ref = DefaultConnector.instance.getActiveQuizSession(
  attemptId: attemptId,
).ref();
ref.execute();

ref.subscribe(...);
```


### AdminGetQuiz
#### Required Arguments
```dart
String quizId = ...;
DefaultConnector.instance.adminGetQuiz(
  quizId: quizId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<AdminGetQuizData, AdminGetQuizVariables>`
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

final result = await DefaultConnector.instance.adminGetQuiz(
  quizId: quizId,
);
AdminGetQuizData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String quizId = ...;

final ref = DefaultConnector.instance.adminGetQuiz(
  quizId: quizId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetMyCourseRating
#### Required Arguments
```dart
String courseId = ...;
DefaultConnector.instance.getMyCourseRating(
  courseId: courseId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetMyCourseRatingData, GetMyCourseRatingVariables>`
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

final result = await DefaultConnector.instance.getMyCourseRating(
  courseId: courseId,
);
GetMyCourseRatingData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;

final ref = DefaultConnector.instance.getMyCourseRating(
  courseId: courseId,
).ref();
ref.execute();

ref.subscribe(...);
```


### ListCourseRatings
#### Required Arguments
```dart
String courseId = ...;
DefaultConnector.instance.listCourseRatings(
  courseId: courseId,
).execute();
```

#### Optional Arguments
We return a builder for each query. For ListCourseRatings, we created `ListCourseRatingsBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class ListCourseRatingsVariablesBuilder {
  ...
   ListCourseRatingsVariablesBuilder limit(int? t) {
   _limit.value = t;
   return this;
  }
  ListCourseRatingsVariablesBuilder offset(int? t) {
   _offset.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.listCourseRatings(
  courseId: courseId,
)
.limit(limit)
.offset(offset)
.execute();
```

#### Return Type
`execute()` returns a `QueryResult<ListCourseRatingsData, ListCourseRatingsVariables>`
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

final result = await DefaultConnector.instance.listCourseRatings(
  courseId: courseId,
);
ListCourseRatingsData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;

final ref = DefaultConnector.instance.listCourseRatings(
  courseId: courseId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetCourseRatingsForSummary
#### Required Arguments
```dart
String courseId = ...;
DefaultConnector.instance.getCourseRatingsForSummary(
  courseId: courseId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetCourseRatingsForSummaryData, GetCourseRatingsForSummaryVariables>`
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

final result = await DefaultConnector.instance.getCourseRatingsForSummary(
  courseId: courseId,
);
GetCourseRatingsForSummaryData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;

final ref = DefaultConnector.instance.getCourseRatingsForSummary(
  courseId: courseId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetMyCourseAccess
#### Required Arguments
```dart
String courseId = ...;
DefaultConnector.instance.getMyCourseAccess(
  courseId: courseId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetMyCourseAccessData, GetMyCourseAccessVariables>`
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

final result = await DefaultConnector.instance.getMyCourseAccess(
  courseId: courseId,
);
GetMyCourseAccessData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;

final ref = DefaultConnector.instance.getMyCourseAccess(
  courseId: courseId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetMyMissionAccess
#### Required Arguments
```dart
String missionId = ...;
DefaultConnector.instance.getMyMissionAccess(
  missionId: missionId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetMyMissionAccessData, GetMyMissionAccessVariables>`
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

final result = await DefaultConnector.instance.getMyMissionAccess(
  missionId: missionId,
);
GetMyMissionAccessData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String missionId = ...;

final ref = DefaultConnector.instance.getMyMissionAccess(
  missionId: missionId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetQuestionCourse
#### Required Arguments
```dart
String questionId = ...;
DefaultConnector.instance.getQuestionCourse(
  questionId: questionId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetQuestionCourseData, GetQuestionCourseVariables>`
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

final result = await DefaultConnector.instance.getQuestionCourse(
  questionId: questionId,
);
GetQuestionCourseData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String questionId = ...;

final ref = DefaultConnector.instance.getQuestionCourse(
  questionId: questionId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetOptionCourse
#### Required Arguments
```dart
String optionId = ...;
DefaultConnector.instance.getOptionCourse(
  optionId: optionId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetOptionCourseData, GetOptionCourseVariables>`
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

final result = await DefaultConnector.instance.getOptionCourse(
  optionId: optionId,
);
GetOptionCourseData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String optionId = ...;

final ref = DefaultConnector.instance.getOptionCourse(
  optionId: optionId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetSectionCourse
#### Required Arguments
```dart
String sectionId = ...;
DefaultConnector.instance.getSectionCourse(
  sectionId: sectionId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetSectionCourseData, GetSectionCourseVariables>`
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

final result = await DefaultConnector.instance.getSectionCourse(
  sectionId: sectionId,
);
GetSectionCourseData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String sectionId = ...;

final ref = DefaultConnector.instance.getSectionCourse(
  sectionId: sectionId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetMicroLessonMission
#### Required Arguments
```dart
String microLessonId = ...;
DefaultConnector.instance.getMicroLessonMission(
  microLessonId: microLessonId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetMicroLessonMissionData, GetMicroLessonMissionVariables>`
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

final result = await DefaultConnector.instance.getMicroLessonMission(
  microLessonId: microLessonId,
);
GetMicroLessonMissionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String microLessonId = ...;

final ref = DefaultConnector.instance.getMicroLessonMission(
  microLessonId: microLessonId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetCriterionMission
#### Required Arguments
```dart
String criterionId = ...;
DefaultConnector.instance.getCriterionMission(
  criterionId: criterionId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetCriterionMissionData, GetCriterionMissionVariables>`
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

final result = await DefaultConnector.instance.getCriterionMission(
  criterionId: criterionId,
);
GetCriterionMissionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String criterionId = ...;

final ref = DefaultConnector.instance.getCriterionMission(
  criterionId: criterionId,
).ref();
ref.execute();

ref.subscribe(...);
```


### GetTemplateMission
#### Required Arguments
```dart
String templateId = ...;
DefaultConnector.instance.getTemplateMission(
  templateId: templateId,
).execute();
```



#### Return Type
`execute()` returns a `QueryResult<GetTemplateMissionData, GetTemplateMissionVariables>`
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

final result = await DefaultConnector.instance.getTemplateMission(
  templateId: templateId,
);
GetTemplateMissionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String templateId = ...;

final ref = DefaultConnector.instance.getTemplateMission(
  templateId: templateId,
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

### InstructorDeleteCourse
#### Required Arguments
```dart
String courseId = ...;
DefaultConnector.instance.instructorDeleteCourse(
  courseId: courseId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<InstructorDeleteCourseData, InstructorDeleteCourseVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.instructorDeleteCourse(
  courseId: courseId,
);
InstructorDeleteCourseData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;

final ref = DefaultConnector.instance.instructorDeleteCourse(
  courseId: courseId,
).ref();
ref.execute();
```


### SuperAdminDeleteCourse
#### Required Arguments
```dart
String courseId = ...;
DefaultConnector.instance.superAdminDeleteCourse(
  courseId: courseId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<SuperAdminDeleteCourseData, SuperAdminDeleteCourseVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.superAdminDeleteCourse(
  courseId: courseId,
);
SuperAdminDeleteCourseData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;

final ref = DefaultConnector.instance.superAdminDeleteCourse(
  courseId: courseId,
).ref();
ref.execute();
```


### AdminCreateSession
#### Required Arguments
```dart
String courseId = ...;
String title = ...;
Timestamp startTime = ...;
Timestamp endTime = ...;
SessionType type = ...;
String locationOrUrl = ...;
DefaultConnector.instance.adminCreateSession(
  courseId: courseId,
  title: title,
  startTime: startTime,
  endTime: endTime,
  type: type,
  locationOrUrl: locationOrUrl,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AdminCreateSession, we created `AdminCreateSessionBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AdminCreateSessionVariablesBuilder {
  ...
   AdminCreateSessionVariablesBuilder capacity(int? t) {
   _capacity.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.adminCreateSession(
  courseId: courseId,
  title: title,
  startTime: startTime,
  endTime: endTime,
  type: type,
  locationOrUrl: locationOrUrl,
)
.capacity(capacity)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AdminCreateSessionData, AdminCreateSessionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminCreateSession(
  courseId: courseId,
  title: title,
  startTime: startTime,
  endTime: endTime,
  type: type,
  locationOrUrl: locationOrUrl,
);
AdminCreateSessionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;
String title = ...;
Timestamp startTime = ...;
Timestamp endTime = ...;
SessionType type = ...;
String locationOrUrl = ...;

final ref = DefaultConnector.instance.adminCreateSession(
  courseId: courseId,
  title: title,
  startTime: startTime,
  endTime: endTime,
  type: type,
  locationOrUrl: locationOrUrl,
).ref();
ref.execute();
```


### InstructorCancelSession
#### Required Arguments
```dart
String sessionId = ...;
DefaultConnector.instance.instructorCancelSession(
  sessionId: sessionId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<InstructorCancelSessionData, InstructorCancelSessionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.instructorCancelSession(
  sessionId: sessionId,
);
InstructorCancelSessionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String sessionId = ...;

final ref = DefaultConnector.instance.instructorCancelSession(
  sessionId: sessionId,
).ref();
ref.execute();
```


### SuperAdminCancelSession
#### Required Arguments
```dart
String sessionId = ...;
DefaultConnector.instance.superAdminCancelSession(
  sessionId: sessionId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<SuperAdminCancelSessionData, SuperAdminCancelSessionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.superAdminCancelSession(
  sessionId: sessionId,
);
SuperAdminCancelSessionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String sessionId = ...;

final ref = DefaultConnector.instance.superAdminCancelSession(
  sessionId: sessionId,
).ref();
ref.execute();
```


### AdminCreateSubscriptionTier
#### Required Arguments
```dart
String name = ...;
int price = ...;
BillingCycle billingCycle = ...;
String features = ...;
DefaultConnector.instance.adminCreateSubscriptionTier(
  name: name,
  price: price,
  billingCycle: billingCycle,
  features: features,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminCreateSubscriptionTierData, AdminCreateSubscriptionTierVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminCreateSubscriptionTier(
  name: name,
  price: price,
  billingCycle: billingCycle,
  features: features,
);
AdminCreateSubscriptionTierData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String name = ...;
int price = ...;
BillingCycle billingCycle = ...;
String features = ...;

final ref = DefaultConnector.instance.adminCreateSubscriptionTier(
  name: name,
  price: price,
  billingCycle: billingCycle,
  features: features,
).ref();
ref.execute();
```


### AdminDeprecateSubscriptionTier
#### Required Arguments
```dart
String tierId = ...;
DefaultConnector.instance.adminDeprecateSubscriptionTier(
  tierId: tierId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminDeprecateSubscriptionTierData, AdminDeprecateSubscriptionTierVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminDeprecateSubscriptionTier(
  tierId: tierId,
);
AdminDeprecateSubscriptionTierData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String tierId = ...;

final ref = DefaultConnector.instance.adminDeprecateSubscriptionTier(
  tierId: tierId,
).ref();
ref.execute();
```


### AdminCreateCategory
#### Required Arguments
```dart
String name = ...;
DefaultConnector.instance.adminCreateCategory(
  name: name,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AdminCreateCategory, we created `AdminCreateCategoryBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AdminCreateCategoryVariablesBuilder {
  ...
   AdminCreateCategoryVariablesBuilder description(String? t) {
   _description.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.adminCreateCategory(
  name: name,
)
.description(description)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AdminCreateCategoryData, AdminCreateCategoryVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminCreateCategory(
  name: name,
);
AdminCreateCategoryData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String name = ...;

final ref = DefaultConnector.instance.adminCreateCategory(
  name: name,
).ref();
ref.execute();
```


### AdminCreateCourse
#### Required Arguments
```dart
String title = ...;
int price = ...;
String language = ...;
CourseLevel level = ...;
String categoryId = ...;
String tags = ...;
String authorId = ...;
DefaultConnector.instance.adminCreateCourse(
  title: title,
  price: price,
  language: language,
  level: level,
  categoryId: categoryId,
  tags: tags,
  authorId: authorId,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AdminCreateCourse, we created `AdminCreateCourseBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AdminCreateCourseVariablesBuilder {
  ...
   AdminCreateCourseVariablesBuilder description(String? t) {
   _description.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.adminCreateCourse(
  title: title,
  price: price,
  language: language,
  level: level,
  categoryId: categoryId,
  tags: tags,
  authorId: authorId,
)
.description(description)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AdminCreateCourseData, AdminCreateCourseVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminCreateCourse(
  title: title,
  price: price,
  language: language,
  level: level,
  categoryId: categoryId,
  tags: tags,
  authorId: authorId,
);
AdminCreateCourseData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String title = ...;
int price = ...;
String language = ...;
CourseLevel level = ...;
String categoryId = ...;
String tags = ...;
String authorId = ...;

final ref = DefaultConnector.instance.adminCreateCourse(
  title: title,
  price: price,
  language: language,
  level: level,
  categoryId: categoryId,
  tags: tags,
  authorId: authorId,
).ref();
ref.execute();
```


### AdminUpdateCourse
#### Required Arguments
```dart
String courseId = ...;
DefaultConnector.instance.adminUpdateCourse(
  courseId: courseId,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AdminUpdateCourse, we created `AdminUpdateCourseBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AdminUpdateCourseVariablesBuilder {
  ...
   AdminUpdateCourseVariablesBuilder title(String? t) {
   _title.value = t;
   return this;
  }
  AdminUpdateCourseVariablesBuilder description(String? t) {
   _description.value = t;
   return this;
  }
  AdminUpdateCourseVariablesBuilder price(int? t) {
   _price.value = t;
   return this;
  }
  AdminUpdateCourseVariablesBuilder language(String? t) {
   _language.value = t;
   return this;
  }
  AdminUpdateCourseVariablesBuilder level(CourseLevel? t) {
   _level.value = t;
   return this;
  }
  AdminUpdateCourseVariablesBuilder categoryId(String? t) {
   _categoryId.value = t;
   return this;
  }
  AdminUpdateCourseVariablesBuilder tags(List<String>? t) {
   _tags.value = t;
   return this;
  }
  AdminUpdateCourseVariablesBuilder thumbnail(String? t) {
   _thumbnail.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.adminUpdateCourse(
  courseId: courseId,
)
.title(title)
.description(description)
.price(price)
.language(language)
.level(level)
.categoryId(categoryId)
.tags(tags)
.thumbnail(thumbnail)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AdminUpdateCourseData, AdminUpdateCourseVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminUpdateCourse(
  courseId: courseId,
);
AdminUpdateCourseData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;

final ref = DefaultConnector.instance.adminUpdateCourse(
  courseId: courseId,
).ref();
ref.execute();
```


### AdminUpdateCourseStatus
#### Required Arguments
```dart
String courseId = ...;
CourseStatus status = ...;
DefaultConnector.instance.adminUpdateCourseStatus(
  courseId: courseId,
  status: status,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminUpdateCourseStatusData, AdminUpdateCourseStatusVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminUpdateCourseStatus(
  courseId: courseId,
  status: status,
);
AdminUpdateCourseStatusData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;
CourseStatus status = ...;

final ref = DefaultConnector.instance.adminUpdateCourseStatus(
  courseId: courseId,
  status: status,
).ref();
ref.execute();
```


### AdminSoftDeleteCourse
#### Required Arguments
```dart
String courseId = ...;
DefaultConnector.instance.adminSoftDeleteCourse(
  courseId: courseId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminSoftDeleteCourseData, AdminSoftDeleteCourseVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminSoftDeleteCourse(
  courseId: courseId,
);
AdminSoftDeleteCourseData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;

final ref = DefaultConnector.instance.adminSoftDeleteCourse(
  courseId: courseId,
).ref();
ref.execute();
```


### AdminCreateSection
#### Required Arguments
```dart
String courseId = ...;
String title = ...;
int order = ...;
DefaultConnector.instance.adminCreateSection(
  courseId: courseId,
  title: title,
  order: order,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminCreateSectionData, AdminCreateSectionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminCreateSection(
  courseId: courseId,
  title: title,
  order: order,
);
AdminCreateSectionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;
String title = ...;
int order = ...;

final ref = DefaultConnector.instance.adminCreateSection(
  courseId: courseId,
  title: title,
  order: order,
).ref();
ref.execute();
```


### AdminUpdateSection
#### Required Arguments
```dart
String sectionId = ...;
String title = ...;
DefaultConnector.instance.adminUpdateSection(
  sectionId: sectionId,
  title: title,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminUpdateSectionData, AdminUpdateSectionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminUpdateSection(
  sectionId: sectionId,
  title: title,
);
AdminUpdateSectionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String sectionId = ...;
String title = ...;

final ref = DefaultConnector.instance.adminUpdateSection(
  sectionId: sectionId,
  title: title,
).ref();
ref.execute();
```


### AdminSoftDeleteSection
#### Required Arguments
```dart
String sectionId = ...;
DefaultConnector.instance.adminSoftDeleteSection(
  sectionId: sectionId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminSoftDeleteSectionData, AdminSoftDeleteSectionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminSoftDeleteSection(
  sectionId: sectionId,
);
AdminSoftDeleteSectionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String sectionId = ...;

final ref = DefaultConnector.instance.adminSoftDeleteSection(
  sectionId: sectionId,
).ref();
ref.execute();
```


### AdminUpdateSectionOrder
#### Required Arguments
```dart
String sectionId = ...;
int order = ...;
DefaultConnector.instance.adminUpdateSectionOrder(
  sectionId: sectionId,
  order: order,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminUpdateSectionOrderData, AdminUpdateSectionOrderVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminUpdateSectionOrder(
  sectionId: sectionId,
  order: order,
);
AdminUpdateSectionOrderData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String sectionId = ...;
int order = ...;

final ref = DefaultConnector.instance.adminUpdateSectionOrder(
  sectionId: sectionId,
  order: order,
).ref();
ref.execute();
```


### AdminCreateLectureFull
#### Required Arguments
```dart
String sectionId = ...;
String title = ...;
LectureType type = ...;
bool isFreePreview = ...;
int order = ...;
DefaultConnector.instance.adminCreateLectureFull(
  sectionId: sectionId,
  title: title,
  type: type,
  isFreePreview: isFreePreview,
  order: order,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AdminCreateLectureFull, we created `AdminCreateLectureFullBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AdminCreateLectureFullVariablesBuilder {
  ...
   AdminCreateLectureFullVariablesBuilder videoUrl(String? t) {
   _videoUrl.value = t;
   return this;
  }
  AdminCreateLectureFullVariablesBuilder content(String? t) {
   _content.value = t;
   return this;
  }
  AdminCreateLectureFullVariablesBuilder duration(int? t) {
   _duration.value = t;
   return this;
  }
  AdminCreateLectureFullVariablesBuilder transcriptUrl(String? t) {
   _transcriptUrl.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.adminCreateLectureFull(
  sectionId: sectionId,
  title: title,
  type: type,
  isFreePreview: isFreePreview,
  order: order,
)
.videoUrl(videoUrl)
.content(content)
.duration(duration)
.transcriptUrl(transcriptUrl)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AdminCreateLectureFullData, AdminCreateLectureFullVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminCreateLectureFull(
  sectionId: sectionId,
  title: title,
  type: type,
  isFreePreview: isFreePreview,
  order: order,
);
AdminCreateLectureFullData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String sectionId = ...;
String title = ...;
LectureType type = ...;
bool isFreePreview = ...;
int order = ...;

final ref = DefaultConnector.instance.adminCreateLectureFull(
  sectionId: sectionId,
  title: title,
  type: type,
  isFreePreview: isFreePreview,
  order: order,
).ref();
ref.execute();
```


### AdminUpdateLecture
#### Required Arguments
```dart
String lectureId = ...;
DefaultConnector.instance.adminUpdateLecture(
  lectureId: lectureId,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AdminUpdateLecture, we created `AdminUpdateLectureBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AdminUpdateLectureVariablesBuilder {
  ...
   AdminUpdateLectureVariablesBuilder title(String? t) {
   _title.value = t;
   return this;
  }
  AdminUpdateLectureVariablesBuilder type(LectureType? t) {
   _type.value = t;
   return this;
  }
  AdminUpdateLectureVariablesBuilder videoUrl(String? t) {
   _videoUrl.value = t;
   return this;
  }
  AdminUpdateLectureVariablesBuilder content(String? t) {
   _content.value = t;
   return this;
  }
  AdminUpdateLectureVariablesBuilder duration(int? t) {
   _duration.value = t;
   return this;
  }
  AdminUpdateLectureVariablesBuilder transcriptUrl(String? t) {
   _transcriptUrl.value = t;
   return this;
  }
  AdminUpdateLectureVariablesBuilder isFreePreview(bool? t) {
   _isFreePreview.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.adminUpdateLecture(
  lectureId: lectureId,
)
.title(title)
.type(type)
.videoUrl(videoUrl)
.content(content)
.duration(duration)
.transcriptUrl(transcriptUrl)
.isFreePreview(isFreePreview)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AdminUpdateLectureData, AdminUpdateLectureVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminUpdateLecture(
  lectureId: lectureId,
);
AdminUpdateLectureData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String lectureId = ...;

final ref = DefaultConnector.instance.adminUpdateLecture(
  lectureId: lectureId,
).ref();
ref.execute();
```


### AdminSoftDeleteLecture
#### Required Arguments
```dart
String lectureId = ...;
DefaultConnector.instance.adminSoftDeleteLecture(
  lectureId: lectureId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminSoftDeleteLectureData, AdminSoftDeleteLectureVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminSoftDeleteLecture(
  lectureId: lectureId,
);
AdminSoftDeleteLectureData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String lectureId = ...;

final ref = DefaultConnector.instance.adminSoftDeleteLecture(
  lectureId: lectureId,
).ref();
ref.execute();
```


### AdminUpdateLectureOrder
#### Required Arguments
```dart
String lectureId = ...;
int order = ...;
DefaultConnector.instance.adminUpdateLectureOrder(
  lectureId: lectureId,
  order: order,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminUpdateLectureOrderData, AdminUpdateLectureOrderVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminUpdateLectureOrder(
  lectureId: lectureId,
  order: order,
);
AdminUpdateLectureOrderData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String lectureId = ...;
int order = ...;

final ref = DefaultConnector.instance.adminUpdateLectureOrder(
  lectureId: lectureId,
  order: order,
).ref();
ref.execute();
```


### AdminMoveLectureToSection
#### Required Arguments
```dart
String lectureId = ...;
String newSectionId = ...;
int order = ...;
DefaultConnector.instance.adminMoveLectureToSection(
  lectureId: lectureId,
  newSectionId: newSectionId,
  order: order,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminMoveLectureToSectionData, AdminMoveLectureToSectionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminMoveLectureToSection(
  lectureId: lectureId,
  newSectionId: newSectionId,
  order: order,
);
AdminMoveLectureToSectionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String lectureId = ...;
String newSectionId = ...;
int order = ...;

final ref = DefaultConnector.instance.adminMoveLectureToSection(
  lectureId: lectureId,
  newSectionId: newSectionId,
  order: order,
).ref();
ref.execute();
```


### AdminSoftDeleteLecturesBySection
#### Required Arguments
```dart
String sectionId = ...;
DefaultConnector.instance.adminSoftDeleteLecturesBySection(
  sectionId: sectionId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminSoftDeleteLecturesBySectionData, AdminSoftDeleteLecturesBySectionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminSoftDeleteLecturesBySection(
  sectionId: sectionId,
);
AdminSoftDeleteLecturesBySectionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String sectionId = ...;

final ref = DefaultConnector.instance.adminSoftDeleteLecturesBySection(
  sectionId: sectionId,
).ref();
ref.execute();
```


### LogPayment
#### Required Arguments
```dart
PaymentGateway gateway = ...;
String referenceId = ...;
int amount = ...;
String customerEmailSnapshot = ...;
DefaultConnector.instance.logPayment(
  gateway: gateway,
  referenceId: referenceId,
  amount: amount,
  customerEmailSnapshot: customerEmailSnapshot,
).execute();
```

#### Optional Arguments
We return a builder for each query. For LogPayment, we created `LogPaymentBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class LogPaymentVariablesBuilder {
  ...
   LogPaymentVariablesBuilder currency(String? t) {
   _currency.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.logPayment(
  gateway: gateway,
  referenceId: referenceId,
  amount: amount,
  customerEmailSnapshot: customerEmailSnapshot,
)
.currency(currency)
.execute();
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
  amount: amount,
  customerEmailSnapshot: customerEmailSnapshot,
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
int amount = ...;
String customerEmailSnapshot = ...;

final ref = DefaultConnector.instance.logPayment(
  gateway: gateway,
  referenceId: referenceId,
  amount: amount,
  customerEmailSnapshot: customerEmailSnapshot,
).ref();
ref.execute();
```


### AddPaymentItem
#### Required Arguments
```dart
String paymentId = ...;
PaymentItemTarget targetType = ...;
int price = ...;
DefaultConnector.instance.addPaymentItem(
  paymentId: paymentId,
  targetType: targetType,
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
  AddPaymentItemVariablesBuilder subscriptionTierId(String? t) {
   _subscriptionTierId.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.addPaymentItem(
  paymentId: paymentId,
  targetType: targetType,
  price: price,
)
.courseId(courseId)
.missionId(missionId)
.subscriptionTierId(subscriptionTierId)
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
  targetType: targetType,
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
PaymentItemTarget targetType = ...;
int price = ...;

final ref = DefaultConnector.instance.addPaymentItem(
  paymentId: paymentId,
  targetType: targetType,
  price: price,
).ref();
ref.execute();
```


### CreateDefaultUserAndProfileFn
#### Required Arguments
```dart
String uid = ...;
String email = ...;
String name = ...;
DefaultConnector.instance.createDefaultUserAndProfileFn(
  uid: uid,
  email: email,
  name: name,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<CreateDefaultUserAndProfileFnData, CreateDefaultUserAndProfileFnVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.createDefaultUserAndProfileFn(
  uid: uid,
  email: email,
  name: name,
);
CreateDefaultUserAndProfileFnData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String uid = ...;
String email = ...;
String name = ...;

final ref = DefaultConnector.instance.createDefaultUserAndProfileFn(
  uid: uid,
  email: email,
  name: name,
).ref();
ref.execute();
```


### DeleteUserRecordFn
#### Required Arguments
```dart
String uid = ...;
DefaultConnector.instance.deleteUserRecordFn(
  uid: uid,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<DeleteUserRecordFnData, DeleteUserRecordFnVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.deleteUserRecordFn(
  uid: uid,
);
DeleteUserRecordFnData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String uid = ...;

final ref = DefaultConnector.instance.deleteUserRecordFn(
  uid: uid,
).ref();
ref.execute();
```


### CreateDefaultUserFn
#### Required Arguments
```dart
String uid = ...;
String email = ...;
String name = ...;
String nid = ...;
DefaultConnector.instance.createDefaultUserFn(
  uid: uid,
  email: email,
  name: name,
  nid: nid,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<CreateDefaultUserFnData, CreateDefaultUserFnVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.createDefaultUserFn(
  uid: uid,
  email: email,
  name: name,
  nid: nid,
);
CreateDefaultUserFnData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String uid = ...;
String email = ...;
String name = ...;
String nid = ...;

final ref = DefaultConnector.instance.createDefaultUserFn(
  uid: uid,
  email: email,
  name: name,
  nid: nid,
).ref();
ref.execute();
```


### RemoveRoleFn
#### Required Arguments
```dart
String uid = ...;
String roleId = ...;
DefaultConnector.instance.removeRoleFn(
  uid: uid,
  roleId: roleId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<RemoveRoleFnData, RemoveRoleFnVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.removeRoleFn(
  uid: uid,
  roleId: roleId,
);
RemoveRoleFnData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String uid = ...;
String roleId = ...;

final ref = DefaultConnector.instance.removeRoleFn(
  uid: uid,
  roleId: roleId,
).ref();
ref.execute();
```


### AssignNewRoleFn
#### Required Arguments
```dart
String uid = ...;
String roleId = ...;
DefaultConnector.instance.assignNewRoleFn(
  uid: uid,
  roleId: roleId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AssignNewRoleFnData, AssignNewRoleFnVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.assignNewRoleFn(
  uid: uid,
  roleId: roleId,
);
AssignNewRoleFnData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String uid = ...;
String roleId = ...;

final ref = DefaultConnector.instance.assignNewRoleFn(
  uid: uid,
  roleId: roleId,
).ref();
ref.execute();
```


### AdminAddCourseInstructor
#### Required Arguments
```dart
String courseId = ...;
String userId = ...;
DefaultConnector.instance.adminAddCourseInstructor(
  courseId: courseId,
  userId: userId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminAddCourseInstructorData, AdminAddCourseInstructorVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminAddCourseInstructor(
  courseId: courseId,
  userId: userId,
);
AdminAddCourseInstructorData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;
String userId = ...;

final ref = DefaultConnector.instance.adminAddCourseInstructor(
  courseId: courseId,
  userId: userId,
).ref();
ref.execute();
```


### AdminRemoveCourseInstructor
#### Required Arguments
```dart
String courseId = ...;
String userId = ...;
DefaultConnector.instance.adminRemoveCourseInstructor(
  courseId: courseId,
  userId: userId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminRemoveCourseInstructorData, AdminRemoveCourseInstructorVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminRemoveCourseInstructor(
  courseId: courseId,
  userId: userId,
);
AdminRemoveCourseInstructorData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;
String userId = ...;

final ref = DefaultConnector.instance.adminRemoveCourseInstructor(
  courseId: courseId,
  userId: userId,
).ref();
ref.execute();
```


### EnrollInCourse
#### Required Arguments
```dart
String courseId = ...;
String userId = ...;
DefaultConnector.instance.enrollInCourse(
  courseId: courseId,
  userId: userId,
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
  userId: userId,
);
EnrollInCourseData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;
String userId = ...;

final ref = DefaultConnector.instance.enrollInCourse(
  courseId: courseId,
  userId: userId,
).ref();
ref.execute();
```


### EnrollInMission
#### Required Arguments
```dart
String missionId = ...;
String userId = ...;
DefaultConnector.instance.enrollInMission(
  missionId: missionId,
  userId: userId,
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
  userId: userId,
);
EnrollInMissionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String missionId = ...;
String userId = ...;

final ref = DefaultConnector.instance.enrollInMission(
  missionId: missionId,
  userId: userId,
).ref();
ref.execute();
```


### UpdateLectureProgress
#### Required Arguments
```dart
String lectureId = ...;
int lastWatchedSecond = ...;
String userId = ...;
DefaultConnector.instance.updateLectureProgress(
  lectureId: lectureId,
  lastWatchedSecond: lastWatchedSecond,
  userId: userId,
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
  userId: userId,
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
  userId: userId,
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
String userId = ...;

final ref = DefaultConnector.instance.updateLectureProgress(
  lectureId: lectureId,
  lastWatchedSecond: lastWatchedSecond,
  userId: userId,
).ref();
ref.execute();
```


### AdminUpsertLectureProgress
#### Required Arguments
```dart
String userId = ...;
String lectureId = ...;
int lastWatchedSecond = ...;
DefaultConnector.instance.adminUpsertLectureProgress(
  userId: userId,
  lectureId: lectureId,
  lastWatchedSecond: lastWatchedSecond,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AdminUpsertLectureProgress, we created `AdminUpsertLectureProgressBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AdminUpsertLectureProgressVariablesBuilder {
  ...
   AdminUpsertLectureProgressVariablesBuilder completedAt(Timestamp? t) {
   _completedAt.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.adminUpsertLectureProgress(
  userId: userId,
  lectureId: lectureId,
  lastWatchedSecond: lastWatchedSecond,
)
.completedAt(completedAt)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AdminUpsertLectureProgressData, AdminUpsertLectureProgressVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminUpsertLectureProgress(
  userId: userId,
  lectureId: lectureId,
  lastWatchedSecond: lastWatchedSecond,
);
AdminUpsertLectureProgressData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String userId = ...;
String lectureId = ...;
int lastWatchedSecond = ...;

final ref = DefaultConnector.instance.adminUpsertLectureProgress(
  userId: userId,
  lectureId: lectureId,
  lastWatchedSecond: lastWatchedSecond,
).ref();
ref.execute();
```


### UpdateEnrollmentStatus
#### Required Arguments
```dart
String enrollmentId = ...;
EnrollmentStatus status = ...;
DefaultConnector.instance.updateEnrollmentStatus(
  enrollmentId: enrollmentId,
  status: status,
).execute();
```

#### Optional Arguments
We return a builder for each query. For UpdateEnrollmentStatus, we created `UpdateEnrollmentStatusBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class UpdateEnrollmentStatusVariablesBuilder {
  ...
   UpdateEnrollmentStatusVariablesBuilder completedAt(Timestamp? t) {
   _completedAt.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.updateEnrollmentStatus(
  enrollmentId: enrollmentId,
  status: status,
)
.completedAt(completedAt)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<UpdateEnrollmentStatusData, UpdateEnrollmentStatusVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.updateEnrollmentStatus(
  enrollmentId: enrollmentId,
  status: status,
);
UpdateEnrollmentStatusData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String enrollmentId = ...;
EnrollmentStatus status = ...;

final ref = DefaultConnector.instance.updateEnrollmentStatus(
  enrollmentId: enrollmentId,
  status: status,
).ref();
ref.execute();
```


### SubmitMission
#### Required Arguments
```dart
String missionId = ...;
String fileUrl = ...;
String studentId = ...;
DefaultConnector.instance.submitMission(
  missionId: missionId,
  fileUrl: fileUrl,
  studentId: studentId,
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
  studentId: studentId,
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
String studentId = ...;

final ref = DefaultConnector.instance.submitMission(
  missionId: missionId,
  fileUrl: fileUrl,
  studentId: studentId,
).ref();
ref.execute();
```


### GradeSubmission
#### Required Arguments
```dart
String submissionId = ...;
String graderId = ...;
DefaultConnector.instance.gradeSubmission(
  submissionId: submissionId,
  graderId: graderId,
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
  graderId: graderId,
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
  graderId: graderId,
);
GradeSubmissionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String submissionId = ...;
String graderId = ...;

final ref = DefaultConnector.instance.gradeSubmission(
  submissionId: submissionId,
  graderId: graderId,
).ref();
ref.execute();
```


### AddCriterionScore
#### Required Arguments
```dart
String submissionId = ...;
String criterionId = ...;
double score = ...;
DefaultConnector.instance.addCriterionScore(
  submissionId: submissionId,
  criterionId: criterionId,
  score: score,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AddCriterionScoreData, AddCriterionScoreVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.addCriterionScore(
  submissionId: submissionId,
  criterionId: criterionId,
  score: score,
);
AddCriterionScoreData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String submissionId = ...;
String criterionId = ...;
double score = ...;

final ref = DefaultConnector.instance.addCriterionScore(
  submissionId: submissionId,
  criterionId: criterionId,
  score: score,
).ref();
ref.execute();
```


### AdminCreateMission
#### Required Arguments
```dart
String title = ...;
String scenarioDescription = ...;
int durationMinutes = ...;
String categoryId = ...;
MissionDifficulty difficulty = ...;
String skillsTested = ...;
String authorId = ...;
DefaultConnector.instance.adminCreateMission(
  title: title,
  scenarioDescription: scenarioDescription,
  durationMinutes: durationMinutes,
  categoryId: categoryId,
  difficulty: difficulty,
  skillsTested: skillsTested,
  authorId: authorId,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AdminCreateMission, we created `AdminCreateMissionBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AdminCreateMissionVariablesBuilder {
  ...
   AdminCreateMissionVariablesBuilder courseId(String? t) {
   _courseId.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.adminCreateMission(
  title: title,
  scenarioDescription: scenarioDescription,
  durationMinutes: durationMinutes,
  categoryId: categoryId,
  difficulty: difficulty,
  skillsTested: skillsTested,
  authorId: authorId,
)
.courseId(courseId)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AdminCreateMissionData, AdminCreateMissionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminCreateMission(
  title: title,
  scenarioDescription: scenarioDescription,
  durationMinutes: durationMinutes,
  categoryId: categoryId,
  difficulty: difficulty,
  skillsTested: skillsTested,
  authorId: authorId,
);
AdminCreateMissionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String title = ...;
String scenarioDescription = ...;
int durationMinutes = ...;
String categoryId = ...;
MissionDifficulty difficulty = ...;
String skillsTested = ...;
String authorId = ...;

final ref = DefaultConnector.instance.adminCreateMission(
  title: title,
  scenarioDescription: scenarioDescription,
  durationMinutes: durationMinutes,
  categoryId: categoryId,
  difficulty: difficulty,
  skillsTested: skillsTested,
  authorId: authorId,
).ref();
ref.execute();
```


### AdminUpdateMission
#### Required Arguments
```dart
String missionId = ...;
DefaultConnector.instance.adminUpdateMission(
  missionId: missionId,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AdminUpdateMission, we created `AdminUpdateMissionBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AdminUpdateMissionVariablesBuilder {
  ...
   AdminUpdateMissionVariablesBuilder title(String? t) {
   _title.value = t;
   return this;
  }
  AdminUpdateMissionVariablesBuilder scenarioDescription(String? t) {
   _scenarioDescription.value = t;
   return this;
  }
  AdminUpdateMissionVariablesBuilder durationMinutes(int? t) {
   _durationMinutes.value = t;
   return this;
  }
  AdminUpdateMissionVariablesBuilder categoryId(String? t) {
   _categoryId.value = t;
   return this;
  }
  AdminUpdateMissionVariablesBuilder difficulty(MissionDifficulty? t) {
   _difficulty.value = t;
   return this;
  }
  AdminUpdateMissionVariablesBuilder skillsTested(List<String>? t) {
   _skillsTested.value = t;
   return this;
  }
  AdminUpdateMissionVariablesBuilder courseId(String? t) {
   _courseId.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.adminUpdateMission(
  missionId: missionId,
)
.title(title)
.scenarioDescription(scenarioDescription)
.durationMinutes(durationMinutes)
.categoryId(categoryId)
.difficulty(difficulty)
.skillsTested(skillsTested)
.courseId(courseId)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AdminUpdateMissionData, AdminUpdateMissionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminUpdateMission(
  missionId: missionId,
);
AdminUpdateMissionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String missionId = ...;

final ref = DefaultConnector.instance.adminUpdateMission(
  missionId: missionId,
).ref();
ref.execute();
```


### AdminSoftDeleteMission
#### Required Arguments
```dart
String missionId = ...;
DefaultConnector.instance.adminSoftDeleteMission(
  missionId: missionId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminSoftDeleteMissionData, AdminSoftDeleteMissionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminSoftDeleteMission(
  missionId: missionId,
);
AdminSoftDeleteMissionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String missionId = ...;

final ref = DefaultConnector.instance.adminSoftDeleteMission(
  missionId: missionId,
).ref();
ref.execute();
```


### AdminCreateMicroLesson
#### Required Arguments
```dart
String missionId = ...;
String title = ...;
LectureType type = ...;
int order = ...;
DefaultConnector.instance.adminCreateMicroLesson(
  missionId: missionId,
  title: title,
  type: type,
  order: order,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AdminCreateMicroLesson, we created `AdminCreateMicroLessonBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AdminCreateMicroLessonVariablesBuilder {
  ...
   AdminCreateMicroLessonVariablesBuilder assetUrl(String? t) {
   _assetUrl.value = t;
   return this;
  }
  AdminCreateMicroLessonVariablesBuilder content(String? t) {
   _content.value = t;
   return this;
  }
  AdminCreateMicroLessonVariablesBuilder durationSeconds(int? t) {
   _durationSeconds.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.adminCreateMicroLesson(
  missionId: missionId,
  title: title,
  type: type,
  order: order,
)
.assetUrl(assetUrl)
.content(content)
.durationSeconds(durationSeconds)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AdminCreateMicroLessonData, AdminCreateMicroLessonVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminCreateMicroLesson(
  missionId: missionId,
  title: title,
  type: type,
  order: order,
);
AdminCreateMicroLessonData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String missionId = ...;
String title = ...;
LectureType type = ...;
int order = ...;

final ref = DefaultConnector.instance.adminCreateMicroLesson(
  missionId: missionId,
  title: title,
  type: type,
  order: order,
).ref();
ref.execute();
```


### AdminUpdateMicroLesson
#### Required Arguments
```dart
String microLessonId = ...;
DefaultConnector.instance.adminUpdateMicroLesson(
  microLessonId: microLessonId,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AdminUpdateMicroLesson, we created `AdminUpdateMicroLessonBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AdminUpdateMicroLessonVariablesBuilder {
  ...
   AdminUpdateMicroLessonVariablesBuilder title(String? t) {
   _title.value = t;
   return this;
  }
  AdminUpdateMicroLessonVariablesBuilder type(LectureType? t) {
   _type.value = t;
   return this;
  }
  AdminUpdateMicroLessonVariablesBuilder assetUrl(String? t) {
   _assetUrl.value = t;
   return this;
  }
  AdminUpdateMicroLessonVariablesBuilder content(String? t) {
   _content.value = t;
   return this;
  }
  AdminUpdateMicroLessonVariablesBuilder durationSeconds(int? t) {
   _durationSeconds.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.adminUpdateMicroLesson(
  microLessonId: microLessonId,
)
.title(title)
.type(type)
.assetUrl(assetUrl)
.content(content)
.durationSeconds(durationSeconds)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AdminUpdateMicroLessonData, AdminUpdateMicroLessonVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminUpdateMicroLesson(
  microLessonId: microLessonId,
);
AdminUpdateMicroLessonData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String microLessonId = ...;

final ref = DefaultConnector.instance.adminUpdateMicroLesson(
  microLessonId: microLessonId,
).ref();
ref.execute();
```


### AdminDeleteMicroLesson
#### Required Arguments
```dart
String microLessonId = ...;
DefaultConnector.instance.adminDeleteMicroLesson(
  microLessonId: microLessonId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminDeleteMicroLessonData, AdminDeleteMicroLessonVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminDeleteMicroLesson(
  microLessonId: microLessonId,
);
AdminDeleteMicroLessonData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String microLessonId = ...;

final ref = DefaultConnector.instance.adminDeleteMicroLesson(
  microLessonId: microLessonId,
).ref();
ref.execute();
```


### AdminUpdateMicroLessonOrder
#### Required Arguments
```dart
String microLessonId = ...;
int order = ...;
DefaultConnector.instance.adminUpdateMicroLessonOrder(
  microLessonId: microLessonId,
  order: order,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminUpdateMicroLessonOrderData, AdminUpdateMicroLessonOrderVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminUpdateMicroLessonOrder(
  microLessonId: microLessonId,
  order: order,
);
AdminUpdateMicroLessonOrderData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String microLessonId = ...;
int order = ...;

final ref = DefaultConnector.instance.adminUpdateMicroLessonOrder(
  microLessonId: microLessonId,
  order: order,
).ref();
ref.execute();
```


### AdminCreateMissionTemplate
#### Required Arguments
```dart
String missionId = ...;
String title = ...;
String fileUrl = ...;
String fileType = ...;
DefaultConnector.instance.adminCreateMissionTemplate(
  missionId: missionId,
  title: title,
  fileUrl: fileUrl,
  fileType: fileType,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminCreateMissionTemplateData, AdminCreateMissionTemplateVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminCreateMissionTemplate(
  missionId: missionId,
  title: title,
  fileUrl: fileUrl,
  fileType: fileType,
);
AdminCreateMissionTemplateData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String missionId = ...;
String title = ...;
String fileUrl = ...;
String fileType = ...;

final ref = DefaultConnector.instance.adminCreateMissionTemplate(
  missionId: missionId,
  title: title,
  fileUrl: fileUrl,
  fileType: fileType,
).ref();
ref.execute();
```


### AdminDeleteMissionTemplate
#### Required Arguments
```dart
String templateId = ...;
DefaultConnector.instance.adminDeleteMissionTemplate(
  templateId: templateId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminDeleteMissionTemplateData, AdminDeleteMissionTemplateVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminDeleteMissionTemplate(
  templateId: templateId,
);
AdminDeleteMissionTemplateData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String templateId = ...;

final ref = DefaultConnector.instance.adminDeleteMissionTemplate(
  templateId: templateId,
).ref();
ref.execute();
```


### AdminCreateRubricCriterion
#### Required Arguments
```dart
String missionId = ...;
String criterionName = ...;
double maxPoints = ...;
int order = ...;
DefaultConnector.instance.adminCreateRubricCriterion(
  missionId: missionId,
  criterionName: criterionName,
  maxPoints: maxPoints,
  order: order,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AdminCreateRubricCriterion, we created `AdminCreateRubricCriterionBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AdminCreateRubricCriterionVariablesBuilder {
  ...
   AdminCreateRubricCriterionVariablesBuilder description(String? t) {
   _description.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.adminCreateRubricCriterion(
  missionId: missionId,
  criterionName: criterionName,
  maxPoints: maxPoints,
  order: order,
)
.description(description)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AdminCreateRubricCriterionData, AdminCreateRubricCriterionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminCreateRubricCriterion(
  missionId: missionId,
  criterionName: criterionName,
  maxPoints: maxPoints,
  order: order,
);
AdminCreateRubricCriterionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String missionId = ...;
String criterionName = ...;
double maxPoints = ...;
int order = ...;

final ref = DefaultConnector.instance.adminCreateRubricCriterion(
  missionId: missionId,
  criterionName: criterionName,
  maxPoints: maxPoints,
  order: order,
).ref();
ref.execute();
```


### AdminUpdateRubricCriterion
#### Required Arguments
```dart
String criterionId = ...;
DefaultConnector.instance.adminUpdateRubricCriterion(
  criterionId: criterionId,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AdminUpdateRubricCriterion, we created `AdminUpdateRubricCriterionBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AdminUpdateRubricCriterionVariablesBuilder {
  ...
   AdminUpdateRubricCriterionVariablesBuilder criterionName(String? t) {
   _criterionName.value = t;
   return this;
  }
  AdminUpdateRubricCriterionVariablesBuilder description(String? t) {
   _description.value = t;
   return this;
  }
  AdminUpdateRubricCriterionVariablesBuilder maxPoints(double? t) {
   _maxPoints.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.adminUpdateRubricCriterion(
  criterionId: criterionId,
)
.criterionName(criterionName)
.description(description)
.maxPoints(maxPoints)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AdminUpdateRubricCriterionData, AdminUpdateRubricCriterionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminUpdateRubricCriterion(
  criterionId: criterionId,
);
AdminUpdateRubricCriterionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String criterionId = ...;

final ref = DefaultConnector.instance.adminUpdateRubricCriterion(
  criterionId: criterionId,
).ref();
ref.execute();
```


### AdminDeleteRubricCriterion
#### Required Arguments
```dart
String criterionId = ...;
DefaultConnector.instance.adminDeleteRubricCriterion(
  criterionId: criterionId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminDeleteRubricCriterionData, AdminDeleteRubricCriterionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminDeleteRubricCriterion(
  criterionId: criterionId,
);
AdminDeleteRubricCriterionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String criterionId = ...;

final ref = DefaultConnector.instance.adminDeleteRubricCriterion(
  criterionId: criterionId,
).ref();
ref.execute();
```


### AdminUpdateRubricCriterionOrder
#### Required Arguments
```dart
String criterionId = ...;
int order = ...;
DefaultConnector.instance.adminUpdateRubricCriterionOrder(
  criterionId: criterionId,
  order: order,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminUpdateRubricCriterionOrderData, AdminUpdateRubricCriterionOrderVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminUpdateRubricCriterionOrder(
  criterionId: criterionId,
  order: order,
);
AdminUpdateRubricCriterionOrderData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String criterionId = ...;
int order = ...;

final ref = DefaultConnector.instance.adminUpdateRubricCriterionOrder(
  criterionId: criterionId,
  order: order,
).ref();
ref.execute();
```


### StartQuizAttempt
#### Required Arguments
```dart
String quizId = ...;
String userId = ...;
DefaultConnector.instance.startQuizAttempt(
  quizId: quizId,
  userId: userId,
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
  userId: userId,
);
StartQuizAttemptData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String quizId = ...;
String userId = ...;

final ref = DefaultConnector.instance.startQuizAttempt(
  quizId: quizId,
  userId: userId,
).ref();
ref.execute();
```


### SubmitQuizAnswer
#### Required Arguments
```dart
String attemptId = ...;
String questionId = ...;
String optionId = ...;
DefaultConnector.instance.submitQuizAnswer(
  attemptId: attemptId,
  questionId: questionId,
  optionId: optionId,
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
  optionId: optionId,
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
String optionId = ...;

final ref = DefaultConnector.instance.submitQuizAnswer(
  attemptId: attemptId,
  questionId: questionId,
  optionId: optionId,
).ref();
ref.execute();
```


### FinishQuizAttemptIfOpen
#### Required Arguments
```dart
String attemptId = ...;
double score = ...;
bool passed = ...;
DefaultConnector.instance.finishQuizAttemptIfOpen(
  attemptId: attemptId,
  score: score,
  passed: passed,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<FinishQuizAttemptIfOpenData, FinishQuizAttemptIfOpenVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.finishQuizAttemptIfOpen(
  attemptId: attemptId,
  score: score,
  passed: passed,
);
FinishQuizAttemptIfOpenData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String attemptId = ...;
double score = ...;
bool passed = ...;

final ref = DefaultConnector.instance.finishQuizAttemptIfOpen(
  attemptId: attemptId,
  score: score,
  passed: passed,
).ref();
ref.execute();
```


### AdminCreateQuiz
#### Required Arguments
```dart
String lectureId = ...;
double passingScore = ...;
int maxAttempts = ...;
DefaultConnector.instance.adminCreateQuiz(
  lectureId: lectureId,
  passingScore: passingScore,
  maxAttempts: maxAttempts,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AdminCreateQuiz, we created `AdminCreateQuizBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AdminCreateQuizVariablesBuilder {
  ...
   AdminCreateQuizVariablesBuilder timeLimitMinutes(int? t) {
   _timeLimitMinutes.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.adminCreateQuiz(
  lectureId: lectureId,
  passingScore: passingScore,
  maxAttempts: maxAttempts,
)
.timeLimitMinutes(timeLimitMinutes)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AdminCreateQuizData, AdminCreateQuizVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminCreateQuiz(
  lectureId: lectureId,
  passingScore: passingScore,
  maxAttempts: maxAttempts,
);
AdminCreateQuizData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String lectureId = ...;
double passingScore = ...;
int maxAttempts = ...;

final ref = DefaultConnector.instance.adminCreateQuiz(
  lectureId: lectureId,
  passingScore: passingScore,
  maxAttempts: maxAttempts,
).ref();
ref.execute();
```


### AdminUpdateQuiz
#### Required Arguments
```dart
String quizId = ...;
DefaultConnector.instance.adminUpdateQuiz(
  quizId: quizId,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AdminUpdateQuiz, we created `AdminUpdateQuizBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AdminUpdateQuizVariablesBuilder {
  ...
   AdminUpdateQuizVariablesBuilder passingScore(double? t) {
   _passingScore.value = t;
   return this;
  }
  AdminUpdateQuizVariablesBuilder maxAttempts(int? t) {
   _maxAttempts.value = t;
   return this;
  }
  AdminUpdateQuizVariablesBuilder timeLimitMinutes(int? t) {
   _timeLimitMinutes.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.adminUpdateQuiz(
  quizId: quizId,
)
.passingScore(passingScore)
.maxAttempts(maxAttempts)
.timeLimitMinutes(timeLimitMinutes)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AdminUpdateQuizData, AdminUpdateQuizVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminUpdateQuiz(
  quizId: quizId,
);
AdminUpdateQuizData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String quizId = ...;

final ref = DefaultConnector.instance.adminUpdateQuiz(
  quizId: quizId,
).ref();
ref.execute();
```


### AdminDeleteQuiz
#### Required Arguments
```dart
String quizId = ...;
DefaultConnector.instance.adminDeleteQuiz(
  quizId: quizId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminDeleteQuizData, AdminDeleteQuizVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminDeleteQuiz(
  quizId: quizId,
);
AdminDeleteQuizData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String quizId = ...;

final ref = DefaultConnector.instance.adminDeleteQuiz(
  quizId: quizId,
).ref();
ref.execute();
```


### AdminCreateQuizQuestion
#### Required Arguments
```dart
String quizId = ...;
String questionText = ...;
int order = ...;
double points = ...;
DefaultConnector.instance.adminCreateQuizQuestion(
  quizId: quizId,
  questionText: questionText,
  order: order,
  points: points,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AdminCreateQuizQuestion, we created `AdminCreateQuizQuestionBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AdminCreateQuizQuestionVariablesBuilder {
  ...
   AdminCreateQuizQuestionVariablesBuilder explanation(String? t) {
   _explanation.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.adminCreateQuizQuestion(
  quizId: quizId,
  questionText: questionText,
  order: order,
  points: points,
)
.explanation(explanation)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AdminCreateQuizQuestionData, AdminCreateQuizQuestionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminCreateQuizQuestion(
  quizId: quizId,
  questionText: questionText,
  order: order,
  points: points,
);
AdminCreateQuizQuestionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String quizId = ...;
String questionText = ...;
int order = ...;
double points = ...;

final ref = DefaultConnector.instance.adminCreateQuizQuestion(
  quizId: quizId,
  questionText: questionText,
  order: order,
  points: points,
).ref();
ref.execute();
```


### AdminUpdateQuizQuestion
#### Required Arguments
```dart
String questionId = ...;
DefaultConnector.instance.adminUpdateQuizQuestion(
  questionId: questionId,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AdminUpdateQuizQuestion, we created `AdminUpdateQuizQuestionBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AdminUpdateQuizQuestionVariablesBuilder {
  ...
   AdminUpdateQuizQuestionVariablesBuilder questionText(String? t) {
   _questionText.value = t;
   return this;
  }
  AdminUpdateQuizQuestionVariablesBuilder points(double? t) {
   _points.value = t;
   return this;
  }
  AdminUpdateQuizQuestionVariablesBuilder explanation(String? t) {
   _explanation.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.adminUpdateQuizQuestion(
  questionId: questionId,
)
.questionText(questionText)
.points(points)
.explanation(explanation)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AdminUpdateQuizQuestionData, AdminUpdateQuizQuestionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminUpdateQuizQuestion(
  questionId: questionId,
);
AdminUpdateQuizQuestionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String questionId = ...;

final ref = DefaultConnector.instance.adminUpdateQuizQuestion(
  questionId: questionId,
).ref();
ref.execute();
```


### AdminSoftDeleteQuizQuestion
#### Required Arguments
```dart
String questionId = ...;
DefaultConnector.instance.adminSoftDeleteQuizQuestion(
  questionId: questionId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminSoftDeleteQuizQuestionData, AdminSoftDeleteQuizQuestionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminSoftDeleteQuizQuestion(
  questionId: questionId,
);
AdminSoftDeleteQuizQuestionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String questionId = ...;

final ref = DefaultConnector.instance.adminSoftDeleteQuizQuestion(
  questionId: questionId,
).ref();
ref.execute();
```


### AdminUpdateQuizQuestionOrder
#### Required Arguments
```dart
String questionId = ...;
int order = ...;
DefaultConnector.instance.adminUpdateQuizQuestionOrder(
  questionId: questionId,
  order: order,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminUpdateQuizQuestionOrderData, AdminUpdateQuizQuestionOrderVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminUpdateQuizQuestionOrder(
  questionId: questionId,
  order: order,
);
AdminUpdateQuizQuestionOrderData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String questionId = ...;
int order = ...;

final ref = DefaultConnector.instance.adminUpdateQuizQuestionOrder(
  questionId: questionId,
  order: order,
).ref();
ref.execute();
```


### AdminCreateQuizOption
#### Required Arguments
```dart
String questionId = ...;
String text = ...;
int order = ...;
bool isCorrect = ...;
DefaultConnector.instance.adminCreateQuizOption(
  questionId: questionId,
  text: text,
  order: order,
  isCorrect: isCorrect,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminCreateQuizOptionData, AdminCreateQuizOptionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminCreateQuizOption(
  questionId: questionId,
  text: text,
  order: order,
  isCorrect: isCorrect,
);
AdminCreateQuizOptionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String questionId = ...;
String text = ...;
int order = ...;
bool isCorrect = ...;

final ref = DefaultConnector.instance.adminCreateQuizOption(
  questionId: questionId,
  text: text,
  order: order,
  isCorrect: isCorrect,
).ref();
ref.execute();
```


### AdminUpdateQuizOption
#### Required Arguments
```dart
String optionId = ...;
DefaultConnector.instance.adminUpdateQuizOption(
  optionId: optionId,
).execute();
```

#### Optional Arguments
We return a builder for each query. For AdminUpdateQuizOption, we created `AdminUpdateQuizOptionBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class AdminUpdateQuizOptionVariablesBuilder {
  ...
   AdminUpdateQuizOptionVariablesBuilder text(String? t) {
   _text.value = t;
   return this;
  }
  AdminUpdateQuizOptionVariablesBuilder isCorrect(bool? t) {
   _isCorrect.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.adminUpdateQuizOption(
  optionId: optionId,
)
.text(text)
.isCorrect(isCorrect)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<AdminUpdateQuizOptionData, AdminUpdateQuizOptionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminUpdateQuizOption(
  optionId: optionId,
);
AdminUpdateQuizOptionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String optionId = ...;

final ref = DefaultConnector.instance.adminUpdateQuizOption(
  optionId: optionId,
).ref();
ref.execute();
```


### AdminDeleteQuizOption
#### Required Arguments
```dart
String optionId = ...;
DefaultConnector.instance.adminDeleteQuizOption(
  optionId: optionId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminDeleteQuizOptionData, AdminDeleteQuizOptionVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminDeleteQuizOption(
  optionId: optionId,
);
AdminDeleteQuizOptionData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String optionId = ...;

final ref = DefaultConnector.instance.adminDeleteQuizOption(
  optionId: optionId,
).ref();
ref.execute();
```


### AdminUpdateQuizOptionOrder
#### Required Arguments
```dart
String optionId = ...;
int order = ...;
DefaultConnector.instance.adminUpdateQuizOptionOrder(
  optionId: optionId,
  order: order,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminUpdateQuizOptionOrderData, AdminUpdateQuizOptionOrderVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminUpdateQuizOptionOrder(
  optionId: optionId,
  order: order,
);
AdminUpdateQuizOptionOrderData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String optionId = ...;
int order = ...;

final ref = DefaultConnector.instance.adminUpdateQuizOptionOrder(
  optionId: optionId,
  order: order,
).ref();
ref.execute();
```


### UpsertCourseRating
#### Required Arguments
```dart
String courseId = ...;
int rating = ...;
String userId = ...;
DefaultConnector.instance.upsertCourseRating(
  courseId: courseId,
  rating: rating,
  userId: userId,
).execute();
```

#### Optional Arguments
We return a builder for each query. For UpsertCourseRating, we created `UpsertCourseRatingBuilder`. For queries and mutations with optional parameters, we return a builder class.
The builder pattern allows Data Connect to distinguish between fields that haven't been set and fields that have been set to null. A field can be set by calling its respective setter method like below:
```dart
class UpsertCourseRatingVariablesBuilder {
  ...
   UpsertCourseRatingVariablesBuilder review(String? t) {
   _review.value = t;
   return this;
  }

  ...
}
DefaultConnector.instance.upsertCourseRating(
  courseId: courseId,
  rating: rating,
  userId: userId,
)
.review(review)
.execute();
```

#### Return Type
`execute()` returns a `OperationResult<UpsertCourseRatingData, UpsertCourseRatingVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.upsertCourseRating(
  courseId: courseId,
  rating: rating,
  userId: userId,
);
UpsertCourseRatingData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;
int rating = ...;
String userId = ...;

final ref = DefaultConnector.instance.upsertCourseRating(
  courseId: courseId,
  rating: rating,
  userId: userId,
).ref();
ref.execute();
```


### DeleteCourseRating
#### Required Arguments
```dart
String courseId = ...;
String userId = ...;
DefaultConnector.instance.deleteCourseRating(
  courseId: courseId,
  userId: userId,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<DeleteCourseRatingData, DeleteCourseRatingVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.deleteCourseRating(
  courseId: courseId,
  userId: userId,
);
DeleteCourseRatingData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;
String userId = ...;

final ref = DefaultConnector.instance.deleteCourseRating(
  courseId: courseId,
  userId: userId,
).ref();
ref.execute();
```


### AdminUpdateCourseRatingAggregate
#### Required Arguments
```dart
String courseId = ...;
double avgRating = ...;
int ratingCount = ...;
DefaultConnector.instance.adminUpdateCourseRatingAggregate(
  courseId: courseId,
  avgRating: avgRating,
  ratingCount: ratingCount,
).execute();
```



#### Return Type
`execute()` returns a `OperationResult<AdminUpdateCourseRatingAggregateData, AdminUpdateCourseRatingAggregateVariables>`
```dart
/// Result of an Operation Request (query/mutation).
class OperationResult<Data, Variables> {
  OperationResult(this.dataConnect, this.data, this.ref);
  Data data;
  OperationRef<Data, Variables> ref;
  FirebaseDataConnect dataConnect;
}

final result = await DefaultConnector.instance.adminUpdateCourseRatingAggregate(
  courseId: courseId,
  avgRating: avgRating,
  ratingCount: ratingCount,
);
AdminUpdateCourseRatingAggregateData data = result.data;
final ref = result.ref;
```

#### Getting the Ref
Each builder returns an `execute` function, which is a helper function that creates a `Ref` object, and executes the underlying operation.
An example of how to use the `Ref` object is shown below:
```dart
String courseId = ...;
double avgRating = ...;
int ratingCount = ...;

final ref = DefaultConnector.instance.adminUpdateCourseRatingAggregate(
  courseId: courseId,
  avgRating: avgRating,
  ratingCount: ratingCount,
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


### SyncUser
#### Required Arguments
```dart
String email = ...;
String name = ...;
DefaultConnector.instance.syncUser(
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
String email = ...;
String name = ...;

final ref = DefaultConnector.instance.syncUser(
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

