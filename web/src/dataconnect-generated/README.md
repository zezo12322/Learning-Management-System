# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*MyPaymentHistory*](#mypaymenthistory)
  - [*GetPendingSubmissions*](#getpendingsubmissions)
  - [*GetQuizQuestions*](#getquizquestions)
  - [*GetCourseSessions*](#getcoursesessions)
  - [*ListPublishedCourses*](#listpublishedcourses)
  - [*GetCourseCurriculum*](#getcoursecurriculum)
  - [*MySubmissions*](#mysubmissions)
  - [*GetMe*](#getme)
  - [*MyCertificates*](#mycertificates)
  - [*VerifyCertificate*](#verifycertificate)
- [**Mutations**](#mutations)
  - [*LogPayment*](#logpayment)
  - [*AddPaymentItem*](#addpaymentitem)
  - [*StartQuizAttempt*](#startquizattempt)
  - [*SubmitQuizAnswer*](#submitquizanswer)
  - [*FinishQuizAttempt*](#finishquizattempt)
  - [*CheckInToSession*](#checkintosession)
  - [*EnrollInCourse*](#enrollincourse)
  - [*EnrollInMission*](#enrollinmission)
  - [*UpdateLectureProgress*](#updatelectureprogress)
  - [*SubmitMission*](#submitmission)
  - [*GradeSubmission*](#gradesubmission)
  - [*SyncUser*](#syncuser)
  - [*UpdateMyProfile*](#updatemyprofile)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## MyPaymentHistory
You can execute the `MyPaymentHistory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
myPaymentHistory(options?: ExecuteQueryOptions): QueryPromise<MyPaymentHistoryData, undefined>;

interface MyPaymentHistoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MyPaymentHistoryData, undefined>;
}
export const myPaymentHistoryRef: MyPaymentHistoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
myPaymentHistory(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<MyPaymentHistoryData, undefined>;

interface MyPaymentHistoryRef {
  ...
  (dc: DataConnect): QueryRef<MyPaymentHistoryData, undefined>;
}
export const myPaymentHistoryRef: MyPaymentHistoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the myPaymentHistoryRef:
```typescript
const name = myPaymentHistoryRef.operationName;
console.log(name);
```

### Variables
The `MyPaymentHistory` query has no variables.
### Return Type
Recall that executing the `MyPaymentHistory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MyPaymentHistoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MyPaymentHistoryData {
  payments: ({
    id: UUIDString;
    gateway: PaymentGateway;
    status: PaymentStatus;
    referenceId: string;
    createdAt: TimestampString;
    paymentItems_on_payment: ({
      priceAtPurchase: number;
      course?: {
        title: string;
      };
        mission?: {
          title: string;
        };
          subscriptionPlan?: {
            plan: string;
          };
    })[];
  } & Payment_Key)[];
}
```
### Using `MyPaymentHistory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, myPaymentHistory } from '@dataconnect/generated';


// Call the `myPaymentHistory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await myPaymentHistory();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await myPaymentHistory(dataConnect);

console.log(data.payments);

// Or, you can use the `Promise` API.
myPaymentHistory().then((response) => {
  const data = response.data;
  console.log(data.payments);
});
```

### Using `MyPaymentHistory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, myPaymentHistoryRef } from '@dataconnect/generated';


// Call the `myPaymentHistoryRef()` function to get a reference to the query.
const ref = myPaymentHistoryRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = myPaymentHistoryRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.payments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.payments);
});
```

## GetPendingSubmissions
You can execute the `GetPendingSubmissions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPendingSubmissions(options?: ExecuteQueryOptions): QueryPromise<GetPendingSubmissionsData, undefined>;

interface GetPendingSubmissionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPendingSubmissionsData, undefined>;
}
export const getPendingSubmissionsRef: GetPendingSubmissionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPendingSubmissions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetPendingSubmissionsData, undefined>;

interface GetPendingSubmissionsRef {
  ...
  (dc: DataConnect): QueryRef<GetPendingSubmissionsData, undefined>;
}
export const getPendingSubmissionsRef: GetPendingSubmissionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPendingSubmissionsRef:
```typescript
const name = getPendingSubmissionsRef.operationName;
console.log(name);
```

### Variables
The `GetPendingSubmissions` query has no variables.
### Return Type
Recall that executing the `GetPendingSubmissions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPendingSubmissionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPendingSubmissionsData {
  missionSubmissions: ({
    id: UUIDString;
    fileUrl: string;
    submittedAt?: TimestampString | null;
    student: {
      name: string;
      email: string;
    };
      mission: {
        title: string;
        difficulty: string;
        course?: {
          title: string;
        };
      };
  } & MissionSubmission_Key)[];
}
```
### Using `GetPendingSubmissions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPendingSubmissions } from '@dataconnect/generated';


// Call the `getPendingSubmissions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPendingSubmissions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPendingSubmissions(dataConnect);

console.log(data.missionSubmissions);

// Or, you can use the `Promise` API.
getPendingSubmissions().then((response) => {
  const data = response.data;
  console.log(data.missionSubmissions);
});
```

### Using `GetPendingSubmissions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPendingSubmissionsRef } from '@dataconnect/generated';


// Call the `getPendingSubmissionsRef()` function to get a reference to the query.
const ref = getPendingSubmissionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPendingSubmissionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.missionSubmissions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.missionSubmissions);
});
```

## GetQuizQuestions
You can execute the `GetQuizQuestions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getQuizQuestions(vars: GetQuizQuestionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuizQuestionsData, GetQuizQuestionsVariables>;

interface GetQuizQuestionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuizQuestionsVariables): QueryRef<GetQuizQuestionsData, GetQuizQuestionsVariables>;
}
export const getQuizQuestionsRef: GetQuizQuestionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getQuizQuestions(dc: DataConnect, vars: GetQuizQuestionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuizQuestionsData, GetQuizQuestionsVariables>;

interface GetQuizQuestionsRef {
  ...
  (dc: DataConnect, vars: GetQuizQuestionsVariables): QueryRef<GetQuizQuestionsData, GetQuizQuestionsVariables>;
}
export const getQuizQuestionsRef: GetQuizQuestionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getQuizQuestionsRef:
```typescript
const name = getQuizQuestionsRef.operationName;
console.log(name);
```

### Variables
The `GetQuizQuestions` query requires an argument of type `GetQuizQuestionsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetQuizQuestionsVariables {
  lectureId: UUIDString;
}
```
### Return Type
Recall that executing the `GetQuizQuestions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetQuizQuestionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetQuizQuestionsData {
  courseQuizs: ({
    id: UUIDString;
    passingScore: number;
    maxAttempts: number;
    quizQuestions_on_quiz: ({
      id: UUIDString;
      questionText: string;
      options: unknown;
    } & QuizQuestion_Key)[];
  } & CourseQuiz_Key)[];
}
```
### Using `GetQuizQuestions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQuizQuestions, GetQuizQuestionsVariables } from '@dataconnect/generated';

// The `GetQuizQuestions` query requires an argument of type `GetQuizQuestionsVariables`:
const getQuizQuestionsVars: GetQuizQuestionsVariables = {
  lectureId: ..., 
};

// Call the `getQuizQuestions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQuizQuestions(getQuizQuestionsVars);
// Variables can be defined inline as well.
const { data } = await getQuizQuestions({ lectureId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getQuizQuestions(dataConnect, getQuizQuestionsVars);

console.log(data.courseQuizs);

// Or, you can use the `Promise` API.
getQuizQuestions(getQuizQuestionsVars).then((response) => {
  const data = response.data;
  console.log(data.courseQuizs);
});
```

### Using `GetQuizQuestions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getQuizQuestionsRef, GetQuizQuestionsVariables } from '@dataconnect/generated';

// The `GetQuizQuestions` query requires an argument of type `GetQuizQuestionsVariables`:
const getQuizQuestionsVars: GetQuizQuestionsVariables = {
  lectureId: ..., 
};

// Call the `getQuizQuestionsRef()` function to get a reference to the query.
const ref = getQuizQuestionsRef(getQuizQuestionsVars);
// Variables can be defined inline as well.
const ref = getQuizQuestionsRef({ lectureId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getQuizQuestionsRef(dataConnect, getQuizQuestionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseQuizs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseQuizs);
});
```

## GetCourseSessions
You can execute the `GetCourseSessions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCourseSessions(vars: GetCourseSessionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseSessionsData, GetCourseSessionsVariables>;

interface GetCourseSessionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseSessionsVariables): QueryRef<GetCourseSessionsData, GetCourseSessionsVariables>;
}
export const getCourseSessionsRef: GetCourseSessionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCourseSessions(dc: DataConnect, vars: GetCourseSessionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseSessionsData, GetCourseSessionsVariables>;

interface GetCourseSessionsRef {
  ...
  (dc: DataConnect, vars: GetCourseSessionsVariables): QueryRef<GetCourseSessionsData, GetCourseSessionsVariables>;
}
export const getCourseSessionsRef: GetCourseSessionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCourseSessionsRef:
```typescript
const name = getCourseSessionsRef.operationName;
console.log(name);
```

### Variables
The `GetCourseSessions` query requires an argument of type `GetCourseSessionsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCourseSessionsVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `GetCourseSessions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCourseSessionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCourseSessionsData {
  sessions: ({
    id: UUIDString;
    title: string;
    startTime: TimestampString;
    endTime: TimestampString;
    type: SessionType;
    locationOrUrl: string;
  } & Session_Key)[];
}
```
### Using `GetCourseSessions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourseSessions, GetCourseSessionsVariables } from '@dataconnect/generated';

// The `GetCourseSessions` query requires an argument of type `GetCourseSessionsVariables`:
const getCourseSessionsVars: GetCourseSessionsVariables = {
  courseId: ..., 
};

// Call the `getCourseSessions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourseSessions(getCourseSessionsVars);
// Variables can be defined inline as well.
const { data } = await getCourseSessions({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourseSessions(dataConnect, getCourseSessionsVars);

console.log(data.sessions);

// Or, you can use the `Promise` API.
getCourseSessions(getCourseSessionsVars).then((response) => {
  const data = response.data;
  console.log(data.sessions);
});
```

### Using `GetCourseSessions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCourseSessionsRef, GetCourseSessionsVariables } from '@dataconnect/generated';

// The `GetCourseSessions` query requires an argument of type `GetCourseSessionsVariables`:
const getCourseSessionsVars: GetCourseSessionsVariables = {
  courseId: ..., 
};

// Call the `getCourseSessionsRef()` function to get a reference to the query.
const ref = getCourseSessionsRef(getCourseSessionsVars);
// Variables can be defined inline as well.
const ref = getCourseSessionsRef({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCourseSessionsRef(dataConnect, getCourseSessionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.sessions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.sessions);
});
```

## ListPublishedCourses
You can execute the `ListPublishedCourses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPublishedCourses(options?: ExecuteQueryOptions): QueryPromise<ListPublishedCoursesData, undefined>;

interface ListPublishedCoursesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPublishedCoursesData, undefined>;
}
export const listPublishedCoursesRef: ListPublishedCoursesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPublishedCourses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPublishedCoursesData, undefined>;

interface ListPublishedCoursesRef {
  ...
  (dc: DataConnect): QueryRef<ListPublishedCoursesData, undefined>;
}
export const listPublishedCoursesRef: ListPublishedCoursesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPublishedCoursesRef:
```typescript
const name = listPublishedCoursesRef.operationName;
console.log(name);
```

### Variables
The `ListPublishedCourses` query has no variables.
### Return Type
Recall that executing the `ListPublishedCourses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPublishedCoursesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPublishedCoursesData {
  courses: ({
    id: UUIDString;
    title: string;
    price: number;
    level: string;
    thumbnail?: string | null;
    tags?: string[] | null;
    courseInstructors_on_course: ({
      user: {
        name: string;
        avatar?: string | null;
      };
    })[];
  } & Course_Key)[];
}
```
### Using `ListPublishedCourses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPublishedCourses } from '@dataconnect/generated';


// Call the `listPublishedCourses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPublishedCourses();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPublishedCourses(dataConnect);

console.log(data.courses);

// Or, you can use the `Promise` API.
listPublishedCourses().then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

### Using `ListPublishedCourses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPublishedCoursesRef } from '@dataconnect/generated';


// Call the `listPublishedCoursesRef()` function to get a reference to the query.
const ref = listPublishedCoursesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPublishedCoursesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

## GetCourseCurriculum
You can execute the `GetCourseCurriculum` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCourseCurriculum(vars: GetCourseCurriculumVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseCurriculumData, GetCourseCurriculumVariables>;

interface GetCourseCurriculumRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseCurriculumVariables): QueryRef<GetCourseCurriculumData, GetCourseCurriculumVariables>;
}
export const getCourseCurriculumRef: GetCourseCurriculumRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCourseCurriculum(dc: DataConnect, vars: GetCourseCurriculumVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseCurriculumData, GetCourseCurriculumVariables>;

interface GetCourseCurriculumRef {
  ...
  (dc: DataConnect, vars: GetCourseCurriculumVariables): QueryRef<GetCourseCurriculumData, GetCourseCurriculumVariables>;
}
export const getCourseCurriculumRef: GetCourseCurriculumRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCourseCurriculumRef:
```typescript
const name = getCourseCurriculumRef.operationName;
console.log(name);
```

### Variables
The `GetCourseCurriculum` query requires an argument of type `GetCourseCurriculumVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCourseCurriculumVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `GetCourseCurriculum` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCourseCurriculumData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCourseCurriculumData {
  course?: {
    id: UUIDString;
    title: string;
    description?: string | null;
    language: string;
    courseSections_on_course: ({
      id: UUIDString;
      title: string;
      courseLectures_on_section: ({
        id: UUIDString;
        title: string;
        type: LectureType;
        duration?: number | null;
        isFreePreview: boolean;
      } & CourseLecture_Key)[];
    } & CourseSection_Key)[];
  } & Course_Key;
}
```
### Using `GetCourseCurriculum`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourseCurriculum, GetCourseCurriculumVariables } from '@dataconnect/generated';

// The `GetCourseCurriculum` query requires an argument of type `GetCourseCurriculumVariables`:
const getCourseCurriculumVars: GetCourseCurriculumVariables = {
  courseId: ..., 
};

// Call the `getCourseCurriculum()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourseCurriculum(getCourseCurriculumVars);
// Variables can be defined inline as well.
const { data } = await getCourseCurriculum({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourseCurriculum(dataConnect, getCourseCurriculumVars);

console.log(data.course);

// Or, you can use the `Promise` API.
getCourseCurriculum(getCourseCurriculumVars).then((response) => {
  const data = response.data;
  console.log(data.course);
});
```

### Using `GetCourseCurriculum`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCourseCurriculumRef, GetCourseCurriculumVariables } from '@dataconnect/generated';

// The `GetCourseCurriculum` query requires an argument of type `GetCourseCurriculumVariables`:
const getCourseCurriculumVars: GetCourseCurriculumVariables = {
  courseId: ..., 
};

// Call the `getCourseCurriculumRef()` function to get a reference to the query.
const ref = getCourseCurriculumRef(getCourseCurriculumVars);
// Variables can be defined inline as well.
const ref = getCourseCurriculumRef({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCourseCurriculumRef(dataConnect, getCourseCurriculumVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.course);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.course);
});
```

## MySubmissions
You can execute the `MySubmissions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
mySubmissions(options?: ExecuteQueryOptions): QueryPromise<MySubmissionsData, undefined>;

interface MySubmissionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MySubmissionsData, undefined>;
}
export const mySubmissionsRef: MySubmissionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
mySubmissions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<MySubmissionsData, undefined>;

interface MySubmissionsRef {
  ...
  (dc: DataConnect): QueryRef<MySubmissionsData, undefined>;
}
export const mySubmissionsRef: MySubmissionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the mySubmissionsRef:
```typescript
const name = mySubmissionsRef.operationName;
console.log(name);
```

### Variables
The `MySubmissions` query has no variables.
### Return Type
Recall that executing the `MySubmissions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MySubmissionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MySubmissionsData {
  missionSubmissions: ({
    id: UUIDString;
    fileUrl: string;
    feedback?: string | null;
    criteriaScores?: unknown | null;
    submittedAt?: TimestampString | null;
    mission: {
      title: string;
      difficulty: string;
    };
  } & MissionSubmission_Key)[];
}
```
### Using `MySubmissions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, mySubmissions } from '@dataconnect/generated';


// Call the `mySubmissions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await mySubmissions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await mySubmissions(dataConnect);

console.log(data.missionSubmissions);

// Or, you can use the `Promise` API.
mySubmissions().then((response) => {
  const data = response.data;
  console.log(data.missionSubmissions);
});
```

### Using `MySubmissions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, mySubmissionsRef } from '@dataconnect/generated';


// Call the `mySubmissionsRef()` function to get a reference to the query.
const ref = mySubmissionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = mySubmissionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.missionSubmissions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.missionSubmissions);
});
```

## GetMe
You can execute the `GetMe` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMe(options?: ExecuteQueryOptions): QueryPromise<GetMeData, undefined>;

interface GetMeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMeData, undefined>;
}
export const getMeRef: GetMeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMe(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMeData, undefined>;

interface GetMeRef {
  ...
  (dc: DataConnect): QueryRef<GetMeData, undefined>;
}
export const getMeRef: GetMeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMeRef:
```typescript
const name = getMeRef.operationName;
console.log(name);
```

### Variables
The `GetMe` query has no variables.
### Return Type
Recall that executing the `GetMe` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMeData {
  user?: {
    id: string;
    email: string;
    name: string;
    avatar?: string | null;
    createdAt: TimestampString;
    profile_on_user?: {
      bio?: string | null;
      company?: string | null;
      phone?: string | null;
      syncedPreferences?: unknown | null;
    };
      userRoles_on_user: ({
        role: {
          name: string;
        };
      })[];
  } & User_Key;
}
```
### Using `GetMe`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMe } from '@dataconnect/generated';


// Call the `getMe()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMe();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMe(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getMe().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetMe`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMeRef } from '@dataconnect/generated';


// Call the `getMeRef()` function to get a reference to the query.
const ref = getMeRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMeRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## MyCertificates
You can execute the `MyCertificates` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
myCertificates(options?: ExecuteQueryOptions): QueryPromise<MyCertificatesData, undefined>;

interface MyCertificatesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MyCertificatesData, undefined>;
}
export const myCertificatesRef: MyCertificatesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
myCertificates(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<MyCertificatesData, undefined>;

interface MyCertificatesRef {
  ...
  (dc: DataConnect): QueryRef<MyCertificatesData, undefined>;
}
export const myCertificatesRef: MyCertificatesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the myCertificatesRef:
```typescript
const name = myCertificatesRef.operationName;
console.log(name);
```

### Variables
The `MyCertificates` query has no variables.
### Return Type
Recall that executing the `MyCertificates` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MyCertificatesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MyCertificatesData {
  certificates: ({
    id: UUIDString;
    issuedAt: TimestampString;
    verificationHash: string;
    assetUrl: string;
    course?: {
      title: string;
    };
      mission?: {
        title: string;
      };
  } & Certificate_Key)[];
}
```
### Using `MyCertificates`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, myCertificates } from '@dataconnect/generated';


// Call the `myCertificates()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await myCertificates();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await myCertificates(dataConnect);

console.log(data.certificates);

// Or, you can use the `Promise` API.
myCertificates().then((response) => {
  const data = response.data;
  console.log(data.certificates);
});
```

### Using `MyCertificates`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, myCertificatesRef } from '@dataconnect/generated';


// Call the `myCertificatesRef()` function to get a reference to the query.
const ref = myCertificatesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = myCertificatesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.certificates);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.certificates);
});
```

## VerifyCertificate
You can execute the `VerifyCertificate` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
verifyCertificate(vars: VerifyCertificateVariables, options?: ExecuteQueryOptions): QueryPromise<VerifyCertificateData, VerifyCertificateVariables>;

interface VerifyCertificateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: VerifyCertificateVariables): QueryRef<VerifyCertificateData, VerifyCertificateVariables>;
}
export const verifyCertificateRef: VerifyCertificateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
verifyCertificate(dc: DataConnect, vars: VerifyCertificateVariables, options?: ExecuteQueryOptions): QueryPromise<VerifyCertificateData, VerifyCertificateVariables>;

interface VerifyCertificateRef {
  ...
  (dc: DataConnect, vars: VerifyCertificateVariables): QueryRef<VerifyCertificateData, VerifyCertificateVariables>;
}
export const verifyCertificateRef: VerifyCertificateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the verifyCertificateRef:
```typescript
const name = verifyCertificateRef.operationName;
console.log(name);
```

### Variables
The `VerifyCertificate` query requires an argument of type `VerifyCertificateVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface VerifyCertificateVariables {
  hash: string;
}
```
### Return Type
Recall that executing the `VerifyCertificate` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `VerifyCertificateData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface VerifyCertificateData {
  certificates: ({
    issuedAt: TimestampString;
    assetUrl: string;
    user: {
      name: string;
    };
      course?: {
        title: string;
      };
        mission?: {
          title: string;
        };
  })[];
}
```
### Using `VerifyCertificate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, verifyCertificate, VerifyCertificateVariables } from '@dataconnect/generated';

// The `VerifyCertificate` query requires an argument of type `VerifyCertificateVariables`:
const verifyCertificateVars: VerifyCertificateVariables = {
  hash: ..., 
};

// Call the `verifyCertificate()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await verifyCertificate(verifyCertificateVars);
// Variables can be defined inline as well.
const { data } = await verifyCertificate({ hash: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await verifyCertificate(dataConnect, verifyCertificateVars);

console.log(data.certificates);

// Or, you can use the `Promise` API.
verifyCertificate(verifyCertificateVars).then((response) => {
  const data = response.data;
  console.log(data.certificates);
});
```

### Using `VerifyCertificate`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, verifyCertificateRef, VerifyCertificateVariables } from '@dataconnect/generated';

// The `VerifyCertificate` query requires an argument of type `VerifyCertificateVariables`:
const verifyCertificateVars: VerifyCertificateVariables = {
  hash: ..., 
};

// Call the `verifyCertificateRef()` function to get a reference to the query.
const ref = verifyCertificateRef(verifyCertificateVars);
// Variables can be defined inline as well.
const ref = verifyCertificateRef({ hash: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = verifyCertificateRef(dataConnect, verifyCertificateVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.certificates);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.certificates);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## LogPayment
You can execute the `LogPayment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
logPayment(vars: LogPaymentVariables): MutationPromise<LogPaymentData, LogPaymentVariables>;

interface LogPaymentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogPaymentVariables): MutationRef<LogPaymentData, LogPaymentVariables>;
}
export const logPaymentRef: LogPaymentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
logPayment(dc: DataConnect, vars: LogPaymentVariables): MutationPromise<LogPaymentData, LogPaymentVariables>;

interface LogPaymentRef {
  ...
  (dc: DataConnect, vars: LogPaymentVariables): MutationRef<LogPaymentData, LogPaymentVariables>;
}
export const logPaymentRef: LogPaymentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the logPaymentRef:
```typescript
const name = logPaymentRef.operationName;
console.log(name);
```

### Variables
The `LogPayment` mutation requires an argument of type `LogPaymentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface LogPaymentVariables {
  gateway: PaymentGateway;
  referenceId: string;
}
```
### Return Type
Recall that executing the `LogPayment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `LogPaymentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface LogPaymentData {
  payment_insert: Payment_Key;
}
```
### Using `LogPayment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, logPayment, LogPaymentVariables } from '@dataconnect/generated';

// The `LogPayment` mutation requires an argument of type `LogPaymentVariables`:
const logPaymentVars: LogPaymentVariables = {
  gateway: ..., 
  referenceId: ..., 
};

// Call the `logPayment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await logPayment(logPaymentVars);
// Variables can be defined inline as well.
const { data } = await logPayment({ gateway: ..., referenceId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await logPayment(dataConnect, logPaymentVars);

console.log(data.payment_insert);

// Or, you can use the `Promise` API.
logPayment(logPaymentVars).then((response) => {
  const data = response.data;
  console.log(data.payment_insert);
});
```

### Using `LogPayment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, logPaymentRef, LogPaymentVariables } from '@dataconnect/generated';

// The `LogPayment` mutation requires an argument of type `LogPaymentVariables`:
const logPaymentVars: LogPaymentVariables = {
  gateway: ..., 
  referenceId: ..., 
};

// Call the `logPaymentRef()` function to get a reference to the mutation.
const ref = logPaymentRef(logPaymentVars);
// Variables can be defined inline as well.
const ref = logPaymentRef({ gateway: ..., referenceId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = logPaymentRef(dataConnect, logPaymentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.payment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.payment_insert);
});
```

## AddPaymentItem
You can execute the `AddPaymentItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addPaymentItem(vars: AddPaymentItemVariables): MutationPromise<AddPaymentItemData, AddPaymentItemVariables>;

interface AddPaymentItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddPaymentItemVariables): MutationRef<AddPaymentItemData, AddPaymentItemVariables>;
}
export const addPaymentItemRef: AddPaymentItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addPaymentItem(dc: DataConnect, vars: AddPaymentItemVariables): MutationPromise<AddPaymentItemData, AddPaymentItemVariables>;

interface AddPaymentItemRef {
  ...
  (dc: DataConnect, vars: AddPaymentItemVariables): MutationRef<AddPaymentItemData, AddPaymentItemVariables>;
}
export const addPaymentItemRef: AddPaymentItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addPaymentItemRef:
```typescript
const name = addPaymentItemRef.operationName;
console.log(name);
```

### Variables
The `AddPaymentItem` mutation requires an argument of type `AddPaymentItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddPaymentItemVariables {
  paymentId: UUIDString;
  courseId?: UUIDString | null;
  missionId?: UUIDString | null;
  subscriptionPlanId?: UUIDString | null;
  price: number;
}
```
### Return Type
Recall that executing the `AddPaymentItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddPaymentItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddPaymentItemData {
  paymentItem_insert: PaymentItem_Key;
}
```
### Using `AddPaymentItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addPaymentItem, AddPaymentItemVariables } from '@dataconnect/generated';

// The `AddPaymentItem` mutation requires an argument of type `AddPaymentItemVariables`:
const addPaymentItemVars: AddPaymentItemVariables = {
  paymentId: ..., 
  courseId: ..., // optional
  missionId: ..., // optional
  subscriptionPlanId: ..., // optional
  price: ..., 
};

// Call the `addPaymentItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addPaymentItem(addPaymentItemVars);
// Variables can be defined inline as well.
const { data } = await addPaymentItem({ paymentId: ..., courseId: ..., missionId: ..., subscriptionPlanId: ..., price: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addPaymentItem(dataConnect, addPaymentItemVars);

console.log(data.paymentItem_insert);

// Or, you can use the `Promise` API.
addPaymentItem(addPaymentItemVars).then((response) => {
  const data = response.data;
  console.log(data.paymentItem_insert);
});
```

### Using `AddPaymentItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addPaymentItemRef, AddPaymentItemVariables } from '@dataconnect/generated';

// The `AddPaymentItem` mutation requires an argument of type `AddPaymentItemVariables`:
const addPaymentItemVars: AddPaymentItemVariables = {
  paymentId: ..., 
  courseId: ..., // optional
  missionId: ..., // optional
  subscriptionPlanId: ..., // optional
  price: ..., 
};

// Call the `addPaymentItemRef()` function to get a reference to the mutation.
const ref = addPaymentItemRef(addPaymentItemVars);
// Variables can be defined inline as well.
const ref = addPaymentItemRef({ paymentId: ..., courseId: ..., missionId: ..., subscriptionPlanId: ..., price: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addPaymentItemRef(dataConnect, addPaymentItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.paymentItem_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.paymentItem_insert);
});
```

## StartQuizAttempt
You can execute the `StartQuizAttempt` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
startQuizAttempt(vars: StartQuizAttemptVariables): MutationPromise<StartQuizAttemptData, StartQuizAttemptVariables>;

interface StartQuizAttemptRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: StartQuizAttemptVariables): MutationRef<StartQuizAttemptData, StartQuizAttemptVariables>;
}
export const startQuizAttemptRef: StartQuizAttemptRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
startQuizAttempt(dc: DataConnect, vars: StartQuizAttemptVariables): MutationPromise<StartQuizAttemptData, StartQuizAttemptVariables>;

interface StartQuizAttemptRef {
  ...
  (dc: DataConnect, vars: StartQuizAttemptVariables): MutationRef<StartQuizAttemptData, StartQuizAttemptVariables>;
}
export const startQuizAttemptRef: StartQuizAttemptRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the startQuizAttemptRef:
```typescript
const name = startQuizAttemptRef.operationName;
console.log(name);
```

### Variables
The `StartQuizAttempt` mutation requires an argument of type `StartQuizAttemptVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface StartQuizAttemptVariables {
  quizId: UUIDString;
}
```
### Return Type
Recall that executing the `StartQuizAttempt` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `StartQuizAttemptData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface StartQuizAttemptData {
  quizAttempt_insert: QuizAttempt_Key;
}
```
### Using `StartQuizAttempt`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, startQuizAttempt, StartQuizAttemptVariables } from '@dataconnect/generated';

// The `StartQuizAttempt` mutation requires an argument of type `StartQuizAttemptVariables`:
const startQuizAttemptVars: StartQuizAttemptVariables = {
  quizId: ..., 
};

// Call the `startQuizAttempt()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await startQuizAttempt(startQuizAttemptVars);
// Variables can be defined inline as well.
const { data } = await startQuizAttempt({ quizId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await startQuizAttempt(dataConnect, startQuizAttemptVars);

console.log(data.quizAttempt_insert);

// Or, you can use the `Promise` API.
startQuizAttempt(startQuizAttemptVars).then((response) => {
  const data = response.data;
  console.log(data.quizAttempt_insert);
});
```

### Using `StartQuizAttempt`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, startQuizAttemptRef, StartQuizAttemptVariables } from '@dataconnect/generated';

// The `StartQuizAttempt` mutation requires an argument of type `StartQuizAttemptVariables`:
const startQuizAttemptVars: StartQuizAttemptVariables = {
  quizId: ..., 
};

// Call the `startQuizAttemptRef()` function to get a reference to the mutation.
const ref = startQuizAttemptRef(startQuizAttemptVars);
// Variables can be defined inline as well.
const ref = startQuizAttemptRef({ quizId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = startQuizAttemptRef(dataConnect, startQuizAttemptVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quizAttempt_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quizAttempt_insert);
});
```

## SubmitQuizAnswer
You can execute the `SubmitQuizAnswer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
submitQuizAnswer(vars: SubmitQuizAnswerVariables): MutationPromise<SubmitQuizAnswerData, SubmitQuizAnswerVariables>;

interface SubmitQuizAnswerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitQuizAnswerVariables): MutationRef<SubmitQuizAnswerData, SubmitQuizAnswerVariables>;
}
export const submitQuizAnswerRef: SubmitQuizAnswerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
submitQuizAnswer(dc: DataConnect, vars: SubmitQuizAnswerVariables): MutationPromise<SubmitQuizAnswerData, SubmitQuizAnswerVariables>;

interface SubmitQuizAnswerRef {
  ...
  (dc: DataConnect, vars: SubmitQuizAnswerVariables): MutationRef<SubmitQuizAnswerData, SubmitQuizAnswerVariables>;
}
export const submitQuizAnswerRef: SubmitQuizAnswerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the submitQuizAnswerRef:
```typescript
const name = submitQuizAnswerRef.operationName;
console.log(name);
```

### Variables
The `SubmitQuizAnswer` mutation requires an argument of type `SubmitQuizAnswerVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SubmitQuizAnswerVariables {
  attemptId: UUIDString;
  questionId: UUIDString;
  selectedIndex: number;
}
```
### Return Type
Recall that executing the `SubmitQuizAnswer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SubmitQuizAnswerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SubmitQuizAnswerData {
  quizAttemptAnswer_insert: QuizAttemptAnswer_Key;
}
```
### Using `SubmitQuizAnswer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, submitQuizAnswer, SubmitQuizAnswerVariables } from '@dataconnect/generated';

// The `SubmitQuizAnswer` mutation requires an argument of type `SubmitQuizAnswerVariables`:
const submitQuizAnswerVars: SubmitQuizAnswerVariables = {
  attemptId: ..., 
  questionId: ..., 
  selectedIndex: ..., 
};

// Call the `submitQuizAnswer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await submitQuizAnswer(submitQuizAnswerVars);
// Variables can be defined inline as well.
const { data } = await submitQuizAnswer({ attemptId: ..., questionId: ..., selectedIndex: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await submitQuizAnswer(dataConnect, submitQuizAnswerVars);

console.log(data.quizAttemptAnswer_insert);

// Or, you can use the `Promise` API.
submitQuizAnswer(submitQuizAnswerVars).then((response) => {
  const data = response.data;
  console.log(data.quizAttemptAnswer_insert);
});
```

### Using `SubmitQuizAnswer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, submitQuizAnswerRef, SubmitQuizAnswerVariables } from '@dataconnect/generated';

// The `SubmitQuizAnswer` mutation requires an argument of type `SubmitQuizAnswerVariables`:
const submitQuizAnswerVars: SubmitQuizAnswerVariables = {
  attemptId: ..., 
  questionId: ..., 
  selectedIndex: ..., 
};

// Call the `submitQuizAnswerRef()` function to get a reference to the mutation.
const ref = submitQuizAnswerRef(submitQuizAnswerVars);
// Variables can be defined inline as well.
const ref = submitQuizAnswerRef({ attemptId: ..., questionId: ..., selectedIndex: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = submitQuizAnswerRef(dataConnect, submitQuizAnswerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quizAttemptAnswer_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quizAttemptAnswer_insert);
});
```

## FinishQuizAttempt
You can execute the `FinishQuizAttempt` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
finishQuizAttempt(vars: FinishQuizAttemptVariables): MutationPromise<FinishQuizAttemptData, FinishQuizAttemptVariables>;

interface FinishQuizAttemptRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: FinishQuizAttemptVariables): MutationRef<FinishQuizAttemptData, FinishQuizAttemptVariables>;
}
export const finishQuizAttemptRef: FinishQuizAttemptRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
finishQuizAttempt(dc: DataConnect, vars: FinishQuizAttemptVariables): MutationPromise<FinishQuizAttemptData, FinishQuizAttemptVariables>;

interface FinishQuizAttemptRef {
  ...
  (dc: DataConnect, vars: FinishQuizAttemptVariables): MutationRef<FinishQuizAttemptData, FinishQuizAttemptVariables>;
}
export const finishQuizAttemptRef: FinishQuizAttemptRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the finishQuizAttemptRef:
```typescript
const name = finishQuizAttemptRef.operationName;
console.log(name);
```

### Variables
The `FinishQuizAttempt` mutation requires an argument of type `FinishQuizAttemptVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface FinishQuizAttemptVariables {
  attemptId: UUIDString;
}
```
### Return Type
Recall that executing the `FinishQuizAttempt` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `FinishQuizAttemptData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface FinishQuizAttemptData {
  quizAttempt_update?: QuizAttempt_Key | null;
}
```
### Using `FinishQuizAttempt`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, finishQuizAttempt, FinishQuizAttemptVariables } from '@dataconnect/generated';

// The `FinishQuizAttempt` mutation requires an argument of type `FinishQuizAttemptVariables`:
const finishQuizAttemptVars: FinishQuizAttemptVariables = {
  attemptId: ..., 
};

// Call the `finishQuizAttempt()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await finishQuizAttempt(finishQuizAttemptVars);
// Variables can be defined inline as well.
const { data } = await finishQuizAttempt({ attemptId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await finishQuizAttempt(dataConnect, finishQuizAttemptVars);

console.log(data.quizAttempt_update);

// Or, you can use the `Promise` API.
finishQuizAttempt(finishQuizAttemptVars).then((response) => {
  const data = response.data;
  console.log(data.quizAttempt_update);
});
```

### Using `FinishQuizAttempt`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, finishQuizAttemptRef, FinishQuizAttemptVariables } from '@dataconnect/generated';

// The `FinishQuizAttempt` mutation requires an argument of type `FinishQuizAttemptVariables`:
const finishQuizAttemptVars: FinishQuizAttemptVariables = {
  attemptId: ..., 
};

// Call the `finishQuizAttemptRef()` function to get a reference to the mutation.
const ref = finishQuizAttemptRef(finishQuizAttemptVars);
// Variables can be defined inline as well.
const ref = finishQuizAttemptRef({ attemptId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = finishQuizAttemptRef(dataConnect, finishQuizAttemptVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quizAttempt_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quizAttempt_update);
});
```

## CheckInToSession
You can execute the `CheckInToSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
checkInToSession(vars: CheckInToSessionVariables): MutationPromise<CheckInToSessionData, CheckInToSessionVariables>;

interface CheckInToSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CheckInToSessionVariables): MutationRef<CheckInToSessionData, CheckInToSessionVariables>;
}
export const checkInToSessionRef: CheckInToSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
checkInToSession(dc: DataConnect, vars: CheckInToSessionVariables): MutationPromise<CheckInToSessionData, CheckInToSessionVariables>;

interface CheckInToSessionRef {
  ...
  (dc: DataConnect, vars: CheckInToSessionVariables): MutationRef<CheckInToSessionData, CheckInToSessionVariables>;
}
export const checkInToSessionRef: CheckInToSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the checkInToSessionRef:
```typescript
const name = checkInToSessionRef.operationName;
console.log(name);
```

### Variables
The `CheckInToSession` mutation requires an argument of type `CheckInToSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CheckInToSessionVariables {
  sessionId: UUIDString;
  status: AttendanceStatus;
  method: AttendanceMethod;
}
```
### Return Type
Recall that executing the `CheckInToSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CheckInToSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CheckInToSessionData {
  attendance_insert: Attendance_Key;
}
```
### Using `CheckInToSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, checkInToSession, CheckInToSessionVariables } from '@dataconnect/generated';

// The `CheckInToSession` mutation requires an argument of type `CheckInToSessionVariables`:
const checkInToSessionVars: CheckInToSessionVariables = {
  sessionId: ..., 
  status: ..., 
  method: ..., 
};

// Call the `checkInToSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await checkInToSession(checkInToSessionVars);
// Variables can be defined inline as well.
const { data } = await checkInToSession({ sessionId: ..., status: ..., method: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await checkInToSession(dataConnect, checkInToSessionVars);

console.log(data.attendance_insert);

// Or, you can use the `Promise` API.
checkInToSession(checkInToSessionVars).then((response) => {
  const data = response.data;
  console.log(data.attendance_insert);
});
```

### Using `CheckInToSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, checkInToSessionRef, CheckInToSessionVariables } from '@dataconnect/generated';

// The `CheckInToSession` mutation requires an argument of type `CheckInToSessionVariables`:
const checkInToSessionVars: CheckInToSessionVariables = {
  sessionId: ..., 
  status: ..., 
  method: ..., 
};

// Call the `checkInToSessionRef()` function to get a reference to the mutation.
const ref = checkInToSessionRef(checkInToSessionVars);
// Variables can be defined inline as well.
const ref = checkInToSessionRef({ sessionId: ..., status: ..., method: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = checkInToSessionRef(dataConnect, checkInToSessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.attendance_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.attendance_insert);
});
```

## EnrollInCourse
You can execute the `EnrollInCourse` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
enrollInCourse(vars: EnrollInCourseVariables): MutationPromise<EnrollInCourseData, EnrollInCourseVariables>;

interface EnrollInCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EnrollInCourseVariables): MutationRef<EnrollInCourseData, EnrollInCourseVariables>;
}
export const enrollInCourseRef: EnrollInCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
enrollInCourse(dc: DataConnect, vars: EnrollInCourseVariables): MutationPromise<EnrollInCourseData, EnrollInCourseVariables>;

interface EnrollInCourseRef {
  ...
  (dc: DataConnect, vars: EnrollInCourseVariables): MutationRef<EnrollInCourseData, EnrollInCourseVariables>;
}
export const enrollInCourseRef: EnrollInCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the enrollInCourseRef:
```typescript
const name = enrollInCourseRef.operationName;
console.log(name);
```

### Variables
The `EnrollInCourse` mutation requires an argument of type `EnrollInCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EnrollInCourseVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `EnrollInCourse` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EnrollInCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EnrollInCourseData {
  enrollment_insert: Enrollment_Key;
}
```
### Using `EnrollInCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, enrollInCourse, EnrollInCourseVariables } from '@dataconnect/generated';

// The `EnrollInCourse` mutation requires an argument of type `EnrollInCourseVariables`:
const enrollInCourseVars: EnrollInCourseVariables = {
  courseId: ..., 
};

// Call the `enrollInCourse()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await enrollInCourse(enrollInCourseVars);
// Variables can be defined inline as well.
const { data } = await enrollInCourse({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await enrollInCourse(dataConnect, enrollInCourseVars);

console.log(data.enrollment_insert);

// Or, you can use the `Promise` API.
enrollInCourse(enrollInCourseVars).then((response) => {
  const data = response.data;
  console.log(data.enrollment_insert);
});
```

### Using `EnrollInCourse`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, enrollInCourseRef, EnrollInCourseVariables } from '@dataconnect/generated';

// The `EnrollInCourse` mutation requires an argument of type `EnrollInCourseVariables`:
const enrollInCourseVars: EnrollInCourseVariables = {
  courseId: ..., 
};

// Call the `enrollInCourseRef()` function to get a reference to the mutation.
const ref = enrollInCourseRef(enrollInCourseVars);
// Variables can be defined inline as well.
const ref = enrollInCourseRef({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = enrollInCourseRef(dataConnect, enrollInCourseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.enrollment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollment_insert);
});
```

## EnrollInMission
You can execute the `EnrollInMission` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
enrollInMission(vars: EnrollInMissionVariables): MutationPromise<EnrollInMissionData, EnrollInMissionVariables>;

interface EnrollInMissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EnrollInMissionVariables): MutationRef<EnrollInMissionData, EnrollInMissionVariables>;
}
export const enrollInMissionRef: EnrollInMissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
enrollInMission(dc: DataConnect, vars: EnrollInMissionVariables): MutationPromise<EnrollInMissionData, EnrollInMissionVariables>;

interface EnrollInMissionRef {
  ...
  (dc: DataConnect, vars: EnrollInMissionVariables): MutationRef<EnrollInMissionData, EnrollInMissionVariables>;
}
export const enrollInMissionRef: EnrollInMissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the enrollInMissionRef:
```typescript
const name = enrollInMissionRef.operationName;
console.log(name);
```

### Variables
The `EnrollInMission` mutation requires an argument of type `EnrollInMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EnrollInMissionVariables {
  missionId: UUIDString;
}
```
### Return Type
Recall that executing the `EnrollInMission` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EnrollInMissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EnrollInMissionData {
  enrollment_insert: Enrollment_Key;
}
```
### Using `EnrollInMission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, enrollInMission, EnrollInMissionVariables } from '@dataconnect/generated';

// The `EnrollInMission` mutation requires an argument of type `EnrollInMissionVariables`:
const enrollInMissionVars: EnrollInMissionVariables = {
  missionId: ..., 
};

// Call the `enrollInMission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await enrollInMission(enrollInMissionVars);
// Variables can be defined inline as well.
const { data } = await enrollInMission({ missionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await enrollInMission(dataConnect, enrollInMissionVars);

console.log(data.enrollment_insert);

// Or, you can use the `Promise` API.
enrollInMission(enrollInMissionVars).then((response) => {
  const data = response.data;
  console.log(data.enrollment_insert);
});
```

### Using `EnrollInMission`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, enrollInMissionRef, EnrollInMissionVariables } from '@dataconnect/generated';

// The `EnrollInMission` mutation requires an argument of type `EnrollInMissionVariables`:
const enrollInMissionVars: EnrollInMissionVariables = {
  missionId: ..., 
};

// Call the `enrollInMissionRef()` function to get a reference to the mutation.
const ref = enrollInMissionRef(enrollInMissionVars);
// Variables can be defined inline as well.
const ref = enrollInMissionRef({ missionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = enrollInMissionRef(dataConnect, enrollInMissionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.enrollment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollment_insert);
});
```

## UpdateLectureProgress
You can execute the `UpdateLectureProgress` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateLectureProgress(vars: UpdateLectureProgressVariables): MutationPromise<UpdateLectureProgressData, UpdateLectureProgressVariables>;

interface UpdateLectureProgressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLectureProgressVariables): MutationRef<UpdateLectureProgressData, UpdateLectureProgressVariables>;
}
export const updateLectureProgressRef: UpdateLectureProgressRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateLectureProgress(dc: DataConnect, vars: UpdateLectureProgressVariables): MutationPromise<UpdateLectureProgressData, UpdateLectureProgressVariables>;

interface UpdateLectureProgressRef {
  ...
  (dc: DataConnect, vars: UpdateLectureProgressVariables): MutationRef<UpdateLectureProgressData, UpdateLectureProgressVariables>;
}
export const updateLectureProgressRef: UpdateLectureProgressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateLectureProgressRef:
```typescript
const name = updateLectureProgressRef.operationName;
console.log(name);
```

### Variables
The `UpdateLectureProgress` mutation requires an argument of type `UpdateLectureProgressVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateLectureProgressVariables {
  lectureId: UUIDString;
  lastWatchedSecond: number;
  completedAt?: TimestampString | null;
}
```
### Return Type
Recall that executing the `UpdateLectureProgress` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateLectureProgressData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateLectureProgressData {
  lectureProgress_upsert: LectureProgress_Key;
}
```
### Using `UpdateLectureProgress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateLectureProgress, UpdateLectureProgressVariables } from '@dataconnect/generated';

// The `UpdateLectureProgress` mutation requires an argument of type `UpdateLectureProgressVariables`:
const updateLectureProgressVars: UpdateLectureProgressVariables = {
  lectureId: ..., 
  lastWatchedSecond: ..., 
  completedAt: ..., // optional
};

// Call the `updateLectureProgress()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateLectureProgress(updateLectureProgressVars);
// Variables can be defined inline as well.
const { data } = await updateLectureProgress({ lectureId: ..., lastWatchedSecond: ..., completedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateLectureProgress(dataConnect, updateLectureProgressVars);

console.log(data.lectureProgress_upsert);

// Or, you can use the `Promise` API.
updateLectureProgress(updateLectureProgressVars).then((response) => {
  const data = response.data;
  console.log(data.lectureProgress_upsert);
});
```

### Using `UpdateLectureProgress`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateLectureProgressRef, UpdateLectureProgressVariables } from '@dataconnect/generated';

// The `UpdateLectureProgress` mutation requires an argument of type `UpdateLectureProgressVariables`:
const updateLectureProgressVars: UpdateLectureProgressVariables = {
  lectureId: ..., 
  lastWatchedSecond: ..., 
  completedAt: ..., // optional
};

// Call the `updateLectureProgressRef()` function to get a reference to the mutation.
const ref = updateLectureProgressRef(updateLectureProgressVars);
// Variables can be defined inline as well.
const ref = updateLectureProgressRef({ lectureId: ..., lastWatchedSecond: ..., completedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateLectureProgressRef(dataConnect, updateLectureProgressVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.lectureProgress_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.lectureProgress_upsert);
});
```

## SubmitMission
You can execute the `SubmitMission` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
submitMission(vars: SubmitMissionVariables): MutationPromise<SubmitMissionData, SubmitMissionVariables>;

interface SubmitMissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitMissionVariables): MutationRef<SubmitMissionData, SubmitMissionVariables>;
}
export const submitMissionRef: SubmitMissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
submitMission(dc: DataConnect, vars: SubmitMissionVariables): MutationPromise<SubmitMissionData, SubmitMissionVariables>;

interface SubmitMissionRef {
  ...
  (dc: DataConnect, vars: SubmitMissionVariables): MutationRef<SubmitMissionData, SubmitMissionVariables>;
}
export const submitMissionRef: SubmitMissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the submitMissionRef:
```typescript
const name = submitMissionRef.operationName;
console.log(name);
```

### Variables
The `SubmitMission` mutation requires an argument of type `SubmitMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SubmitMissionVariables {
  missionId: UUIDString;
  fileUrl: string;
}
```
### Return Type
Recall that executing the `SubmitMission` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SubmitMissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SubmitMissionData {
  missionSubmission_insert: MissionSubmission_Key;
}
```
### Using `SubmitMission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, submitMission, SubmitMissionVariables } from '@dataconnect/generated';

// The `SubmitMission` mutation requires an argument of type `SubmitMissionVariables`:
const submitMissionVars: SubmitMissionVariables = {
  missionId: ..., 
  fileUrl: ..., 
};

// Call the `submitMission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await submitMission(submitMissionVars);
// Variables can be defined inline as well.
const { data } = await submitMission({ missionId: ..., fileUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await submitMission(dataConnect, submitMissionVars);

console.log(data.missionSubmission_insert);

// Or, you can use the `Promise` API.
submitMission(submitMissionVars).then((response) => {
  const data = response.data;
  console.log(data.missionSubmission_insert);
});
```

### Using `SubmitMission`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, submitMissionRef, SubmitMissionVariables } from '@dataconnect/generated';

// The `SubmitMission` mutation requires an argument of type `SubmitMissionVariables`:
const submitMissionVars: SubmitMissionVariables = {
  missionId: ..., 
  fileUrl: ..., 
};

// Call the `submitMissionRef()` function to get a reference to the mutation.
const ref = submitMissionRef(submitMissionVars);
// Variables can be defined inline as well.
const ref = submitMissionRef({ missionId: ..., fileUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = submitMissionRef(dataConnect, submitMissionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.missionSubmission_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.missionSubmission_insert);
});
```

## GradeSubmission
You can execute the `GradeSubmission` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
gradeSubmission(vars: GradeSubmissionVariables): MutationPromise<GradeSubmissionData, GradeSubmissionVariables>;

interface GradeSubmissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GradeSubmissionVariables): MutationRef<GradeSubmissionData, GradeSubmissionVariables>;
}
export const gradeSubmissionRef: GradeSubmissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
gradeSubmission(dc: DataConnect, vars: GradeSubmissionVariables): MutationPromise<GradeSubmissionData, GradeSubmissionVariables>;

interface GradeSubmissionRef {
  ...
  (dc: DataConnect, vars: GradeSubmissionVariables): MutationRef<GradeSubmissionData, GradeSubmissionVariables>;
}
export const gradeSubmissionRef: GradeSubmissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the gradeSubmissionRef:
```typescript
const name = gradeSubmissionRef.operationName;
console.log(name);
```

### Variables
The `GradeSubmission` mutation requires an argument of type `GradeSubmissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GradeSubmissionVariables {
  submissionId: UUIDString;
  criteriaScores: unknown;
  feedback?: string | null;
}
```
### Return Type
Recall that executing the `GradeSubmission` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GradeSubmissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GradeSubmissionData {
  missionSubmission_update?: MissionSubmission_Key | null;
}
```
### Using `GradeSubmission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, gradeSubmission, GradeSubmissionVariables } from '@dataconnect/generated';

// The `GradeSubmission` mutation requires an argument of type `GradeSubmissionVariables`:
const gradeSubmissionVars: GradeSubmissionVariables = {
  submissionId: ..., 
  criteriaScores: ..., 
  feedback: ..., // optional
};

// Call the `gradeSubmission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await gradeSubmission(gradeSubmissionVars);
// Variables can be defined inline as well.
const { data } = await gradeSubmission({ submissionId: ..., criteriaScores: ..., feedback: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await gradeSubmission(dataConnect, gradeSubmissionVars);

console.log(data.missionSubmission_update);

// Or, you can use the `Promise` API.
gradeSubmission(gradeSubmissionVars).then((response) => {
  const data = response.data;
  console.log(data.missionSubmission_update);
});
```

### Using `GradeSubmission`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, gradeSubmissionRef, GradeSubmissionVariables } from '@dataconnect/generated';

// The `GradeSubmission` mutation requires an argument of type `GradeSubmissionVariables`:
const gradeSubmissionVars: GradeSubmissionVariables = {
  submissionId: ..., 
  criteriaScores: ..., 
  feedback: ..., // optional
};

// Call the `gradeSubmissionRef()` function to get a reference to the mutation.
const ref = gradeSubmissionRef(gradeSubmissionVars);
// Variables can be defined inline as well.
const ref = gradeSubmissionRef({ submissionId: ..., criteriaScores: ..., feedback: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = gradeSubmissionRef(dataConnect, gradeSubmissionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.missionSubmission_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.missionSubmission_update);
});
```

## SyncUser
You can execute the `SyncUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
syncUser(vars: SyncUserVariables): MutationPromise<SyncUserData, SyncUserVariables>;

interface SyncUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SyncUserVariables): MutationRef<SyncUserData, SyncUserVariables>;
}
export const syncUserRef: SyncUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
syncUser(dc: DataConnect, vars: SyncUserVariables): MutationPromise<SyncUserData, SyncUserVariables>;

interface SyncUserRef {
  ...
  (dc: DataConnect, vars: SyncUserVariables): MutationRef<SyncUserData, SyncUserVariables>;
}
export const syncUserRef: SyncUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the syncUserRef:
```typescript
const name = syncUserRef.operationName;
console.log(name);
```

### Variables
The `SyncUser` mutation requires an argument of type `SyncUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SyncUserVariables {
  uid: string;
  email: string;
  name: string;
  avatar?: string | null;
}
```
### Return Type
Recall that executing the `SyncUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SyncUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SyncUserData {
  user_upsert: User_Key;
}
```
### Using `SyncUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, syncUser, SyncUserVariables } from '@dataconnect/generated';

// The `SyncUser` mutation requires an argument of type `SyncUserVariables`:
const syncUserVars: SyncUserVariables = {
  uid: ..., 
  email: ..., 
  name: ..., 
  avatar: ..., // optional
};

// Call the `syncUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await syncUser(syncUserVars);
// Variables can be defined inline as well.
const { data } = await syncUser({ uid: ..., email: ..., name: ..., avatar: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await syncUser(dataConnect, syncUserVars);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
syncUser(syncUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

### Using `SyncUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, syncUserRef, SyncUserVariables } from '@dataconnect/generated';

// The `SyncUser` mutation requires an argument of type `SyncUserVariables`:
const syncUserVars: SyncUserVariables = {
  uid: ..., 
  email: ..., 
  name: ..., 
  avatar: ..., // optional
};

// Call the `syncUserRef()` function to get a reference to the mutation.
const ref = syncUserRef(syncUserVars);
// Variables can be defined inline as well.
const ref = syncUserRef({ uid: ..., email: ..., name: ..., avatar: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = syncUserRef(dataConnect, syncUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

## UpdateMyProfile
You can execute the `UpdateMyProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMyProfile(vars?: UpdateMyProfileVariables): MutationPromise<UpdateMyProfileData, UpdateMyProfileVariables>;

interface UpdateMyProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateMyProfileVariables): MutationRef<UpdateMyProfileData, UpdateMyProfileVariables>;
}
export const updateMyProfileRef: UpdateMyProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMyProfile(dc: DataConnect, vars?: UpdateMyProfileVariables): MutationPromise<UpdateMyProfileData, UpdateMyProfileVariables>;

interface UpdateMyProfileRef {
  ...
  (dc: DataConnect, vars?: UpdateMyProfileVariables): MutationRef<UpdateMyProfileData, UpdateMyProfileVariables>;
}
export const updateMyProfileRef: UpdateMyProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMyProfileRef:
```typescript
const name = updateMyProfileRef.operationName;
console.log(name);
```

### Variables
The `UpdateMyProfile` mutation has an optional argument of type `UpdateMyProfileVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMyProfileVariables {
  bio?: string | null;
  company?: string | null;
  phone?: string | null;
  preferences?: unknown | null;
}
```
### Return Type
Recall that executing the `UpdateMyProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMyProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMyProfileData {
  profile_upsert: Profile_Key;
}
```
### Using `UpdateMyProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMyProfile, UpdateMyProfileVariables } from '@dataconnect/generated';

// The `UpdateMyProfile` mutation has an optional argument of type `UpdateMyProfileVariables`:
const updateMyProfileVars: UpdateMyProfileVariables = {
  bio: ..., // optional
  company: ..., // optional
  phone: ..., // optional
  preferences: ..., // optional
};

// Call the `updateMyProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMyProfile(updateMyProfileVars);
// Variables can be defined inline as well.
const { data } = await updateMyProfile({ bio: ..., company: ..., phone: ..., preferences: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateMyProfileVariables` argument.
const { data } = await updateMyProfile();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMyProfile(dataConnect, updateMyProfileVars);

console.log(data.profile_upsert);

// Or, you can use the `Promise` API.
updateMyProfile(updateMyProfileVars).then((response) => {
  const data = response.data;
  console.log(data.profile_upsert);
});
```

### Using `UpdateMyProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMyProfileRef, UpdateMyProfileVariables } from '@dataconnect/generated';

// The `UpdateMyProfile` mutation has an optional argument of type `UpdateMyProfileVariables`:
const updateMyProfileVars: UpdateMyProfileVariables = {
  bio: ..., // optional
  company: ..., // optional
  phone: ..., // optional
  preferences: ..., // optional
};

// Call the `updateMyProfileRef()` function to get a reference to the mutation.
const ref = updateMyProfileRef(updateMyProfileVars);
// Variables can be defined inline as well.
const ref = updateMyProfileRef({ bio: ..., company: ..., phone: ..., preferences: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateMyProfileVariables` argument.
const ref = updateMyProfileRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMyProfileRef(dataConnect, updateMyProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.profile_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.profile_upsert);
});
```

