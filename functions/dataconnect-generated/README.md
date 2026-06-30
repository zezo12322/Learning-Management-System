# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUserClaims*](#getuserclaims)
  - [*MyCertificates*](#mycertificates)
  - [*VerifyCertificate*](#verifycertificate)
  - [*ListPublishedCourses*](#listpublishedcourses)
  - [*GetCourseCurriculum*](#getcoursecurriculum)
  - [*GetLectureContent*](#getlecturecontent)
  - [*GetUserLectureProgress*](#getuserlectureprogress)
  - [*GetMyCourseProgress*](#getmycourseprogress)
  - [*GetCourseForEnrollment*](#getcourseforenrollment)
  - [*AdminGetCourse*](#admingetcourse)
  - [*AdminListMyCourses*](#adminlistmycourses)
  - [*MyPaymentHistory*](#mypaymenthistory)
  - [*GetPendingSubmissions*](#getpendingsubmissions)
  - [*GetCourseInstructors*](#getcourseinstructors)
  - [*GetLectureDuration*](#getlectureduration)
  - [*GetCourseCompletionStatus*](#getcoursecompletionstatus)
  - [*GetCourseCompletionStatusForUser*](#getcoursecompletionstatusforuser)
  - [*GetUserEnrollmentForCourseByUser*](#getuserenrollmentforcoursebyuser)
  - [*GetUserEnrollmentForCourse*](#getuserenrollmentforcourse)
  - [*GetUserEnrollmentForMission*](#getuserenrollmentformission)
  - [*GetMissionForEnrollment*](#getmissionforenrollment)
  - [*MySubmissions*](#mysubmissions)
  - [*GetSubmissionForGrading*](#getsubmissionforgrading)
  - [*GetEnrollmentForUserMission*](#getenrollmentforusermission)
  - [*AdminGetMission*](#admingetmission)
  - [*AdminListMyMissions*](#adminlistmymissions)
  - [*GetMissionTemplates*](#getmissiontemplates)
  - [*GetQuizQuestions*](#getquizquestions)
  - [*GetExpiredAttempts*](#getexpiredattempts)
  - [*GetUserQuizAttempts*](#getuserquizattempts)
  - [*GetQuizAttemptById*](#getquizattemptbyid)
  - [*GetQuizQuestionPoints*](#getquizquestionpoints)
  - [*GetAttemptAnswersWithCorrect*](#getattemptanswerswithcorrect)
  - [*GetQuizSettings*](#getquizsettings)
  - [*GetQuestionOptions*](#getquestionoptions)
  - [*GetOptionWithQuestion*](#getoptionwithquestion)
  - [*GetActiveQuizSession*](#getactivequizsession)
  - [*AdminGetQuiz*](#admingetquiz)
  - [*GetMyCourseAccess*](#getmycourseaccess)
  - [*GetMyMissionAccess*](#getmymissionaccess)
  - [*GetQuestionCourse*](#getquestioncourse)
  - [*GetOptionCourse*](#getoptioncourse)
  - [*GetSectionCourse*](#getsectioncourse)
  - [*GetMicroLessonMission*](#getmicrolessonmission)
  - [*GetCriterionMission*](#getcriterionmission)
  - [*GetTemplateMission*](#gettemplatemission)
  - [*GetCourseSessions*](#getcoursesessions)
  - [*GetMe*](#getme)
- [**Mutations**](#mutations)
  - [*AdminCreateCourse*](#admincreatecourse)
  - [*AdminDeleteCourse*](#admindeletecourse)
  - [*AdminCreateSession*](#admincreatesession)
  - [*AdminCancelSession*](#admincancelsession)
  - [*AdminCreateSubscriptionTier*](#admincreatesubscriptiontier)
  - [*AdminDeprecateSubscriptionTier*](#admindeprecatesubscriptiontier)
  - [*AdminCreateCategory*](#admincreatecategory)
  - [*AdminUpdateCourse*](#adminupdatecourse)
  - [*AdminUpdateCourseStatus*](#adminupdatecoursestatus)
  - [*AdminCreateSection*](#admincreatesection)
  - [*AdminUpdateSection*](#adminupdatesection)
  - [*AdminSoftDeleteSection*](#adminsoftdeletesection)
  - [*AdminUpdateSectionOrder*](#adminupdatesectionorder)
  - [*AdminCreateLectureFull*](#admincreatelecturefull)
  - [*AdminUpdateLecture*](#adminupdatelecture)
  - [*AdminSoftDeleteLecture*](#adminsoftdeletelecture)
  - [*AdminUpdateLectureOrder*](#adminupdatelectureorder)
  - [*AdminMoveLectureToSection*](#adminmovelecturetosection)
  - [*AdminSoftDeleteLecturesBySection*](#adminsoftdeletelecturesbysection)
  - [*LogPayment*](#logpayment)
  - [*AddPaymentItem*](#addpaymentitem)
  - [*AdminAddCourseInstructor*](#adminaddcourseinstructor)
  - [*AdminRemoveCourseInstructor*](#adminremovecourseinstructor)
  - [*EnrollInCourse*](#enrollincourse)
  - [*EnrollInMission*](#enrollinmission)
  - [*UpdateLectureProgress*](#updatelectureprogress)
  - [*AdminUpsertLectureProgress*](#adminupsertlectureprogress)
  - [*UpdateEnrollmentStatus*](#updateenrollmentstatus)
  - [*SubmitMission*](#submitmission)
  - [*GradeSubmission*](#gradesubmission)
  - [*AddCriterionScore*](#addcriterionscore)
  - [*AdminCreateMission*](#admincreatemission)
  - [*AdminUpdateMission*](#adminupdatemission)
  - [*AdminSoftDeleteMission*](#adminsoftdeletemission)
  - [*AdminCreateMicroLesson*](#admincreatemicrolesson)
  - [*AdminUpdateMicroLesson*](#adminupdatemicrolesson)
  - [*AdminDeleteMicroLesson*](#admindeletemicrolesson)
  - [*AdminUpdateMicroLessonOrder*](#adminupdatemicrolessonorder)
  - [*AdminCreateMissionTemplate*](#admincreatemissiontemplate)
  - [*AdminDeleteMissionTemplate*](#admindeletemissiontemplate)
  - [*AdminCreateRubricCriterion*](#admincreaterubriccriterion)
  - [*AdminUpdateRubricCriterion*](#adminupdaterubriccriterion)
  - [*AdminDeleteRubricCriterion*](#admindeleterubriccriterion)
  - [*AdminUpdateRubricCriterionOrder*](#adminupdaterubriccriterionorder)
  - [*StartQuizAttempt*](#startquizattempt)
  - [*SubmitQuizAnswer*](#submitquizanswer)
  - [*FinishQuizAttemptIfOpen*](#finishquizattemptifopen)
  - [*AdminCreateQuiz*](#admincreatequiz)
  - [*AdminUpdateQuiz*](#adminupdatequiz)
  - [*AdminDeleteQuiz*](#admindeletequiz)
  - [*AdminCreateQuizQuestion*](#admincreatequizquestion)
  - [*AdminUpdateQuizQuestion*](#adminupdatequizquestion)
  - [*AdminSoftDeleteQuizQuestion*](#adminsoftdeletequizquestion)
  - [*AdminUpdateQuizQuestionOrder*](#adminupdatequizquestionorder)
  - [*AdminCreateQuizOption*](#admincreatequizoption)
  - [*AdminUpdateQuizOption*](#adminupdatequizoption)
  - [*AdminDeleteQuizOption*](#admindeletequizoption)
  - [*AdminUpdateQuizOptionOrder*](#adminupdatequizoptionorder)
  - [*CheckInToSession*](#checkintosession)
  - [*SyncUser*](#syncuser)
  - [*UpdateMyProfile*](#updatemyprofile)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/functions-generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/functions-generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/functions-generated';

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

## GetUserClaims
You can execute the `GetUserClaims` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserClaims(vars: GetUserClaimsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserClaimsData, GetUserClaimsVariables>;

interface GetUserClaimsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserClaimsVariables): QueryRef<GetUserClaimsData, GetUserClaimsVariables>;
}
export const getUserClaimsRef: GetUserClaimsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserClaims(dc: DataConnect, vars: GetUserClaimsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserClaimsData, GetUserClaimsVariables>;

interface GetUserClaimsRef {
  ...
  (dc: DataConnect, vars: GetUserClaimsVariables): QueryRef<GetUserClaimsData, GetUserClaimsVariables>;
}
export const getUserClaimsRef: GetUserClaimsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserClaimsRef:
```typescript
const name = getUserClaimsRef.operationName;
console.log(name);
```

### Variables
The `GetUserClaims` query requires an argument of type `GetUserClaimsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserClaimsVariables {
  uid: string;
}
```
### Return Type
Recall that executing the `GetUserClaims` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserClaimsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserClaimsData {
  user?: {
    id: string;
    userRoles_on_user: ({
      role: {
        name: string;
      };
    })[];
    profile_on_user?: {
      company?: string | null;
    };
  } & User_Key;
}
```
### Using `GetUserClaims`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserClaims, GetUserClaimsVariables } from '@dataconnect/functions-generated';

// The `GetUserClaims` query requires an argument of type `GetUserClaimsVariables`:
const getUserClaimsVars: GetUserClaimsVariables = {
  uid: ..., 
};

// Call the `getUserClaims()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserClaims(getUserClaimsVars);
// Variables can be defined inline as well.
const { data } = await getUserClaims({ uid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserClaims(dataConnect, getUserClaimsVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getUserClaims(getUserClaimsVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUserClaims`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserClaimsRef, GetUserClaimsVariables } from '@dataconnect/functions-generated';

// The `GetUserClaims` query requires an argument of type `GetUserClaimsVariables`:
const getUserClaimsVars: GetUserClaimsVariables = {
  uid: ..., 
};

// Call the `getUserClaimsRef()` function to get a reference to the query.
const ref = getUserClaimsRef(getUserClaimsVars);
// Variables can be defined inline as well.
const ref = getUserClaimsRef({ uid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserClaimsRef(dataConnect, getUserClaimsVars);

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
    expiresAt?: TimestampString | null;
    targetType: CertificateTarget;
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
import { connectorConfig, myCertificates } from '@dataconnect/functions-generated';


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
import { connectorConfig, myCertificatesRef } from '@dataconnect/functions-generated';


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
    expiresAt?: TimestampString | null;
    targetType: CertificateTarget;
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
import { connectorConfig, verifyCertificate, VerifyCertificateVariables } from '@dataconnect/functions-generated';

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
import { connectorConfig, verifyCertificateRef, VerifyCertificateVariables } from '@dataconnect/functions-generated';

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
    level: CourseLevel;
    thumbnail?: string | null;
    tags: string[];
    category: {
      name: string;
    };
    author: {
      name: string;
      avatar?: string | null;
    };
  } & Course_Key)[];
}
```
### Using `ListPublishedCourses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPublishedCourses } from '@dataconnect/functions-generated';


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
import { connectorConfig, listPublishedCoursesRef } from '@dataconnect/functions-generated';


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
    publishedSections: ({
      id: UUIDString;
      title: string;
      publishedLectures: ({
        id: UUIDString;
        title: string;
        type: LectureType;
        content?: string | null;
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
import { connectorConfig, getCourseCurriculum, GetCourseCurriculumVariables } from '@dataconnect/functions-generated';

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
import { connectorConfig, getCourseCurriculumRef, GetCourseCurriculumVariables } from '@dataconnect/functions-generated';

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

## GetLectureContent
You can execute the `GetLectureContent` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getLectureContent(vars: GetLectureContentVariables, options?: ExecuteQueryOptions): QueryPromise<GetLectureContentData, GetLectureContentVariables>;

interface GetLectureContentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLectureContentVariables): QueryRef<GetLectureContentData, GetLectureContentVariables>;
}
export const getLectureContentRef: GetLectureContentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLectureContent(dc: DataConnect, vars: GetLectureContentVariables, options?: ExecuteQueryOptions): QueryPromise<GetLectureContentData, GetLectureContentVariables>;

interface GetLectureContentRef {
  ...
  (dc: DataConnect, vars: GetLectureContentVariables): QueryRef<GetLectureContentData, GetLectureContentVariables>;
}
export const getLectureContentRef: GetLectureContentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLectureContentRef:
```typescript
const name = getLectureContentRef.operationName;
console.log(name);
```

### Variables
The `GetLectureContent` query requires an argument of type `GetLectureContentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetLectureContentVariables {
  lectureId: UUIDString;
}
```
### Return Type
Recall that executing the `GetLectureContent` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLectureContentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetLectureContentData {
  courseLecture?: {
    id: UUIDString;
    title: string;
    type: LectureType;
    videoUrl?: string | null;
    content?: string | null;
    duration?: number | null;
    transcriptUrl?: string | null;
    isFreePreview: boolean;
    section: {
      course: {
        id: UUIDString;
        author: {
          id: string;
        } & User_Key;
        createdBy: {
          id: string;
        } & User_Key;
      } & Course_Key;
    };
  } & CourseLecture_Key;
}
```
### Using `GetLectureContent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLectureContent, GetLectureContentVariables } from '@dataconnect/functions-generated';

// The `GetLectureContent` query requires an argument of type `GetLectureContentVariables`:
const getLectureContentVars: GetLectureContentVariables = {
  lectureId: ..., 
};

// Call the `getLectureContent()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLectureContent(getLectureContentVars);
// Variables can be defined inline as well.
const { data } = await getLectureContent({ lectureId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLectureContent(dataConnect, getLectureContentVars);

console.log(data.courseLecture);

// Or, you can use the `Promise` API.
getLectureContent(getLectureContentVars).then((response) => {
  const data = response.data;
  console.log(data.courseLecture);
});
```

### Using `GetLectureContent`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLectureContentRef, GetLectureContentVariables } from '@dataconnect/functions-generated';

// The `GetLectureContent` query requires an argument of type `GetLectureContentVariables`:
const getLectureContentVars: GetLectureContentVariables = {
  lectureId: ..., 
};

// Call the `getLectureContentRef()` function to get a reference to the query.
const ref = getLectureContentRef(getLectureContentVars);
// Variables can be defined inline as well.
const ref = getLectureContentRef({ lectureId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLectureContentRef(dataConnect, getLectureContentVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseLecture);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseLecture);
});
```

## GetUserLectureProgress
You can execute the `GetUserLectureProgress` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserLectureProgress(vars: GetUserLectureProgressVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserLectureProgressData, GetUserLectureProgressVariables>;

interface GetUserLectureProgressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserLectureProgressVariables): QueryRef<GetUserLectureProgressData, GetUserLectureProgressVariables>;
}
export const getUserLectureProgressRef: GetUserLectureProgressRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserLectureProgress(dc: DataConnect, vars: GetUserLectureProgressVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserLectureProgressData, GetUserLectureProgressVariables>;

interface GetUserLectureProgressRef {
  ...
  (dc: DataConnect, vars: GetUserLectureProgressVariables): QueryRef<GetUserLectureProgressData, GetUserLectureProgressVariables>;
}
export const getUserLectureProgressRef: GetUserLectureProgressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserLectureProgressRef:
```typescript
const name = getUserLectureProgressRef.operationName;
console.log(name);
```

### Variables
The `GetUserLectureProgress` query requires an argument of type `GetUserLectureProgressVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserLectureProgressVariables {
  lectureId: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserLectureProgress` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserLectureProgressData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserLectureProgressData {
  lectureProgresses: ({
    lastWatchedSecond: number;
    completedAt?: TimestampString | null;
  })[];
}
```
### Using `GetUserLectureProgress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserLectureProgress, GetUserLectureProgressVariables } from '@dataconnect/functions-generated';

// The `GetUserLectureProgress` query requires an argument of type `GetUserLectureProgressVariables`:
const getUserLectureProgressVars: GetUserLectureProgressVariables = {
  lectureId: ..., 
};

// Call the `getUserLectureProgress()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserLectureProgress(getUserLectureProgressVars);
// Variables can be defined inline as well.
const { data } = await getUserLectureProgress({ lectureId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserLectureProgress(dataConnect, getUserLectureProgressVars);

console.log(data.lectureProgresses);

// Or, you can use the `Promise` API.
getUserLectureProgress(getUserLectureProgressVars).then((response) => {
  const data = response.data;
  console.log(data.lectureProgresses);
});
```

### Using `GetUserLectureProgress`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserLectureProgressRef, GetUserLectureProgressVariables } from '@dataconnect/functions-generated';

// The `GetUserLectureProgress` query requires an argument of type `GetUserLectureProgressVariables`:
const getUserLectureProgressVars: GetUserLectureProgressVariables = {
  lectureId: ..., 
};

// Call the `getUserLectureProgressRef()` function to get a reference to the query.
const ref = getUserLectureProgressRef(getUserLectureProgressVars);
// Variables can be defined inline as well.
const ref = getUserLectureProgressRef({ lectureId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserLectureProgressRef(dataConnect, getUserLectureProgressVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.lectureProgresses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.lectureProgresses);
});
```

## GetMyCourseProgress
You can execute the `GetMyCourseProgress` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyCourseProgress(vars: GetMyCourseProgressVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyCourseProgressData, GetMyCourseProgressVariables>;

interface GetMyCourseProgressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyCourseProgressVariables): QueryRef<GetMyCourseProgressData, GetMyCourseProgressVariables>;
}
export const getMyCourseProgressRef: GetMyCourseProgressRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyCourseProgress(dc: DataConnect, vars: GetMyCourseProgressVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyCourseProgressData, GetMyCourseProgressVariables>;

interface GetMyCourseProgressRef {
  ...
  (dc: DataConnect, vars: GetMyCourseProgressVariables): QueryRef<GetMyCourseProgressData, GetMyCourseProgressVariables>;
}
export const getMyCourseProgressRef: GetMyCourseProgressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyCourseProgressRef:
```typescript
const name = getMyCourseProgressRef.operationName;
console.log(name);
```

### Variables
The `GetMyCourseProgress` query requires an argument of type `GetMyCourseProgressVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMyCourseProgressVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `GetMyCourseProgress` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyCourseProgressData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyCourseProgressData {
  sections: ({
    id: UUIDString;
    title: string;
    progressLectures: ({
      id: UUIDString;
      title: string;
      userProgress: ({
        completedAt?: TimestampString | null;
      })[];
    } & CourseLecture_Key)[];
  } & CourseSection_Key)[];
}
```
### Using `GetMyCourseProgress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyCourseProgress, GetMyCourseProgressVariables } from '@dataconnect/functions-generated';

// The `GetMyCourseProgress` query requires an argument of type `GetMyCourseProgressVariables`:
const getMyCourseProgressVars: GetMyCourseProgressVariables = {
  courseId: ..., 
};

// Call the `getMyCourseProgress()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyCourseProgress(getMyCourseProgressVars);
// Variables can be defined inline as well.
const { data } = await getMyCourseProgress({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyCourseProgress(dataConnect, getMyCourseProgressVars);

console.log(data.sections);

// Or, you can use the `Promise` API.
getMyCourseProgress(getMyCourseProgressVars).then((response) => {
  const data = response.data;
  console.log(data.sections);
});
```

### Using `GetMyCourseProgress`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyCourseProgressRef, GetMyCourseProgressVariables } from '@dataconnect/functions-generated';

// The `GetMyCourseProgress` query requires an argument of type `GetMyCourseProgressVariables`:
const getMyCourseProgressVars: GetMyCourseProgressVariables = {
  courseId: ..., 
};

// Call the `getMyCourseProgressRef()` function to get a reference to the query.
const ref = getMyCourseProgressRef(getMyCourseProgressVars);
// Variables can be defined inline as well.
const ref = getMyCourseProgressRef({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyCourseProgressRef(dataConnect, getMyCourseProgressVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.sections);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.sections);
});
```

## GetCourseForEnrollment
You can execute the `GetCourseForEnrollment` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCourseForEnrollment(vars: GetCourseForEnrollmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseForEnrollmentData, GetCourseForEnrollmentVariables>;

interface GetCourseForEnrollmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseForEnrollmentVariables): QueryRef<GetCourseForEnrollmentData, GetCourseForEnrollmentVariables>;
}
export const getCourseForEnrollmentRef: GetCourseForEnrollmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCourseForEnrollment(dc: DataConnect, vars: GetCourseForEnrollmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseForEnrollmentData, GetCourseForEnrollmentVariables>;

interface GetCourseForEnrollmentRef {
  ...
  (dc: DataConnect, vars: GetCourseForEnrollmentVariables): QueryRef<GetCourseForEnrollmentData, GetCourseForEnrollmentVariables>;
}
export const getCourseForEnrollmentRef: GetCourseForEnrollmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCourseForEnrollmentRef:
```typescript
const name = getCourseForEnrollmentRef.operationName;
console.log(name);
```

### Variables
The `GetCourseForEnrollment` query requires an argument of type `GetCourseForEnrollmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCourseForEnrollmentVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `GetCourseForEnrollment` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCourseForEnrollmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCourseForEnrollmentData {
  course?: {
    id: UUIDString;
    status: CourseStatus;
    price: number;
    deletedAt?: TimestampString | null;
  } & Course_Key;
}
```
### Using `GetCourseForEnrollment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourseForEnrollment, GetCourseForEnrollmentVariables } from '@dataconnect/functions-generated';

// The `GetCourseForEnrollment` query requires an argument of type `GetCourseForEnrollmentVariables`:
const getCourseForEnrollmentVars: GetCourseForEnrollmentVariables = {
  courseId: ..., 
};

// Call the `getCourseForEnrollment()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourseForEnrollment(getCourseForEnrollmentVars);
// Variables can be defined inline as well.
const { data } = await getCourseForEnrollment({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourseForEnrollment(dataConnect, getCourseForEnrollmentVars);

console.log(data.course);

// Or, you can use the `Promise` API.
getCourseForEnrollment(getCourseForEnrollmentVars).then((response) => {
  const data = response.data;
  console.log(data.course);
});
```

### Using `GetCourseForEnrollment`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCourseForEnrollmentRef, GetCourseForEnrollmentVariables } from '@dataconnect/functions-generated';

// The `GetCourseForEnrollment` query requires an argument of type `GetCourseForEnrollmentVariables`:
const getCourseForEnrollmentVars: GetCourseForEnrollmentVariables = {
  courseId: ..., 
};

// Call the `getCourseForEnrollmentRef()` function to get a reference to the query.
const ref = getCourseForEnrollmentRef(getCourseForEnrollmentVars);
// Variables can be defined inline as well.
const ref = getCourseForEnrollmentRef({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCourseForEnrollmentRef(dataConnect, getCourseForEnrollmentVars);

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

## AdminGetCourse
You can execute the `AdminGetCourse` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminGetCourse(vars: AdminGetCourseVariables, options?: ExecuteQueryOptions): QueryPromise<AdminGetCourseData, AdminGetCourseVariables>;

interface AdminGetCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminGetCourseVariables): QueryRef<AdminGetCourseData, AdminGetCourseVariables>;
}
export const adminGetCourseRef: AdminGetCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminGetCourse(dc: DataConnect, vars: AdminGetCourseVariables, options?: ExecuteQueryOptions): QueryPromise<AdminGetCourseData, AdminGetCourseVariables>;

interface AdminGetCourseRef {
  ...
  (dc: DataConnect, vars: AdminGetCourseVariables): QueryRef<AdminGetCourseData, AdminGetCourseVariables>;
}
export const adminGetCourseRef: AdminGetCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminGetCourseRef:
```typescript
const name = adminGetCourseRef.operationName;
console.log(name);
```

### Variables
The `AdminGetCourse` query requires an argument of type `AdminGetCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminGetCourseVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `AdminGetCourse` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminGetCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminGetCourseData {
  course?: {
    id: UUIDString;
    title: string;
    description?: string | null;
    price: number;
    status: CourseStatus;
    language: string;
    level: CourseLevel;
    thumbnail?: string | null;
    tags: string[];
    deletedAt?: TimestampString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    category: {
      id: UUIDString;
      name: string;
    } & Category_Key;
    author: {
      id: string;
      name: string;
      email: string;
      avatar?: string | null;
    } & User_Key;
    createdBy: {
      id: string;
      name: string;
    } & User_Key;
    instructors: ({
      user: {
        id: string;
        name: string;
        email: string;
        avatar?: string | null;
      } & User_Key;
    })[];
    adminSections: ({
      id: UUIDString;
      title: string;
      order: number;
      adminLectures: ({
        id: UUIDString;
        title: string;
        type: LectureType;
        videoUrl?: string | null;
        content?: string | null;
        duration?: number | null;
        transcriptUrl?: string | null;
        isFreePreview: boolean;
        order: number;
      } & CourseLecture_Key)[];
    } & CourseSection_Key)[];
  } & Course_Key;
}
```
### Using `AdminGetCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminGetCourse, AdminGetCourseVariables } from '@dataconnect/functions-generated';

// The `AdminGetCourse` query requires an argument of type `AdminGetCourseVariables`:
const adminGetCourseVars: AdminGetCourseVariables = {
  courseId: ..., 
};

// Call the `adminGetCourse()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminGetCourse(adminGetCourseVars);
// Variables can be defined inline as well.
const { data } = await adminGetCourse({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminGetCourse(dataConnect, adminGetCourseVars);

console.log(data.course);

// Or, you can use the `Promise` API.
adminGetCourse(adminGetCourseVars).then((response) => {
  const data = response.data;
  console.log(data.course);
});
```

### Using `AdminGetCourse`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminGetCourseRef, AdminGetCourseVariables } from '@dataconnect/functions-generated';

// The `AdminGetCourse` query requires an argument of type `AdminGetCourseVariables`:
const adminGetCourseVars: AdminGetCourseVariables = {
  courseId: ..., 
};

// Call the `adminGetCourseRef()` function to get a reference to the query.
const ref = adminGetCourseRef(adminGetCourseVars);
// Variables can be defined inline as well.
const ref = adminGetCourseRef({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminGetCourseRef(dataConnect, adminGetCourseVars);

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

## AdminListMyCourses
You can execute the `AdminListMyCourses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminListMyCourses(options?: ExecuteQueryOptions): QueryPromise<AdminListMyCoursesData, undefined>;

interface AdminListMyCoursesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminListMyCoursesData, undefined>;
}
export const adminListMyCoursesRef: AdminListMyCoursesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminListMyCourses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<AdminListMyCoursesData, undefined>;

interface AdminListMyCoursesRef {
  ...
  (dc: DataConnect): QueryRef<AdminListMyCoursesData, undefined>;
}
export const adminListMyCoursesRef: AdminListMyCoursesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminListMyCoursesRef:
```typescript
const name = adminListMyCoursesRef.operationName;
console.log(name);
```

### Variables
The `AdminListMyCourses` query has no variables.
### Return Type
Recall that executing the `AdminListMyCourses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminListMyCoursesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminListMyCoursesData {
  courses: ({
    id: UUIDString;
    title: string;
    status: CourseStatus;
    level: CourseLevel;
    thumbnail?: string | null;
    price: number;
    updatedAt: TimestampString;
    category: {
      name: string;
    };
  } & Course_Key)[];
}
```
### Using `AdminListMyCourses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminListMyCourses } from '@dataconnect/functions-generated';


// Call the `adminListMyCourses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminListMyCourses();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminListMyCourses(dataConnect);

console.log(data.courses);

// Or, you can use the `Promise` API.
adminListMyCourses().then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

### Using `AdminListMyCourses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminListMyCoursesRef } from '@dataconnect/functions-generated';


// Call the `adminListMyCoursesRef()` function to get a reference to the query.
const ref = adminListMyCoursesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminListMyCoursesRef(dataConnect);

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
    amount: number;
    currency: string;
    referenceId: string;
    createdAt: TimestampString;
    paymentItems_on_payment: ({
      targetType: PaymentItemTarget;
      priceAtPurchase: number;
      course?: {
        title: string;
      };
      mission?: {
        title: string;
      };
      subscriptionTier?: {
        name: string;
      };
    })[];
  } & Payment_Key)[];
}
```
### Using `MyPaymentHistory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, myPaymentHistory } from '@dataconnect/functions-generated';


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
import { connectorConfig, myPaymentHistoryRef } from '@dataconnect/functions-generated';


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
    submittedAt: TimestampString;
    attemptNumber: number;
    student: {
      name: string;
      email: string;
    };
    mission: {
      title: string;
      difficulty: MissionDifficulty;
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
import { connectorConfig, getPendingSubmissions } from '@dataconnect/functions-generated';


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
import { connectorConfig, getPendingSubmissionsRef } from '@dataconnect/functions-generated';


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

## GetCourseInstructors
You can execute the `GetCourseInstructors` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCourseInstructors(vars: GetCourseInstructorsVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseInstructorsData, GetCourseInstructorsVariables>;

interface GetCourseInstructorsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseInstructorsVariables): QueryRef<GetCourseInstructorsData, GetCourseInstructorsVariables>;
}
export const getCourseInstructorsRef: GetCourseInstructorsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCourseInstructors(dc: DataConnect, vars: GetCourseInstructorsVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseInstructorsData, GetCourseInstructorsVariables>;

interface GetCourseInstructorsRef {
  ...
  (dc: DataConnect, vars: GetCourseInstructorsVariables): QueryRef<GetCourseInstructorsData, GetCourseInstructorsVariables>;
}
export const getCourseInstructorsRef: GetCourseInstructorsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCourseInstructorsRef:
```typescript
const name = getCourseInstructorsRef.operationName;
console.log(name);
```

### Variables
The `GetCourseInstructors` query requires an argument of type `GetCourseInstructorsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCourseInstructorsVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `GetCourseInstructors` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCourseInstructorsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCourseInstructorsData {
  courseInstructors: ({
    user: {
      id: string;
      name: string;
      email: string;
      avatar?: string | null;
    } & User_Key;
  })[];
}
```
### Using `GetCourseInstructors`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourseInstructors, GetCourseInstructorsVariables } from '@dataconnect/functions-generated';

// The `GetCourseInstructors` query requires an argument of type `GetCourseInstructorsVariables`:
const getCourseInstructorsVars: GetCourseInstructorsVariables = {
  courseId: ..., 
};

// Call the `getCourseInstructors()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourseInstructors(getCourseInstructorsVars);
// Variables can be defined inline as well.
const { data } = await getCourseInstructors({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourseInstructors(dataConnect, getCourseInstructorsVars);

console.log(data.courseInstructors);

// Or, you can use the `Promise` API.
getCourseInstructors(getCourseInstructorsVars).then((response) => {
  const data = response.data;
  console.log(data.courseInstructors);
});
```

### Using `GetCourseInstructors`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCourseInstructorsRef, GetCourseInstructorsVariables } from '@dataconnect/functions-generated';

// The `GetCourseInstructors` query requires an argument of type `GetCourseInstructorsVariables`:
const getCourseInstructorsVars: GetCourseInstructorsVariables = {
  courseId: ..., 
};

// Call the `getCourseInstructorsRef()` function to get a reference to the query.
const ref = getCourseInstructorsRef(getCourseInstructorsVars);
// Variables can be defined inline as well.
const ref = getCourseInstructorsRef({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCourseInstructorsRef(dataConnect, getCourseInstructorsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseInstructors);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseInstructors);
});
```

## GetLectureDuration
You can execute the `GetLectureDuration` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getLectureDuration(vars: GetLectureDurationVariables, options?: ExecuteQueryOptions): QueryPromise<GetLectureDurationData, GetLectureDurationVariables>;

interface GetLectureDurationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLectureDurationVariables): QueryRef<GetLectureDurationData, GetLectureDurationVariables>;
}
export const getLectureDurationRef: GetLectureDurationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLectureDuration(dc: DataConnect, vars: GetLectureDurationVariables, options?: ExecuteQueryOptions): QueryPromise<GetLectureDurationData, GetLectureDurationVariables>;

interface GetLectureDurationRef {
  ...
  (dc: DataConnect, vars: GetLectureDurationVariables): QueryRef<GetLectureDurationData, GetLectureDurationVariables>;
}
export const getLectureDurationRef: GetLectureDurationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLectureDurationRef:
```typescript
const name = getLectureDurationRef.operationName;
console.log(name);
```

### Variables
The `GetLectureDuration` query requires an argument of type `GetLectureDurationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetLectureDurationVariables {
  lectureId: UUIDString;
}
```
### Return Type
Recall that executing the `GetLectureDuration` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLectureDurationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetLectureDurationData {
  courseLecture?: {
    id: UUIDString;
    duration?: number | null;
    section: {
      course: {
        id: UUIDString;
      } & Course_Key;
    };
  } & CourseLecture_Key;
}
```
### Using `GetLectureDuration`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLectureDuration, GetLectureDurationVariables } from '@dataconnect/functions-generated';

// The `GetLectureDuration` query requires an argument of type `GetLectureDurationVariables`:
const getLectureDurationVars: GetLectureDurationVariables = {
  lectureId: ..., 
};

// Call the `getLectureDuration()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLectureDuration(getLectureDurationVars);
// Variables can be defined inline as well.
const { data } = await getLectureDuration({ lectureId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLectureDuration(dataConnect, getLectureDurationVars);

console.log(data.courseLecture);

// Or, you can use the `Promise` API.
getLectureDuration(getLectureDurationVars).then((response) => {
  const data = response.data;
  console.log(data.courseLecture);
});
```

### Using `GetLectureDuration`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLectureDurationRef, GetLectureDurationVariables } from '@dataconnect/functions-generated';

// The `GetLectureDuration` query requires an argument of type `GetLectureDurationVariables`:
const getLectureDurationVars: GetLectureDurationVariables = {
  lectureId: ..., 
};

// Call the `getLectureDurationRef()` function to get a reference to the query.
const ref = getLectureDurationRef(getLectureDurationVars);
// Variables can be defined inline as well.
const ref = getLectureDurationRef({ lectureId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLectureDurationRef(dataConnect, getLectureDurationVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseLecture);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseLecture);
});
```

## GetCourseCompletionStatus
You can execute the `GetCourseCompletionStatus` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCourseCompletionStatus(vars: GetCourseCompletionStatusVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseCompletionStatusData, GetCourseCompletionStatusVariables>;

interface GetCourseCompletionStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseCompletionStatusVariables): QueryRef<GetCourseCompletionStatusData, GetCourseCompletionStatusVariables>;
}
export const getCourseCompletionStatusRef: GetCourseCompletionStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCourseCompletionStatus(dc: DataConnect, vars: GetCourseCompletionStatusVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseCompletionStatusData, GetCourseCompletionStatusVariables>;

interface GetCourseCompletionStatusRef {
  ...
  (dc: DataConnect, vars: GetCourseCompletionStatusVariables): QueryRef<GetCourseCompletionStatusData, GetCourseCompletionStatusVariables>;
}
export const getCourseCompletionStatusRef: GetCourseCompletionStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCourseCompletionStatusRef:
```typescript
const name = getCourseCompletionStatusRef.operationName;
console.log(name);
```

### Variables
The `GetCourseCompletionStatus` query requires an argument of type `GetCourseCompletionStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCourseCompletionStatusVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `GetCourseCompletionStatus` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCourseCompletionStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCourseCompletionStatusData {
  sections: ({
    completionLectures: ({
      id: UUIDString;
      completionProgress: ({
        completedAt?: TimestampString | null;
      })[];
    } & CourseLecture_Key)[];
  })[];
}
```
### Using `GetCourseCompletionStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourseCompletionStatus, GetCourseCompletionStatusVariables } from '@dataconnect/functions-generated';

// The `GetCourseCompletionStatus` query requires an argument of type `GetCourseCompletionStatusVariables`:
const getCourseCompletionStatusVars: GetCourseCompletionStatusVariables = {
  courseId: ..., 
};

// Call the `getCourseCompletionStatus()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourseCompletionStatus(getCourseCompletionStatusVars);
// Variables can be defined inline as well.
const { data } = await getCourseCompletionStatus({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourseCompletionStatus(dataConnect, getCourseCompletionStatusVars);

console.log(data.sections);

// Or, you can use the `Promise` API.
getCourseCompletionStatus(getCourseCompletionStatusVars).then((response) => {
  const data = response.data;
  console.log(data.sections);
});
```

### Using `GetCourseCompletionStatus`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCourseCompletionStatusRef, GetCourseCompletionStatusVariables } from '@dataconnect/functions-generated';

// The `GetCourseCompletionStatus` query requires an argument of type `GetCourseCompletionStatusVariables`:
const getCourseCompletionStatusVars: GetCourseCompletionStatusVariables = {
  courseId: ..., 
};

// Call the `getCourseCompletionStatusRef()` function to get a reference to the query.
const ref = getCourseCompletionStatusRef(getCourseCompletionStatusVars);
// Variables can be defined inline as well.
const ref = getCourseCompletionStatusRef({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCourseCompletionStatusRef(dataConnect, getCourseCompletionStatusVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.sections);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.sections);
});
```

## GetCourseCompletionStatusForUser
You can execute the `GetCourseCompletionStatusForUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCourseCompletionStatusForUser(vars: GetCourseCompletionStatusForUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseCompletionStatusForUserData, GetCourseCompletionStatusForUserVariables>;

interface GetCourseCompletionStatusForUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseCompletionStatusForUserVariables): QueryRef<GetCourseCompletionStatusForUserData, GetCourseCompletionStatusForUserVariables>;
}
export const getCourseCompletionStatusForUserRef: GetCourseCompletionStatusForUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCourseCompletionStatusForUser(dc: DataConnect, vars: GetCourseCompletionStatusForUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseCompletionStatusForUserData, GetCourseCompletionStatusForUserVariables>;

interface GetCourseCompletionStatusForUserRef {
  ...
  (dc: DataConnect, vars: GetCourseCompletionStatusForUserVariables): QueryRef<GetCourseCompletionStatusForUserData, GetCourseCompletionStatusForUserVariables>;
}
export const getCourseCompletionStatusForUserRef: GetCourseCompletionStatusForUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCourseCompletionStatusForUserRef:
```typescript
const name = getCourseCompletionStatusForUserRef.operationName;
console.log(name);
```

### Variables
The `GetCourseCompletionStatusForUser` query requires an argument of type `GetCourseCompletionStatusForUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCourseCompletionStatusForUserVariables {
  courseId: UUIDString;
  userId: string;
}
```
### Return Type
Recall that executing the `GetCourseCompletionStatusForUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCourseCompletionStatusForUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCourseCompletionStatusForUserData {
  sections: ({
    userCompletionLectures: ({
      id: UUIDString;
      userCompletionProgress: ({
        completedAt?: TimestampString | null;
      })[];
    } & CourseLecture_Key)[];
  })[];
}
```
### Using `GetCourseCompletionStatusForUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourseCompletionStatusForUser, GetCourseCompletionStatusForUserVariables } from '@dataconnect/functions-generated';

// The `GetCourseCompletionStatusForUser` query requires an argument of type `GetCourseCompletionStatusForUserVariables`:
const getCourseCompletionStatusForUserVars: GetCourseCompletionStatusForUserVariables = {
  courseId: ..., 
  userId: ..., 
};

// Call the `getCourseCompletionStatusForUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourseCompletionStatusForUser(getCourseCompletionStatusForUserVars);
// Variables can be defined inline as well.
const { data } = await getCourseCompletionStatusForUser({ courseId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourseCompletionStatusForUser(dataConnect, getCourseCompletionStatusForUserVars);

console.log(data.sections);

// Or, you can use the `Promise` API.
getCourseCompletionStatusForUser(getCourseCompletionStatusForUserVars).then((response) => {
  const data = response.data;
  console.log(data.sections);
});
```

### Using `GetCourseCompletionStatusForUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCourseCompletionStatusForUserRef, GetCourseCompletionStatusForUserVariables } from '@dataconnect/functions-generated';

// The `GetCourseCompletionStatusForUser` query requires an argument of type `GetCourseCompletionStatusForUserVariables`:
const getCourseCompletionStatusForUserVars: GetCourseCompletionStatusForUserVariables = {
  courseId: ..., 
  userId: ..., 
};

// Call the `getCourseCompletionStatusForUserRef()` function to get a reference to the query.
const ref = getCourseCompletionStatusForUserRef(getCourseCompletionStatusForUserVars);
// Variables can be defined inline as well.
const ref = getCourseCompletionStatusForUserRef({ courseId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCourseCompletionStatusForUserRef(dataConnect, getCourseCompletionStatusForUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.sections);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.sections);
});
```

## GetUserEnrollmentForCourseByUser
You can execute the `GetUserEnrollmentForCourseByUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserEnrollmentForCourseByUser(vars: GetUserEnrollmentForCourseByUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserEnrollmentForCourseByUserData, GetUserEnrollmentForCourseByUserVariables>;

interface GetUserEnrollmentForCourseByUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserEnrollmentForCourseByUserVariables): QueryRef<GetUserEnrollmentForCourseByUserData, GetUserEnrollmentForCourseByUserVariables>;
}
export const getUserEnrollmentForCourseByUserRef: GetUserEnrollmentForCourseByUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserEnrollmentForCourseByUser(dc: DataConnect, vars: GetUserEnrollmentForCourseByUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserEnrollmentForCourseByUserData, GetUserEnrollmentForCourseByUserVariables>;

interface GetUserEnrollmentForCourseByUserRef {
  ...
  (dc: DataConnect, vars: GetUserEnrollmentForCourseByUserVariables): QueryRef<GetUserEnrollmentForCourseByUserData, GetUserEnrollmentForCourseByUserVariables>;
}
export const getUserEnrollmentForCourseByUserRef: GetUserEnrollmentForCourseByUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserEnrollmentForCourseByUserRef:
```typescript
const name = getUserEnrollmentForCourseByUserRef.operationName;
console.log(name);
```

### Variables
The `GetUserEnrollmentForCourseByUser` query requires an argument of type `GetUserEnrollmentForCourseByUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserEnrollmentForCourseByUserVariables {
  courseId: UUIDString;
  userId: string;
}
```
### Return Type
Recall that executing the `GetUserEnrollmentForCourseByUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserEnrollmentForCourseByUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserEnrollmentForCourseByUserData {
  enrollments: ({
    id: UUIDString;
    status: EnrollmentStatus;
    completedAt?: TimestampString | null;
  } & Enrollment_Key)[];
}
```
### Using `GetUserEnrollmentForCourseByUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserEnrollmentForCourseByUser, GetUserEnrollmentForCourseByUserVariables } from '@dataconnect/functions-generated';

// The `GetUserEnrollmentForCourseByUser` query requires an argument of type `GetUserEnrollmentForCourseByUserVariables`:
const getUserEnrollmentForCourseByUserVars: GetUserEnrollmentForCourseByUserVariables = {
  courseId: ..., 
  userId: ..., 
};

// Call the `getUserEnrollmentForCourseByUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserEnrollmentForCourseByUser(getUserEnrollmentForCourseByUserVars);
// Variables can be defined inline as well.
const { data } = await getUserEnrollmentForCourseByUser({ courseId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserEnrollmentForCourseByUser(dataConnect, getUserEnrollmentForCourseByUserVars);

console.log(data.enrollments);

// Or, you can use the `Promise` API.
getUserEnrollmentForCourseByUser(getUserEnrollmentForCourseByUserVars).then((response) => {
  const data = response.data;
  console.log(data.enrollments);
});
```

### Using `GetUserEnrollmentForCourseByUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserEnrollmentForCourseByUserRef, GetUserEnrollmentForCourseByUserVariables } from '@dataconnect/functions-generated';

// The `GetUserEnrollmentForCourseByUser` query requires an argument of type `GetUserEnrollmentForCourseByUserVariables`:
const getUserEnrollmentForCourseByUserVars: GetUserEnrollmentForCourseByUserVariables = {
  courseId: ..., 
  userId: ..., 
};

// Call the `getUserEnrollmentForCourseByUserRef()` function to get a reference to the query.
const ref = getUserEnrollmentForCourseByUserRef(getUserEnrollmentForCourseByUserVars);
// Variables can be defined inline as well.
const ref = getUserEnrollmentForCourseByUserRef({ courseId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserEnrollmentForCourseByUserRef(dataConnect, getUserEnrollmentForCourseByUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.enrollments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollments);
});
```

## GetUserEnrollmentForCourse
You can execute the `GetUserEnrollmentForCourse` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserEnrollmentForCourse(vars: GetUserEnrollmentForCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserEnrollmentForCourseData, GetUserEnrollmentForCourseVariables>;

interface GetUserEnrollmentForCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserEnrollmentForCourseVariables): QueryRef<GetUserEnrollmentForCourseData, GetUserEnrollmentForCourseVariables>;
}
export const getUserEnrollmentForCourseRef: GetUserEnrollmentForCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserEnrollmentForCourse(dc: DataConnect, vars: GetUserEnrollmentForCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserEnrollmentForCourseData, GetUserEnrollmentForCourseVariables>;

interface GetUserEnrollmentForCourseRef {
  ...
  (dc: DataConnect, vars: GetUserEnrollmentForCourseVariables): QueryRef<GetUserEnrollmentForCourseData, GetUserEnrollmentForCourseVariables>;
}
export const getUserEnrollmentForCourseRef: GetUserEnrollmentForCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserEnrollmentForCourseRef:
```typescript
const name = getUserEnrollmentForCourseRef.operationName;
console.log(name);
```

### Variables
The `GetUserEnrollmentForCourse` query requires an argument of type `GetUserEnrollmentForCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserEnrollmentForCourseVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserEnrollmentForCourse` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserEnrollmentForCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserEnrollmentForCourseData {
  enrollments: ({
    id: UUIDString;
    status: EnrollmentStatus;
    completedAt?: TimestampString | null;
  } & Enrollment_Key)[];
}
```
### Using `GetUserEnrollmentForCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserEnrollmentForCourse, GetUserEnrollmentForCourseVariables } from '@dataconnect/functions-generated';

// The `GetUserEnrollmentForCourse` query requires an argument of type `GetUserEnrollmentForCourseVariables`:
const getUserEnrollmentForCourseVars: GetUserEnrollmentForCourseVariables = {
  courseId: ..., 
};

// Call the `getUserEnrollmentForCourse()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserEnrollmentForCourse(getUserEnrollmentForCourseVars);
// Variables can be defined inline as well.
const { data } = await getUserEnrollmentForCourse({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserEnrollmentForCourse(dataConnect, getUserEnrollmentForCourseVars);

console.log(data.enrollments);

// Or, you can use the `Promise` API.
getUserEnrollmentForCourse(getUserEnrollmentForCourseVars).then((response) => {
  const data = response.data;
  console.log(data.enrollments);
});
```

### Using `GetUserEnrollmentForCourse`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserEnrollmentForCourseRef, GetUserEnrollmentForCourseVariables } from '@dataconnect/functions-generated';

// The `GetUserEnrollmentForCourse` query requires an argument of type `GetUserEnrollmentForCourseVariables`:
const getUserEnrollmentForCourseVars: GetUserEnrollmentForCourseVariables = {
  courseId: ..., 
};

// Call the `getUserEnrollmentForCourseRef()` function to get a reference to the query.
const ref = getUserEnrollmentForCourseRef(getUserEnrollmentForCourseVars);
// Variables can be defined inline as well.
const ref = getUserEnrollmentForCourseRef({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserEnrollmentForCourseRef(dataConnect, getUserEnrollmentForCourseVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.enrollments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollments);
});
```

## GetUserEnrollmentForMission
You can execute the `GetUserEnrollmentForMission` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserEnrollmentForMission(vars: GetUserEnrollmentForMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserEnrollmentForMissionData, GetUserEnrollmentForMissionVariables>;

interface GetUserEnrollmentForMissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserEnrollmentForMissionVariables): QueryRef<GetUserEnrollmentForMissionData, GetUserEnrollmentForMissionVariables>;
}
export const getUserEnrollmentForMissionRef: GetUserEnrollmentForMissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserEnrollmentForMission(dc: DataConnect, vars: GetUserEnrollmentForMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserEnrollmentForMissionData, GetUserEnrollmentForMissionVariables>;

interface GetUserEnrollmentForMissionRef {
  ...
  (dc: DataConnect, vars: GetUserEnrollmentForMissionVariables): QueryRef<GetUserEnrollmentForMissionData, GetUserEnrollmentForMissionVariables>;
}
export const getUserEnrollmentForMissionRef: GetUserEnrollmentForMissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserEnrollmentForMissionRef:
```typescript
const name = getUserEnrollmentForMissionRef.operationName;
console.log(name);
```

### Variables
The `GetUserEnrollmentForMission` query requires an argument of type `GetUserEnrollmentForMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserEnrollmentForMissionVariables {
  missionId: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserEnrollmentForMission` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserEnrollmentForMissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserEnrollmentForMissionData {
  enrollments: ({
    id: UUIDString;
    status: EnrollmentStatus;
    completedAt?: TimestampString | null;
  } & Enrollment_Key)[];
}
```
### Using `GetUserEnrollmentForMission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserEnrollmentForMission, GetUserEnrollmentForMissionVariables } from '@dataconnect/functions-generated';

// The `GetUserEnrollmentForMission` query requires an argument of type `GetUserEnrollmentForMissionVariables`:
const getUserEnrollmentForMissionVars: GetUserEnrollmentForMissionVariables = {
  missionId: ..., 
};

// Call the `getUserEnrollmentForMission()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserEnrollmentForMission(getUserEnrollmentForMissionVars);
// Variables can be defined inline as well.
const { data } = await getUserEnrollmentForMission({ missionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserEnrollmentForMission(dataConnect, getUserEnrollmentForMissionVars);

console.log(data.enrollments);

// Or, you can use the `Promise` API.
getUserEnrollmentForMission(getUserEnrollmentForMissionVars).then((response) => {
  const data = response.data;
  console.log(data.enrollments);
});
```

### Using `GetUserEnrollmentForMission`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserEnrollmentForMissionRef, GetUserEnrollmentForMissionVariables } from '@dataconnect/functions-generated';

// The `GetUserEnrollmentForMission` query requires an argument of type `GetUserEnrollmentForMissionVariables`:
const getUserEnrollmentForMissionVars: GetUserEnrollmentForMissionVariables = {
  missionId: ..., 
};

// Call the `getUserEnrollmentForMissionRef()` function to get a reference to the query.
const ref = getUserEnrollmentForMissionRef(getUserEnrollmentForMissionVars);
// Variables can be defined inline as well.
const ref = getUserEnrollmentForMissionRef({ missionId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserEnrollmentForMissionRef(dataConnect, getUserEnrollmentForMissionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.enrollments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollments);
});
```

## GetMissionForEnrollment
You can execute the `GetMissionForEnrollment` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMissionForEnrollment(vars: GetMissionForEnrollmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetMissionForEnrollmentData, GetMissionForEnrollmentVariables>;

interface GetMissionForEnrollmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMissionForEnrollmentVariables): QueryRef<GetMissionForEnrollmentData, GetMissionForEnrollmentVariables>;
}
export const getMissionForEnrollmentRef: GetMissionForEnrollmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMissionForEnrollment(dc: DataConnect, vars: GetMissionForEnrollmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetMissionForEnrollmentData, GetMissionForEnrollmentVariables>;

interface GetMissionForEnrollmentRef {
  ...
  (dc: DataConnect, vars: GetMissionForEnrollmentVariables): QueryRef<GetMissionForEnrollmentData, GetMissionForEnrollmentVariables>;
}
export const getMissionForEnrollmentRef: GetMissionForEnrollmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMissionForEnrollmentRef:
```typescript
const name = getMissionForEnrollmentRef.operationName;
console.log(name);
```

### Variables
The `GetMissionForEnrollment` query requires an argument of type `GetMissionForEnrollmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMissionForEnrollmentVariables {
  missionId: UUIDString;
}
```
### Return Type
Recall that executing the `GetMissionForEnrollment` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMissionForEnrollmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMissionForEnrollmentData {
  mission?: {
    id: UUIDString;
    deletedAt?: TimestampString | null;
  } & Mission_Key;
}
```
### Using `GetMissionForEnrollment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMissionForEnrollment, GetMissionForEnrollmentVariables } from '@dataconnect/functions-generated';

// The `GetMissionForEnrollment` query requires an argument of type `GetMissionForEnrollmentVariables`:
const getMissionForEnrollmentVars: GetMissionForEnrollmentVariables = {
  missionId: ..., 
};

// Call the `getMissionForEnrollment()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMissionForEnrollment(getMissionForEnrollmentVars);
// Variables can be defined inline as well.
const { data } = await getMissionForEnrollment({ missionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMissionForEnrollment(dataConnect, getMissionForEnrollmentVars);

console.log(data.mission);

// Or, you can use the `Promise` API.
getMissionForEnrollment(getMissionForEnrollmentVars).then((response) => {
  const data = response.data;
  console.log(data.mission);
});
```

### Using `GetMissionForEnrollment`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMissionForEnrollmentRef, GetMissionForEnrollmentVariables } from '@dataconnect/functions-generated';

// The `GetMissionForEnrollment` query requires an argument of type `GetMissionForEnrollmentVariables`:
const getMissionForEnrollmentVars: GetMissionForEnrollmentVariables = {
  missionId: ..., 
};

// Call the `getMissionForEnrollmentRef()` function to get a reference to the query.
const ref = getMissionForEnrollmentRef(getMissionForEnrollmentVars);
// Variables can be defined inline as well.
const ref = getMissionForEnrollmentRef({ missionId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMissionForEnrollmentRef(dataConnect, getMissionForEnrollmentVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.mission);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.mission);
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
    status: SubmissionStatus;
    feedback?: string | null;
    submittedAt: TimestampString;
    missionSubmissionScores_on_submission: ({
      score: number;
      criterion: {
        criterionName: string;
        maxPoints: number;
      };
    })[];
    mission: {
      title: string;
      difficulty: MissionDifficulty;
    };
  } & MissionSubmission_Key)[];
}
```
### Using `MySubmissions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, mySubmissions } from '@dataconnect/functions-generated';


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
import { connectorConfig, mySubmissionsRef } from '@dataconnect/functions-generated';


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

## GetSubmissionForGrading
You can execute the `GetSubmissionForGrading` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getSubmissionForGrading(vars: GetSubmissionForGradingVariables, options?: ExecuteQueryOptions): QueryPromise<GetSubmissionForGradingData, GetSubmissionForGradingVariables>;

interface GetSubmissionForGradingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSubmissionForGradingVariables): QueryRef<GetSubmissionForGradingData, GetSubmissionForGradingVariables>;
}
export const getSubmissionForGradingRef: GetSubmissionForGradingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSubmissionForGrading(dc: DataConnect, vars: GetSubmissionForGradingVariables, options?: ExecuteQueryOptions): QueryPromise<GetSubmissionForGradingData, GetSubmissionForGradingVariables>;

interface GetSubmissionForGradingRef {
  ...
  (dc: DataConnect, vars: GetSubmissionForGradingVariables): QueryRef<GetSubmissionForGradingData, GetSubmissionForGradingVariables>;
}
export const getSubmissionForGradingRef: GetSubmissionForGradingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSubmissionForGradingRef:
```typescript
const name = getSubmissionForGradingRef.operationName;
console.log(name);
```

### Variables
The `GetSubmissionForGrading` query requires an argument of type `GetSubmissionForGradingVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSubmissionForGradingVariables {
  submissionId: UUIDString;
}
```
### Return Type
Recall that executing the `GetSubmissionForGrading` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSubmissionForGradingData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetSubmissionForGradingData {
  missionSubmission?: {
    id: UUIDString;
    status: SubmissionStatus;
    attemptNumber: number;
    mission: {
      id: UUIDString;
    } & Mission_Key;
    student: {
      id: string;
    } & User_Key;
  } & MissionSubmission_Key;
}
```
### Using `GetSubmissionForGrading`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSubmissionForGrading, GetSubmissionForGradingVariables } from '@dataconnect/functions-generated';

// The `GetSubmissionForGrading` query requires an argument of type `GetSubmissionForGradingVariables`:
const getSubmissionForGradingVars: GetSubmissionForGradingVariables = {
  submissionId: ..., 
};

// Call the `getSubmissionForGrading()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSubmissionForGrading(getSubmissionForGradingVars);
// Variables can be defined inline as well.
const { data } = await getSubmissionForGrading({ submissionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSubmissionForGrading(dataConnect, getSubmissionForGradingVars);

console.log(data.missionSubmission);

// Or, you can use the `Promise` API.
getSubmissionForGrading(getSubmissionForGradingVars).then((response) => {
  const data = response.data;
  console.log(data.missionSubmission);
});
```

### Using `GetSubmissionForGrading`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSubmissionForGradingRef, GetSubmissionForGradingVariables } from '@dataconnect/functions-generated';

// The `GetSubmissionForGrading` query requires an argument of type `GetSubmissionForGradingVariables`:
const getSubmissionForGradingVars: GetSubmissionForGradingVariables = {
  submissionId: ..., 
};

// Call the `getSubmissionForGradingRef()` function to get a reference to the query.
const ref = getSubmissionForGradingRef(getSubmissionForGradingVars);
// Variables can be defined inline as well.
const ref = getSubmissionForGradingRef({ submissionId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSubmissionForGradingRef(dataConnect, getSubmissionForGradingVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.missionSubmission);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.missionSubmission);
});
```

## GetEnrollmentForUserMission
You can execute the `GetEnrollmentForUserMission` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getEnrollmentForUserMission(vars: GetEnrollmentForUserMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetEnrollmentForUserMissionData, GetEnrollmentForUserMissionVariables>;

interface GetEnrollmentForUserMissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEnrollmentForUserMissionVariables): QueryRef<GetEnrollmentForUserMissionData, GetEnrollmentForUserMissionVariables>;
}
export const getEnrollmentForUserMissionRef: GetEnrollmentForUserMissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getEnrollmentForUserMission(dc: DataConnect, vars: GetEnrollmentForUserMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetEnrollmentForUserMissionData, GetEnrollmentForUserMissionVariables>;

interface GetEnrollmentForUserMissionRef {
  ...
  (dc: DataConnect, vars: GetEnrollmentForUserMissionVariables): QueryRef<GetEnrollmentForUserMissionData, GetEnrollmentForUserMissionVariables>;
}
export const getEnrollmentForUserMissionRef: GetEnrollmentForUserMissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getEnrollmentForUserMissionRef:
```typescript
const name = getEnrollmentForUserMissionRef.operationName;
console.log(name);
```

### Variables
The `GetEnrollmentForUserMission` query requires an argument of type `GetEnrollmentForUserMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetEnrollmentForUserMissionVariables {
  userId: string;
  missionId: UUIDString;
}
```
### Return Type
Recall that executing the `GetEnrollmentForUserMission` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetEnrollmentForUserMissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetEnrollmentForUserMissionData {
  enrollments: ({
    id: UUIDString;
    status: EnrollmentStatus;
    completedAt?: TimestampString | null;
  } & Enrollment_Key)[];
}
```
### Using `GetEnrollmentForUserMission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getEnrollmentForUserMission, GetEnrollmentForUserMissionVariables } from '@dataconnect/functions-generated';

// The `GetEnrollmentForUserMission` query requires an argument of type `GetEnrollmentForUserMissionVariables`:
const getEnrollmentForUserMissionVars: GetEnrollmentForUserMissionVariables = {
  userId: ..., 
  missionId: ..., 
};

// Call the `getEnrollmentForUserMission()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getEnrollmentForUserMission(getEnrollmentForUserMissionVars);
// Variables can be defined inline as well.
const { data } = await getEnrollmentForUserMission({ userId: ..., missionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getEnrollmentForUserMission(dataConnect, getEnrollmentForUserMissionVars);

console.log(data.enrollments);

// Or, you can use the `Promise` API.
getEnrollmentForUserMission(getEnrollmentForUserMissionVars).then((response) => {
  const data = response.data;
  console.log(data.enrollments);
});
```

### Using `GetEnrollmentForUserMission`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getEnrollmentForUserMissionRef, GetEnrollmentForUserMissionVariables } from '@dataconnect/functions-generated';

// The `GetEnrollmentForUserMission` query requires an argument of type `GetEnrollmentForUserMissionVariables`:
const getEnrollmentForUserMissionVars: GetEnrollmentForUserMissionVariables = {
  userId: ..., 
  missionId: ..., 
};

// Call the `getEnrollmentForUserMissionRef()` function to get a reference to the query.
const ref = getEnrollmentForUserMissionRef(getEnrollmentForUserMissionVars);
// Variables can be defined inline as well.
const ref = getEnrollmentForUserMissionRef({ userId: ..., missionId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getEnrollmentForUserMissionRef(dataConnect, getEnrollmentForUserMissionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.enrollments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollments);
});
```

## AdminGetMission
You can execute the `AdminGetMission` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminGetMission(vars: AdminGetMissionVariables, options?: ExecuteQueryOptions): QueryPromise<AdminGetMissionData, AdminGetMissionVariables>;

interface AdminGetMissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminGetMissionVariables): QueryRef<AdminGetMissionData, AdminGetMissionVariables>;
}
export const adminGetMissionRef: AdminGetMissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminGetMission(dc: DataConnect, vars: AdminGetMissionVariables, options?: ExecuteQueryOptions): QueryPromise<AdminGetMissionData, AdminGetMissionVariables>;

interface AdminGetMissionRef {
  ...
  (dc: DataConnect, vars: AdminGetMissionVariables): QueryRef<AdminGetMissionData, AdminGetMissionVariables>;
}
export const adminGetMissionRef: AdminGetMissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminGetMissionRef:
```typescript
const name = adminGetMissionRef.operationName;
console.log(name);
```

### Variables
The `AdminGetMission` query requires an argument of type `AdminGetMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminGetMissionVariables {
  missionId: UUIDString;
}
```
### Return Type
Recall that executing the `AdminGetMission` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminGetMissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminGetMissionData {
  mission?: {
    id: UUIDString;
    title: string;
    scenarioDescription: string;
    durationMinutes: number;
    difficulty: MissionDifficulty;
    skillsTested: string[];
    deletedAt?: TimestampString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    category: {
      id: UUIDString;
      name: string;
    } & Category_Key;
    course?: {
      id: UUIDString;
      title: string;
    } & Course_Key;
    author: {
      id: string;
      name: string;
      email: string;
      avatar?: string | null;
    } & User_Key;
    createdBy: {
      id: string;
      name: string;
    } & User_Key;
    microLessons: ({
      id: UUIDString;
      title: string;
      type: LectureType;
      assetUrl?: string | null;
      content?: string | null;
      durationSeconds?: number | null;
      order: number;
    } & MissionMicroLesson_Key)[];
    templates: ({
      id: UUIDString;
      title: string;
      fileUrl: string;
      fileType: string;
    } & MissionTemplate_Key)[];
    criteria: ({
      id: UUIDString;
      criterionName: string;
      description?: string | null;
      maxPoints: number;
      order: number;
    } & RubricCriterion_Key)[];
  } & Mission_Key;
}
```
### Using `AdminGetMission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminGetMission, AdminGetMissionVariables } from '@dataconnect/functions-generated';

// The `AdminGetMission` query requires an argument of type `AdminGetMissionVariables`:
const adminGetMissionVars: AdminGetMissionVariables = {
  missionId: ..., 
};

// Call the `adminGetMission()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminGetMission(adminGetMissionVars);
// Variables can be defined inline as well.
const { data } = await adminGetMission({ missionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminGetMission(dataConnect, adminGetMissionVars);

console.log(data.mission);

// Or, you can use the `Promise` API.
adminGetMission(adminGetMissionVars).then((response) => {
  const data = response.data;
  console.log(data.mission);
});
```

### Using `AdminGetMission`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminGetMissionRef, AdminGetMissionVariables } from '@dataconnect/functions-generated';

// The `AdminGetMission` query requires an argument of type `AdminGetMissionVariables`:
const adminGetMissionVars: AdminGetMissionVariables = {
  missionId: ..., 
};

// Call the `adminGetMissionRef()` function to get a reference to the query.
const ref = adminGetMissionRef(adminGetMissionVars);
// Variables can be defined inline as well.
const ref = adminGetMissionRef({ missionId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminGetMissionRef(dataConnect, adminGetMissionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.mission);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.mission);
});
```

## AdminListMyMissions
You can execute the `AdminListMyMissions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminListMyMissions(options?: ExecuteQueryOptions): QueryPromise<AdminListMyMissionsData, undefined>;

interface AdminListMyMissionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminListMyMissionsData, undefined>;
}
export const adminListMyMissionsRef: AdminListMyMissionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminListMyMissions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<AdminListMyMissionsData, undefined>;

interface AdminListMyMissionsRef {
  ...
  (dc: DataConnect): QueryRef<AdminListMyMissionsData, undefined>;
}
export const adminListMyMissionsRef: AdminListMyMissionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminListMyMissionsRef:
```typescript
const name = adminListMyMissionsRef.operationName;
console.log(name);
```

### Variables
The `AdminListMyMissions` query has no variables.
### Return Type
Recall that executing the `AdminListMyMissions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminListMyMissionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminListMyMissionsData {
  missions: ({
    id: UUIDString;
    title: string;
    difficulty: MissionDifficulty;
    durationMinutes: number;
    updatedAt: TimestampString;
    category: {
      name: string;
    };
    course?: {
      id: UUIDString;
      title: string;
    } & Course_Key;
  } & Mission_Key)[];
}
```
### Using `AdminListMyMissions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminListMyMissions } from '@dataconnect/functions-generated';


// Call the `adminListMyMissions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminListMyMissions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminListMyMissions(dataConnect);

console.log(data.missions);

// Or, you can use the `Promise` API.
adminListMyMissions().then((response) => {
  const data = response.data;
  console.log(data.missions);
});
```

### Using `AdminListMyMissions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminListMyMissionsRef } from '@dataconnect/functions-generated';


// Call the `adminListMyMissionsRef()` function to get a reference to the query.
const ref = adminListMyMissionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminListMyMissionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.missions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.missions);
});
```

## GetMissionTemplates
You can execute the `GetMissionTemplates` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMissionTemplates(vars: GetMissionTemplatesVariables, options?: ExecuteQueryOptions): QueryPromise<GetMissionTemplatesData, GetMissionTemplatesVariables>;

interface GetMissionTemplatesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMissionTemplatesVariables): QueryRef<GetMissionTemplatesData, GetMissionTemplatesVariables>;
}
export const getMissionTemplatesRef: GetMissionTemplatesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMissionTemplates(dc: DataConnect, vars: GetMissionTemplatesVariables, options?: ExecuteQueryOptions): QueryPromise<GetMissionTemplatesData, GetMissionTemplatesVariables>;

interface GetMissionTemplatesRef {
  ...
  (dc: DataConnect, vars: GetMissionTemplatesVariables): QueryRef<GetMissionTemplatesData, GetMissionTemplatesVariables>;
}
export const getMissionTemplatesRef: GetMissionTemplatesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMissionTemplatesRef:
```typescript
const name = getMissionTemplatesRef.operationName;
console.log(name);
```

### Variables
The `GetMissionTemplates` query requires an argument of type `GetMissionTemplatesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMissionTemplatesVariables {
  missionId: UUIDString;
}
```
### Return Type
Recall that executing the `GetMissionTemplates` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMissionTemplatesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMissionTemplatesData {
  missionTemplates: ({
    id: UUIDString;
    title: string;
    fileUrl: string;
    fileType: string;
  } & MissionTemplate_Key)[];
}
```
### Using `GetMissionTemplates`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMissionTemplates, GetMissionTemplatesVariables } from '@dataconnect/functions-generated';

// The `GetMissionTemplates` query requires an argument of type `GetMissionTemplatesVariables`:
const getMissionTemplatesVars: GetMissionTemplatesVariables = {
  missionId: ..., 
};

// Call the `getMissionTemplates()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMissionTemplates(getMissionTemplatesVars);
// Variables can be defined inline as well.
const { data } = await getMissionTemplates({ missionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMissionTemplates(dataConnect, getMissionTemplatesVars);

console.log(data.missionTemplates);

// Or, you can use the `Promise` API.
getMissionTemplates(getMissionTemplatesVars).then((response) => {
  const data = response.data;
  console.log(data.missionTemplates);
});
```

### Using `GetMissionTemplates`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMissionTemplatesRef, GetMissionTemplatesVariables } from '@dataconnect/functions-generated';

// The `GetMissionTemplates` query requires an argument of type `GetMissionTemplatesVariables`:
const getMissionTemplatesVars: GetMissionTemplatesVariables = {
  missionId: ..., 
};

// Call the `getMissionTemplatesRef()` function to get a reference to the query.
const ref = getMissionTemplatesRef(getMissionTemplatesVars);
// Variables can be defined inline as well.
const ref = getMissionTemplatesRef({ missionId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMissionTemplatesRef(dataConnect, getMissionTemplatesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.missionTemplates);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.missionTemplates);
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
    timeLimitMinutes?: number | null;
    takeQuestions: ({
      id: UUIDString;
      questionText: string;
      points: number;
      takeOptions: ({
        id: UUIDString;
        text: string;
      } & QuizOption_Key)[];
    } & QuizQuestion_Key)[];
  } & CourseQuiz_Key)[];
}
```
### Using `GetQuizQuestions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQuizQuestions, GetQuizQuestionsVariables } from '@dataconnect/functions-generated';

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
import { connectorConfig, getQuizQuestionsRef, GetQuizQuestionsVariables } from '@dataconnect/functions-generated';

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

## GetExpiredAttempts
You can execute the `GetExpiredAttempts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getExpiredAttempts(options?: ExecuteQueryOptions): QueryPromise<GetExpiredAttemptsData, undefined>;

interface GetExpiredAttemptsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetExpiredAttemptsData, undefined>;
}
export const getExpiredAttemptsRef: GetExpiredAttemptsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getExpiredAttempts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetExpiredAttemptsData, undefined>;

interface GetExpiredAttemptsRef {
  ...
  (dc: DataConnect): QueryRef<GetExpiredAttemptsData, undefined>;
}
export const getExpiredAttemptsRef: GetExpiredAttemptsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getExpiredAttemptsRef:
```typescript
const name = getExpiredAttemptsRef.operationName;
console.log(name);
```

### Variables
The `GetExpiredAttempts` query has no variables.
### Return Type
Recall that executing the `GetExpiredAttempts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetExpiredAttemptsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetExpiredAttemptsData {
  quizAttempts: ({
    id: UUIDString;
    startedAt: TimestampString;
    quiz: {
      id: UUIDString;
      timeLimitMinutes?: number | null;
    } & CourseQuiz_Key;
  } & QuizAttempt_Key)[];
}
```
### Using `GetExpiredAttempts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getExpiredAttempts } from '@dataconnect/functions-generated';


// Call the `getExpiredAttempts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getExpiredAttempts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getExpiredAttempts(dataConnect);

console.log(data.quizAttempts);

// Or, you can use the `Promise` API.
getExpiredAttempts().then((response) => {
  const data = response.data;
  console.log(data.quizAttempts);
});
```

### Using `GetExpiredAttempts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getExpiredAttemptsRef } from '@dataconnect/functions-generated';


// Call the `getExpiredAttemptsRef()` function to get a reference to the query.
const ref = getExpiredAttemptsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getExpiredAttemptsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quizAttempts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quizAttempts);
});
```

## GetUserQuizAttempts
You can execute the `GetUserQuizAttempts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserQuizAttempts(vars: GetUserQuizAttemptsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserQuizAttemptsData, GetUserQuizAttemptsVariables>;

interface GetUserQuizAttemptsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserQuizAttemptsVariables): QueryRef<GetUserQuizAttemptsData, GetUserQuizAttemptsVariables>;
}
export const getUserQuizAttemptsRef: GetUserQuizAttemptsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserQuizAttempts(dc: DataConnect, vars: GetUserQuizAttemptsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserQuizAttemptsData, GetUserQuizAttemptsVariables>;

interface GetUserQuizAttemptsRef {
  ...
  (dc: DataConnect, vars: GetUserQuizAttemptsVariables): QueryRef<GetUserQuizAttemptsData, GetUserQuizAttemptsVariables>;
}
export const getUserQuizAttemptsRef: GetUserQuizAttemptsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserQuizAttemptsRef:
```typescript
const name = getUserQuizAttemptsRef.operationName;
console.log(name);
```

### Variables
The `GetUserQuizAttempts` query requires an argument of type `GetUserQuizAttemptsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserQuizAttemptsVariables {
  quizId: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserQuizAttempts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserQuizAttemptsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserQuizAttemptsData {
  quizAttempts: ({
    id: UUIDString;
    completedAt?: TimestampString | null;
    score?: number | null;
    passed?: boolean | null;
    startedAt: TimestampString;
  } & QuizAttempt_Key)[];
}
```
### Using `GetUserQuizAttempts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserQuizAttempts, GetUserQuizAttemptsVariables } from '@dataconnect/functions-generated';

// The `GetUserQuizAttempts` query requires an argument of type `GetUserQuizAttemptsVariables`:
const getUserQuizAttemptsVars: GetUserQuizAttemptsVariables = {
  quizId: ..., 
};

// Call the `getUserQuizAttempts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserQuizAttempts(getUserQuizAttemptsVars);
// Variables can be defined inline as well.
const { data } = await getUserQuizAttempts({ quizId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserQuizAttempts(dataConnect, getUserQuizAttemptsVars);

console.log(data.quizAttempts);

// Or, you can use the `Promise` API.
getUserQuizAttempts(getUserQuizAttemptsVars).then((response) => {
  const data = response.data;
  console.log(data.quizAttempts);
});
```

### Using `GetUserQuizAttempts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserQuizAttemptsRef, GetUserQuizAttemptsVariables } from '@dataconnect/functions-generated';

// The `GetUserQuizAttempts` query requires an argument of type `GetUserQuizAttemptsVariables`:
const getUserQuizAttemptsVars: GetUserQuizAttemptsVariables = {
  quizId: ..., 
};

// Call the `getUserQuizAttemptsRef()` function to get a reference to the query.
const ref = getUserQuizAttemptsRef(getUserQuizAttemptsVars);
// Variables can be defined inline as well.
const ref = getUserQuizAttemptsRef({ quizId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserQuizAttemptsRef(dataConnect, getUserQuizAttemptsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quizAttempts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quizAttempts);
});
```

## GetQuizAttemptById
You can execute the `GetQuizAttemptById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getQuizAttemptById(vars: GetQuizAttemptByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuizAttemptByIdData, GetQuizAttemptByIdVariables>;

interface GetQuizAttemptByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuizAttemptByIdVariables): QueryRef<GetQuizAttemptByIdData, GetQuizAttemptByIdVariables>;
}
export const getQuizAttemptByIdRef: GetQuizAttemptByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getQuizAttemptById(dc: DataConnect, vars: GetQuizAttemptByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuizAttemptByIdData, GetQuizAttemptByIdVariables>;

interface GetQuizAttemptByIdRef {
  ...
  (dc: DataConnect, vars: GetQuizAttemptByIdVariables): QueryRef<GetQuizAttemptByIdData, GetQuizAttemptByIdVariables>;
}
export const getQuizAttemptByIdRef: GetQuizAttemptByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getQuizAttemptByIdRef:
```typescript
const name = getQuizAttemptByIdRef.operationName;
console.log(name);
```

### Variables
The `GetQuizAttemptById` query requires an argument of type `GetQuizAttemptByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetQuizAttemptByIdVariables {
  attemptId: UUIDString;
}
```
### Return Type
Recall that executing the `GetQuizAttemptById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetQuizAttemptByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetQuizAttemptByIdData {
  quizAttempt?: {
    id: UUIDString;
    completedAt?: TimestampString | null;
    startedAt: TimestampString;
    score?: number | null;
    passed?: boolean | null;
    user: {
      id: string;
    } & User_Key;
    quiz: {
      id: UUIDString;
      passingScore: number;
      maxAttempts: number;
      timeLimitMinutes?: number | null;
    } & CourseQuiz_Key;
  } & QuizAttempt_Key;
}
```
### Using `GetQuizAttemptById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQuizAttemptById, GetQuizAttemptByIdVariables } from '@dataconnect/functions-generated';

// The `GetQuizAttemptById` query requires an argument of type `GetQuizAttemptByIdVariables`:
const getQuizAttemptByIdVars: GetQuizAttemptByIdVariables = {
  attemptId: ..., 
};

// Call the `getQuizAttemptById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQuizAttemptById(getQuizAttemptByIdVars);
// Variables can be defined inline as well.
const { data } = await getQuizAttemptById({ attemptId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getQuizAttemptById(dataConnect, getQuizAttemptByIdVars);

console.log(data.quizAttempt);

// Or, you can use the `Promise` API.
getQuizAttemptById(getQuizAttemptByIdVars).then((response) => {
  const data = response.data;
  console.log(data.quizAttempt);
});
```

### Using `GetQuizAttemptById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getQuizAttemptByIdRef, GetQuizAttemptByIdVariables } from '@dataconnect/functions-generated';

// The `GetQuizAttemptById` query requires an argument of type `GetQuizAttemptByIdVariables`:
const getQuizAttemptByIdVars: GetQuizAttemptByIdVariables = {
  attemptId: ..., 
};

// Call the `getQuizAttemptByIdRef()` function to get a reference to the query.
const ref = getQuizAttemptByIdRef(getQuizAttemptByIdVars);
// Variables can be defined inline as well.
const ref = getQuizAttemptByIdRef({ attemptId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getQuizAttemptByIdRef(dataConnect, getQuizAttemptByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quizAttempt);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quizAttempt);
});
```

## GetQuizQuestionPoints
You can execute the `GetQuizQuestionPoints` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getQuizQuestionPoints(vars: GetQuizQuestionPointsVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuizQuestionPointsData, GetQuizQuestionPointsVariables>;

interface GetQuizQuestionPointsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuizQuestionPointsVariables): QueryRef<GetQuizQuestionPointsData, GetQuizQuestionPointsVariables>;
}
export const getQuizQuestionPointsRef: GetQuizQuestionPointsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getQuizQuestionPoints(dc: DataConnect, vars: GetQuizQuestionPointsVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuizQuestionPointsData, GetQuizQuestionPointsVariables>;

interface GetQuizQuestionPointsRef {
  ...
  (dc: DataConnect, vars: GetQuizQuestionPointsVariables): QueryRef<GetQuizQuestionPointsData, GetQuizQuestionPointsVariables>;
}
export const getQuizQuestionPointsRef: GetQuizQuestionPointsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getQuizQuestionPointsRef:
```typescript
const name = getQuizQuestionPointsRef.operationName;
console.log(name);
```

### Variables
The `GetQuizQuestionPoints` query requires an argument of type `GetQuizQuestionPointsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetQuizQuestionPointsVariables {
  quizId: UUIDString;
}
```
### Return Type
Recall that executing the `GetQuizQuestionPoints` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetQuizQuestionPointsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetQuizQuestionPointsData {
  quizQuestions: ({
    id: UUIDString;
    points: number;
  } & QuizQuestion_Key)[];
}
```
### Using `GetQuizQuestionPoints`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQuizQuestionPoints, GetQuizQuestionPointsVariables } from '@dataconnect/functions-generated';

// The `GetQuizQuestionPoints` query requires an argument of type `GetQuizQuestionPointsVariables`:
const getQuizQuestionPointsVars: GetQuizQuestionPointsVariables = {
  quizId: ..., 
};

// Call the `getQuizQuestionPoints()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQuizQuestionPoints(getQuizQuestionPointsVars);
// Variables can be defined inline as well.
const { data } = await getQuizQuestionPoints({ quizId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getQuizQuestionPoints(dataConnect, getQuizQuestionPointsVars);

console.log(data.quizQuestions);

// Or, you can use the `Promise` API.
getQuizQuestionPoints(getQuizQuestionPointsVars).then((response) => {
  const data = response.data;
  console.log(data.quizQuestions);
});
```

### Using `GetQuizQuestionPoints`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getQuizQuestionPointsRef, GetQuizQuestionPointsVariables } from '@dataconnect/functions-generated';

// The `GetQuizQuestionPoints` query requires an argument of type `GetQuizQuestionPointsVariables`:
const getQuizQuestionPointsVars: GetQuizQuestionPointsVariables = {
  quizId: ..., 
};

// Call the `getQuizQuestionPointsRef()` function to get a reference to the query.
const ref = getQuizQuestionPointsRef(getQuizQuestionPointsVars);
// Variables can be defined inline as well.
const ref = getQuizQuestionPointsRef({ quizId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getQuizQuestionPointsRef(dataConnect, getQuizQuestionPointsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quizQuestions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quizQuestions);
});
```

## GetAttemptAnswersWithCorrect
You can execute the `GetAttemptAnswersWithCorrect` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAttemptAnswersWithCorrect(vars: GetAttemptAnswersWithCorrectVariables, options?: ExecuteQueryOptions): QueryPromise<GetAttemptAnswersWithCorrectData, GetAttemptAnswersWithCorrectVariables>;

interface GetAttemptAnswersWithCorrectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAttemptAnswersWithCorrectVariables): QueryRef<GetAttemptAnswersWithCorrectData, GetAttemptAnswersWithCorrectVariables>;
}
export const getAttemptAnswersWithCorrectRef: GetAttemptAnswersWithCorrectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAttemptAnswersWithCorrect(dc: DataConnect, vars: GetAttemptAnswersWithCorrectVariables, options?: ExecuteQueryOptions): QueryPromise<GetAttemptAnswersWithCorrectData, GetAttemptAnswersWithCorrectVariables>;

interface GetAttemptAnswersWithCorrectRef {
  ...
  (dc: DataConnect, vars: GetAttemptAnswersWithCorrectVariables): QueryRef<GetAttemptAnswersWithCorrectData, GetAttemptAnswersWithCorrectVariables>;
}
export const getAttemptAnswersWithCorrectRef: GetAttemptAnswersWithCorrectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAttemptAnswersWithCorrectRef:
```typescript
const name = getAttemptAnswersWithCorrectRef.operationName;
console.log(name);
```

### Variables
The `GetAttemptAnswersWithCorrect` query requires an argument of type `GetAttemptAnswersWithCorrectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAttemptAnswersWithCorrectVariables {
  attemptId: UUIDString;
}
```
### Return Type
Recall that executing the `GetAttemptAnswersWithCorrect` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAttemptAnswersWithCorrectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAttemptAnswersWithCorrectData {
  quizAttemptAnswers: ({
    question: {
      id: UUIDString;
      points: number;
    } & QuizQuestion_Key;
    selectedOption: {
      id: UUIDString;
      isCorrect: boolean;
    } & QuizOption_Key;
  })[];
}
```
### Using `GetAttemptAnswersWithCorrect`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAttemptAnswersWithCorrect, GetAttemptAnswersWithCorrectVariables } from '@dataconnect/functions-generated';

// The `GetAttemptAnswersWithCorrect` query requires an argument of type `GetAttemptAnswersWithCorrectVariables`:
const getAttemptAnswersWithCorrectVars: GetAttemptAnswersWithCorrectVariables = {
  attemptId: ..., 
};

// Call the `getAttemptAnswersWithCorrect()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAttemptAnswersWithCorrect(getAttemptAnswersWithCorrectVars);
// Variables can be defined inline as well.
const { data } = await getAttemptAnswersWithCorrect({ attemptId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAttemptAnswersWithCorrect(dataConnect, getAttemptAnswersWithCorrectVars);

console.log(data.quizAttemptAnswers);

// Or, you can use the `Promise` API.
getAttemptAnswersWithCorrect(getAttemptAnswersWithCorrectVars).then((response) => {
  const data = response.data;
  console.log(data.quizAttemptAnswers);
});
```

### Using `GetAttemptAnswersWithCorrect`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAttemptAnswersWithCorrectRef, GetAttemptAnswersWithCorrectVariables } from '@dataconnect/functions-generated';

// The `GetAttemptAnswersWithCorrect` query requires an argument of type `GetAttemptAnswersWithCorrectVariables`:
const getAttemptAnswersWithCorrectVars: GetAttemptAnswersWithCorrectVariables = {
  attemptId: ..., 
};

// Call the `getAttemptAnswersWithCorrectRef()` function to get a reference to the query.
const ref = getAttemptAnswersWithCorrectRef(getAttemptAnswersWithCorrectVars);
// Variables can be defined inline as well.
const ref = getAttemptAnswersWithCorrectRef({ attemptId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAttemptAnswersWithCorrectRef(dataConnect, getAttemptAnswersWithCorrectVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quizAttemptAnswers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quizAttemptAnswers);
});
```

## GetQuizSettings
You can execute the `GetQuizSettings` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getQuizSettings(vars: GetQuizSettingsVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuizSettingsData, GetQuizSettingsVariables>;

interface GetQuizSettingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuizSettingsVariables): QueryRef<GetQuizSettingsData, GetQuizSettingsVariables>;
}
export const getQuizSettingsRef: GetQuizSettingsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getQuizSettings(dc: DataConnect, vars: GetQuizSettingsVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuizSettingsData, GetQuizSettingsVariables>;

interface GetQuizSettingsRef {
  ...
  (dc: DataConnect, vars: GetQuizSettingsVariables): QueryRef<GetQuizSettingsData, GetQuizSettingsVariables>;
}
export const getQuizSettingsRef: GetQuizSettingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getQuizSettingsRef:
```typescript
const name = getQuizSettingsRef.operationName;
console.log(name);
```

### Variables
The `GetQuizSettings` query requires an argument of type `GetQuizSettingsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetQuizSettingsVariables {
  quizId: UUIDString;
}
```
### Return Type
Recall that executing the `GetQuizSettings` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetQuizSettingsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetQuizSettingsData {
  courseQuiz?: {
    id: UUIDString;
    passingScore: number;
    maxAttempts: number;
    timeLimitMinutes?: number | null;
    lecture: {
      id: UUIDString;
      type: LectureType;
      section: {
        course: {
          id: UUIDString;
          author: {
            id: string;
          } & User_Key;
          createdBy: {
            id: string;
          } & User_Key;
        } & Course_Key;
      };
    } & CourseLecture_Key;
  } & CourseQuiz_Key;
}
```
### Using `GetQuizSettings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQuizSettings, GetQuizSettingsVariables } from '@dataconnect/functions-generated';

// The `GetQuizSettings` query requires an argument of type `GetQuizSettingsVariables`:
const getQuizSettingsVars: GetQuizSettingsVariables = {
  quizId: ..., 
};

// Call the `getQuizSettings()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQuizSettings(getQuizSettingsVars);
// Variables can be defined inline as well.
const { data } = await getQuizSettings({ quizId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getQuizSettings(dataConnect, getQuizSettingsVars);

console.log(data.courseQuiz);

// Or, you can use the `Promise` API.
getQuizSettings(getQuizSettingsVars).then((response) => {
  const data = response.data;
  console.log(data.courseQuiz);
});
```

### Using `GetQuizSettings`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getQuizSettingsRef, GetQuizSettingsVariables } from '@dataconnect/functions-generated';

// The `GetQuizSettings` query requires an argument of type `GetQuizSettingsVariables`:
const getQuizSettingsVars: GetQuizSettingsVariables = {
  quizId: ..., 
};

// Call the `getQuizSettingsRef()` function to get a reference to the query.
const ref = getQuizSettingsRef(getQuizSettingsVars);
// Variables can be defined inline as well.
const ref = getQuizSettingsRef({ quizId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getQuizSettingsRef(dataConnect, getQuizSettingsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseQuiz);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseQuiz);
});
```

## GetQuestionOptions
You can execute the `GetQuestionOptions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getQuestionOptions(vars: GetQuestionOptionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuestionOptionsData, GetQuestionOptionsVariables>;

interface GetQuestionOptionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuestionOptionsVariables): QueryRef<GetQuestionOptionsData, GetQuestionOptionsVariables>;
}
export const getQuestionOptionsRef: GetQuestionOptionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getQuestionOptions(dc: DataConnect, vars: GetQuestionOptionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuestionOptionsData, GetQuestionOptionsVariables>;

interface GetQuestionOptionsRef {
  ...
  (dc: DataConnect, vars: GetQuestionOptionsVariables): QueryRef<GetQuestionOptionsData, GetQuestionOptionsVariables>;
}
export const getQuestionOptionsRef: GetQuestionOptionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getQuestionOptionsRef:
```typescript
const name = getQuestionOptionsRef.operationName;
console.log(name);
```

### Variables
The `GetQuestionOptions` query requires an argument of type `GetQuestionOptionsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetQuestionOptionsVariables {
  questionId: UUIDString;
}
```
### Return Type
Recall that executing the `GetQuestionOptions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetQuestionOptionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetQuestionOptionsData {
  quizOptions: ({
    id: UUIDString;
    text: string;
    order: number;
    isCorrect: boolean;
  } & QuizOption_Key)[];
}
```
### Using `GetQuestionOptions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQuestionOptions, GetQuestionOptionsVariables } from '@dataconnect/functions-generated';

// The `GetQuestionOptions` query requires an argument of type `GetQuestionOptionsVariables`:
const getQuestionOptionsVars: GetQuestionOptionsVariables = {
  questionId: ..., 
};

// Call the `getQuestionOptions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQuestionOptions(getQuestionOptionsVars);
// Variables can be defined inline as well.
const { data } = await getQuestionOptions({ questionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getQuestionOptions(dataConnect, getQuestionOptionsVars);

console.log(data.quizOptions);

// Or, you can use the `Promise` API.
getQuestionOptions(getQuestionOptionsVars).then((response) => {
  const data = response.data;
  console.log(data.quizOptions);
});
```

### Using `GetQuestionOptions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getQuestionOptionsRef, GetQuestionOptionsVariables } from '@dataconnect/functions-generated';

// The `GetQuestionOptions` query requires an argument of type `GetQuestionOptionsVariables`:
const getQuestionOptionsVars: GetQuestionOptionsVariables = {
  questionId: ..., 
};

// Call the `getQuestionOptionsRef()` function to get a reference to the query.
const ref = getQuestionOptionsRef(getQuestionOptionsVars);
// Variables can be defined inline as well.
const ref = getQuestionOptionsRef({ questionId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getQuestionOptionsRef(dataConnect, getQuestionOptionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quizOptions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quizOptions);
});
```

## GetOptionWithQuestion
You can execute the `GetOptionWithQuestion` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getOptionWithQuestion(vars: GetOptionWithQuestionVariables, options?: ExecuteQueryOptions): QueryPromise<GetOptionWithQuestionData, GetOptionWithQuestionVariables>;

interface GetOptionWithQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOptionWithQuestionVariables): QueryRef<GetOptionWithQuestionData, GetOptionWithQuestionVariables>;
}
export const getOptionWithQuestionRef: GetOptionWithQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOptionWithQuestion(dc: DataConnect, vars: GetOptionWithQuestionVariables, options?: ExecuteQueryOptions): QueryPromise<GetOptionWithQuestionData, GetOptionWithQuestionVariables>;

interface GetOptionWithQuestionRef {
  ...
  (dc: DataConnect, vars: GetOptionWithQuestionVariables): QueryRef<GetOptionWithQuestionData, GetOptionWithQuestionVariables>;
}
export const getOptionWithQuestionRef: GetOptionWithQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOptionWithQuestionRef:
```typescript
const name = getOptionWithQuestionRef.operationName;
console.log(name);
```

### Variables
The `GetOptionWithQuestion` query requires an argument of type `GetOptionWithQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOptionWithQuestionVariables {
  optionId: UUIDString;
}
```
### Return Type
Recall that executing the `GetOptionWithQuestion` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOptionWithQuestionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOptionWithQuestionData {
  quizOption?: {
    id: UUIDString;
    question: {
      id: UUIDString;
      quiz: {
        id: UUIDString;
      } & CourseQuiz_Key;
    } & QuizQuestion_Key;
  } & QuizOption_Key;
}
```
### Using `GetOptionWithQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOptionWithQuestion, GetOptionWithQuestionVariables } from '@dataconnect/functions-generated';

// The `GetOptionWithQuestion` query requires an argument of type `GetOptionWithQuestionVariables`:
const getOptionWithQuestionVars: GetOptionWithQuestionVariables = {
  optionId: ..., 
};

// Call the `getOptionWithQuestion()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOptionWithQuestion(getOptionWithQuestionVars);
// Variables can be defined inline as well.
const { data } = await getOptionWithQuestion({ optionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOptionWithQuestion(dataConnect, getOptionWithQuestionVars);

console.log(data.quizOption);

// Or, you can use the `Promise` API.
getOptionWithQuestion(getOptionWithQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.quizOption);
});
```

### Using `GetOptionWithQuestion`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOptionWithQuestionRef, GetOptionWithQuestionVariables } from '@dataconnect/functions-generated';

// The `GetOptionWithQuestion` query requires an argument of type `GetOptionWithQuestionVariables`:
const getOptionWithQuestionVars: GetOptionWithQuestionVariables = {
  optionId: ..., 
};

// Call the `getOptionWithQuestionRef()` function to get a reference to the query.
const ref = getOptionWithQuestionRef(getOptionWithQuestionVars);
// Variables can be defined inline as well.
const ref = getOptionWithQuestionRef({ optionId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOptionWithQuestionRef(dataConnect, getOptionWithQuestionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quizOption);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quizOption);
});
```

## GetActiveQuizSession
You can execute the `GetActiveQuizSession` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getActiveQuizSession(vars: GetActiveQuizSessionVariables, options?: ExecuteQueryOptions): QueryPromise<GetActiveQuizSessionData, GetActiveQuizSessionVariables>;

interface GetActiveQuizSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetActiveQuizSessionVariables): QueryRef<GetActiveQuizSessionData, GetActiveQuizSessionVariables>;
}
export const getActiveQuizSessionRef: GetActiveQuizSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getActiveQuizSession(dc: DataConnect, vars: GetActiveQuizSessionVariables, options?: ExecuteQueryOptions): QueryPromise<GetActiveQuizSessionData, GetActiveQuizSessionVariables>;

interface GetActiveQuizSessionRef {
  ...
  (dc: DataConnect, vars: GetActiveQuizSessionVariables): QueryRef<GetActiveQuizSessionData, GetActiveQuizSessionVariables>;
}
export const getActiveQuizSessionRef: GetActiveQuizSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getActiveQuizSessionRef:
```typescript
const name = getActiveQuizSessionRef.operationName;
console.log(name);
```

### Variables
The `GetActiveQuizSession` query requires an argument of type `GetActiveQuizSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetActiveQuizSessionVariables {
  attemptId: UUIDString;
}
```
### Return Type
Recall that executing the `GetActiveQuizSession` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetActiveQuizSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetActiveQuizSessionData {
  quizAttempt?: {
    id: UUIDString;
    startedAt: TimestampString;
    completedAt?: TimestampString | null;
    user: {
      id: string;
    } & User_Key;
    quiz: {
      timeLimitMinutes?: number | null;
      passingScore: number;
    };
  } & QuizAttempt_Key;
}
```
### Using `GetActiveQuizSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getActiveQuizSession, GetActiveQuizSessionVariables } from '@dataconnect/functions-generated';

// The `GetActiveQuizSession` query requires an argument of type `GetActiveQuizSessionVariables`:
const getActiveQuizSessionVars: GetActiveQuizSessionVariables = {
  attemptId: ..., 
};

// Call the `getActiveQuizSession()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getActiveQuizSession(getActiveQuizSessionVars);
// Variables can be defined inline as well.
const { data } = await getActiveQuizSession({ attemptId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getActiveQuizSession(dataConnect, getActiveQuizSessionVars);

console.log(data.quizAttempt);

// Or, you can use the `Promise` API.
getActiveQuizSession(getActiveQuizSessionVars).then((response) => {
  const data = response.data;
  console.log(data.quizAttempt);
});
```

### Using `GetActiveQuizSession`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getActiveQuizSessionRef, GetActiveQuizSessionVariables } from '@dataconnect/functions-generated';

// The `GetActiveQuizSession` query requires an argument of type `GetActiveQuizSessionVariables`:
const getActiveQuizSessionVars: GetActiveQuizSessionVariables = {
  attemptId: ..., 
};

// Call the `getActiveQuizSessionRef()` function to get a reference to the query.
const ref = getActiveQuizSessionRef(getActiveQuizSessionVars);
// Variables can be defined inline as well.
const ref = getActiveQuizSessionRef({ attemptId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getActiveQuizSessionRef(dataConnect, getActiveQuizSessionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quizAttempt);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quizAttempt);
});
```

## AdminGetQuiz
You can execute the `AdminGetQuiz` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminGetQuiz(vars: AdminGetQuizVariables, options?: ExecuteQueryOptions): QueryPromise<AdminGetQuizData, AdminGetQuizVariables>;

interface AdminGetQuizRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminGetQuizVariables): QueryRef<AdminGetQuizData, AdminGetQuizVariables>;
}
export const adminGetQuizRef: AdminGetQuizRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminGetQuiz(dc: DataConnect, vars: AdminGetQuizVariables, options?: ExecuteQueryOptions): QueryPromise<AdminGetQuizData, AdminGetQuizVariables>;

interface AdminGetQuizRef {
  ...
  (dc: DataConnect, vars: AdminGetQuizVariables): QueryRef<AdminGetQuizData, AdminGetQuizVariables>;
}
export const adminGetQuizRef: AdminGetQuizRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminGetQuizRef:
```typescript
const name = adminGetQuizRef.operationName;
console.log(name);
```

### Variables
The `AdminGetQuiz` query requires an argument of type `AdminGetQuizVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminGetQuizVariables {
  quizId: UUIDString;
}
```
### Return Type
Recall that executing the `AdminGetQuiz` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminGetQuizData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminGetQuizData {
  courseQuiz?: {
    id: UUIDString;
    passingScore: number;
    maxAttempts: number;
    timeLimitMinutes?: number | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    lecture: {
      id: UUIDString;
      title: string;
      section: {
        course: {
          id: UUIDString;
        } & Course_Key;
      };
    } & CourseLecture_Key;
    adminQuestions: ({
      id: UUIDString;
      questionText: string;
      order: number;
      points: number;
      explanation?: string | null;
      adminOptions: ({
        id: UUIDString;
        text: string;
        order: number;
        isCorrect: boolean;
      } & QuizOption_Key)[];
    } & QuizQuestion_Key)[];
  } & CourseQuiz_Key;
}
```
### Using `AdminGetQuiz`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminGetQuiz, AdminGetQuizVariables } from '@dataconnect/functions-generated';

// The `AdminGetQuiz` query requires an argument of type `AdminGetQuizVariables`:
const adminGetQuizVars: AdminGetQuizVariables = {
  quizId: ..., 
};

// Call the `adminGetQuiz()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminGetQuiz(adminGetQuizVars);
// Variables can be defined inline as well.
const { data } = await adminGetQuiz({ quizId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminGetQuiz(dataConnect, adminGetQuizVars);

console.log(data.courseQuiz);

// Or, you can use the `Promise` API.
adminGetQuiz(adminGetQuizVars).then((response) => {
  const data = response.data;
  console.log(data.courseQuiz);
});
```

### Using `AdminGetQuiz`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminGetQuizRef, AdminGetQuizVariables } from '@dataconnect/functions-generated';

// The `AdminGetQuiz` query requires an argument of type `AdminGetQuizVariables`:
const adminGetQuizVars: AdminGetQuizVariables = {
  quizId: ..., 
};

// Call the `adminGetQuizRef()` function to get a reference to the query.
const ref = adminGetQuizRef(adminGetQuizVars);
// Variables can be defined inline as well.
const ref = adminGetQuizRef({ quizId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminGetQuizRef(dataConnect, adminGetQuizVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseQuiz);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseQuiz);
});
```

## GetMyCourseAccess
You can execute the `GetMyCourseAccess` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyCourseAccess(vars: GetMyCourseAccessVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyCourseAccessData, GetMyCourseAccessVariables>;

interface GetMyCourseAccessRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyCourseAccessVariables): QueryRef<GetMyCourseAccessData, GetMyCourseAccessVariables>;
}
export const getMyCourseAccessRef: GetMyCourseAccessRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyCourseAccess(dc: DataConnect, vars: GetMyCourseAccessVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyCourseAccessData, GetMyCourseAccessVariables>;

interface GetMyCourseAccessRef {
  ...
  (dc: DataConnect, vars: GetMyCourseAccessVariables): QueryRef<GetMyCourseAccessData, GetMyCourseAccessVariables>;
}
export const getMyCourseAccessRef: GetMyCourseAccessRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyCourseAccessRef:
```typescript
const name = getMyCourseAccessRef.operationName;
console.log(name);
```

### Variables
The `GetMyCourseAccess` query requires an argument of type `GetMyCourseAccessVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMyCourseAccessVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `GetMyCourseAccess` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyCourseAccessData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyCourseAccessData {
  course?: {
    id: UUIDString;
    author: {
      id: string;
    } & User_Key;
    createdBy: {
      id: string;
    } & User_Key;
    myInstructorLink: ({
      user: {
        id: string;
      } & User_Key;
    })[];
  } & Course_Key;
}
```
### Using `GetMyCourseAccess`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyCourseAccess, GetMyCourseAccessVariables } from '@dataconnect/functions-generated';

// The `GetMyCourseAccess` query requires an argument of type `GetMyCourseAccessVariables`:
const getMyCourseAccessVars: GetMyCourseAccessVariables = {
  courseId: ..., 
};

// Call the `getMyCourseAccess()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyCourseAccess(getMyCourseAccessVars);
// Variables can be defined inline as well.
const { data } = await getMyCourseAccess({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyCourseAccess(dataConnect, getMyCourseAccessVars);

console.log(data.course);

// Or, you can use the `Promise` API.
getMyCourseAccess(getMyCourseAccessVars).then((response) => {
  const data = response.data;
  console.log(data.course);
});
```

### Using `GetMyCourseAccess`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyCourseAccessRef, GetMyCourseAccessVariables } from '@dataconnect/functions-generated';

// The `GetMyCourseAccess` query requires an argument of type `GetMyCourseAccessVariables`:
const getMyCourseAccessVars: GetMyCourseAccessVariables = {
  courseId: ..., 
};

// Call the `getMyCourseAccessRef()` function to get a reference to the query.
const ref = getMyCourseAccessRef(getMyCourseAccessVars);
// Variables can be defined inline as well.
const ref = getMyCourseAccessRef({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyCourseAccessRef(dataConnect, getMyCourseAccessVars);

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

## GetMyMissionAccess
You can execute the `GetMyMissionAccess` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyMissionAccess(vars: GetMyMissionAccessVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyMissionAccessData, GetMyMissionAccessVariables>;

interface GetMyMissionAccessRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyMissionAccessVariables): QueryRef<GetMyMissionAccessData, GetMyMissionAccessVariables>;
}
export const getMyMissionAccessRef: GetMyMissionAccessRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyMissionAccess(dc: DataConnect, vars: GetMyMissionAccessVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyMissionAccessData, GetMyMissionAccessVariables>;

interface GetMyMissionAccessRef {
  ...
  (dc: DataConnect, vars: GetMyMissionAccessVariables): QueryRef<GetMyMissionAccessData, GetMyMissionAccessVariables>;
}
export const getMyMissionAccessRef: GetMyMissionAccessRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyMissionAccessRef:
```typescript
const name = getMyMissionAccessRef.operationName;
console.log(name);
```

### Variables
The `GetMyMissionAccess` query requires an argument of type `GetMyMissionAccessVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMyMissionAccessVariables {
  missionId: UUIDString;
}
```
### Return Type
Recall that executing the `GetMyMissionAccess` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyMissionAccessData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyMissionAccessData {
  mission?: {
    id: UUIDString;
    author: {
      id: string;
    } & User_Key;
    createdBy: {
      id: string;
    } & User_Key;
    course?: {
      id: UUIDString;
      author: {
        id: string;
      } & User_Key;
      createdBy: {
        id: string;
      } & User_Key;
      myMissionCourseInstructorLink: ({
        user: {
          id: string;
        } & User_Key;
      })[];
    } & Course_Key;
  } & Mission_Key;
}
```
### Using `GetMyMissionAccess`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyMissionAccess, GetMyMissionAccessVariables } from '@dataconnect/functions-generated';

// The `GetMyMissionAccess` query requires an argument of type `GetMyMissionAccessVariables`:
const getMyMissionAccessVars: GetMyMissionAccessVariables = {
  missionId: ..., 
};

// Call the `getMyMissionAccess()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyMissionAccess(getMyMissionAccessVars);
// Variables can be defined inline as well.
const { data } = await getMyMissionAccess({ missionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyMissionAccess(dataConnect, getMyMissionAccessVars);

console.log(data.mission);

// Or, you can use the `Promise` API.
getMyMissionAccess(getMyMissionAccessVars).then((response) => {
  const data = response.data;
  console.log(data.mission);
});
```

### Using `GetMyMissionAccess`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyMissionAccessRef, GetMyMissionAccessVariables } from '@dataconnect/functions-generated';

// The `GetMyMissionAccess` query requires an argument of type `GetMyMissionAccessVariables`:
const getMyMissionAccessVars: GetMyMissionAccessVariables = {
  missionId: ..., 
};

// Call the `getMyMissionAccessRef()` function to get a reference to the query.
const ref = getMyMissionAccessRef(getMyMissionAccessVars);
// Variables can be defined inline as well.
const ref = getMyMissionAccessRef({ missionId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyMissionAccessRef(dataConnect, getMyMissionAccessVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.mission);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.mission);
});
```

## GetQuestionCourse
You can execute the `GetQuestionCourse` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getQuestionCourse(vars: GetQuestionCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuestionCourseData, GetQuestionCourseVariables>;

interface GetQuestionCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuestionCourseVariables): QueryRef<GetQuestionCourseData, GetQuestionCourseVariables>;
}
export const getQuestionCourseRef: GetQuestionCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getQuestionCourse(dc: DataConnect, vars: GetQuestionCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuestionCourseData, GetQuestionCourseVariables>;

interface GetQuestionCourseRef {
  ...
  (dc: DataConnect, vars: GetQuestionCourseVariables): QueryRef<GetQuestionCourseData, GetQuestionCourseVariables>;
}
export const getQuestionCourseRef: GetQuestionCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getQuestionCourseRef:
```typescript
const name = getQuestionCourseRef.operationName;
console.log(name);
```

### Variables
The `GetQuestionCourse` query requires an argument of type `GetQuestionCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetQuestionCourseVariables {
  questionId: UUIDString;
}
```
### Return Type
Recall that executing the `GetQuestionCourse` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetQuestionCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetQuestionCourseData {
  quizQuestion?: {
    quiz: {
      lecture: {
        section: {
          course: {
            id: UUIDString;
            author: {
              id: string;
            } & User_Key;
            createdBy: {
              id: string;
            } & User_Key;
          } & Course_Key;
        };
      };
    };
  };
}
```
### Using `GetQuestionCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getQuestionCourse, GetQuestionCourseVariables } from '@dataconnect/functions-generated';

// The `GetQuestionCourse` query requires an argument of type `GetQuestionCourseVariables`:
const getQuestionCourseVars: GetQuestionCourseVariables = {
  questionId: ..., 
};

// Call the `getQuestionCourse()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getQuestionCourse(getQuestionCourseVars);
// Variables can be defined inline as well.
const { data } = await getQuestionCourse({ questionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getQuestionCourse(dataConnect, getQuestionCourseVars);

console.log(data.quizQuestion);

// Or, you can use the `Promise` API.
getQuestionCourse(getQuestionCourseVars).then((response) => {
  const data = response.data;
  console.log(data.quizQuestion);
});
```

### Using `GetQuestionCourse`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getQuestionCourseRef, GetQuestionCourseVariables } from '@dataconnect/functions-generated';

// The `GetQuestionCourse` query requires an argument of type `GetQuestionCourseVariables`:
const getQuestionCourseVars: GetQuestionCourseVariables = {
  questionId: ..., 
};

// Call the `getQuestionCourseRef()` function to get a reference to the query.
const ref = getQuestionCourseRef(getQuestionCourseVars);
// Variables can be defined inline as well.
const ref = getQuestionCourseRef({ questionId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getQuestionCourseRef(dataConnect, getQuestionCourseVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quizQuestion);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quizQuestion);
});
```

## GetOptionCourse
You can execute the `GetOptionCourse` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getOptionCourse(vars: GetOptionCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetOptionCourseData, GetOptionCourseVariables>;

interface GetOptionCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOptionCourseVariables): QueryRef<GetOptionCourseData, GetOptionCourseVariables>;
}
export const getOptionCourseRef: GetOptionCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOptionCourse(dc: DataConnect, vars: GetOptionCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetOptionCourseData, GetOptionCourseVariables>;

interface GetOptionCourseRef {
  ...
  (dc: DataConnect, vars: GetOptionCourseVariables): QueryRef<GetOptionCourseData, GetOptionCourseVariables>;
}
export const getOptionCourseRef: GetOptionCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOptionCourseRef:
```typescript
const name = getOptionCourseRef.operationName;
console.log(name);
```

### Variables
The `GetOptionCourse` query requires an argument of type `GetOptionCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOptionCourseVariables {
  optionId: UUIDString;
}
```
### Return Type
Recall that executing the `GetOptionCourse` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOptionCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOptionCourseData {
  quizOption?: {
    question: {
      quiz: {
        lecture: {
          section: {
            course: {
              id: UUIDString;
              author: {
                id: string;
              } & User_Key;
              createdBy: {
                id: string;
              } & User_Key;
            } & Course_Key;
          };
        };
      };
    };
  };
}
```
### Using `GetOptionCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOptionCourse, GetOptionCourseVariables } from '@dataconnect/functions-generated';

// The `GetOptionCourse` query requires an argument of type `GetOptionCourseVariables`:
const getOptionCourseVars: GetOptionCourseVariables = {
  optionId: ..., 
};

// Call the `getOptionCourse()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOptionCourse(getOptionCourseVars);
// Variables can be defined inline as well.
const { data } = await getOptionCourse({ optionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOptionCourse(dataConnect, getOptionCourseVars);

console.log(data.quizOption);

// Or, you can use the `Promise` API.
getOptionCourse(getOptionCourseVars).then((response) => {
  const data = response.data;
  console.log(data.quizOption);
});
```

### Using `GetOptionCourse`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOptionCourseRef, GetOptionCourseVariables } from '@dataconnect/functions-generated';

// The `GetOptionCourse` query requires an argument of type `GetOptionCourseVariables`:
const getOptionCourseVars: GetOptionCourseVariables = {
  optionId: ..., 
};

// Call the `getOptionCourseRef()` function to get a reference to the query.
const ref = getOptionCourseRef(getOptionCourseVars);
// Variables can be defined inline as well.
const ref = getOptionCourseRef({ optionId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOptionCourseRef(dataConnect, getOptionCourseVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.quizOption);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.quizOption);
});
```

## GetSectionCourse
You can execute the `GetSectionCourse` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getSectionCourse(vars: GetSectionCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetSectionCourseData, GetSectionCourseVariables>;

interface GetSectionCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSectionCourseVariables): QueryRef<GetSectionCourseData, GetSectionCourseVariables>;
}
export const getSectionCourseRef: GetSectionCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSectionCourse(dc: DataConnect, vars: GetSectionCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetSectionCourseData, GetSectionCourseVariables>;

interface GetSectionCourseRef {
  ...
  (dc: DataConnect, vars: GetSectionCourseVariables): QueryRef<GetSectionCourseData, GetSectionCourseVariables>;
}
export const getSectionCourseRef: GetSectionCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSectionCourseRef:
```typescript
const name = getSectionCourseRef.operationName;
console.log(name);
```

### Variables
The `GetSectionCourse` query requires an argument of type `GetSectionCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSectionCourseVariables {
  sectionId: UUIDString;
}
```
### Return Type
Recall that executing the `GetSectionCourse` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSectionCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetSectionCourseData {
  courseSection?: {
    course: {
      id: UUIDString;
      author: {
        id: string;
      } & User_Key;
      createdBy: {
        id: string;
      } & User_Key;
    } & Course_Key;
  };
}
```
### Using `GetSectionCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSectionCourse, GetSectionCourseVariables } from '@dataconnect/functions-generated';

// The `GetSectionCourse` query requires an argument of type `GetSectionCourseVariables`:
const getSectionCourseVars: GetSectionCourseVariables = {
  sectionId: ..., 
};

// Call the `getSectionCourse()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSectionCourse(getSectionCourseVars);
// Variables can be defined inline as well.
const { data } = await getSectionCourse({ sectionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSectionCourse(dataConnect, getSectionCourseVars);

console.log(data.courseSection);

// Or, you can use the `Promise` API.
getSectionCourse(getSectionCourseVars).then((response) => {
  const data = response.data;
  console.log(data.courseSection);
});
```

### Using `GetSectionCourse`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSectionCourseRef, GetSectionCourseVariables } from '@dataconnect/functions-generated';

// The `GetSectionCourse` query requires an argument of type `GetSectionCourseVariables`:
const getSectionCourseVars: GetSectionCourseVariables = {
  sectionId: ..., 
};

// Call the `getSectionCourseRef()` function to get a reference to the query.
const ref = getSectionCourseRef(getSectionCourseVars);
// Variables can be defined inline as well.
const ref = getSectionCourseRef({ sectionId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSectionCourseRef(dataConnect, getSectionCourseVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courseSection);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courseSection);
});
```

## GetMicroLessonMission
You can execute the `GetMicroLessonMission` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMicroLessonMission(vars: GetMicroLessonMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetMicroLessonMissionData, GetMicroLessonMissionVariables>;

interface GetMicroLessonMissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMicroLessonMissionVariables): QueryRef<GetMicroLessonMissionData, GetMicroLessonMissionVariables>;
}
export const getMicroLessonMissionRef: GetMicroLessonMissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMicroLessonMission(dc: DataConnect, vars: GetMicroLessonMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetMicroLessonMissionData, GetMicroLessonMissionVariables>;

interface GetMicroLessonMissionRef {
  ...
  (dc: DataConnect, vars: GetMicroLessonMissionVariables): QueryRef<GetMicroLessonMissionData, GetMicroLessonMissionVariables>;
}
export const getMicroLessonMissionRef: GetMicroLessonMissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMicroLessonMissionRef:
```typescript
const name = getMicroLessonMissionRef.operationName;
console.log(name);
```

### Variables
The `GetMicroLessonMission` query requires an argument of type `GetMicroLessonMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMicroLessonMissionVariables {
  microLessonId: UUIDString;
}
```
### Return Type
Recall that executing the `GetMicroLessonMission` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMicroLessonMissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMicroLessonMissionData {
  missionMicroLesson?: {
    mission: {
      id: UUIDString;
      author: {
        id: string;
      } & User_Key;
      createdBy: {
        id: string;
      } & User_Key;
      course?: {
        id: UUIDString;
        author: {
          id: string;
        } & User_Key;
        createdBy: {
          id: string;
        } & User_Key;
      } & Course_Key;
    } & Mission_Key;
  };
}
```
### Using `GetMicroLessonMission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMicroLessonMission, GetMicroLessonMissionVariables } from '@dataconnect/functions-generated';

// The `GetMicroLessonMission` query requires an argument of type `GetMicroLessonMissionVariables`:
const getMicroLessonMissionVars: GetMicroLessonMissionVariables = {
  microLessonId: ..., 
};

// Call the `getMicroLessonMission()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMicroLessonMission(getMicroLessonMissionVars);
// Variables can be defined inline as well.
const { data } = await getMicroLessonMission({ microLessonId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMicroLessonMission(dataConnect, getMicroLessonMissionVars);

console.log(data.missionMicroLesson);

// Or, you can use the `Promise` API.
getMicroLessonMission(getMicroLessonMissionVars).then((response) => {
  const data = response.data;
  console.log(data.missionMicroLesson);
});
```

### Using `GetMicroLessonMission`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMicroLessonMissionRef, GetMicroLessonMissionVariables } from '@dataconnect/functions-generated';

// The `GetMicroLessonMission` query requires an argument of type `GetMicroLessonMissionVariables`:
const getMicroLessonMissionVars: GetMicroLessonMissionVariables = {
  microLessonId: ..., 
};

// Call the `getMicroLessonMissionRef()` function to get a reference to the query.
const ref = getMicroLessonMissionRef(getMicroLessonMissionVars);
// Variables can be defined inline as well.
const ref = getMicroLessonMissionRef({ microLessonId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMicroLessonMissionRef(dataConnect, getMicroLessonMissionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.missionMicroLesson);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.missionMicroLesson);
});
```

## GetCriterionMission
You can execute the `GetCriterionMission` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCriterionMission(vars: GetCriterionMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetCriterionMissionData, GetCriterionMissionVariables>;

interface GetCriterionMissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCriterionMissionVariables): QueryRef<GetCriterionMissionData, GetCriterionMissionVariables>;
}
export const getCriterionMissionRef: GetCriterionMissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCriterionMission(dc: DataConnect, vars: GetCriterionMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetCriterionMissionData, GetCriterionMissionVariables>;

interface GetCriterionMissionRef {
  ...
  (dc: DataConnect, vars: GetCriterionMissionVariables): QueryRef<GetCriterionMissionData, GetCriterionMissionVariables>;
}
export const getCriterionMissionRef: GetCriterionMissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCriterionMissionRef:
```typescript
const name = getCriterionMissionRef.operationName;
console.log(name);
```

### Variables
The `GetCriterionMission` query requires an argument of type `GetCriterionMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCriterionMissionVariables {
  criterionId: UUIDString;
}
```
### Return Type
Recall that executing the `GetCriterionMission` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCriterionMissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCriterionMissionData {
  rubricCriterion?: {
    mission: {
      id: UUIDString;
      author: {
        id: string;
      } & User_Key;
      createdBy: {
        id: string;
      } & User_Key;
      course?: {
        id: UUIDString;
        author: {
          id: string;
        } & User_Key;
        createdBy: {
          id: string;
        } & User_Key;
      } & Course_Key;
    } & Mission_Key;
  };
}
```
### Using `GetCriterionMission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCriterionMission, GetCriterionMissionVariables } from '@dataconnect/functions-generated';

// The `GetCriterionMission` query requires an argument of type `GetCriterionMissionVariables`:
const getCriterionMissionVars: GetCriterionMissionVariables = {
  criterionId: ..., 
};

// Call the `getCriterionMission()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCriterionMission(getCriterionMissionVars);
// Variables can be defined inline as well.
const { data } = await getCriterionMission({ criterionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCriterionMission(dataConnect, getCriterionMissionVars);

console.log(data.rubricCriterion);

// Or, you can use the `Promise` API.
getCriterionMission(getCriterionMissionVars).then((response) => {
  const data = response.data;
  console.log(data.rubricCriterion);
});
```

### Using `GetCriterionMission`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCriterionMissionRef, GetCriterionMissionVariables } from '@dataconnect/functions-generated';

// The `GetCriterionMission` query requires an argument of type `GetCriterionMissionVariables`:
const getCriterionMissionVars: GetCriterionMissionVariables = {
  criterionId: ..., 
};

// Call the `getCriterionMissionRef()` function to get a reference to the query.
const ref = getCriterionMissionRef(getCriterionMissionVars);
// Variables can be defined inline as well.
const ref = getCriterionMissionRef({ criterionId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCriterionMissionRef(dataConnect, getCriterionMissionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.rubricCriterion);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.rubricCriterion);
});
```

## GetTemplateMission
You can execute the `GetTemplateMission` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTemplateMission(vars: GetTemplateMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetTemplateMissionData, GetTemplateMissionVariables>;

interface GetTemplateMissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTemplateMissionVariables): QueryRef<GetTemplateMissionData, GetTemplateMissionVariables>;
}
export const getTemplateMissionRef: GetTemplateMissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTemplateMission(dc: DataConnect, vars: GetTemplateMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetTemplateMissionData, GetTemplateMissionVariables>;

interface GetTemplateMissionRef {
  ...
  (dc: DataConnect, vars: GetTemplateMissionVariables): QueryRef<GetTemplateMissionData, GetTemplateMissionVariables>;
}
export const getTemplateMissionRef: GetTemplateMissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTemplateMissionRef:
```typescript
const name = getTemplateMissionRef.operationName;
console.log(name);
```

### Variables
The `GetTemplateMission` query requires an argument of type `GetTemplateMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTemplateMissionVariables {
  templateId: UUIDString;
}
```
### Return Type
Recall that executing the `GetTemplateMission` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTemplateMissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTemplateMissionData {
  missionTemplate?: {
    mission: {
      id: UUIDString;
      author: {
        id: string;
      } & User_Key;
      createdBy: {
        id: string;
      } & User_Key;
      course?: {
        id: UUIDString;
        author: {
          id: string;
        } & User_Key;
        createdBy: {
          id: string;
        } & User_Key;
      } & Course_Key;
    } & Mission_Key;
  };
}
```
### Using `GetTemplateMission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTemplateMission, GetTemplateMissionVariables } from '@dataconnect/functions-generated';

// The `GetTemplateMission` query requires an argument of type `GetTemplateMissionVariables`:
const getTemplateMissionVars: GetTemplateMissionVariables = {
  templateId: ..., 
};

// Call the `getTemplateMission()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTemplateMission(getTemplateMissionVars);
// Variables can be defined inline as well.
const { data } = await getTemplateMission({ templateId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTemplateMission(dataConnect, getTemplateMissionVars);

console.log(data.missionTemplate);

// Or, you can use the `Promise` API.
getTemplateMission(getTemplateMissionVars).then((response) => {
  const data = response.data;
  console.log(data.missionTemplate);
});
```

### Using `GetTemplateMission`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTemplateMissionRef, GetTemplateMissionVariables } from '@dataconnect/functions-generated';

// The `GetTemplateMission` query requires an argument of type `GetTemplateMissionVariables`:
const getTemplateMissionVars: GetTemplateMissionVariables = {
  templateId: ..., 
};

// Call the `getTemplateMissionRef()` function to get a reference to the query.
const ref = getTemplateMissionRef(getTemplateMissionVars);
// Variables can be defined inline as well.
const ref = getTemplateMissionRef({ templateId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTemplateMissionRef(dataConnect, getTemplateMissionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.missionTemplate);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.missionTemplate);
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
    capacity?: number | null;
    locationOrUrl: string;
    hostUser?: {
      name: string;
      avatar?: string | null;
    };
  } & Session_Key)[];
}
```
### Using `GetCourseSessions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourseSessions, GetCourseSessionsVariables } from '@dataconnect/functions-generated';

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
import { connectorConfig, getCourseSessionsRef, GetCourseSessionsVariables } from '@dataconnect/functions-generated';

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
    lastLogin?: TimestampString | null;
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
import { connectorConfig, getMe } from '@dataconnect/functions-generated';


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
import { connectorConfig, getMeRef } from '@dataconnect/functions-generated';


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

## AdminCreateCourse
You can execute the `AdminCreateCourse` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminCreateCourse(vars: AdminCreateCourseVariables): MutationPromise<AdminCreateCourseData, AdminCreateCourseVariables>;

interface AdminCreateCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateCourseVariables): MutationRef<AdminCreateCourseData, AdminCreateCourseVariables>;
}
export const adminCreateCourseRef: AdminCreateCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminCreateCourse(dc: DataConnect, vars: AdminCreateCourseVariables): MutationPromise<AdminCreateCourseData, AdminCreateCourseVariables>;

interface AdminCreateCourseRef {
  ...
  (dc: DataConnect, vars: AdminCreateCourseVariables): MutationRef<AdminCreateCourseData, AdminCreateCourseVariables>;
}
export const adminCreateCourseRef: AdminCreateCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminCreateCourseRef:
```typescript
const name = adminCreateCourseRef.operationName;
console.log(name);
```

### Variables
The `AdminCreateCourse` mutation requires an argument of type `AdminCreateCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminCreateCourseVariables {
  title: string;
  description?: string | null;
  price: number;
  language: string;
  level: CourseLevel;
  categoryId: UUIDString;
  tags: string[];
}
```
### Return Type
Recall that executing the `AdminCreateCourse` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminCreateCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminCreateCourseData {
  course_insert: Course_Key;
}
```
### Using `AdminCreateCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminCreateCourse, AdminCreateCourseVariables } from '@dataconnect/functions-generated';

// The `AdminCreateCourse` mutation requires an argument of type `AdminCreateCourseVariables`:
const adminCreateCourseVars: AdminCreateCourseVariables = {
  title: ..., 
  description: ..., // optional
  price: ..., 
  language: ..., 
  level: ..., 
  categoryId: ..., 
  tags: ..., 
};

// Call the `adminCreateCourse()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminCreateCourse(adminCreateCourseVars);
// Variables can be defined inline as well.
const { data } = await adminCreateCourse({ title: ..., description: ..., price: ..., language: ..., level: ..., categoryId: ..., tags: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminCreateCourse(dataConnect, adminCreateCourseVars);

console.log(data.course_insert);

// Or, you can use the `Promise` API.
adminCreateCourse(adminCreateCourseVars).then((response) => {
  const data = response.data;
  console.log(data.course_insert);
});
```

### Using `AdminCreateCourse`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminCreateCourseRef, AdminCreateCourseVariables } from '@dataconnect/functions-generated';

// The `AdminCreateCourse` mutation requires an argument of type `AdminCreateCourseVariables`:
const adminCreateCourseVars: AdminCreateCourseVariables = {
  title: ..., 
  description: ..., // optional
  price: ..., 
  language: ..., 
  level: ..., 
  categoryId: ..., 
  tags: ..., 
};

// Call the `adminCreateCourseRef()` function to get a reference to the mutation.
const ref = adminCreateCourseRef(adminCreateCourseVars);
// Variables can be defined inline as well.
const ref = adminCreateCourseRef({ title: ..., description: ..., price: ..., language: ..., level: ..., categoryId: ..., tags: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminCreateCourseRef(dataConnect, adminCreateCourseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.course_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.course_insert);
});
```

## AdminDeleteCourse
You can execute the `AdminDeleteCourse` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminDeleteCourse(vars: AdminDeleteCourseVariables): MutationPromise<AdminDeleteCourseData, AdminDeleteCourseVariables>;

interface AdminDeleteCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteCourseVariables): MutationRef<AdminDeleteCourseData, AdminDeleteCourseVariables>;
}
export const adminDeleteCourseRef: AdminDeleteCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminDeleteCourse(dc: DataConnect, vars: AdminDeleteCourseVariables): MutationPromise<AdminDeleteCourseData, AdminDeleteCourseVariables>;

interface AdminDeleteCourseRef {
  ...
  (dc: DataConnect, vars: AdminDeleteCourseVariables): MutationRef<AdminDeleteCourseData, AdminDeleteCourseVariables>;
}
export const adminDeleteCourseRef: AdminDeleteCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDeleteCourseRef:
```typescript
const name = adminDeleteCourseRef.operationName;
console.log(name);
```

### Variables
The `AdminDeleteCourse` mutation requires an argument of type `AdminDeleteCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminDeleteCourseVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `AdminDeleteCourse` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDeleteCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDeleteCourseData {
  course_update?: Course_Key | null;
}
```
### Using `AdminDeleteCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDeleteCourse, AdminDeleteCourseVariables } from '@dataconnect/functions-generated';

// The `AdminDeleteCourse` mutation requires an argument of type `AdminDeleteCourseVariables`:
const adminDeleteCourseVars: AdminDeleteCourseVariables = {
  courseId: ..., 
};

// Call the `adminDeleteCourse()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeleteCourse(adminDeleteCourseVars);
// Variables can be defined inline as well.
const { data } = await adminDeleteCourse({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDeleteCourse(dataConnect, adminDeleteCourseVars);

console.log(data.course_update);

// Or, you can use the `Promise` API.
adminDeleteCourse(adminDeleteCourseVars).then((response) => {
  const data = response.data;
  console.log(data.course_update);
});
```

### Using `AdminDeleteCourse`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminDeleteCourseRef, AdminDeleteCourseVariables } from '@dataconnect/functions-generated';

// The `AdminDeleteCourse` mutation requires an argument of type `AdminDeleteCourseVariables`:
const adminDeleteCourseVars: AdminDeleteCourseVariables = {
  courseId: ..., 
};

// Call the `adminDeleteCourseRef()` function to get a reference to the mutation.
const ref = adminDeleteCourseRef(adminDeleteCourseVars);
// Variables can be defined inline as well.
const ref = adminDeleteCourseRef({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDeleteCourseRef(dataConnect, adminDeleteCourseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.course_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.course_update);
});
```

## AdminCreateSession
You can execute the `AdminCreateSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminCreateSession(vars: AdminCreateSessionVariables): MutationPromise<AdminCreateSessionData, AdminCreateSessionVariables>;

interface AdminCreateSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateSessionVariables): MutationRef<AdminCreateSessionData, AdminCreateSessionVariables>;
}
export const adminCreateSessionRef: AdminCreateSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminCreateSession(dc: DataConnect, vars: AdminCreateSessionVariables): MutationPromise<AdminCreateSessionData, AdminCreateSessionVariables>;

interface AdminCreateSessionRef {
  ...
  (dc: DataConnect, vars: AdminCreateSessionVariables): MutationRef<AdminCreateSessionData, AdminCreateSessionVariables>;
}
export const adminCreateSessionRef: AdminCreateSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminCreateSessionRef:
```typescript
const name = adminCreateSessionRef.operationName;
console.log(name);
```

### Variables
The `AdminCreateSession` mutation requires an argument of type `AdminCreateSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminCreateSessionVariables {
  courseId: UUIDString;
  title: string;
  capacity?: number | null;
  startTime: TimestampString;
  endTime: TimestampString;
  type: SessionType;
  locationOrUrl: string;
}
```
### Return Type
Recall that executing the `AdminCreateSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminCreateSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminCreateSessionData {
  session_insert: Session_Key;
}
```
### Using `AdminCreateSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminCreateSession, AdminCreateSessionVariables } from '@dataconnect/functions-generated';

// The `AdminCreateSession` mutation requires an argument of type `AdminCreateSessionVariables`:
const adminCreateSessionVars: AdminCreateSessionVariables = {
  courseId: ..., 
  title: ..., 
  capacity: ..., // optional
  startTime: ..., 
  endTime: ..., 
  type: ..., 
  locationOrUrl: ..., 
};

// Call the `adminCreateSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminCreateSession(adminCreateSessionVars);
// Variables can be defined inline as well.
const { data } = await adminCreateSession({ courseId: ..., title: ..., capacity: ..., startTime: ..., endTime: ..., type: ..., locationOrUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminCreateSession(dataConnect, adminCreateSessionVars);

console.log(data.session_insert);

// Or, you can use the `Promise` API.
adminCreateSession(adminCreateSessionVars).then((response) => {
  const data = response.data;
  console.log(data.session_insert);
});
```

### Using `AdminCreateSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminCreateSessionRef, AdminCreateSessionVariables } from '@dataconnect/functions-generated';

// The `AdminCreateSession` mutation requires an argument of type `AdminCreateSessionVariables`:
const adminCreateSessionVars: AdminCreateSessionVariables = {
  courseId: ..., 
  title: ..., 
  capacity: ..., // optional
  startTime: ..., 
  endTime: ..., 
  type: ..., 
  locationOrUrl: ..., 
};

// Call the `adminCreateSessionRef()` function to get a reference to the mutation.
const ref = adminCreateSessionRef(adminCreateSessionVars);
// Variables can be defined inline as well.
const ref = adminCreateSessionRef({ courseId: ..., title: ..., capacity: ..., startTime: ..., endTime: ..., type: ..., locationOrUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminCreateSessionRef(dataConnect, adminCreateSessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.session_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.session_insert);
});
```

## AdminCancelSession
You can execute the `AdminCancelSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminCancelSession(vars: AdminCancelSessionVariables): MutationPromise<AdminCancelSessionData, AdminCancelSessionVariables>;

interface AdminCancelSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCancelSessionVariables): MutationRef<AdminCancelSessionData, AdminCancelSessionVariables>;
}
export const adminCancelSessionRef: AdminCancelSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminCancelSession(dc: DataConnect, vars: AdminCancelSessionVariables): MutationPromise<AdminCancelSessionData, AdminCancelSessionVariables>;

interface AdminCancelSessionRef {
  ...
  (dc: DataConnect, vars: AdminCancelSessionVariables): MutationRef<AdminCancelSessionData, AdminCancelSessionVariables>;
}
export const adminCancelSessionRef: AdminCancelSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminCancelSessionRef:
```typescript
const name = adminCancelSessionRef.operationName;
console.log(name);
```

### Variables
The `AdminCancelSession` mutation requires an argument of type `AdminCancelSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminCancelSessionVariables {
  sessionId: UUIDString;
}
```
### Return Type
Recall that executing the `AdminCancelSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminCancelSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminCancelSessionData {
  session_update?: Session_Key | null;
}
```
### Using `AdminCancelSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminCancelSession, AdminCancelSessionVariables } from '@dataconnect/functions-generated';

// The `AdminCancelSession` mutation requires an argument of type `AdminCancelSessionVariables`:
const adminCancelSessionVars: AdminCancelSessionVariables = {
  sessionId: ..., 
};

// Call the `adminCancelSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminCancelSession(adminCancelSessionVars);
// Variables can be defined inline as well.
const { data } = await adminCancelSession({ sessionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminCancelSession(dataConnect, adminCancelSessionVars);

console.log(data.session_update);

// Or, you can use the `Promise` API.
adminCancelSession(adminCancelSessionVars).then((response) => {
  const data = response.data;
  console.log(data.session_update);
});
```

### Using `AdminCancelSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminCancelSessionRef, AdminCancelSessionVariables } from '@dataconnect/functions-generated';

// The `AdminCancelSession` mutation requires an argument of type `AdminCancelSessionVariables`:
const adminCancelSessionVars: AdminCancelSessionVariables = {
  sessionId: ..., 
};

// Call the `adminCancelSessionRef()` function to get a reference to the mutation.
const ref = adminCancelSessionRef(adminCancelSessionVars);
// Variables can be defined inline as well.
const ref = adminCancelSessionRef({ sessionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminCancelSessionRef(dataConnect, adminCancelSessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.session_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.session_update);
});
```

## AdminCreateSubscriptionTier
You can execute the `AdminCreateSubscriptionTier` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminCreateSubscriptionTier(vars: AdminCreateSubscriptionTierVariables): MutationPromise<AdminCreateSubscriptionTierData, AdminCreateSubscriptionTierVariables>;

interface AdminCreateSubscriptionTierRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateSubscriptionTierVariables): MutationRef<AdminCreateSubscriptionTierData, AdminCreateSubscriptionTierVariables>;
}
export const adminCreateSubscriptionTierRef: AdminCreateSubscriptionTierRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminCreateSubscriptionTier(dc: DataConnect, vars: AdminCreateSubscriptionTierVariables): MutationPromise<AdminCreateSubscriptionTierData, AdminCreateSubscriptionTierVariables>;

interface AdminCreateSubscriptionTierRef {
  ...
  (dc: DataConnect, vars: AdminCreateSubscriptionTierVariables): MutationRef<AdminCreateSubscriptionTierData, AdminCreateSubscriptionTierVariables>;
}
export const adminCreateSubscriptionTierRef: AdminCreateSubscriptionTierRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminCreateSubscriptionTierRef:
```typescript
const name = adminCreateSubscriptionTierRef.operationName;
console.log(name);
```

### Variables
The `AdminCreateSubscriptionTier` mutation requires an argument of type `AdminCreateSubscriptionTierVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminCreateSubscriptionTierVariables {
  name: string;
  price: number;
  billingCycle: BillingCycle;
  features: string[];
}
```
### Return Type
Recall that executing the `AdminCreateSubscriptionTier` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminCreateSubscriptionTierData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminCreateSubscriptionTierData {
  subscriptionTier_insert: SubscriptionTier_Key;
}
```
### Using `AdminCreateSubscriptionTier`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminCreateSubscriptionTier, AdminCreateSubscriptionTierVariables } from '@dataconnect/functions-generated';

// The `AdminCreateSubscriptionTier` mutation requires an argument of type `AdminCreateSubscriptionTierVariables`:
const adminCreateSubscriptionTierVars: AdminCreateSubscriptionTierVariables = {
  name: ..., 
  price: ..., 
  billingCycle: ..., 
  features: ..., 
};

// Call the `adminCreateSubscriptionTier()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminCreateSubscriptionTier(adminCreateSubscriptionTierVars);
// Variables can be defined inline as well.
const { data } = await adminCreateSubscriptionTier({ name: ..., price: ..., billingCycle: ..., features: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminCreateSubscriptionTier(dataConnect, adminCreateSubscriptionTierVars);

console.log(data.subscriptionTier_insert);

// Or, you can use the `Promise` API.
adminCreateSubscriptionTier(adminCreateSubscriptionTierVars).then((response) => {
  const data = response.data;
  console.log(data.subscriptionTier_insert);
});
```

### Using `AdminCreateSubscriptionTier`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminCreateSubscriptionTierRef, AdminCreateSubscriptionTierVariables } from '@dataconnect/functions-generated';

// The `AdminCreateSubscriptionTier` mutation requires an argument of type `AdminCreateSubscriptionTierVariables`:
const adminCreateSubscriptionTierVars: AdminCreateSubscriptionTierVariables = {
  name: ..., 
  price: ..., 
  billingCycle: ..., 
  features: ..., 
};

// Call the `adminCreateSubscriptionTierRef()` function to get a reference to the mutation.
const ref = adminCreateSubscriptionTierRef(adminCreateSubscriptionTierVars);
// Variables can be defined inline as well.
const ref = adminCreateSubscriptionTierRef({ name: ..., price: ..., billingCycle: ..., features: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminCreateSubscriptionTierRef(dataConnect, adminCreateSubscriptionTierVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.subscriptionTier_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.subscriptionTier_insert);
});
```

## AdminDeprecateSubscriptionTier
You can execute the `AdminDeprecateSubscriptionTier` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminDeprecateSubscriptionTier(vars: AdminDeprecateSubscriptionTierVariables): MutationPromise<AdminDeprecateSubscriptionTierData, AdminDeprecateSubscriptionTierVariables>;

interface AdminDeprecateSubscriptionTierRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeprecateSubscriptionTierVariables): MutationRef<AdminDeprecateSubscriptionTierData, AdminDeprecateSubscriptionTierVariables>;
}
export const adminDeprecateSubscriptionTierRef: AdminDeprecateSubscriptionTierRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminDeprecateSubscriptionTier(dc: DataConnect, vars: AdminDeprecateSubscriptionTierVariables): MutationPromise<AdminDeprecateSubscriptionTierData, AdminDeprecateSubscriptionTierVariables>;

interface AdminDeprecateSubscriptionTierRef {
  ...
  (dc: DataConnect, vars: AdminDeprecateSubscriptionTierVariables): MutationRef<AdminDeprecateSubscriptionTierData, AdminDeprecateSubscriptionTierVariables>;
}
export const adminDeprecateSubscriptionTierRef: AdminDeprecateSubscriptionTierRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDeprecateSubscriptionTierRef:
```typescript
const name = adminDeprecateSubscriptionTierRef.operationName;
console.log(name);
```

### Variables
The `AdminDeprecateSubscriptionTier` mutation requires an argument of type `AdminDeprecateSubscriptionTierVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminDeprecateSubscriptionTierVariables {
  tierId: UUIDString;
}
```
### Return Type
Recall that executing the `AdminDeprecateSubscriptionTier` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDeprecateSubscriptionTierData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDeprecateSubscriptionTierData {
  subscriptionTier_update?: SubscriptionTier_Key | null;
}
```
### Using `AdminDeprecateSubscriptionTier`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDeprecateSubscriptionTier, AdminDeprecateSubscriptionTierVariables } from '@dataconnect/functions-generated';

// The `AdminDeprecateSubscriptionTier` mutation requires an argument of type `AdminDeprecateSubscriptionTierVariables`:
const adminDeprecateSubscriptionTierVars: AdminDeprecateSubscriptionTierVariables = {
  tierId: ..., 
};

// Call the `adminDeprecateSubscriptionTier()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeprecateSubscriptionTier(adminDeprecateSubscriptionTierVars);
// Variables can be defined inline as well.
const { data } = await adminDeprecateSubscriptionTier({ tierId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDeprecateSubscriptionTier(dataConnect, adminDeprecateSubscriptionTierVars);

console.log(data.subscriptionTier_update);

// Or, you can use the `Promise` API.
adminDeprecateSubscriptionTier(adminDeprecateSubscriptionTierVars).then((response) => {
  const data = response.data;
  console.log(data.subscriptionTier_update);
});
```

### Using `AdminDeprecateSubscriptionTier`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminDeprecateSubscriptionTierRef, AdminDeprecateSubscriptionTierVariables } from '@dataconnect/functions-generated';

// The `AdminDeprecateSubscriptionTier` mutation requires an argument of type `AdminDeprecateSubscriptionTierVariables`:
const adminDeprecateSubscriptionTierVars: AdminDeprecateSubscriptionTierVariables = {
  tierId: ..., 
};

// Call the `adminDeprecateSubscriptionTierRef()` function to get a reference to the mutation.
const ref = adminDeprecateSubscriptionTierRef(adminDeprecateSubscriptionTierVars);
// Variables can be defined inline as well.
const ref = adminDeprecateSubscriptionTierRef({ tierId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDeprecateSubscriptionTierRef(dataConnect, adminDeprecateSubscriptionTierVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.subscriptionTier_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.subscriptionTier_update);
});
```

## AdminCreateCategory
You can execute the `AdminCreateCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminCreateCategory(vars: AdminCreateCategoryVariables): MutationPromise<AdminCreateCategoryData, AdminCreateCategoryVariables>;

interface AdminCreateCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateCategoryVariables): MutationRef<AdminCreateCategoryData, AdminCreateCategoryVariables>;
}
export const adminCreateCategoryRef: AdminCreateCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminCreateCategory(dc: DataConnect, vars: AdminCreateCategoryVariables): MutationPromise<AdminCreateCategoryData, AdminCreateCategoryVariables>;

interface AdminCreateCategoryRef {
  ...
  (dc: DataConnect, vars: AdminCreateCategoryVariables): MutationRef<AdminCreateCategoryData, AdminCreateCategoryVariables>;
}
export const adminCreateCategoryRef: AdminCreateCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminCreateCategoryRef:
```typescript
const name = adminCreateCategoryRef.operationName;
console.log(name);
```

### Variables
The `AdminCreateCategory` mutation requires an argument of type `AdminCreateCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminCreateCategoryVariables {
  name: string;
  description?: string | null;
}
```
### Return Type
Recall that executing the `AdminCreateCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminCreateCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminCreateCategoryData {
  category_insert: Category_Key;
}
```
### Using `AdminCreateCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminCreateCategory, AdminCreateCategoryVariables } from '@dataconnect/functions-generated';

// The `AdminCreateCategory` mutation requires an argument of type `AdminCreateCategoryVariables`:
const adminCreateCategoryVars: AdminCreateCategoryVariables = {
  name: ..., 
  description: ..., // optional
};

// Call the `adminCreateCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminCreateCategory(adminCreateCategoryVars);
// Variables can be defined inline as well.
const { data } = await adminCreateCategory({ name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminCreateCategory(dataConnect, adminCreateCategoryVars);

console.log(data.category_insert);

// Or, you can use the `Promise` API.
adminCreateCategory(adminCreateCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.category_insert);
});
```

### Using `AdminCreateCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminCreateCategoryRef, AdminCreateCategoryVariables } from '@dataconnect/functions-generated';

// The `AdminCreateCategory` mutation requires an argument of type `AdminCreateCategoryVariables`:
const adminCreateCategoryVars: AdminCreateCategoryVariables = {
  name: ..., 
  description: ..., // optional
};

// Call the `adminCreateCategoryRef()` function to get a reference to the mutation.
const ref = adminCreateCategoryRef(adminCreateCategoryVars);
// Variables can be defined inline as well.
const ref = adminCreateCategoryRef({ name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminCreateCategoryRef(dataConnect, adminCreateCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.category_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.category_insert);
});
```

## AdminUpdateCourse
You can execute the `AdminUpdateCourse` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminUpdateCourse(vars: AdminUpdateCourseVariables): MutationPromise<AdminUpdateCourseData, AdminUpdateCourseVariables>;

interface AdminUpdateCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateCourseVariables): MutationRef<AdminUpdateCourseData, AdminUpdateCourseVariables>;
}
export const adminUpdateCourseRef: AdminUpdateCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminUpdateCourse(dc: DataConnect, vars: AdminUpdateCourseVariables): MutationPromise<AdminUpdateCourseData, AdminUpdateCourseVariables>;

interface AdminUpdateCourseRef {
  ...
  (dc: DataConnect, vars: AdminUpdateCourseVariables): MutationRef<AdminUpdateCourseData, AdminUpdateCourseVariables>;
}
export const adminUpdateCourseRef: AdminUpdateCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminUpdateCourseRef:
```typescript
const name = adminUpdateCourseRef.operationName;
console.log(name);
```

### Variables
The `AdminUpdateCourse` mutation requires an argument of type `AdminUpdateCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminUpdateCourseVariables {
  courseId: UUIDString;
  title?: string | null;
  description?: string | null;
  price?: number | null;
  language?: string | null;
  level?: CourseLevel | null;
  categoryId?: UUIDString | null;
  tags?: string[] | null;
  thumbnail?: string | null;
}
```
### Return Type
Recall that executing the `AdminUpdateCourse` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminUpdateCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminUpdateCourseData {
  course_update?: Course_Key | null;
}
```
### Using `AdminUpdateCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminUpdateCourse, AdminUpdateCourseVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateCourse` mutation requires an argument of type `AdminUpdateCourseVariables`:
const adminUpdateCourseVars: AdminUpdateCourseVariables = {
  courseId: ..., 
  title: ..., // optional
  description: ..., // optional
  price: ..., // optional
  language: ..., // optional
  level: ..., // optional
  categoryId: ..., // optional
  tags: ..., // optional
  thumbnail: ..., // optional
};

// Call the `adminUpdateCourse()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminUpdateCourse(adminUpdateCourseVars);
// Variables can be defined inline as well.
const { data } = await adminUpdateCourse({ courseId: ..., title: ..., description: ..., price: ..., language: ..., level: ..., categoryId: ..., tags: ..., thumbnail: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminUpdateCourse(dataConnect, adminUpdateCourseVars);

console.log(data.course_update);

// Or, you can use the `Promise` API.
adminUpdateCourse(adminUpdateCourseVars).then((response) => {
  const data = response.data;
  console.log(data.course_update);
});
```

### Using `AdminUpdateCourse`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminUpdateCourseRef, AdminUpdateCourseVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateCourse` mutation requires an argument of type `AdminUpdateCourseVariables`:
const adminUpdateCourseVars: AdminUpdateCourseVariables = {
  courseId: ..., 
  title: ..., // optional
  description: ..., // optional
  price: ..., // optional
  language: ..., // optional
  level: ..., // optional
  categoryId: ..., // optional
  tags: ..., // optional
  thumbnail: ..., // optional
};

// Call the `adminUpdateCourseRef()` function to get a reference to the mutation.
const ref = adminUpdateCourseRef(adminUpdateCourseVars);
// Variables can be defined inline as well.
const ref = adminUpdateCourseRef({ courseId: ..., title: ..., description: ..., price: ..., language: ..., level: ..., categoryId: ..., tags: ..., thumbnail: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminUpdateCourseRef(dataConnect, adminUpdateCourseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.course_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.course_update);
});
```

## AdminUpdateCourseStatus
You can execute the `AdminUpdateCourseStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminUpdateCourseStatus(vars: AdminUpdateCourseStatusVariables): MutationPromise<AdminUpdateCourseStatusData, AdminUpdateCourseStatusVariables>;

interface AdminUpdateCourseStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateCourseStatusVariables): MutationRef<AdminUpdateCourseStatusData, AdminUpdateCourseStatusVariables>;
}
export const adminUpdateCourseStatusRef: AdminUpdateCourseStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminUpdateCourseStatus(dc: DataConnect, vars: AdminUpdateCourseStatusVariables): MutationPromise<AdminUpdateCourseStatusData, AdminUpdateCourseStatusVariables>;

interface AdminUpdateCourseStatusRef {
  ...
  (dc: DataConnect, vars: AdminUpdateCourseStatusVariables): MutationRef<AdminUpdateCourseStatusData, AdminUpdateCourseStatusVariables>;
}
export const adminUpdateCourseStatusRef: AdminUpdateCourseStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminUpdateCourseStatusRef:
```typescript
const name = adminUpdateCourseStatusRef.operationName;
console.log(name);
```

### Variables
The `AdminUpdateCourseStatus` mutation requires an argument of type `AdminUpdateCourseStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminUpdateCourseStatusVariables {
  courseId: UUIDString;
  status: CourseStatus;
}
```
### Return Type
Recall that executing the `AdminUpdateCourseStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminUpdateCourseStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminUpdateCourseStatusData {
  course_update?: Course_Key | null;
}
```
### Using `AdminUpdateCourseStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminUpdateCourseStatus, AdminUpdateCourseStatusVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateCourseStatus` mutation requires an argument of type `AdminUpdateCourseStatusVariables`:
const adminUpdateCourseStatusVars: AdminUpdateCourseStatusVariables = {
  courseId: ..., 
  status: ..., 
};

// Call the `adminUpdateCourseStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminUpdateCourseStatus(adminUpdateCourseStatusVars);
// Variables can be defined inline as well.
const { data } = await adminUpdateCourseStatus({ courseId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminUpdateCourseStatus(dataConnect, adminUpdateCourseStatusVars);

console.log(data.course_update);

// Or, you can use the `Promise` API.
adminUpdateCourseStatus(adminUpdateCourseStatusVars).then((response) => {
  const data = response.data;
  console.log(data.course_update);
});
```

### Using `AdminUpdateCourseStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminUpdateCourseStatusRef, AdminUpdateCourseStatusVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateCourseStatus` mutation requires an argument of type `AdminUpdateCourseStatusVariables`:
const adminUpdateCourseStatusVars: AdminUpdateCourseStatusVariables = {
  courseId: ..., 
  status: ..., 
};

// Call the `adminUpdateCourseStatusRef()` function to get a reference to the mutation.
const ref = adminUpdateCourseStatusRef(adminUpdateCourseStatusVars);
// Variables can be defined inline as well.
const ref = adminUpdateCourseStatusRef({ courseId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminUpdateCourseStatusRef(dataConnect, adminUpdateCourseStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.course_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.course_update);
});
```

## AdminCreateSection
You can execute the `AdminCreateSection` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminCreateSection(vars: AdminCreateSectionVariables): MutationPromise<AdminCreateSectionData, AdminCreateSectionVariables>;

interface AdminCreateSectionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateSectionVariables): MutationRef<AdminCreateSectionData, AdminCreateSectionVariables>;
}
export const adminCreateSectionRef: AdminCreateSectionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminCreateSection(dc: DataConnect, vars: AdminCreateSectionVariables): MutationPromise<AdminCreateSectionData, AdminCreateSectionVariables>;

interface AdminCreateSectionRef {
  ...
  (dc: DataConnect, vars: AdminCreateSectionVariables): MutationRef<AdminCreateSectionData, AdminCreateSectionVariables>;
}
export const adminCreateSectionRef: AdminCreateSectionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminCreateSectionRef:
```typescript
const name = adminCreateSectionRef.operationName;
console.log(name);
```

### Variables
The `AdminCreateSection` mutation requires an argument of type `AdminCreateSectionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminCreateSectionVariables {
  courseId: UUIDString;
  title: string;
  order: number;
}
```
### Return Type
Recall that executing the `AdminCreateSection` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminCreateSectionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminCreateSectionData {
  courseSection_insert: CourseSection_Key;
}
```
### Using `AdminCreateSection`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminCreateSection, AdminCreateSectionVariables } from '@dataconnect/functions-generated';

// The `AdminCreateSection` mutation requires an argument of type `AdminCreateSectionVariables`:
const adminCreateSectionVars: AdminCreateSectionVariables = {
  courseId: ..., 
  title: ..., 
  order: ..., 
};

// Call the `adminCreateSection()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminCreateSection(adminCreateSectionVars);
// Variables can be defined inline as well.
const { data } = await adminCreateSection({ courseId: ..., title: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminCreateSection(dataConnect, adminCreateSectionVars);

console.log(data.courseSection_insert);

// Or, you can use the `Promise` API.
adminCreateSection(adminCreateSectionVars).then((response) => {
  const data = response.data;
  console.log(data.courseSection_insert);
});
```

### Using `AdminCreateSection`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminCreateSectionRef, AdminCreateSectionVariables } from '@dataconnect/functions-generated';

// The `AdminCreateSection` mutation requires an argument of type `AdminCreateSectionVariables`:
const adminCreateSectionVars: AdminCreateSectionVariables = {
  courseId: ..., 
  title: ..., 
  order: ..., 
};

// Call the `adminCreateSectionRef()` function to get a reference to the mutation.
const ref = adminCreateSectionRef(adminCreateSectionVars);
// Variables can be defined inline as well.
const ref = adminCreateSectionRef({ courseId: ..., title: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminCreateSectionRef(dataConnect, adminCreateSectionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseSection_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseSection_insert);
});
```

## AdminUpdateSection
You can execute the `AdminUpdateSection` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminUpdateSection(vars: AdminUpdateSectionVariables): MutationPromise<AdminUpdateSectionData, AdminUpdateSectionVariables>;

interface AdminUpdateSectionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateSectionVariables): MutationRef<AdminUpdateSectionData, AdminUpdateSectionVariables>;
}
export const adminUpdateSectionRef: AdminUpdateSectionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminUpdateSection(dc: DataConnect, vars: AdminUpdateSectionVariables): MutationPromise<AdminUpdateSectionData, AdminUpdateSectionVariables>;

interface AdminUpdateSectionRef {
  ...
  (dc: DataConnect, vars: AdminUpdateSectionVariables): MutationRef<AdminUpdateSectionData, AdminUpdateSectionVariables>;
}
export const adminUpdateSectionRef: AdminUpdateSectionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminUpdateSectionRef:
```typescript
const name = adminUpdateSectionRef.operationName;
console.log(name);
```

### Variables
The `AdminUpdateSection` mutation requires an argument of type `AdminUpdateSectionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminUpdateSectionVariables {
  sectionId: UUIDString;
  title: string;
}
```
### Return Type
Recall that executing the `AdminUpdateSection` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminUpdateSectionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminUpdateSectionData {
  courseSection_update?: CourseSection_Key | null;
}
```
### Using `AdminUpdateSection`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminUpdateSection, AdminUpdateSectionVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateSection` mutation requires an argument of type `AdminUpdateSectionVariables`:
const adminUpdateSectionVars: AdminUpdateSectionVariables = {
  sectionId: ..., 
  title: ..., 
};

// Call the `adminUpdateSection()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminUpdateSection(adminUpdateSectionVars);
// Variables can be defined inline as well.
const { data } = await adminUpdateSection({ sectionId: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminUpdateSection(dataConnect, adminUpdateSectionVars);

console.log(data.courseSection_update);

// Or, you can use the `Promise` API.
adminUpdateSection(adminUpdateSectionVars).then((response) => {
  const data = response.data;
  console.log(data.courseSection_update);
});
```

### Using `AdminUpdateSection`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminUpdateSectionRef, AdminUpdateSectionVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateSection` mutation requires an argument of type `AdminUpdateSectionVariables`:
const adminUpdateSectionVars: AdminUpdateSectionVariables = {
  sectionId: ..., 
  title: ..., 
};

// Call the `adminUpdateSectionRef()` function to get a reference to the mutation.
const ref = adminUpdateSectionRef(adminUpdateSectionVars);
// Variables can be defined inline as well.
const ref = adminUpdateSectionRef({ sectionId: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminUpdateSectionRef(dataConnect, adminUpdateSectionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseSection_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseSection_update);
});
```

## AdminSoftDeleteSection
You can execute the `AdminSoftDeleteSection` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminSoftDeleteSection(vars: AdminSoftDeleteSectionVariables): MutationPromise<AdminSoftDeleteSectionData, AdminSoftDeleteSectionVariables>;

interface AdminSoftDeleteSectionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSoftDeleteSectionVariables): MutationRef<AdminSoftDeleteSectionData, AdminSoftDeleteSectionVariables>;
}
export const adminSoftDeleteSectionRef: AdminSoftDeleteSectionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSoftDeleteSection(dc: DataConnect, vars: AdminSoftDeleteSectionVariables): MutationPromise<AdminSoftDeleteSectionData, AdminSoftDeleteSectionVariables>;

interface AdminSoftDeleteSectionRef {
  ...
  (dc: DataConnect, vars: AdminSoftDeleteSectionVariables): MutationRef<AdminSoftDeleteSectionData, AdminSoftDeleteSectionVariables>;
}
export const adminSoftDeleteSectionRef: AdminSoftDeleteSectionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSoftDeleteSectionRef:
```typescript
const name = adminSoftDeleteSectionRef.operationName;
console.log(name);
```

### Variables
The `AdminSoftDeleteSection` mutation requires an argument of type `AdminSoftDeleteSectionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSoftDeleteSectionVariables {
  sectionId: UUIDString;
}
```
### Return Type
Recall that executing the `AdminSoftDeleteSection` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSoftDeleteSectionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSoftDeleteSectionData {
  courseSection_update?: CourseSection_Key | null;
}
```
### Using `AdminSoftDeleteSection`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSoftDeleteSection, AdminSoftDeleteSectionVariables } from '@dataconnect/functions-generated';

// The `AdminSoftDeleteSection` mutation requires an argument of type `AdminSoftDeleteSectionVariables`:
const adminSoftDeleteSectionVars: AdminSoftDeleteSectionVariables = {
  sectionId: ..., 
};

// Call the `adminSoftDeleteSection()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSoftDeleteSection(adminSoftDeleteSectionVars);
// Variables can be defined inline as well.
const { data } = await adminSoftDeleteSection({ sectionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSoftDeleteSection(dataConnect, adminSoftDeleteSectionVars);

console.log(data.courseSection_update);

// Or, you can use the `Promise` API.
adminSoftDeleteSection(adminSoftDeleteSectionVars).then((response) => {
  const data = response.data;
  console.log(data.courseSection_update);
});
```

### Using `AdminSoftDeleteSection`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSoftDeleteSectionRef, AdminSoftDeleteSectionVariables } from '@dataconnect/functions-generated';

// The `AdminSoftDeleteSection` mutation requires an argument of type `AdminSoftDeleteSectionVariables`:
const adminSoftDeleteSectionVars: AdminSoftDeleteSectionVariables = {
  sectionId: ..., 
};

// Call the `adminSoftDeleteSectionRef()` function to get a reference to the mutation.
const ref = adminSoftDeleteSectionRef(adminSoftDeleteSectionVars);
// Variables can be defined inline as well.
const ref = adminSoftDeleteSectionRef({ sectionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSoftDeleteSectionRef(dataConnect, adminSoftDeleteSectionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseSection_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseSection_update);
});
```

## AdminUpdateSectionOrder
You can execute the `AdminUpdateSectionOrder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminUpdateSectionOrder(vars: AdminUpdateSectionOrderVariables): MutationPromise<AdminUpdateSectionOrderData, AdminUpdateSectionOrderVariables>;

interface AdminUpdateSectionOrderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateSectionOrderVariables): MutationRef<AdminUpdateSectionOrderData, AdminUpdateSectionOrderVariables>;
}
export const adminUpdateSectionOrderRef: AdminUpdateSectionOrderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminUpdateSectionOrder(dc: DataConnect, vars: AdminUpdateSectionOrderVariables): MutationPromise<AdminUpdateSectionOrderData, AdminUpdateSectionOrderVariables>;

interface AdminUpdateSectionOrderRef {
  ...
  (dc: DataConnect, vars: AdminUpdateSectionOrderVariables): MutationRef<AdminUpdateSectionOrderData, AdminUpdateSectionOrderVariables>;
}
export const adminUpdateSectionOrderRef: AdminUpdateSectionOrderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminUpdateSectionOrderRef:
```typescript
const name = adminUpdateSectionOrderRef.operationName;
console.log(name);
```

### Variables
The `AdminUpdateSectionOrder` mutation requires an argument of type `AdminUpdateSectionOrderVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminUpdateSectionOrderVariables {
  sectionId: UUIDString;
  order: number;
}
```
### Return Type
Recall that executing the `AdminUpdateSectionOrder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminUpdateSectionOrderData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminUpdateSectionOrderData {
  courseSection_update?: CourseSection_Key | null;
}
```
### Using `AdminUpdateSectionOrder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminUpdateSectionOrder, AdminUpdateSectionOrderVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateSectionOrder` mutation requires an argument of type `AdminUpdateSectionOrderVariables`:
const adminUpdateSectionOrderVars: AdminUpdateSectionOrderVariables = {
  sectionId: ..., 
  order: ..., 
};

// Call the `adminUpdateSectionOrder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminUpdateSectionOrder(adminUpdateSectionOrderVars);
// Variables can be defined inline as well.
const { data } = await adminUpdateSectionOrder({ sectionId: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminUpdateSectionOrder(dataConnect, adminUpdateSectionOrderVars);

console.log(data.courseSection_update);

// Or, you can use the `Promise` API.
adminUpdateSectionOrder(adminUpdateSectionOrderVars).then((response) => {
  const data = response.data;
  console.log(data.courseSection_update);
});
```

### Using `AdminUpdateSectionOrder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminUpdateSectionOrderRef, AdminUpdateSectionOrderVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateSectionOrder` mutation requires an argument of type `AdminUpdateSectionOrderVariables`:
const adminUpdateSectionOrderVars: AdminUpdateSectionOrderVariables = {
  sectionId: ..., 
  order: ..., 
};

// Call the `adminUpdateSectionOrderRef()` function to get a reference to the mutation.
const ref = adminUpdateSectionOrderRef(adminUpdateSectionOrderVars);
// Variables can be defined inline as well.
const ref = adminUpdateSectionOrderRef({ sectionId: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminUpdateSectionOrderRef(dataConnect, adminUpdateSectionOrderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseSection_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseSection_update);
});
```

## AdminCreateLectureFull
You can execute the `AdminCreateLectureFull` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminCreateLectureFull(vars: AdminCreateLectureFullVariables): MutationPromise<AdminCreateLectureFullData, AdminCreateLectureFullVariables>;

interface AdminCreateLectureFullRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateLectureFullVariables): MutationRef<AdminCreateLectureFullData, AdminCreateLectureFullVariables>;
}
export const adminCreateLectureFullRef: AdminCreateLectureFullRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminCreateLectureFull(dc: DataConnect, vars: AdminCreateLectureFullVariables): MutationPromise<AdminCreateLectureFullData, AdminCreateLectureFullVariables>;

interface AdminCreateLectureFullRef {
  ...
  (dc: DataConnect, vars: AdminCreateLectureFullVariables): MutationRef<AdminCreateLectureFullData, AdminCreateLectureFullVariables>;
}
export const adminCreateLectureFullRef: AdminCreateLectureFullRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminCreateLectureFullRef:
```typescript
const name = adminCreateLectureFullRef.operationName;
console.log(name);
```

### Variables
The `AdminCreateLectureFull` mutation requires an argument of type `AdminCreateLectureFullVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminCreateLectureFullVariables {
  sectionId: UUIDString;
  title: string;
  type: LectureType;
  videoUrl?: string | null;
  content?: string | null;
  duration?: number | null;
  transcriptUrl?: string | null;
  isFreePreview: boolean;
  order: number;
}
```
### Return Type
Recall that executing the `AdminCreateLectureFull` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminCreateLectureFullData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminCreateLectureFullData {
  courseLecture_insert: CourseLecture_Key;
}
```
### Using `AdminCreateLectureFull`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminCreateLectureFull, AdminCreateLectureFullVariables } from '@dataconnect/functions-generated';

// The `AdminCreateLectureFull` mutation requires an argument of type `AdminCreateLectureFullVariables`:
const adminCreateLectureFullVars: AdminCreateLectureFullVariables = {
  sectionId: ..., 
  title: ..., 
  type: ..., 
  videoUrl: ..., // optional
  content: ..., // optional
  duration: ..., // optional
  transcriptUrl: ..., // optional
  isFreePreview: ..., 
  order: ..., 
};

// Call the `adminCreateLectureFull()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminCreateLectureFull(adminCreateLectureFullVars);
// Variables can be defined inline as well.
const { data } = await adminCreateLectureFull({ sectionId: ..., title: ..., type: ..., videoUrl: ..., content: ..., duration: ..., transcriptUrl: ..., isFreePreview: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminCreateLectureFull(dataConnect, adminCreateLectureFullVars);

console.log(data.courseLecture_insert);

// Or, you can use the `Promise` API.
adminCreateLectureFull(adminCreateLectureFullVars).then((response) => {
  const data = response.data;
  console.log(data.courseLecture_insert);
});
```

### Using `AdminCreateLectureFull`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminCreateLectureFullRef, AdminCreateLectureFullVariables } from '@dataconnect/functions-generated';

// The `AdminCreateLectureFull` mutation requires an argument of type `AdminCreateLectureFullVariables`:
const adminCreateLectureFullVars: AdminCreateLectureFullVariables = {
  sectionId: ..., 
  title: ..., 
  type: ..., 
  videoUrl: ..., // optional
  content: ..., // optional
  duration: ..., // optional
  transcriptUrl: ..., // optional
  isFreePreview: ..., 
  order: ..., 
};

// Call the `adminCreateLectureFullRef()` function to get a reference to the mutation.
const ref = adminCreateLectureFullRef(adminCreateLectureFullVars);
// Variables can be defined inline as well.
const ref = adminCreateLectureFullRef({ sectionId: ..., title: ..., type: ..., videoUrl: ..., content: ..., duration: ..., transcriptUrl: ..., isFreePreview: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminCreateLectureFullRef(dataConnect, adminCreateLectureFullVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseLecture_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseLecture_insert);
});
```

## AdminUpdateLecture
You can execute the `AdminUpdateLecture` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminUpdateLecture(vars: AdminUpdateLectureVariables): MutationPromise<AdminUpdateLectureData, AdminUpdateLectureVariables>;

interface AdminUpdateLectureRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateLectureVariables): MutationRef<AdminUpdateLectureData, AdminUpdateLectureVariables>;
}
export const adminUpdateLectureRef: AdminUpdateLectureRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminUpdateLecture(dc: DataConnect, vars: AdminUpdateLectureVariables): MutationPromise<AdminUpdateLectureData, AdminUpdateLectureVariables>;

interface AdminUpdateLectureRef {
  ...
  (dc: DataConnect, vars: AdminUpdateLectureVariables): MutationRef<AdminUpdateLectureData, AdminUpdateLectureVariables>;
}
export const adminUpdateLectureRef: AdminUpdateLectureRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminUpdateLectureRef:
```typescript
const name = adminUpdateLectureRef.operationName;
console.log(name);
```

### Variables
The `AdminUpdateLecture` mutation requires an argument of type `AdminUpdateLectureVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminUpdateLectureVariables {
  lectureId: UUIDString;
  title?: string | null;
  type?: LectureType | null;
  videoUrl?: string | null;
  content?: string | null;
  duration?: number | null;
  transcriptUrl?: string | null;
  isFreePreview?: boolean | null;
}
```
### Return Type
Recall that executing the `AdminUpdateLecture` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminUpdateLectureData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminUpdateLectureData {
  courseLecture_update?: CourseLecture_Key | null;
}
```
### Using `AdminUpdateLecture`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminUpdateLecture, AdminUpdateLectureVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateLecture` mutation requires an argument of type `AdminUpdateLectureVariables`:
const adminUpdateLectureVars: AdminUpdateLectureVariables = {
  lectureId: ..., 
  title: ..., // optional
  type: ..., // optional
  videoUrl: ..., // optional
  content: ..., // optional
  duration: ..., // optional
  transcriptUrl: ..., // optional
  isFreePreview: ..., // optional
};

// Call the `adminUpdateLecture()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminUpdateLecture(adminUpdateLectureVars);
// Variables can be defined inline as well.
const { data } = await adminUpdateLecture({ lectureId: ..., title: ..., type: ..., videoUrl: ..., content: ..., duration: ..., transcriptUrl: ..., isFreePreview: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminUpdateLecture(dataConnect, adminUpdateLectureVars);

console.log(data.courseLecture_update);

// Or, you can use the `Promise` API.
adminUpdateLecture(adminUpdateLectureVars).then((response) => {
  const data = response.data;
  console.log(data.courseLecture_update);
});
```

### Using `AdminUpdateLecture`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminUpdateLectureRef, AdminUpdateLectureVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateLecture` mutation requires an argument of type `AdminUpdateLectureVariables`:
const adminUpdateLectureVars: AdminUpdateLectureVariables = {
  lectureId: ..., 
  title: ..., // optional
  type: ..., // optional
  videoUrl: ..., // optional
  content: ..., // optional
  duration: ..., // optional
  transcriptUrl: ..., // optional
  isFreePreview: ..., // optional
};

// Call the `adminUpdateLectureRef()` function to get a reference to the mutation.
const ref = adminUpdateLectureRef(adminUpdateLectureVars);
// Variables can be defined inline as well.
const ref = adminUpdateLectureRef({ lectureId: ..., title: ..., type: ..., videoUrl: ..., content: ..., duration: ..., transcriptUrl: ..., isFreePreview: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminUpdateLectureRef(dataConnect, adminUpdateLectureVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseLecture_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseLecture_update);
});
```

## AdminSoftDeleteLecture
You can execute the `AdminSoftDeleteLecture` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminSoftDeleteLecture(vars: AdminSoftDeleteLectureVariables): MutationPromise<AdminSoftDeleteLectureData, AdminSoftDeleteLectureVariables>;

interface AdminSoftDeleteLectureRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSoftDeleteLectureVariables): MutationRef<AdminSoftDeleteLectureData, AdminSoftDeleteLectureVariables>;
}
export const adminSoftDeleteLectureRef: AdminSoftDeleteLectureRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSoftDeleteLecture(dc: DataConnect, vars: AdminSoftDeleteLectureVariables): MutationPromise<AdminSoftDeleteLectureData, AdminSoftDeleteLectureVariables>;

interface AdminSoftDeleteLectureRef {
  ...
  (dc: DataConnect, vars: AdminSoftDeleteLectureVariables): MutationRef<AdminSoftDeleteLectureData, AdminSoftDeleteLectureVariables>;
}
export const adminSoftDeleteLectureRef: AdminSoftDeleteLectureRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSoftDeleteLectureRef:
```typescript
const name = adminSoftDeleteLectureRef.operationName;
console.log(name);
```

### Variables
The `AdminSoftDeleteLecture` mutation requires an argument of type `AdminSoftDeleteLectureVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSoftDeleteLectureVariables {
  lectureId: UUIDString;
}
```
### Return Type
Recall that executing the `AdminSoftDeleteLecture` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSoftDeleteLectureData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSoftDeleteLectureData {
  courseLecture_update?: CourseLecture_Key | null;
}
```
### Using `AdminSoftDeleteLecture`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSoftDeleteLecture, AdminSoftDeleteLectureVariables } from '@dataconnect/functions-generated';

// The `AdminSoftDeleteLecture` mutation requires an argument of type `AdminSoftDeleteLectureVariables`:
const adminSoftDeleteLectureVars: AdminSoftDeleteLectureVariables = {
  lectureId: ..., 
};

// Call the `adminSoftDeleteLecture()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSoftDeleteLecture(adminSoftDeleteLectureVars);
// Variables can be defined inline as well.
const { data } = await adminSoftDeleteLecture({ lectureId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSoftDeleteLecture(dataConnect, adminSoftDeleteLectureVars);

console.log(data.courseLecture_update);

// Or, you can use the `Promise` API.
adminSoftDeleteLecture(adminSoftDeleteLectureVars).then((response) => {
  const data = response.data;
  console.log(data.courseLecture_update);
});
```

### Using `AdminSoftDeleteLecture`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSoftDeleteLectureRef, AdminSoftDeleteLectureVariables } from '@dataconnect/functions-generated';

// The `AdminSoftDeleteLecture` mutation requires an argument of type `AdminSoftDeleteLectureVariables`:
const adminSoftDeleteLectureVars: AdminSoftDeleteLectureVariables = {
  lectureId: ..., 
};

// Call the `adminSoftDeleteLectureRef()` function to get a reference to the mutation.
const ref = adminSoftDeleteLectureRef(adminSoftDeleteLectureVars);
// Variables can be defined inline as well.
const ref = adminSoftDeleteLectureRef({ lectureId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSoftDeleteLectureRef(dataConnect, adminSoftDeleteLectureVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseLecture_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseLecture_update);
});
```

## AdminUpdateLectureOrder
You can execute the `AdminUpdateLectureOrder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminUpdateLectureOrder(vars: AdminUpdateLectureOrderVariables): MutationPromise<AdminUpdateLectureOrderData, AdminUpdateLectureOrderVariables>;

interface AdminUpdateLectureOrderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateLectureOrderVariables): MutationRef<AdminUpdateLectureOrderData, AdminUpdateLectureOrderVariables>;
}
export const adminUpdateLectureOrderRef: AdminUpdateLectureOrderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminUpdateLectureOrder(dc: DataConnect, vars: AdminUpdateLectureOrderVariables): MutationPromise<AdminUpdateLectureOrderData, AdminUpdateLectureOrderVariables>;

interface AdminUpdateLectureOrderRef {
  ...
  (dc: DataConnect, vars: AdminUpdateLectureOrderVariables): MutationRef<AdminUpdateLectureOrderData, AdminUpdateLectureOrderVariables>;
}
export const adminUpdateLectureOrderRef: AdminUpdateLectureOrderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminUpdateLectureOrderRef:
```typescript
const name = adminUpdateLectureOrderRef.operationName;
console.log(name);
```

### Variables
The `AdminUpdateLectureOrder` mutation requires an argument of type `AdminUpdateLectureOrderVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminUpdateLectureOrderVariables {
  lectureId: UUIDString;
  order: number;
}
```
### Return Type
Recall that executing the `AdminUpdateLectureOrder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminUpdateLectureOrderData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminUpdateLectureOrderData {
  courseLecture_update?: CourseLecture_Key | null;
}
```
### Using `AdminUpdateLectureOrder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminUpdateLectureOrder, AdminUpdateLectureOrderVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateLectureOrder` mutation requires an argument of type `AdminUpdateLectureOrderVariables`:
const adminUpdateLectureOrderVars: AdminUpdateLectureOrderVariables = {
  lectureId: ..., 
  order: ..., 
};

// Call the `adminUpdateLectureOrder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminUpdateLectureOrder(adminUpdateLectureOrderVars);
// Variables can be defined inline as well.
const { data } = await adminUpdateLectureOrder({ lectureId: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminUpdateLectureOrder(dataConnect, adminUpdateLectureOrderVars);

console.log(data.courseLecture_update);

// Or, you can use the `Promise` API.
adminUpdateLectureOrder(adminUpdateLectureOrderVars).then((response) => {
  const data = response.data;
  console.log(data.courseLecture_update);
});
```

### Using `AdminUpdateLectureOrder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminUpdateLectureOrderRef, AdminUpdateLectureOrderVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateLectureOrder` mutation requires an argument of type `AdminUpdateLectureOrderVariables`:
const adminUpdateLectureOrderVars: AdminUpdateLectureOrderVariables = {
  lectureId: ..., 
  order: ..., 
};

// Call the `adminUpdateLectureOrderRef()` function to get a reference to the mutation.
const ref = adminUpdateLectureOrderRef(adminUpdateLectureOrderVars);
// Variables can be defined inline as well.
const ref = adminUpdateLectureOrderRef({ lectureId: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminUpdateLectureOrderRef(dataConnect, adminUpdateLectureOrderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseLecture_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseLecture_update);
});
```

## AdminMoveLectureToSection
You can execute the `AdminMoveLectureToSection` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminMoveLectureToSection(vars: AdminMoveLectureToSectionVariables): MutationPromise<AdminMoveLectureToSectionData, AdminMoveLectureToSectionVariables>;

interface AdminMoveLectureToSectionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminMoveLectureToSectionVariables): MutationRef<AdminMoveLectureToSectionData, AdminMoveLectureToSectionVariables>;
}
export const adminMoveLectureToSectionRef: AdminMoveLectureToSectionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminMoveLectureToSection(dc: DataConnect, vars: AdminMoveLectureToSectionVariables): MutationPromise<AdminMoveLectureToSectionData, AdminMoveLectureToSectionVariables>;

interface AdminMoveLectureToSectionRef {
  ...
  (dc: DataConnect, vars: AdminMoveLectureToSectionVariables): MutationRef<AdminMoveLectureToSectionData, AdminMoveLectureToSectionVariables>;
}
export const adminMoveLectureToSectionRef: AdminMoveLectureToSectionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminMoveLectureToSectionRef:
```typescript
const name = adminMoveLectureToSectionRef.operationName;
console.log(name);
```

### Variables
The `AdminMoveLectureToSection` mutation requires an argument of type `AdminMoveLectureToSectionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminMoveLectureToSectionVariables {
  lectureId: UUIDString;
  newSectionId: UUIDString;
  order: number;
}
```
### Return Type
Recall that executing the `AdminMoveLectureToSection` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminMoveLectureToSectionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminMoveLectureToSectionData {
  courseLecture_update?: CourseLecture_Key | null;
}
```
### Using `AdminMoveLectureToSection`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminMoveLectureToSection, AdminMoveLectureToSectionVariables } from '@dataconnect/functions-generated';

// The `AdminMoveLectureToSection` mutation requires an argument of type `AdminMoveLectureToSectionVariables`:
const adminMoveLectureToSectionVars: AdminMoveLectureToSectionVariables = {
  lectureId: ..., 
  newSectionId: ..., 
  order: ..., 
};

// Call the `adminMoveLectureToSection()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminMoveLectureToSection(adminMoveLectureToSectionVars);
// Variables can be defined inline as well.
const { data } = await adminMoveLectureToSection({ lectureId: ..., newSectionId: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminMoveLectureToSection(dataConnect, adminMoveLectureToSectionVars);

console.log(data.courseLecture_update);

// Or, you can use the `Promise` API.
adminMoveLectureToSection(adminMoveLectureToSectionVars).then((response) => {
  const data = response.data;
  console.log(data.courseLecture_update);
});
```

### Using `AdminMoveLectureToSection`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminMoveLectureToSectionRef, AdminMoveLectureToSectionVariables } from '@dataconnect/functions-generated';

// The `AdminMoveLectureToSection` mutation requires an argument of type `AdminMoveLectureToSectionVariables`:
const adminMoveLectureToSectionVars: AdminMoveLectureToSectionVariables = {
  lectureId: ..., 
  newSectionId: ..., 
  order: ..., 
};

// Call the `adminMoveLectureToSectionRef()` function to get a reference to the mutation.
const ref = adminMoveLectureToSectionRef(adminMoveLectureToSectionVars);
// Variables can be defined inline as well.
const ref = adminMoveLectureToSectionRef({ lectureId: ..., newSectionId: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminMoveLectureToSectionRef(dataConnect, adminMoveLectureToSectionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseLecture_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseLecture_update);
});
```

## AdminSoftDeleteLecturesBySection
You can execute the `AdminSoftDeleteLecturesBySection` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminSoftDeleteLecturesBySection(vars: AdminSoftDeleteLecturesBySectionVariables): MutationPromise<AdminSoftDeleteLecturesBySectionData, AdminSoftDeleteLecturesBySectionVariables>;

interface AdminSoftDeleteLecturesBySectionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSoftDeleteLecturesBySectionVariables): MutationRef<AdminSoftDeleteLecturesBySectionData, AdminSoftDeleteLecturesBySectionVariables>;
}
export const adminSoftDeleteLecturesBySectionRef: AdminSoftDeleteLecturesBySectionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSoftDeleteLecturesBySection(dc: DataConnect, vars: AdminSoftDeleteLecturesBySectionVariables): MutationPromise<AdminSoftDeleteLecturesBySectionData, AdminSoftDeleteLecturesBySectionVariables>;

interface AdminSoftDeleteLecturesBySectionRef {
  ...
  (dc: DataConnect, vars: AdminSoftDeleteLecturesBySectionVariables): MutationRef<AdminSoftDeleteLecturesBySectionData, AdminSoftDeleteLecturesBySectionVariables>;
}
export const adminSoftDeleteLecturesBySectionRef: AdminSoftDeleteLecturesBySectionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSoftDeleteLecturesBySectionRef:
```typescript
const name = adminSoftDeleteLecturesBySectionRef.operationName;
console.log(name);
```

### Variables
The `AdminSoftDeleteLecturesBySection` mutation requires an argument of type `AdminSoftDeleteLecturesBySectionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSoftDeleteLecturesBySectionVariables {
  sectionId: UUIDString;
}
```
### Return Type
Recall that executing the `AdminSoftDeleteLecturesBySection` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSoftDeleteLecturesBySectionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSoftDeleteLecturesBySectionData {
  courseLecture_updateMany: number;
}
```
### Using `AdminSoftDeleteLecturesBySection`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSoftDeleteLecturesBySection, AdminSoftDeleteLecturesBySectionVariables } from '@dataconnect/functions-generated';

// The `AdminSoftDeleteLecturesBySection` mutation requires an argument of type `AdminSoftDeleteLecturesBySectionVariables`:
const adminSoftDeleteLecturesBySectionVars: AdminSoftDeleteLecturesBySectionVariables = {
  sectionId: ..., 
};

// Call the `adminSoftDeleteLecturesBySection()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSoftDeleteLecturesBySection(adminSoftDeleteLecturesBySectionVars);
// Variables can be defined inline as well.
const { data } = await adminSoftDeleteLecturesBySection({ sectionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSoftDeleteLecturesBySection(dataConnect, adminSoftDeleteLecturesBySectionVars);

console.log(data.courseLecture_updateMany);

// Or, you can use the `Promise` API.
adminSoftDeleteLecturesBySection(adminSoftDeleteLecturesBySectionVars).then((response) => {
  const data = response.data;
  console.log(data.courseLecture_updateMany);
});
```

### Using `AdminSoftDeleteLecturesBySection`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSoftDeleteLecturesBySectionRef, AdminSoftDeleteLecturesBySectionVariables } from '@dataconnect/functions-generated';

// The `AdminSoftDeleteLecturesBySection` mutation requires an argument of type `AdminSoftDeleteLecturesBySectionVariables`:
const adminSoftDeleteLecturesBySectionVars: AdminSoftDeleteLecturesBySectionVariables = {
  sectionId: ..., 
};

// Call the `adminSoftDeleteLecturesBySectionRef()` function to get a reference to the mutation.
const ref = adminSoftDeleteLecturesBySectionRef(adminSoftDeleteLecturesBySectionVars);
// Variables can be defined inline as well.
const ref = adminSoftDeleteLecturesBySectionRef({ sectionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSoftDeleteLecturesBySectionRef(dataConnect, adminSoftDeleteLecturesBySectionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseLecture_updateMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseLecture_updateMany);
});
```

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
  amount: number;
  currency?: string | null;
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
import { connectorConfig, logPayment, LogPaymentVariables } from '@dataconnect/functions-generated';

// The `LogPayment` mutation requires an argument of type `LogPaymentVariables`:
const logPaymentVars: LogPaymentVariables = {
  gateway: ..., 
  referenceId: ..., 
  amount: ..., 
  currency: ..., // optional
};

// Call the `logPayment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await logPayment(logPaymentVars);
// Variables can be defined inline as well.
const { data } = await logPayment({ gateway: ..., referenceId: ..., amount: ..., currency: ..., });

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
import { connectorConfig, logPaymentRef, LogPaymentVariables } from '@dataconnect/functions-generated';

// The `LogPayment` mutation requires an argument of type `LogPaymentVariables`:
const logPaymentVars: LogPaymentVariables = {
  gateway: ..., 
  referenceId: ..., 
  amount: ..., 
  currency: ..., // optional
};

// Call the `logPaymentRef()` function to get a reference to the mutation.
const ref = logPaymentRef(logPaymentVars);
// Variables can be defined inline as well.
const ref = logPaymentRef({ gateway: ..., referenceId: ..., amount: ..., currency: ..., });

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
  targetType: PaymentItemTarget;
  courseId?: UUIDString | null;
  missionId?: UUIDString | null;
  subscriptionTierId?: UUIDString | null;
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
import { connectorConfig, addPaymentItem, AddPaymentItemVariables } from '@dataconnect/functions-generated';

// The `AddPaymentItem` mutation requires an argument of type `AddPaymentItemVariables`:
const addPaymentItemVars: AddPaymentItemVariables = {
  paymentId: ..., 
  targetType: ..., 
  courseId: ..., // optional
  missionId: ..., // optional
  subscriptionTierId: ..., // optional
  price: ..., 
};

// Call the `addPaymentItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addPaymentItem(addPaymentItemVars);
// Variables can be defined inline as well.
const { data } = await addPaymentItem({ paymentId: ..., targetType: ..., courseId: ..., missionId: ..., subscriptionTierId: ..., price: ..., });

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
import { connectorConfig, addPaymentItemRef, AddPaymentItemVariables } from '@dataconnect/functions-generated';

// The `AddPaymentItem` mutation requires an argument of type `AddPaymentItemVariables`:
const addPaymentItemVars: AddPaymentItemVariables = {
  paymentId: ..., 
  targetType: ..., 
  courseId: ..., // optional
  missionId: ..., // optional
  subscriptionTierId: ..., // optional
  price: ..., 
};

// Call the `addPaymentItemRef()` function to get a reference to the mutation.
const ref = addPaymentItemRef(addPaymentItemVars);
// Variables can be defined inline as well.
const ref = addPaymentItemRef({ paymentId: ..., targetType: ..., courseId: ..., missionId: ..., subscriptionTierId: ..., price: ..., });

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

## AdminAddCourseInstructor
You can execute the `AdminAddCourseInstructor` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminAddCourseInstructor(vars: AdminAddCourseInstructorVariables): MutationPromise<AdminAddCourseInstructorData, AdminAddCourseInstructorVariables>;

interface AdminAddCourseInstructorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminAddCourseInstructorVariables): MutationRef<AdminAddCourseInstructorData, AdminAddCourseInstructorVariables>;
}
export const adminAddCourseInstructorRef: AdminAddCourseInstructorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminAddCourseInstructor(dc: DataConnect, vars: AdminAddCourseInstructorVariables): MutationPromise<AdminAddCourseInstructorData, AdminAddCourseInstructorVariables>;

interface AdminAddCourseInstructorRef {
  ...
  (dc: DataConnect, vars: AdminAddCourseInstructorVariables): MutationRef<AdminAddCourseInstructorData, AdminAddCourseInstructorVariables>;
}
export const adminAddCourseInstructorRef: AdminAddCourseInstructorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminAddCourseInstructorRef:
```typescript
const name = adminAddCourseInstructorRef.operationName;
console.log(name);
```

### Variables
The `AdminAddCourseInstructor` mutation requires an argument of type `AdminAddCourseInstructorVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminAddCourseInstructorVariables {
  courseId: UUIDString;
  userId: string;
}
```
### Return Type
Recall that executing the `AdminAddCourseInstructor` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminAddCourseInstructorData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminAddCourseInstructorData {
  courseInstructor_insert: CourseInstructor_Key;
}
```
### Using `AdminAddCourseInstructor`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminAddCourseInstructor, AdminAddCourseInstructorVariables } from '@dataconnect/functions-generated';

// The `AdminAddCourseInstructor` mutation requires an argument of type `AdminAddCourseInstructorVariables`:
const adminAddCourseInstructorVars: AdminAddCourseInstructorVariables = {
  courseId: ..., 
  userId: ..., 
};

// Call the `adminAddCourseInstructor()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminAddCourseInstructor(adminAddCourseInstructorVars);
// Variables can be defined inline as well.
const { data } = await adminAddCourseInstructor({ courseId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminAddCourseInstructor(dataConnect, adminAddCourseInstructorVars);

console.log(data.courseInstructor_insert);

// Or, you can use the `Promise` API.
adminAddCourseInstructor(adminAddCourseInstructorVars).then((response) => {
  const data = response.data;
  console.log(data.courseInstructor_insert);
});
```

### Using `AdminAddCourseInstructor`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminAddCourseInstructorRef, AdminAddCourseInstructorVariables } from '@dataconnect/functions-generated';

// The `AdminAddCourseInstructor` mutation requires an argument of type `AdminAddCourseInstructorVariables`:
const adminAddCourseInstructorVars: AdminAddCourseInstructorVariables = {
  courseId: ..., 
  userId: ..., 
};

// Call the `adminAddCourseInstructorRef()` function to get a reference to the mutation.
const ref = adminAddCourseInstructorRef(adminAddCourseInstructorVars);
// Variables can be defined inline as well.
const ref = adminAddCourseInstructorRef({ courseId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminAddCourseInstructorRef(dataConnect, adminAddCourseInstructorVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseInstructor_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseInstructor_insert);
});
```

## AdminRemoveCourseInstructor
You can execute the `AdminRemoveCourseInstructor` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminRemoveCourseInstructor(vars: AdminRemoveCourseInstructorVariables): MutationPromise<AdminRemoveCourseInstructorData, AdminRemoveCourseInstructorVariables>;

interface AdminRemoveCourseInstructorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminRemoveCourseInstructorVariables): MutationRef<AdminRemoveCourseInstructorData, AdminRemoveCourseInstructorVariables>;
}
export const adminRemoveCourseInstructorRef: AdminRemoveCourseInstructorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminRemoveCourseInstructor(dc: DataConnect, vars: AdminRemoveCourseInstructorVariables): MutationPromise<AdminRemoveCourseInstructorData, AdminRemoveCourseInstructorVariables>;

interface AdminRemoveCourseInstructorRef {
  ...
  (dc: DataConnect, vars: AdminRemoveCourseInstructorVariables): MutationRef<AdminRemoveCourseInstructorData, AdminRemoveCourseInstructorVariables>;
}
export const adminRemoveCourseInstructorRef: AdminRemoveCourseInstructorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminRemoveCourseInstructorRef:
```typescript
const name = adminRemoveCourseInstructorRef.operationName;
console.log(name);
```

### Variables
The `AdminRemoveCourseInstructor` mutation requires an argument of type `AdminRemoveCourseInstructorVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminRemoveCourseInstructorVariables {
  courseId: UUIDString;
  userId: string;
}
```
### Return Type
Recall that executing the `AdminRemoveCourseInstructor` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminRemoveCourseInstructorData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminRemoveCourseInstructorData {
  courseInstructor_delete?: CourseInstructor_Key | null;
}
```
### Using `AdminRemoveCourseInstructor`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminRemoveCourseInstructor, AdminRemoveCourseInstructorVariables } from '@dataconnect/functions-generated';

// The `AdminRemoveCourseInstructor` mutation requires an argument of type `AdminRemoveCourseInstructorVariables`:
const adminRemoveCourseInstructorVars: AdminRemoveCourseInstructorVariables = {
  courseId: ..., 
  userId: ..., 
};

// Call the `adminRemoveCourseInstructor()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminRemoveCourseInstructor(adminRemoveCourseInstructorVars);
// Variables can be defined inline as well.
const { data } = await adminRemoveCourseInstructor({ courseId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminRemoveCourseInstructor(dataConnect, adminRemoveCourseInstructorVars);

console.log(data.courseInstructor_delete);

// Or, you can use the `Promise` API.
adminRemoveCourseInstructor(adminRemoveCourseInstructorVars).then((response) => {
  const data = response.data;
  console.log(data.courseInstructor_delete);
});
```

### Using `AdminRemoveCourseInstructor`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminRemoveCourseInstructorRef, AdminRemoveCourseInstructorVariables } from '@dataconnect/functions-generated';

// The `AdminRemoveCourseInstructor` mutation requires an argument of type `AdminRemoveCourseInstructorVariables`:
const adminRemoveCourseInstructorVars: AdminRemoveCourseInstructorVariables = {
  courseId: ..., 
  userId: ..., 
};

// Call the `adminRemoveCourseInstructorRef()` function to get a reference to the mutation.
const ref = adminRemoveCourseInstructorRef(adminRemoveCourseInstructorVars);
// Variables can be defined inline as well.
const ref = adminRemoveCourseInstructorRef({ courseId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminRemoveCourseInstructorRef(dataConnect, adminRemoveCourseInstructorVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseInstructor_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseInstructor_delete);
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
import { connectorConfig, enrollInCourse, EnrollInCourseVariables } from '@dataconnect/functions-generated';

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
import { connectorConfig, enrollInCourseRef, EnrollInCourseVariables } from '@dataconnect/functions-generated';

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
import { connectorConfig, enrollInMission, EnrollInMissionVariables } from '@dataconnect/functions-generated';

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
import { connectorConfig, enrollInMissionRef, EnrollInMissionVariables } from '@dataconnect/functions-generated';

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
import { connectorConfig, updateLectureProgress, UpdateLectureProgressVariables } from '@dataconnect/functions-generated';

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
import { connectorConfig, updateLectureProgressRef, UpdateLectureProgressVariables } from '@dataconnect/functions-generated';

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

## AdminUpsertLectureProgress
You can execute the `AdminUpsertLectureProgress` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminUpsertLectureProgress(vars: AdminUpsertLectureProgressVariables): MutationPromise<AdminUpsertLectureProgressData, AdminUpsertLectureProgressVariables>;

interface AdminUpsertLectureProgressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpsertLectureProgressVariables): MutationRef<AdminUpsertLectureProgressData, AdminUpsertLectureProgressVariables>;
}
export const adminUpsertLectureProgressRef: AdminUpsertLectureProgressRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminUpsertLectureProgress(dc: DataConnect, vars: AdminUpsertLectureProgressVariables): MutationPromise<AdminUpsertLectureProgressData, AdminUpsertLectureProgressVariables>;

interface AdminUpsertLectureProgressRef {
  ...
  (dc: DataConnect, vars: AdminUpsertLectureProgressVariables): MutationRef<AdminUpsertLectureProgressData, AdminUpsertLectureProgressVariables>;
}
export const adminUpsertLectureProgressRef: AdminUpsertLectureProgressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminUpsertLectureProgressRef:
```typescript
const name = adminUpsertLectureProgressRef.operationName;
console.log(name);
```

### Variables
The `AdminUpsertLectureProgress` mutation requires an argument of type `AdminUpsertLectureProgressVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminUpsertLectureProgressVariables {
  userId: string;
  lectureId: UUIDString;
  lastWatchedSecond: number;
  completedAt?: TimestampString | null;
}
```
### Return Type
Recall that executing the `AdminUpsertLectureProgress` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminUpsertLectureProgressData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminUpsertLectureProgressData {
  lectureProgress_upsert: LectureProgress_Key;
}
```
### Using `AdminUpsertLectureProgress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminUpsertLectureProgress, AdminUpsertLectureProgressVariables } from '@dataconnect/functions-generated';

// The `AdminUpsertLectureProgress` mutation requires an argument of type `AdminUpsertLectureProgressVariables`:
const adminUpsertLectureProgressVars: AdminUpsertLectureProgressVariables = {
  userId: ..., 
  lectureId: ..., 
  lastWatchedSecond: ..., 
  completedAt: ..., // optional
};

// Call the `adminUpsertLectureProgress()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminUpsertLectureProgress(adminUpsertLectureProgressVars);
// Variables can be defined inline as well.
const { data } = await adminUpsertLectureProgress({ userId: ..., lectureId: ..., lastWatchedSecond: ..., completedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminUpsertLectureProgress(dataConnect, adminUpsertLectureProgressVars);

console.log(data.lectureProgress_upsert);

// Or, you can use the `Promise` API.
adminUpsertLectureProgress(adminUpsertLectureProgressVars).then((response) => {
  const data = response.data;
  console.log(data.lectureProgress_upsert);
});
```

### Using `AdminUpsertLectureProgress`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminUpsertLectureProgressRef, AdminUpsertLectureProgressVariables } from '@dataconnect/functions-generated';

// The `AdminUpsertLectureProgress` mutation requires an argument of type `AdminUpsertLectureProgressVariables`:
const adminUpsertLectureProgressVars: AdminUpsertLectureProgressVariables = {
  userId: ..., 
  lectureId: ..., 
  lastWatchedSecond: ..., 
  completedAt: ..., // optional
};

// Call the `adminUpsertLectureProgressRef()` function to get a reference to the mutation.
const ref = adminUpsertLectureProgressRef(adminUpsertLectureProgressVars);
// Variables can be defined inline as well.
const ref = adminUpsertLectureProgressRef({ userId: ..., lectureId: ..., lastWatchedSecond: ..., completedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminUpsertLectureProgressRef(dataConnect, adminUpsertLectureProgressVars);

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

## UpdateEnrollmentStatus
You can execute the `UpdateEnrollmentStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateEnrollmentStatus(vars: UpdateEnrollmentStatusVariables): MutationPromise<UpdateEnrollmentStatusData, UpdateEnrollmentStatusVariables>;

interface UpdateEnrollmentStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEnrollmentStatusVariables): MutationRef<UpdateEnrollmentStatusData, UpdateEnrollmentStatusVariables>;
}
export const updateEnrollmentStatusRef: UpdateEnrollmentStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateEnrollmentStatus(dc: DataConnect, vars: UpdateEnrollmentStatusVariables): MutationPromise<UpdateEnrollmentStatusData, UpdateEnrollmentStatusVariables>;

interface UpdateEnrollmentStatusRef {
  ...
  (dc: DataConnect, vars: UpdateEnrollmentStatusVariables): MutationRef<UpdateEnrollmentStatusData, UpdateEnrollmentStatusVariables>;
}
export const updateEnrollmentStatusRef: UpdateEnrollmentStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateEnrollmentStatusRef:
```typescript
const name = updateEnrollmentStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateEnrollmentStatus` mutation requires an argument of type `UpdateEnrollmentStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateEnrollmentStatusVariables {
  enrollmentId: UUIDString;
  status: EnrollmentStatus;
  completedAt?: TimestampString | null;
}
```
### Return Type
Recall that executing the `UpdateEnrollmentStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateEnrollmentStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateEnrollmentStatusData {
  enrollment_update?: Enrollment_Key | null;
}
```
### Using `UpdateEnrollmentStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateEnrollmentStatus, UpdateEnrollmentStatusVariables } from '@dataconnect/functions-generated';

// The `UpdateEnrollmentStatus` mutation requires an argument of type `UpdateEnrollmentStatusVariables`:
const updateEnrollmentStatusVars: UpdateEnrollmentStatusVariables = {
  enrollmentId: ..., 
  status: ..., 
  completedAt: ..., // optional
};

// Call the `updateEnrollmentStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateEnrollmentStatus(updateEnrollmentStatusVars);
// Variables can be defined inline as well.
const { data } = await updateEnrollmentStatus({ enrollmentId: ..., status: ..., completedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateEnrollmentStatus(dataConnect, updateEnrollmentStatusVars);

console.log(data.enrollment_update);

// Or, you can use the `Promise` API.
updateEnrollmentStatus(updateEnrollmentStatusVars).then((response) => {
  const data = response.data;
  console.log(data.enrollment_update);
});
```

### Using `UpdateEnrollmentStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateEnrollmentStatusRef, UpdateEnrollmentStatusVariables } from '@dataconnect/functions-generated';

// The `UpdateEnrollmentStatus` mutation requires an argument of type `UpdateEnrollmentStatusVariables`:
const updateEnrollmentStatusVars: UpdateEnrollmentStatusVariables = {
  enrollmentId: ..., 
  status: ..., 
  completedAt: ..., // optional
};

// Call the `updateEnrollmentStatusRef()` function to get a reference to the mutation.
const ref = updateEnrollmentStatusRef(updateEnrollmentStatusVars);
// Variables can be defined inline as well.
const ref = updateEnrollmentStatusRef({ enrollmentId: ..., status: ..., completedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateEnrollmentStatusRef(dataConnect, updateEnrollmentStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.enrollment_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollment_update);
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
import { connectorConfig, submitMission, SubmitMissionVariables } from '@dataconnect/functions-generated';

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
import { connectorConfig, submitMissionRef, SubmitMissionVariables } from '@dataconnect/functions-generated';

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
import { connectorConfig, gradeSubmission, GradeSubmissionVariables } from '@dataconnect/functions-generated';

// The `GradeSubmission` mutation requires an argument of type `GradeSubmissionVariables`:
const gradeSubmissionVars: GradeSubmissionVariables = {
  submissionId: ..., 
  feedback: ..., // optional
};

// Call the `gradeSubmission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await gradeSubmission(gradeSubmissionVars);
// Variables can be defined inline as well.
const { data } = await gradeSubmission({ submissionId: ..., feedback: ..., });

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
import { connectorConfig, gradeSubmissionRef, GradeSubmissionVariables } from '@dataconnect/functions-generated';

// The `GradeSubmission` mutation requires an argument of type `GradeSubmissionVariables`:
const gradeSubmissionVars: GradeSubmissionVariables = {
  submissionId: ..., 
  feedback: ..., // optional
};

// Call the `gradeSubmissionRef()` function to get a reference to the mutation.
const ref = gradeSubmissionRef(gradeSubmissionVars);
// Variables can be defined inline as well.
const ref = gradeSubmissionRef({ submissionId: ..., feedback: ..., });

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

## AddCriterionScore
You can execute the `AddCriterionScore` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addCriterionScore(vars: AddCriterionScoreVariables): MutationPromise<AddCriterionScoreData, AddCriterionScoreVariables>;

interface AddCriterionScoreRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddCriterionScoreVariables): MutationRef<AddCriterionScoreData, AddCriterionScoreVariables>;
}
export const addCriterionScoreRef: AddCriterionScoreRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addCriterionScore(dc: DataConnect, vars: AddCriterionScoreVariables): MutationPromise<AddCriterionScoreData, AddCriterionScoreVariables>;

interface AddCriterionScoreRef {
  ...
  (dc: DataConnect, vars: AddCriterionScoreVariables): MutationRef<AddCriterionScoreData, AddCriterionScoreVariables>;
}
export const addCriterionScoreRef: AddCriterionScoreRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addCriterionScoreRef:
```typescript
const name = addCriterionScoreRef.operationName;
console.log(name);
```

### Variables
The `AddCriterionScore` mutation requires an argument of type `AddCriterionScoreVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddCriterionScoreVariables {
  submissionId: UUIDString;
  criterionId: UUIDString;
  score: number;
}
```
### Return Type
Recall that executing the `AddCriterionScore` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddCriterionScoreData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddCriterionScoreData {
  missionSubmissionScore_upsert: MissionSubmissionScore_Key;
}
```
### Using `AddCriterionScore`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addCriterionScore, AddCriterionScoreVariables } from '@dataconnect/functions-generated';

// The `AddCriterionScore` mutation requires an argument of type `AddCriterionScoreVariables`:
const addCriterionScoreVars: AddCriterionScoreVariables = {
  submissionId: ..., 
  criterionId: ..., 
  score: ..., 
};

// Call the `addCriterionScore()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addCriterionScore(addCriterionScoreVars);
// Variables can be defined inline as well.
const { data } = await addCriterionScore({ submissionId: ..., criterionId: ..., score: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addCriterionScore(dataConnect, addCriterionScoreVars);

console.log(data.missionSubmissionScore_upsert);

// Or, you can use the `Promise` API.
addCriterionScore(addCriterionScoreVars).then((response) => {
  const data = response.data;
  console.log(data.missionSubmissionScore_upsert);
});
```

### Using `AddCriterionScore`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addCriterionScoreRef, AddCriterionScoreVariables } from '@dataconnect/functions-generated';

// The `AddCriterionScore` mutation requires an argument of type `AddCriterionScoreVariables`:
const addCriterionScoreVars: AddCriterionScoreVariables = {
  submissionId: ..., 
  criterionId: ..., 
  score: ..., 
};

// Call the `addCriterionScoreRef()` function to get a reference to the mutation.
const ref = addCriterionScoreRef(addCriterionScoreVars);
// Variables can be defined inline as well.
const ref = addCriterionScoreRef({ submissionId: ..., criterionId: ..., score: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addCriterionScoreRef(dataConnect, addCriterionScoreVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.missionSubmissionScore_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.missionSubmissionScore_upsert);
});
```

## AdminCreateMission
You can execute the `AdminCreateMission` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminCreateMission(vars: AdminCreateMissionVariables): MutationPromise<AdminCreateMissionData, AdminCreateMissionVariables>;

interface AdminCreateMissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateMissionVariables): MutationRef<AdminCreateMissionData, AdminCreateMissionVariables>;
}
export const adminCreateMissionRef: AdminCreateMissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminCreateMission(dc: DataConnect, vars: AdminCreateMissionVariables): MutationPromise<AdminCreateMissionData, AdminCreateMissionVariables>;

interface AdminCreateMissionRef {
  ...
  (dc: DataConnect, vars: AdminCreateMissionVariables): MutationRef<AdminCreateMissionData, AdminCreateMissionVariables>;
}
export const adminCreateMissionRef: AdminCreateMissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminCreateMissionRef:
```typescript
const name = adminCreateMissionRef.operationName;
console.log(name);
```

### Variables
The `AdminCreateMission` mutation requires an argument of type `AdminCreateMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminCreateMissionVariables {
  title: string;
  scenarioDescription: string;
  durationMinutes: number;
  categoryId: UUIDString;
  difficulty: MissionDifficulty;
  skillsTested: string[];
  courseId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `AdminCreateMission` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminCreateMissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminCreateMissionData {
  mission_insert: Mission_Key;
}
```
### Using `AdminCreateMission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminCreateMission, AdminCreateMissionVariables } from '@dataconnect/functions-generated';

// The `AdminCreateMission` mutation requires an argument of type `AdminCreateMissionVariables`:
const adminCreateMissionVars: AdminCreateMissionVariables = {
  title: ..., 
  scenarioDescription: ..., 
  durationMinutes: ..., 
  categoryId: ..., 
  difficulty: ..., 
  skillsTested: ..., 
  courseId: ..., // optional
};

// Call the `adminCreateMission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminCreateMission(adminCreateMissionVars);
// Variables can be defined inline as well.
const { data } = await adminCreateMission({ title: ..., scenarioDescription: ..., durationMinutes: ..., categoryId: ..., difficulty: ..., skillsTested: ..., courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminCreateMission(dataConnect, adminCreateMissionVars);

console.log(data.mission_insert);

// Or, you can use the `Promise` API.
adminCreateMission(adminCreateMissionVars).then((response) => {
  const data = response.data;
  console.log(data.mission_insert);
});
```

### Using `AdminCreateMission`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminCreateMissionRef, AdminCreateMissionVariables } from '@dataconnect/functions-generated';

// The `AdminCreateMission` mutation requires an argument of type `AdminCreateMissionVariables`:
const adminCreateMissionVars: AdminCreateMissionVariables = {
  title: ..., 
  scenarioDescription: ..., 
  durationMinutes: ..., 
  categoryId: ..., 
  difficulty: ..., 
  skillsTested: ..., 
  courseId: ..., // optional
};

// Call the `adminCreateMissionRef()` function to get a reference to the mutation.
const ref = adminCreateMissionRef(adminCreateMissionVars);
// Variables can be defined inline as well.
const ref = adminCreateMissionRef({ title: ..., scenarioDescription: ..., durationMinutes: ..., categoryId: ..., difficulty: ..., skillsTested: ..., courseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminCreateMissionRef(dataConnect, adminCreateMissionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.mission_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.mission_insert);
});
```

## AdminUpdateMission
You can execute the `AdminUpdateMission` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminUpdateMission(vars: AdminUpdateMissionVariables): MutationPromise<AdminUpdateMissionData, AdminUpdateMissionVariables>;

interface AdminUpdateMissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateMissionVariables): MutationRef<AdminUpdateMissionData, AdminUpdateMissionVariables>;
}
export const adminUpdateMissionRef: AdminUpdateMissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminUpdateMission(dc: DataConnect, vars: AdminUpdateMissionVariables): MutationPromise<AdminUpdateMissionData, AdminUpdateMissionVariables>;

interface AdminUpdateMissionRef {
  ...
  (dc: DataConnect, vars: AdminUpdateMissionVariables): MutationRef<AdminUpdateMissionData, AdminUpdateMissionVariables>;
}
export const adminUpdateMissionRef: AdminUpdateMissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminUpdateMissionRef:
```typescript
const name = adminUpdateMissionRef.operationName;
console.log(name);
```

### Variables
The `AdminUpdateMission` mutation requires an argument of type `AdminUpdateMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminUpdateMissionVariables {
  missionId: UUIDString;
  title?: string | null;
  scenarioDescription?: string | null;
  durationMinutes?: number | null;
  categoryId?: UUIDString | null;
  difficulty?: MissionDifficulty | null;
  skillsTested?: string[] | null;
  courseId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `AdminUpdateMission` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminUpdateMissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminUpdateMissionData {
  mission_update?: Mission_Key | null;
}
```
### Using `AdminUpdateMission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminUpdateMission, AdminUpdateMissionVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateMission` mutation requires an argument of type `AdminUpdateMissionVariables`:
const adminUpdateMissionVars: AdminUpdateMissionVariables = {
  missionId: ..., 
  title: ..., // optional
  scenarioDescription: ..., // optional
  durationMinutes: ..., // optional
  categoryId: ..., // optional
  difficulty: ..., // optional
  skillsTested: ..., // optional
  courseId: ..., // optional
};

// Call the `adminUpdateMission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminUpdateMission(adminUpdateMissionVars);
// Variables can be defined inline as well.
const { data } = await adminUpdateMission({ missionId: ..., title: ..., scenarioDescription: ..., durationMinutes: ..., categoryId: ..., difficulty: ..., skillsTested: ..., courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminUpdateMission(dataConnect, adminUpdateMissionVars);

console.log(data.mission_update);

// Or, you can use the `Promise` API.
adminUpdateMission(adminUpdateMissionVars).then((response) => {
  const data = response.data;
  console.log(data.mission_update);
});
```

### Using `AdminUpdateMission`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminUpdateMissionRef, AdminUpdateMissionVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateMission` mutation requires an argument of type `AdminUpdateMissionVariables`:
const adminUpdateMissionVars: AdminUpdateMissionVariables = {
  missionId: ..., 
  title: ..., // optional
  scenarioDescription: ..., // optional
  durationMinutes: ..., // optional
  categoryId: ..., // optional
  difficulty: ..., // optional
  skillsTested: ..., // optional
  courseId: ..., // optional
};

// Call the `adminUpdateMissionRef()` function to get a reference to the mutation.
const ref = adminUpdateMissionRef(adminUpdateMissionVars);
// Variables can be defined inline as well.
const ref = adminUpdateMissionRef({ missionId: ..., title: ..., scenarioDescription: ..., durationMinutes: ..., categoryId: ..., difficulty: ..., skillsTested: ..., courseId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminUpdateMissionRef(dataConnect, adminUpdateMissionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.mission_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.mission_update);
});
```

## AdminSoftDeleteMission
You can execute the `AdminSoftDeleteMission` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminSoftDeleteMission(vars: AdminSoftDeleteMissionVariables): MutationPromise<AdminSoftDeleteMissionData, AdminSoftDeleteMissionVariables>;

interface AdminSoftDeleteMissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSoftDeleteMissionVariables): MutationRef<AdminSoftDeleteMissionData, AdminSoftDeleteMissionVariables>;
}
export const adminSoftDeleteMissionRef: AdminSoftDeleteMissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSoftDeleteMission(dc: DataConnect, vars: AdminSoftDeleteMissionVariables): MutationPromise<AdminSoftDeleteMissionData, AdminSoftDeleteMissionVariables>;

interface AdminSoftDeleteMissionRef {
  ...
  (dc: DataConnect, vars: AdminSoftDeleteMissionVariables): MutationRef<AdminSoftDeleteMissionData, AdminSoftDeleteMissionVariables>;
}
export const adminSoftDeleteMissionRef: AdminSoftDeleteMissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSoftDeleteMissionRef:
```typescript
const name = adminSoftDeleteMissionRef.operationName;
console.log(name);
```

### Variables
The `AdminSoftDeleteMission` mutation requires an argument of type `AdminSoftDeleteMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSoftDeleteMissionVariables {
  missionId: UUIDString;
}
```
### Return Type
Recall that executing the `AdminSoftDeleteMission` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSoftDeleteMissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSoftDeleteMissionData {
  mission_update?: Mission_Key | null;
}
```
### Using `AdminSoftDeleteMission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSoftDeleteMission, AdminSoftDeleteMissionVariables } from '@dataconnect/functions-generated';

// The `AdminSoftDeleteMission` mutation requires an argument of type `AdminSoftDeleteMissionVariables`:
const adminSoftDeleteMissionVars: AdminSoftDeleteMissionVariables = {
  missionId: ..., 
};

// Call the `adminSoftDeleteMission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSoftDeleteMission(adminSoftDeleteMissionVars);
// Variables can be defined inline as well.
const { data } = await adminSoftDeleteMission({ missionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSoftDeleteMission(dataConnect, adminSoftDeleteMissionVars);

console.log(data.mission_update);

// Or, you can use the `Promise` API.
adminSoftDeleteMission(adminSoftDeleteMissionVars).then((response) => {
  const data = response.data;
  console.log(data.mission_update);
});
```

### Using `AdminSoftDeleteMission`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSoftDeleteMissionRef, AdminSoftDeleteMissionVariables } from '@dataconnect/functions-generated';

// The `AdminSoftDeleteMission` mutation requires an argument of type `AdminSoftDeleteMissionVariables`:
const adminSoftDeleteMissionVars: AdminSoftDeleteMissionVariables = {
  missionId: ..., 
};

// Call the `adminSoftDeleteMissionRef()` function to get a reference to the mutation.
const ref = adminSoftDeleteMissionRef(adminSoftDeleteMissionVars);
// Variables can be defined inline as well.
const ref = adminSoftDeleteMissionRef({ missionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSoftDeleteMissionRef(dataConnect, adminSoftDeleteMissionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.mission_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.mission_update);
});
```

## AdminCreateMicroLesson
You can execute the `AdminCreateMicroLesson` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminCreateMicroLesson(vars: AdminCreateMicroLessonVariables): MutationPromise<AdminCreateMicroLessonData, AdminCreateMicroLessonVariables>;

interface AdminCreateMicroLessonRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateMicroLessonVariables): MutationRef<AdminCreateMicroLessonData, AdminCreateMicroLessonVariables>;
}
export const adminCreateMicroLessonRef: AdminCreateMicroLessonRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminCreateMicroLesson(dc: DataConnect, vars: AdminCreateMicroLessonVariables): MutationPromise<AdminCreateMicroLessonData, AdminCreateMicroLessonVariables>;

interface AdminCreateMicroLessonRef {
  ...
  (dc: DataConnect, vars: AdminCreateMicroLessonVariables): MutationRef<AdminCreateMicroLessonData, AdminCreateMicroLessonVariables>;
}
export const adminCreateMicroLessonRef: AdminCreateMicroLessonRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminCreateMicroLessonRef:
```typescript
const name = adminCreateMicroLessonRef.operationName;
console.log(name);
```

### Variables
The `AdminCreateMicroLesson` mutation requires an argument of type `AdminCreateMicroLessonVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminCreateMicroLessonVariables {
  missionId: UUIDString;
  title: string;
  type: LectureType;
  assetUrl?: string | null;
  content?: string | null;
  durationSeconds?: number | null;
  order: number;
}
```
### Return Type
Recall that executing the `AdminCreateMicroLesson` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminCreateMicroLessonData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminCreateMicroLessonData {
  missionMicroLesson_insert: MissionMicroLesson_Key;
}
```
### Using `AdminCreateMicroLesson`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminCreateMicroLesson, AdminCreateMicroLessonVariables } from '@dataconnect/functions-generated';

// The `AdminCreateMicroLesson` mutation requires an argument of type `AdminCreateMicroLessonVariables`:
const adminCreateMicroLessonVars: AdminCreateMicroLessonVariables = {
  missionId: ..., 
  title: ..., 
  type: ..., 
  assetUrl: ..., // optional
  content: ..., // optional
  durationSeconds: ..., // optional
  order: ..., 
};

// Call the `adminCreateMicroLesson()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminCreateMicroLesson(adminCreateMicroLessonVars);
// Variables can be defined inline as well.
const { data } = await adminCreateMicroLesson({ missionId: ..., title: ..., type: ..., assetUrl: ..., content: ..., durationSeconds: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminCreateMicroLesson(dataConnect, adminCreateMicroLessonVars);

console.log(data.missionMicroLesson_insert);

// Or, you can use the `Promise` API.
adminCreateMicroLesson(adminCreateMicroLessonVars).then((response) => {
  const data = response.data;
  console.log(data.missionMicroLesson_insert);
});
```

### Using `AdminCreateMicroLesson`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminCreateMicroLessonRef, AdminCreateMicroLessonVariables } from '@dataconnect/functions-generated';

// The `AdminCreateMicroLesson` mutation requires an argument of type `AdminCreateMicroLessonVariables`:
const adminCreateMicroLessonVars: AdminCreateMicroLessonVariables = {
  missionId: ..., 
  title: ..., 
  type: ..., 
  assetUrl: ..., // optional
  content: ..., // optional
  durationSeconds: ..., // optional
  order: ..., 
};

// Call the `adminCreateMicroLessonRef()` function to get a reference to the mutation.
const ref = adminCreateMicroLessonRef(adminCreateMicroLessonVars);
// Variables can be defined inline as well.
const ref = adminCreateMicroLessonRef({ missionId: ..., title: ..., type: ..., assetUrl: ..., content: ..., durationSeconds: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminCreateMicroLessonRef(dataConnect, adminCreateMicroLessonVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.missionMicroLesson_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.missionMicroLesson_insert);
});
```

## AdminUpdateMicroLesson
You can execute the `AdminUpdateMicroLesson` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminUpdateMicroLesson(vars: AdminUpdateMicroLessonVariables): MutationPromise<AdminUpdateMicroLessonData, AdminUpdateMicroLessonVariables>;

interface AdminUpdateMicroLessonRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateMicroLessonVariables): MutationRef<AdminUpdateMicroLessonData, AdminUpdateMicroLessonVariables>;
}
export const adminUpdateMicroLessonRef: AdminUpdateMicroLessonRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminUpdateMicroLesson(dc: DataConnect, vars: AdminUpdateMicroLessonVariables): MutationPromise<AdminUpdateMicroLessonData, AdminUpdateMicroLessonVariables>;

interface AdminUpdateMicroLessonRef {
  ...
  (dc: DataConnect, vars: AdminUpdateMicroLessonVariables): MutationRef<AdminUpdateMicroLessonData, AdminUpdateMicroLessonVariables>;
}
export const adminUpdateMicroLessonRef: AdminUpdateMicroLessonRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminUpdateMicroLessonRef:
```typescript
const name = adminUpdateMicroLessonRef.operationName;
console.log(name);
```

### Variables
The `AdminUpdateMicroLesson` mutation requires an argument of type `AdminUpdateMicroLessonVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminUpdateMicroLessonVariables {
  microLessonId: UUIDString;
  title?: string | null;
  type?: LectureType | null;
  assetUrl?: string | null;
  content?: string | null;
  durationSeconds?: number | null;
}
```
### Return Type
Recall that executing the `AdminUpdateMicroLesson` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminUpdateMicroLessonData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminUpdateMicroLessonData {
  missionMicroLesson_update?: MissionMicroLesson_Key | null;
}
```
### Using `AdminUpdateMicroLesson`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminUpdateMicroLesson, AdminUpdateMicroLessonVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateMicroLesson` mutation requires an argument of type `AdminUpdateMicroLessonVariables`:
const adminUpdateMicroLessonVars: AdminUpdateMicroLessonVariables = {
  microLessonId: ..., 
  title: ..., // optional
  type: ..., // optional
  assetUrl: ..., // optional
  content: ..., // optional
  durationSeconds: ..., // optional
};

// Call the `adminUpdateMicroLesson()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminUpdateMicroLesson(adminUpdateMicroLessonVars);
// Variables can be defined inline as well.
const { data } = await adminUpdateMicroLesson({ microLessonId: ..., title: ..., type: ..., assetUrl: ..., content: ..., durationSeconds: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminUpdateMicroLesson(dataConnect, adminUpdateMicroLessonVars);

console.log(data.missionMicroLesson_update);

// Or, you can use the `Promise` API.
adminUpdateMicroLesson(adminUpdateMicroLessonVars).then((response) => {
  const data = response.data;
  console.log(data.missionMicroLesson_update);
});
```

### Using `AdminUpdateMicroLesson`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminUpdateMicroLessonRef, AdminUpdateMicroLessonVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateMicroLesson` mutation requires an argument of type `AdminUpdateMicroLessonVariables`:
const adminUpdateMicroLessonVars: AdminUpdateMicroLessonVariables = {
  microLessonId: ..., 
  title: ..., // optional
  type: ..., // optional
  assetUrl: ..., // optional
  content: ..., // optional
  durationSeconds: ..., // optional
};

// Call the `adminUpdateMicroLessonRef()` function to get a reference to the mutation.
const ref = adminUpdateMicroLessonRef(adminUpdateMicroLessonVars);
// Variables can be defined inline as well.
const ref = adminUpdateMicroLessonRef({ microLessonId: ..., title: ..., type: ..., assetUrl: ..., content: ..., durationSeconds: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminUpdateMicroLessonRef(dataConnect, adminUpdateMicroLessonVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.missionMicroLesson_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.missionMicroLesson_update);
});
```

## AdminDeleteMicroLesson
You can execute the `AdminDeleteMicroLesson` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminDeleteMicroLesson(vars: AdminDeleteMicroLessonVariables): MutationPromise<AdminDeleteMicroLessonData, AdminDeleteMicroLessonVariables>;

interface AdminDeleteMicroLessonRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteMicroLessonVariables): MutationRef<AdminDeleteMicroLessonData, AdminDeleteMicroLessonVariables>;
}
export const adminDeleteMicroLessonRef: AdminDeleteMicroLessonRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminDeleteMicroLesson(dc: DataConnect, vars: AdminDeleteMicroLessonVariables): MutationPromise<AdminDeleteMicroLessonData, AdminDeleteMicroLessonVariables>;

interface AdminDeleteMicroLessonRef {
  ...
  (dc: DataConnect, vars: AdminDeleteMicroLessonVariables): MutationRef<AdminDeleteMicroLessonData, AdminDeleteMicroLessonVariables>;
}
export const adminDeleteMicroLessonRef: AdminDeleteMicroLessonRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDeleteMicroLessonRef:
```typescript
const name = adminDeleteMicroLessonRef.operationName;
console.log(name);
```

### Variables
The `AdminDeleteMicroLesson` mutation requires an argument of type `AdminDeleteMicroLessonVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminDeleteMicroLessonVariables {
  microLessonId: UUIDString;
}
```
### Return Type
Recall that executing the `AdminDeleteMicroLesson` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDeleteMicroLessonData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDeleteMicroLessonData {
  missionMicroLesson_delete?: MissionMicroLesson_Key | null;
}
```
### Using `AdminDeleteMicroLesson`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDeleteMicroLesson, AdminDeleteMicroLessonVariables } from '@dataconnect/functions-generated';

// The `AdminDeleteMicroLesson` mutation requires an argument of type `AdminDeleteMicroLessonVariables`:
const adminDeleteMicroLessonVars: AdminDeleteMicroLessonVariables = {
  microLessonId: ..., 
};

// Call the `adminDeleteMicroLesson()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeleteMicroLesson(adminDeleteMicroLessonVars);
// Variables can be defined inline as well.
const { data } = await adminDeleteMicroLesson({ microLessonId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDeleteMicroLesson(dataConnect, adminDeleteMicroLessonVars);

console.log(data.missionMicroLesson_delete);

// Or, you can use the `Promise` API.
adminDeleteMicroLesson(adminDeleteMicroLessonVars).then((response) => {
  const data = response.data;
  console.log(data.missionMicroLesson_delete);
});
```

### Using `AdminDeleteMicroLesson`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminDeleteMicroLessonRef, AdminDeleteMicroLessonVariables } from '@dataconnect/functions-generated';

// The `AdminDeleteMicroLesson` mutation requires an argument of type `AdminDeleteMicroLessonVariables`:
const adminDeleteMicroLessonVars: AdminDeleteMicroLessonVariables = {
  microLessonId: ..., 
};

// Call the `adminDeleteMicroLessonRef()` function to get a reference to the mutation.
const ref = adminDeleteMicroLessonRef(adminDeleteMicroLessonVars);
// Variables can be defined inline as well.
const ref = adminDeleteMicroLessonRef({ microLessonId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDeleteMicroLessonRef(dataConnect, adminDeleteMicroLessonVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.missionMicroLesson_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.missionMicroLesson_delete);
});
```

## AdminUpdateMicroLessonOrder
You can execute the `AdminUpdateMicroLessonOrder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminUpdateMicroLessonOrder(vars: AdminUpdateMicroLessonOrderVariables): MutationPromise<AdminUpdateMicroLessonOrderData, AdminUpdateMicroLessonOrderVariables>;

interface AdminUpdateMicroLessonOrderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateMicroLessonOrderVariables): MutationRef<AdminUpdateMicroLessonOrderData, AdminUpdateMicroLessonOrderVariables>;
}
export const adminUpdateMicroLessonOrderRef: AdminUpdateMicroLessonOrderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminUpdateMicroLessonOrder(dc: DataConnect, vars: AdminUpdateMicroLessonOrderVariables): MutationPromise<AdminUpdateMicroLessonOrderData, AdminUpdateMicroLessonOrderVariables>;

interface AdminUpdateMicroLessonOrderRef {
  ...
  (dc: DataConnect, vars: AdminUpdateMicroLessonOrderVariables): MutationRef<AdminUpdateMicroLessonOrderData, AdminUpdateMicroLessonOrderVariables>;
}
export const adminUpdateMicroLessonOrderRef: AdminUpdateMicroLessonOrderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminUpdateMicroLessonOrderRef:
```typescript
const name = adminUpdateMicroLessonOrderRef.operationName;
console.log(name);
```

### Variables
The `AdminUpdateMicroLessonOrder` mutation requires an argument of type `AdminUpdateMicroLessonOrderVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminUpdateMicroLessonOrderVariables {
  microLessonId: UUIDString;
  order: number;
}
```
### Return Type
Recall that executing the `AdminUpdateMicroLessonOrder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminUpdateMicroLessonOrderData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminUpdateMicroLessonOrderData {
  missionMicroLesson_update?: MissionMicroLesson_Key | null;
}
```
### Using `AdminUpdateMicroLessonOrder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminUpdateMicroLessonOrder, AdminUpdateMicroLessonOrderVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateMicroLessonOrder` mutation requires an argument of type `AdminUpdateMicroLessonOrderVariables`:
const adminUpdateMicroLessonOrderVars: AdminUpdateMicroLessonOrderVariables = {
  microLessonId: ..., 
  order: ..., 
};

// Call the `adminUpdateMicroLessonOrder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminUpdateMicroLessonOrder(adminUpdateMicroLessonOrderVars);
// Variables can be defined inline as well.
const { data } = await adminUpdateMicroLessonOrder({ microLessonId: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminUpdateMicroLessonOrder(dataConnect, adminUpdateMicroLessonOrderVars);

console.log(data.missionMicroLesson_update);

// Or, you can use the `Promise` API.
adminUpdateMicroLessonOrder(adminUpdateMicroLessonOrderVars).then((response) => {
  const data = response.data;
  console.log(data.missionMicroLesson_update);
});
```

### Using `AdminUpdateMicroLessonOrder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminUpdateMicroLessonOrderRef, AdminUpdateMicroLessonOrderVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateMicroLessonOrder` mutation requires an argument of type `AdminUpdateMicroLessonOrderVariables`:
const adminUpdateMicroLessonOrderVars: AdminUpdateMicroLessonOrderVariables = {
  microLessonId: ..., 
  order: ..., 
};

// Call the `adminUpdateMicroLessonOrderRef()` function to get a reference to the mutation.
const ref = adminUpdateMicroLessonOrderRef(adminUpdateMicroLessonOrderVars);
// Variables can be defined inline as well.
const ref = adminUpdateMicroLessonOrderRef({ microLessonId: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminUpdateMicroLessonOrderRef(dataConnect, adminUpdateMicroLessonOrderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.missionMicroLesson_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.missionMicroLesson_update);
});
```

## AdminCreateMissionTemplate
You can execute the `AdminCreateMissionTemplate` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminCreateMissionTemplate(vars: AdminCreateMissionTemplateVariables): MutationPromise<AdminCreateMissionTemplateData, AdminCreateMissionTemplateVariables>;

interface AdminCreateMissionTemplateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateMissionTemplateVariables): MutationRef<AdminCreateMissionTemplateData, AdminCreateMissionTemplateVariables>;
}
export const adminCreateMissionTemplateRef: AdminCreateMissionTemplateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminCreateMissionTemplate(dc: DataConnect, vars: AdminCreateMissionTemplateVariables): MutationPromise<AdminCreateMissionTemplateData, AdminCreateMissionTemplateVariables>;

interface AdminCreateMissionTemplateRef {
  ...
  (dc: DataConnect, vars: AdminCreateMissionTemplateVariables): MutationRef<AdminCreateMissionTemplateData, AdminCreateMissionTemplateVariables>;
}
export const adminCreateMissionTemplateRef: AdminCreateMissionTemplateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminCreateMissionTemplateRef:
```typescript
const name = adminCreateMissionTemplateRef.operationName;
console.log(name);
```

### Variables
The `AdminCreateMissionTemplate` mutation requires an argument of type `AdminCreateMissionTemplateVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminCreateMissionTemplateVariables {
  missionId: UUIDString;
  title: string;
  fileUrl: string;
  fileType: string;
}
```
### Return Type
Recall that executing the `AdminCreateMissionTemplate` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminCreateMissionTemplateData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminCreateMissionTemplateData {
  missionTemplate_insert: MissionTemplate_Key;
}
```
### Using `AdminCreateMissionTemplate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminCreateMissionTemplate, AdminCreateMissionTemplateVariables } from '@dataconnect/functions-generated';

// The `AdminCreateMissionTemplate` mutation requires an argument of type `AdminCreateMissionTemplateVariables`:
const adminCreateMissionTemplateVars: AdminCreateMissionTemplateVariables = {
  missionId: ..., 
  title: ..., 
  fileUrl: ..., 
  fileType: ..., 
};

// Call the `adminCreateMissionTemplate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminCreateMissionTemplate(adminCreateMissionTemplateVars);
// Variables can be defined inline as well.
const { data } = await adminCreateMissionTemplate({ missionId: ..., title: ..., fileUrl: ..., fileType: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminCreateMissionTemplate(dataConnect, adminCreateMissionTemplateVars);

console.log(data.missionTemplate_insert);

// Or, you can use the `Promise` API.
adminCreateMissionTemplate(adminCreateMissionTemplateVars).then((response) => {
  const data = response.data;
  console.log(data.missionTemplate_insert);
});
```

### Using `AdminCreateMissionTemplate`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminCreateMissionTemplateRef, AdminCreateMissionTemplateVariables } from '@dataconnect/functions-generated';

// The `AdminCreateMissionTemplate` mutation requires an argument of type `AdminCreateMissionTemplateVariables`:
const adminCreateMissionTemplateVars: AdminCreateMissionTemplateVariables = {
  missionId: ..., 
  title: ..., 
  fileUrl: ..., 
  fileType: ..., 
};

// Call the `adminCreateMissionTemplateRef()` function to get a reference to the mutation.
const ref = adminCreateMissionTemplateRef(adminCreateMissionTemplateVars);
// Variables can be defined inline as well.
const ref = adminCreateMissionTemplateRef({ missionId: ..., title: ..., fileUrl: ..., fileType: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminCreateMissionTemplateRef(dataConnect, adminCreateMissionTemplateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.missionTemplate_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.missionTemplate_insert);
});
```

## AdminDeleteMissionTemplate
You can execute the `AdminDeleteMissionTemplate` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminDeleteMissionTemplate(vars: AdminDeleteMissionTemplateVariables): MutationPromise<AdminDeleteMissionTemplateData, AdminDeleteMissionTemplateVariables>;

interface AdminDeleteMissionTemplateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteMissionTemplateVariables): MutationRef<AdminDeleteMissionTemplateData, AdminDeleteMissionTemplateVariables>;
}
export const adminDeleteMissionTemplateRef: AdminDeleteMissionTemplateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminDeleteMissionTemplate(dc: DataConnect, vars: AdminDeleteMissionTemplateVariables): MutationPromise<AdminDeleteMissionTemplateData, AdminDeleteMissionTemplateVariables>;

interface AdminDeleteMissionTemplateRef {
  ...
  (dc: DataConnect, vars: AdminDeleteMissionTemplateVariables): MutationRef<AdminDeleteMissionTemplateData, AdminDeleteMissionTemplateVariables>;
}
export const adminDeleteMissionTemplateRef: AdminDeleteMissionTemplateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDeleteMissionTemplateRef:
```typescript
const name = adminDeleteMissionTemplateRef.operationName;
console.log(name);
```

### Variables
The `AdminDeleteMissionTemplate` mutation requires an argument of type `AdminDeleteMissionTemplateVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminDeleteMissionTemplateVariables {
  templateId: UUIDString;
}
```
### Return Type
Recall that executing the `AdminDeleteMissionTemplate` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDeleteMissionTemplateData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDeleteMissionTemplateData {
  missionTemplate_delete?: MissionTemplate_Key | null;
}
```
### Using `AdminDeleteMissionTemplate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDeleteMissionTemplate, AdminDeleteMissionTemplateVariables } from '@dataconnect/functions-generated';

// The `AdminDeleteMissionTemplate` mutation requires an argument of type `AdminDeleteMissionTemplateVariables`:
const adminDeleteMissionTemplateVars: AdminDeleteMissionTemplateVariables = {
  templateId: ..., 
};

// Call the `adminDeleteMissionTemplate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeleteMissionTemplate(adminDeleteMissionTemplateVars);
// Variables can be defined inline as well.
const { data } = await adminDeleteMissionTemplate({ templateId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDeleteMissionTemplate(dataConnect, adminDeleteMissionTemplateVars);

console.log(data.missionTemplate_delete);

// Or, you can use the `Promise` API.
adminDeleteMissionTemplate(adminDeleteMissionTemplateVars).then((response) => {
  const data = response.data;
  console.log(data.missionTemplate_delete);
});
```

### Using `AdminDeleteMissionTemplate`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminDeleteMissionTemplateRef, AdminDeleteMissionTemplateVariables } from '@dataconnect/functions-generated';

// The `AdminDeleteMissionTemplate` mutation requires an argument of type `AdminDeleteMissionTemplateVariables`:
const adminDeleteMissionTemplateVars: AdminDeleteMissionTemplateVariables = {
  templateId: ..., 
};

// Call the `adminDeleteMissionTemplateRef()` function to get a reference to the mutation.
const ref = adminDeleteMissionTemplateRef(adminDeleteMissionTemplateVars);
// Variables can be defined inline as well.
const ref = adminDeleteMissionTemplateRef({ templateId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDeleteMissionTemplateRef(dataConnect, adminDeleteMissionTemplateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.missionTemplate_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.missionTemplate_delete);
});
```

## AdminCreateRubricCriterion
You can execute the `AdminCreateRubricCriterion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminCreateRubricCriterion(vars: AdminCreateRubricCriterionVariables): MutationPromise<AdminCreateRubricCriterionData, AdminCreateRubricCriterionVariables>;

interface AdminCreateRubricCriterionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateRubricCriterionVariables): MutationRef<AdminCreateRubricCriterionData, AdminCreateRubricCriterionVariables>;
}
export const adminCreateRubricCriterionRef: AdminCreateRubricCriterionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminCreateRubricCriterion(dc: DataConnect, vars: AdminCreateRubricCriterionVariables): MutationPromise<AdminCreateRubricCriterionData, AdminCreateRubricCriterionVariables>;

interface AdminCreateRubricCriterionRef {
  ...
  (dc: DataConnect, vars: AdminCreateRubricCriterionVariables): MutationRef<AdminCreateRubricCriterionData, AdminCreateRubricCriterionVariables>;
}
export const adminCreateRubricCriterionRef: AdminCreateRubricCriterionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminCreateRubricCriterionRef:
```typescript
const name = adminCreateRubricCriterionRef.operationName;
console.log(name);
```

### Variables
The `AdminCreateRubricCriterion` mutation requires an argument of type `AdminCreateRubricCriterionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminCreateRubricCriterionVariables {
  missionId: UUIDString;
  criterionName: string;
  description?: string | null;
  maxPoints: number;
  order: number;
}
```
### Return Type
Recall that executing the `AdminCreateRubricCriterion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminCreateRubricCriterionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminCreateRubricCriterionData {
  rubricCriterion_insert: RubricCriterion_Key;
}
```
### Using `AdminCreateRubricCriterion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminCreateRubricCriterion, AdminCreateRubricCriterionVariables } from '@dataconnect/functions-generated';

// The `AdminCreateRubricCriterion` mutation requires an argument of type `AdminCreateRubricCriterionVariables`:
const adminCreateRubricCriterionVars: AdminCreateRubricCriterionVariables = {
  missionId: ..., 
  criterionName: ..., 
  description: ..., // optional
  maxPoints: ..., 
  order: ..., 
};

// Call the `adminCreateRubricCriterion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminCreateRubricCriterion(adminCreateRubricCriterionVars);
// Variables can be defined inline as well.
const { data } = await adminCreateRubricCriterion({ missionId: ..., criterionName: ..., description: ..., maxPoints: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminCreateRubricCriterion(dataConnect, adminCreateRubricCriterionVars);

console.log(data.rubricCriterion_insert);

// Or, you can use the `Promise` API.
adminCreateRubricCriterion(adminCreateRubricCriterionVars).then((response) => {
  const data = response.data;
  console.log(data.rubricCriterion_insert);
});
```

### Using `AdminCreateRubricCriterion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminCreateRubricCriterionRef, AdminCreateRubricCriterionVariables } from '@dataconnect/functions-generated';

// The `AdminCreateRubricCriterion` mutation requires an argument of type `AdminCreateRubricCriterionVariables`:
const adminCreateRubricCriterionVars: AdminCreateRubricCriterionVariables = {
  missionId: ..., 
  criterionName: ..., 
  description: ..., // optional
  maxPoints: ..., 
  order: ..., 
};

// Call the `adminCreateRubricCriterionRef()` function to get a reference to the mutation.
const ref = adminCreateRubricCriterionRef(adminCreateRubricCriterionVars);
// Variables can be defined inline as well.
const ref = adminCreateRubricCriterionRef({ missionId: ..., criterionName: ..., description: ..., maxPoints: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminCreateRubricCriterionRef(dataConnect, adminCreateRubricCriterionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.rubricCriterion_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.rubricCriterion_insert);
});
```

## AdminUpdateRubricCriterion
You can execute the `AdminUpdateRubricCriterion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminUpdateRubricCriterion(vars: AdminUpdateRubricCriterionVariables): MutationPromise<AdminUpdateRubricCriterionData, AdminUpdateRubricCriterionVariables>;

interface AdminUpdateRubricCriterionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateRubricCriterionVariables): MutationRef<AdminUpdateRubricCriterionData, AdminUpdateRubricCriterionVariables>;
}
export const adminUpdateRubricCriterionRef: AdminUpdateRubricCriterionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminUpdateRubricCriterion(dc: DataConnect, vars: AdminUpdateRubricCriterionVariables): MutationPromise<AdminUpdateRubricCriterionData, AdminUpdateRubricCriterionVariables>;

interface AdminUpdateRubricCriterionRef {
  ...
  (dc: DataConnect, vars: AdminUpdateRubricCriterionVariables): MutationRef<AdminUpdateRubricCriterionData, AdminUpdateRubricCriterionVariables>;
}
export const adminUpdateRubricCriterionRef: AdminUpdateRubricCriterionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminUpdateRubricCriterionRef:
```typescript
const name = adminUpdateRubricCriterionRef.operationName;
console.log(name);
```

### Variables
The `AdminUpdateRubricCriterion` mutation requires an argument of type `AdminUpdateRubricCriterionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminUpdateRubricCriterionVariables {
  criterionId: UUIDString;
  criterionName?: string | null;
  description?: string | null;
  maxPoints?: number | null;
}
```
### Return Type
Recall that executing the `AdminUpdateRubricCriterion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminUpdateRubricCriterionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminUpdateRubricCriterionData {
  rubricCriterion_update?: RubricCriterion_Key | null;
}
```
### Using `AdminUpdateRubricCriterion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminUpdateRubricCriterion, AdminUpdateRubricCriterionVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateRubricCriterion` mutation requires an argument of type `AdminUpdateRubricCriterionVariables`:
const adminUpdateRubricCriterionVars: AdminUpdateRubricCriterionVariables = {
  criterionId: ..., 
  criterionName: ..., // optional
  description: ..., // optional
  maxPoints: ..., // optional
};

// Call the `adminUpdateRubricCriterion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminUpdateRubricCriterion(adminUpdateRubricCriterionVars);
// Variables can be defined inline as well.
const { data } = await adminUpdateRubricCriterion({ criterionId: ..., criterionName: ..., description: ..., maxPoints: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminUpdateRubricCriterion(dataConnect, adminUpdateRubricCriterionVars);

console.log(data.rubricCriterion_update);

// Or, you can use the `Promise` API.
adminUpdateRubricCriterion(adminUpdateRubricCriterionVars).then((response) => {
  const data = response.data;
  console.log(data.rubricCriterion_update);
});
```

### Using `AdminUpdateRubricCriterion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminUpdateRubricCriterionRef, AdminUpdateRubricCriterionVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateRubricCriterion` mutation requires an argument of type `AdminUpdateRubricCriterionVariables`:
const adminUpdateRubricCriterionVars: AdminUpdateRubricCriterionVariables = {
  criterionId: ..., 
  criterionName: ..., // optional
  description: ..., // optional
  maxPoints: ..., // optional
};

// Call the `adminUpdateRubricCriterionRef()` function to get a reference to the mutation.
const ref = adminUpdateRubricCriterionRef(adminUpdateRubricCriterionVars);
// Variables can be defined inline as well.
const ref = adminUpdateRubricCriterionRef({ criterionId: ..., criterionName: ..., description: ..., maxPoints: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminUpdateRubricCriterionRef(dataConnect, adminUpdateRubricCriterionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.rubricCriterion_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.rubricCriterion_update);
});
```

## AdminDeleteRubricCriterion
You can execute the `AdminDeleteRubricCriterion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminDeleteRubricCriterion(vars: AdminDeleteRubricCriterionVariables): MutationPromise<AdminDeleteRubricCriterionData, AdminDeleteRubricCriterionVariables>;

interface AdminDeleteRubricCriterionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteRubricCriterionVariables): MutationRef<AdminDeleteRubricCriterionData, AdminDeleteRubricCriterionVariables>;
}
export const adminDeleteRubricCriterionRef: AdminDeleteRubricCriterionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminDeleteRubricCriterion(dc: DataConnect, vars: AdminDeleteRubricCriterionVariables): MutationPromise<AdminDeleteRubricCriterionData, AdminDeleteRubricCriterionVariables>;

interface AdminDeleteRubricCriterionRef {
  ...
  (dc: DataConnect, vars: AdminDeleteRubricCriterionVariables): MutationRef<AdminDeleteRubricCriterionData, AdminDeleteRubricCriterionVariables>;
}
export const adminDeleteRubricCriterionRef: AdminDeleteRubricCriterionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDeleteRubricCriterionRef:
```typescript
const name = adminDeleteRubricCriterionRef.operationName;
console.log(name);
```

### Variables
The `AdminDeleteRubricCriterion` mutation requires an argument of type `AdminDeleteRubricCriterionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminDeleteRubricCriterionVariables {
  criterionId: UUIDString;
}
```
### Return Type
Recall that executing the `AdminDeleteRubricCriterion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDeleteRubricCriterionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDeleteRubricCriterionData {
  rubricCriterion_delete?: RubricCriterion_Key | null;
}
```
### Using `AdminDeleteRubricCriterion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDeleteRubricCriterion, AdminDeleteRubricCriterionVariables } from '@dataconnect/functions-generated';

// The `AdminDeleteRubricCriterion` mutation requires an argument of type `AdminDeleteRubricCriterionVariables`:
const adminDeleteRubricCriterionVars: AdminDeleteRubricCriterionVariables = {
  criterionId: ..., 
};

// Call the `adminDeleteRubricCriterion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeleteRubricCriterion(adminDeleteRubricCriterionVars);
// Variables can be defined inline as well.
const { data } = await adminDeleteRubricCriterion({ criterionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDeleteRubricCriterion(dataConnect, adminDeleteRubricCriterionVars);

console.log(data.rubricCriterion_delete);

// Or, you can use the `Promise` API.
adminDeleteRubricCriterion(adminDeleteRubricCriterionVars).then((response) => {
  const data = response.data;
  console.log(data.rubricCriterion_delete);
});
```

### Using `AdminDeleteRubricCriterion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminDeleteRubricCriterionRef, AdminDeleteRubricCriterionVariables } from '@dataconnect/functions-generated';

// The `AdminDeleteRubricCriterion` mutation requires an argument of type `AdminDeleteRubricCriterionVariables`:
const adminDeleteRubricCriterionVars: AdminDeleteRubricCriterionVariables = {
  criterionId: ..., 
};

// Call the `adminDeleteRubricCriterionRef()` function to get a reference to the mutation.
const ref = adminDeleteRubricCriterionRef(adminDeleteRubricCriterionVars);
// Variables can be defined inline as well.
const ref = adminDeleteRubricCriterionRef({ criterionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDeleteRubricCriterionRef(dataConnect, adminDeleteRubricCriterionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.rubricCriterion_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.rubricCriterion_delete);
});
```

## AdminUpdateRubricCriterionOrder
You can execute the `AdminUpdateRubricCriterionOrder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminUpdateRubricCriterionOrder(vars: AdminUpdateRubricCriterionOrderVariables): MutationPromise<AdminUpdateRubricCriterionOrderData, AdminUpdateRubricCriterionOrderVariables>;

interface AdminUpdateRubricCriterionOrderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateRubricCriterionOrderVariables): MutationRef<AdminUpdateRubricCriterionOrderData, AdminUpdateRubricCriterionOrderVariables>;
}
export const adminUpdateRubricCriterionOrderRef: AdminUpdateRubricCriterionOrderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminUpdateRubricCriterionOrder(dc: DataConnect, vars: AdminUpdateRubricCriterionOrderVariables): MutationPromise<AdminUpdateRubricCriterionOrderData, AdminUpdateRubricCriterionOrderVariables>;

interface AdminUpdateRubricCriterionOrderRef {
  ...
  (dc: DataConnect, vars: AdminUpdateRubricCriterionOrderVariables): MutationRef<AdminUpdateRubricCriterionOrderData, AdminUpdateRubricCriterionOrderVariables>;
}
export const adminUpdateRubricCriterionOrderRef: AdminUpdateRubricCriterionOrderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminUpdateRubricCriterionOrderRef:
```typescript
const name = adminUpdateRubricCriterionOrderRef.operationName;
console.log(name);
```

### Variables
The `AdminUpdateRubricCriterionOrder` mutation requires an argument of type `AdminUpdateRubricCriterionOrderVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminUpdateRubricCriterionOrderVariables {
  criterionId: UUIDString;
  order: number;
}
```
### Return Type
Recall that executing the `AdminUpdateRubricCriterionOrder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminUpdateRubricCriterionOrderData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminUpdateRubricCriterionOrderData {
  rubricCriterion_update?: RubricCriterion_Key | null;
}
```
### Using `AdminUpdateRubricCriterionOrder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminUpdateRubricCriterionOrder, AdminUpdateRubricCriterionOrderVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateRubricCriterionOrder` mutation requires an argument of type `AdminUpdateRubricCriterionOrderVariables`:
const adminUpdateRubricCriterionOrderVars: AdminUpdateRubricCriterionOrderVariables = {
  criterionId: ..., 
  order: ..., 
};

// Call the `adminUpdateRubricCriterionOrder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminUpdateRubricCriterionOrder(adminUpdateRubricCriterionOrderVars);
// Variables can be defined inline as well.
const { data } = await adminUpdateRubricCriterionOrder({ criterionId: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminUpdateRubricCriterionOrder(dataConnect, adminUpdateRubricCriterionOrderVars);

console.log(data.rubricCriterion_update);

// Or, you can use the `Promise` API.
adminUpdateRubricCriterionOrder(adminUpdateRubricCriterionOrderVars).then((response) => {
  const data = response.data;
  console.log(data.rubricCriterion_update);
});
```

### Using `AdminUpdateRubricCriterionOrder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminUpdateRubricCriterionOrderRef, AdminUpdateRubricCriterionOrderVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateRubricCriterionOrder` mutation requires an argument of type `AdminUpdateRubricCriterionOrderVariables`:
const adminUpdateRubricCriterionOrderVars: AdminUpdateRubricCriterionOrderVariables = {
  criterionId: ..., 
  order: ..., 
};

// Call the `adminUpdateRubricCriterionOrderRef()` function to get a reference to the mutation.
const ref = adminUpdateRubricCriterionOrderRef(adminUpdateRubricCriterionOrderVars);
// Variables can be defined inline as well.
const ref = adminUpdateRubricCriterionOrderRef({ criterionId: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminUpdateRubricCriterionOrderRef(dataConnect, adminUpdateRubricCriterionOrderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.rubricCriterion_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.rubricCriterion_update);
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
import { connectorConfig, startQuizAttempt, StartQuizAttemptVariables } from '@dataconnect/functions-generated';

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
import { connectorConfig, startQuizAttemptRef, StartQuizAttemptVariables } from '@dataconnect/functions-generated';

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
  optionId: UUIDString;
}
```
### Return Type
Recall that executing the `SubmitQuizAnswer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SubmitQuizAnswerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SubmitQuizAnswerData {
  quizAttemptAnswer_upsert: QuizAttemptAnswer_Key;
}
```
### Using `SubmitQuizAnswer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, submitQuizAnswer, SubmitQuizAnswerVariables } from '@dataconnect/functions-generated';

// The `SubmitQuizAnswer` mutation requires an argument of type `SubmitQuizAnswerVariables`:
const submitQuizAnswerVars: SubmitQuizAnswerVariables = {
  attemptId: ..., 
  questionId: ..., 
  optionId: ..., 
};

// Call the `submitQuizAnswer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await submitQuizAnswer(submitQuizAnswerVars);
// Variables can be defined inline as well.
const { data } = await submitQuizAnswer({ attemptId: ..., questionId: ..., optionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await submitQuizAnswer(dataConnect, submitQuizAnswerVars);

console.log(data.quizAttemptAnswer_upsert);

// Or, you can use the `Promise` API.
submitQuizAnswer(submitQuizAnswerVars).then((response) => {
  const data = response.data;
  console.log(data.quizAttemptAnswer_upsert);
});
```

### Using `SubmitQuizAnswer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, submitQuizAnswerRef, SubmitQuizAnswerVariables } from '@dataconnect/functions-generated';

// The `SubmitQuizAnswer` mutation requires an argument of type `SubmitQuizAnswerVariables`:
const submitQuizAnswerVars: SubmitQuizAnswerVariables = {
  attemptId: ..., 
  questionId: ..., 
  optionId: ..., 
};

// Call the `submitQuizAnswerRef()` function to get a reference to the mutation.
const ref = submitQuizAnswerRef(submitQuizAnswerVars);
// Variables can be defined inline as well.
const ref = submitQuizAnswerRef({ attemptId: ..., questionId: ..., optionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = submitQuizAnswerRef(dataConnect, submitQuizAnswerVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quizAttemptAnswer_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quizAttemptAnswer_upsert);
});
```

## FinishQuizAttemptIfOpen
You can execute the `FinishQuizAttemptIfOpen` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
finishQuizAttemptIfOpen(vars: FinishQuizAttemptIfOpenVariables): MutationPromise<FinishQuizAttemptIfOpenData, FinishQuizAttemptIfOpenVariables>;

interface FinishQuizAttemptIfOpenRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: FinishQuizAttemptIfOpenVariables): MutationRef<FinishQuizAttemptIfOpenData, FinishQuizAttemptIfOpenVariables>;
}
export const finishQuizAttemptIfOpenRef: FinishQuizAttemptIfOpenRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
finishQuizAttemptIfOpen(dc: DataConnect, vars: FinishQuizAttemptIfOpenVariables): MutationPromise<FinishQuizAttemptIfOpenData, FinishQuizAttemptIfOpenVariables>;

interface FinishQuizAttemptIfOpenRef {
  ...
  (dc: DataConnect, vars: FinishQuizAttemptIfOpenVariables): MutationRef<FinishQuizAttemptIfOpenData, FinishQuizAttemptIfOpenVariables>;
}
export const finishQuizAttemptIfOpenRef: FinishQuizAttemptIfOpenRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the finishQuizAttemptIfOpenRef:
```typescript
const name = finishQuizAttemptIfOpenRef.operationName;
console.log(name);
```

### Variables
The `FinishQuizAttemptIfOpen` mutation requires an argument of type `FinishQuizAttemptIfOpenVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface FinishQuizAttemptIfOpenVariables {
  attemptId: UUIDString;
  score: number;
  passed: boolean;
}
```
### Return Type
Recall that executing the `FinishQuizAttemptIfOpen` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `FinishQuizAttemptIfOpenData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface FinishQuizAttemptIfOpenData {
  quizAttempt_updateMany: number;
}
```
### Using `FinishQuizAttemptIfOpen`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, finishQuizAttemptIfOpen, FinishQuizAttemptIfOpenVariables } from '@dataconnect/functions-generated';

// The `FinishQuizAttemptIfOpen` mutation requires an argument of type `FinishQuizAttemptIfOpenVariables`:
const finishQuizAttemptIfOpenVars: FinishQuizAttemptIfOpenVariables = {
  attemptId: ..., 
  score: ..., 
  passed: ..., 
};

// Call the `finishQuizAttemptIfOpen()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await finishQuizAttemptIfOpen(finishQuizAttemptIfOpenVars);
// Variables can be defined inline as well.
const { data } = await finishQuizAttemptIfOpen({ attemptId: ..., score: ..., passed: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await finishQuizAttemptIfOpen(dataConnect, finishQuizAttemptIfOpenVars);

console.log(data.quizAttempt_updateMany);

// Or, you can use the `Promise` API.
finishQuizAttemptIfOpen(finishQuizAttemptIfOpenVars).then((response) => {
  const data = response.data;
  console.log(data.quizAttempt_updateMany);
});
```

### Using `FinishQuizAttemptIfOpen`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, finishQuizAttemptIfOpenRef, FinishQuizAttemptIfOpenVariables } from '@dataconnect/functions-generated';

// The `FinishQuizAttemptIfOpen` mutation requires an argument of type `FinishQuizAttemptIfOpenVariables`:
const finishQuizAttemptIfOpenVars: FinishQuizAttemptIfOpenVariables = {
  attemptId: ..., 
  score: ..., 
  passed: ..., 
};

// Call the `finishQuizAttemptIfOpenRef()` function to get a reference to the mutation.
const ref = finishQuizAttemptIfOpenRef(finishQuizAttemptIfOpenVars);
// Variables can be defined inline as well.
const ref = finishQuizAttemptIfOpenRef({ attemptId: ..., score: ..., passed: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = finishQuizAttemptIfOpenRef(dataConnect, finishQuizAttemptIfOpenVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quizAttempt_updateMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quizAttempt_updateMany);
});
```

## AdminCreateQuiz
You can execute the `AdminCreateQuiz` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminCreateQuiz(vars: AdminCreateQuizVariables): MutationPromise<AdminCreateQuizData, AdminCreateQuizVariables>;

interface AdminCreateQuizRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateQuizVariables): MutationRef<AdminCreateQuizData, AdminCreateQuizVariables>;
}
export const adminCreateQuizRef: AdminCreateQuizRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminCreateQuiz(dc: DataConnect, vars: AdminCreateQuizVariables): MutationPromise<AdminCreateQuizData, AdminCreateQuizVariables>;

interface AdminCreateQuizRef {
  ...
  (dc: DataConnect, vars: AdminCreateQuizVariables): MutationRef<AdminCreateQuizData, AdminCreateQuizVariables>;
}
export const adminCreateQuizRef: AdminCreateQuizRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminCreateQuizRef:
```typescript
const name = adminCreateQuizRef.operationName;
console.log(name);
```

### Variables
The `AdminCreateQuiz` mutation requires an argument of type `AdminCreateQuizVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminCreateQuizVariables {
  lectureId: UUIDString;
  passingScore: number;
  maxAttempts: number;
  timeLimitMinutes?: number | null;
}
```
### Return Type
Recall that executing the `AdminCreateQuiz` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminCreateQuizData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminCreateQuizData {
  courseQuiz_insert: CourseQuiz_Key;
}
```
### Using `AdminCreateQuiz`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminCreateQuiz, AdminCreateQuizVariables } from '@dataconnect/functions-generated';

// The `AdminCreateQuiz` mutation requires an argument of type `AdminCreateQuizVariables`:
const adminCreateQuizVars: AdminCreateQuizVariables = {
  lectureId: ..., 
  passingScore: ..., 
  maxAttempts: ..., 
  timeLimitMinutes: ..., // optional
};

// Call the `adminCreateQuiz()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminCreateQuiz(adminCreateQuizVars);
// Variables can be defined inline as well.
const { data } = await adminCreateQuiz({ lectureId: ..., passingScore: ..., maxAttempts: ..., timeLimitMinutes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminCreateQuiz(dataConnect, adminCreateQuizVars);

console.log(data.courseQuiz_insert);

// Or, you can use the `Promise` API.
adminCreateQuiz(adminCreateQuizVars).then((response) => {
  const data = response.data;
  console.log(data.courseQuiz_insert);
});
```

### Using `AdminCreateQuiz`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminCreateQuizRef, AdminCreateQuizVariables } from '@dataconnect/functions-generated';

// The `AdminCreateQuiz` mutation requires an argument of type `AdminCreateQuizVariables`:
const adminCreateQuizVars: AdminCreateQuizVariables = {
  lectureId: ..., 
  passingScore: ..., 
  maxAttempts: ..., 
  timeLimitMinutes: ..., // optional
};

// Call the `adminCreateQuizRef()` function to get a reference to the mutation.
const ref = adminCreateQuizRef(adminCreateQuizVars);
// Variables can be defined inline as well.
const ref = adminCreateQuizRef({ lectureId: ..., passingScore: ..., maxAttempts: ..., timeLimitMinutes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminCreateQuizRef(dataConnect, adminCreateQuizVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseQuiz_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseQuiz_insert);
});
```

## AdminUpdateQuiz
You can execute the `AdminUpdateQuiz` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminUpdateQuiz(vars: AdminUpdateQuizVariables): MutationPromise<AdminUpdateQuizData, AdminUpdateQuizVariables>;

interface AdminUpdateQuizRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateQuizVariables): MutationRef<AdminUpdateQuizData, AdminUpdateQuizVariables>;
}
export const adminUpdateQuizRef: AdminUpdateQuizRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminUpdateQuiz(dc: DataConnect, vars: AdminUpdateQuizVariables): MutationPromise<AdminUpdateQuizData, AdminUpdateQuizVariables>;

interface AdminUpdateQuizRef {
  ...
  (dc: DataConnect, vars: AdminUpdateQuizVariables): MutationRef<AdminUpdateQuizData, AdminUpdateQuizVariables>;
}
export const adminUpdateQuizRef: AdminUpdateQuizRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminUpdateQuizRef:
```typescript
const name = adminUpdateQuizRef.operationName;
console.log(name);
```

### Variables
The `AdminUpdateQuiz` mutation requires an argument of type `AdminUpdateQuizVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminUpdateQuizVariables {
  quizId: UUIDString;
  passingScore?: number | null;
  maxAttempts?: number | null;
  timeLimitMinutes?: number | null;
}
```
### Return Type
Recall that executing the `AdminUpdateQuiz` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminUpdateQuizData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminUpdateQuizData {
  courseQuiz_update?: CourseQuiz_Key | null;
}
```
### Using `AdminUpdateQuiz`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminUpdateQuiz, AdminUpdateQuizVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateQuiz` mutation requires an argument of type `AdminUpdateQuizVariables`:
const adminUpdateQuizVars: AdminUpdateQuizVariables = {
  quizId: ..., 
  passingScore: ..., // optional
  maxAttempts: ..., // optional
  timeLimitMinutes: ..., // optional
};

// Call the `adminUpdateQuiz()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminUpdateQuiz(adminUpdateQuizVars);
// Variables can be defined inline as well.
const { data } = await adminUpdateQuiz({ quizId: ..., passingScore: ..., maxAttempts: ..., timeLimitMinutes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminUpdateQuiz(dataConnect, adminUpdateQuizVars);

console.log(data.courseQuiz_update);

// Or, you can use the `Promise` API.
adminUpdateQuiz(adminUpdateQuizVars).then((response) => {
  const data = response.data;
  console.log(data.courseQuiz_update);
});
```

### Using `AdminUpdateQuiz`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminUpdateQuizRef, AdminUpdateQuizVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateQuiz` mutation requires an argument of type `AdminUpdateQuizVariables`:
const adminUpdateQuizVars: AdminUpdateQuizVariables = {
  quizId: ..., 
  passingScore: ..., // optional
  maxAttempts: ..., // optional
  timeLimitMinutes: ..., // optional
};

// Call the `adminUpdateQuizRef()` function to get a reference to the mutation.
const ref = adminUpdateQuizRef(adminUpdateQuizVars);
// Variables can be defined inline as well.
const ref = adminUpdateQuizRef({ quizId: ..., passingScore: ..., maxAttempts: ..., timeLimitMinutes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminUpdateQuizRef(dataConnect, adminUpdateQuizVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseQuiz_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseQuiz_update);
});
```

## AdminDeleteQuiz
You can execute the `AdminDeleteQuiz` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminDeleteQuiz(vars: AdminDeleteQuizVariables): MutationPromise<AdminDeleteQuizData, AdminDeleteQuizVariables>;

interface AdminDeleteQuizRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteQuizVariables): MutationRef<AdminDeleteQuizData, AdminDeleteQuizVariables>;
}
export const adminDeleteQuizRef: AdminDeleteQuizRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminDeleteQuiz(dc: DataConnect, vars: AdminDeleteQuizVariables): MutationPromise<AdminDeleteQuizData, AdminDeleteQuizVariables>;

interface AdminDeleteQuizRef {
  ...
  (dc: DataConnect, vars: AdminDeleteQuizVariables): MutationRef<AdminDeleteQuizData, AdminDeleteQuizVariables>;
}
export const adminDeleteQuizRef: AdminDeleteQuizRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDeleteQuizRef:
```typescript
const name = adminDeleteQuizRef.operationName;
console.log(name);
```

### Variables
The `AdminDeleteQuiz` mutation requires an argument of type `AdminDeleteQuizVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminDeleteQuizVariables {
  quizId: UUIDString;
}
```
### Return Type
Recall that executing the `AdminDeleteQuiz` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDeleteQuizData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDeleteQuizData {
  courseQuiz_delete?: CourseQuiz_Key | null;
}
```
### Using `AdminDeleteQuiz`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDeleteQuiz, AdminDeleteQuizVariables } from '@dataconnect/functions-generated';

// The `AdminDeleteQuiz` mutation requires an argument of type `AdminDeleteQuizVariables`:
const adminDeleteQuizVars: AdminDeleteQuizVariables = {
  quizId: ..., 
};

// Call the `adminDeleteQuiz()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeleteQuiz(adminDeleteQuizVars);
// Variables can be defined inline as well.
const { data } = await adminDeleteQuiz({ quizId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDeleteQuiz(dataConnect, adminDeleteQuizVars);

console.log(data.courseQuiz_delete);

// Or, you can use the `Promise` API.
adminDeleteQuiz(adminDeleteQuizVars).then((response) => {
  const data = response.data;
  console.log(data.courseQuiz_delete);
});
```

### Using `AdminDeleteQuiz`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminDeleteQuizRef, AdminDeleteQuizVariables } from '@dataconnect/functions-generated';

// The `AdminDeleteQuiz` mutation requires an argument of type `AdminDeleteQuizVariables`:
const adminDeleteQuizVars: AdminDeleteQuizVariables = {
  quizId: ..., 
};

// Call the `adminDeleteQuizRef()` function to get a reference to the mutation.
const ref = adminDeleteQuizRef(adminDeleteQuizVars);
// Variables can be defined inline as well.
const ref = adminDeleteQuizRef({ quizId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDeleteQuizRef(dataConnect, adminDeleteQuizVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.courseQuiz_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.courseQuiz_delete);
});
```

## AdminCreateQuizQuestion
You can execute the `AdminCreateQuizQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminCreateQuizQuestion(vars: AdminCreateQuizQuestionVariables): MutationPromise<AdminCreateQuizQuestionData, AdminCreateQuizQuestionVariables>;

interface AdminCreateQuizQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateQuizQuestionVariables): MutationRef<AdminCreateQuizQuestionData, AdminCreateQuizQuestionVariables>;
}
export const adminCreateQuizQuestionRef: AdminCreateQuizQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminCreateQuizQuestion(dc: DataConnect, vars: AdminCreateQuizQuestionVariables): MutationPromise<AdminCreateQuizQuestionData, AdminCreateQuizQuestionVariables>;

interface AdminCreateQuizQuestionRef {
  ...
  (dc: DataConnect, vars: AdminCreateQuizQuestionVariables): MutationRef<AdminCreateQuizQuestionData, AdminCreateQuizQuestionVariables>;
}
export const adminCreateQuizQuestionRef: AdminCreateQuizQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminCreateQuizQuestionRef:
```typescript
const name = adminCreateQuizQuestionRef.operationName;
console.log(name);
```

### Variables
The `AdminCreateQuizQuestion` mutation requires an argument of type `AdminCreateQuizQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminCreateQuizQuestionVariables {
  quizId: UUIDString;
  questionText: string;
  order: number;
  points: number;
  explanation?: string | null;
}
```
### Return Type
Recall that executing the `AdminCreateQuizQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminCreateQuizQuestionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminCreateQuizQuestionData {
  quizQuestion_insert: QuizQuestion_Key;
}
```
### Using `AdminCreateQuizQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminCreateQuizQuestion, AdminCreateQuizQuestionVariables } from '@dataconnect/functions-generated';

// The `AdminCreateQuizQuestion` mutation requires an argument of type `AdminCreateQuizQuestionVariables`:
const adminCreateQuizQuestionVars: AdminCreateQuizQuestionVariables = {
  quizId: ..., 
  questionText: ..., 
  order: ..., 
  points: ..., 
  explanation: ..., // optional
};

// Call the `adminCreateQuizQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminCreateQuizQuestion(adminCreateQuizQuestionVars);
// Variables can be defined inline as well.
const { data } = await adminCreateQuizQuestion({ quizId: ..., questionText: ..., order: ..., points: ..., explanation: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminCreateQuizQuestion(dataConnect, adminCreateQuizQuestionVars);

console.log(data.quizQuestion_insert);

// Or, you can use the `Promise` API.
adminCreateQuizQuestion(adminCreateQuizQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.quizQuestion_insert);
});
```

### Using `AdminCreateQuizQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminCreateQuizQuestionRef, AdminCreateQuizQuestionVariables } from '@dataconnect/functions-generated';

// The `AdminCreateQuizQuestion` mutation requires an argument of type `AdminCreateQuizQuestionVariables`:
const adminCreateQuizQuestionVars: AdminCreateQuizQuestionVariables = {
  quizId: ..., 
  questionText: ..., 
  order: ..., 
  points: ..., 
  explanation: ..., // optional
};

// Call the `adminCreateQuizQuestionRef()` function to get a reference to the mutation.
const ref = adminCreateQuizQuestionRef(adminCreateQuizQuestionVars);
// Variables can be defined inline as well.
const ref = adminCreateQuizQuestionRef({ quizId: ..., questionText: ..., order: ..., points: ..., explanation: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminCreateQuizQuestionRef(dataConnect, adminCreateQuizQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quizQuestion_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quizQuestion_insert);
});
```

## AdminUpdateQuizQuestion
You can execute the `AdminUpdateQuizQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminUpdateQuizQuestion(vars: AdminUpdateQuizQuestionVariables): MutationPromise<AdminUpdateQuizQuestionData, AdminUpdateQuizQuestionVariables>;

interface AdminUpdateQuizQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateQuizQuestionVariables): MutationRef<AdminUpdateQuizQuestionData, AdminUpdateQuizQuestionVariables>;
}
export const adminUpdateQuizQuestionRef: AdminUpdateQuizQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminUpdateQuizQuestion(dc: DataConnect, vars: AdminUpdateQuizQuestionVariables): MutationPromise<AdminUpdateQuizQuestionData, AdminUpdateQuizQuestionVariables>;

interface AdminUpdateQuizQuestionRef {
  ...
  (dc: DataConnect, vars: AdminUpdateQuizQuestionVariables): MutationRef<AdminUpdateQuizQuestionData, AdminUpdateQuizQuestionVariables>;
}
export const adminUpdateQuizQuestionRef: AdminUpdateQuizQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminUpdateQuizQuestionRef:
```typescript
const name = adminUpdateQuizQuestionRef.operationName;
console.log(name);
```

### Variables
The `AdminUpdateQuizQuestion` mutation requires an argument of type `AdminUpdateQuizQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminUpdateQuizQuestionVariables {
  questionId: UUIDString;
  questionText?: string | null;
  points?: number | null;
  explanation?: string | null;
}
```
### Return Type
Recall that executing the `AdminUpdateQuizQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminUpdateQuizQuestionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminUpdateQuizQuestionData {
  quizQuestion_update?: QuizQuestion_Key | null;
}
```
### Using `AdminUpdateQuizQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminUpdateQuizQuestion, AdminUpdateQuizQuestionVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateQuizQuestion` mutation requires an argument of type `AdminUpdateQuizQuestionVariables`:
const adminUpdateQuizQuestionVars: AdminUpdateQuizQuestionVariables = {
  questionId: ..., 
  questionText: ..., // optional
  points: ..., // optional
  explanation: ..., // optional
};

// Call the `adminUpdateQuizQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminUpdateQuizQuestion(adminUpdateQuizQuestionVars);
// Variables can be defined inline as well.
const { data } = await adminUpdateQuizQuestion({ questionId: ..., questionText: ..., points: ..., explanation: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminUpdateQuizQuestion(dataConnect, adminUpdateQuizQuestionVars);

console.log(data.quizQuestion_update);

// Or, you can use the `Promise` API.
adminUpdateQuizQuestion(adminUpdateQuizQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.quizQuestion_update);
});
```

### Using `AdminUpdateQuizQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminUpdateQuizQuestionRef, AdminUpdateQuizQuestionVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateQuizQuestion` mutation requires an argument of type `AdminUpdateQuizQuestionVariables`:
const adminUpdateQuizQuestionVars: AdminUpdateQuizQuestionVariables = {
  questionId: ..., 
  questionText: ..., // optional
  points: ..., // optional
  explanation: ..., // optional
};

// Call the `adminUpdateQuizQuestionRef()` function to get a reference to the mutation.
const ref = adminUpdateQuizQuestionRef(adminUpdateQuizQuestionVars);
// Variables can be defined inline as well.
const ref = adminUpdateQuizQuestionRef({ questionId: ..., questionText: ..., points: ..., explanation: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminUpdateQuizQuestionRef(dataConnect, adminUpdateQuizQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quizQuestion_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quizQuestion_update);
});
```

## AdminSoftDeleteQuizQuestion
You can execute the `AdminSoftDeleteQuizQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminSoftDeleteQuizQuestion(vars: AdminSoftDeleteQuizQuestionVariables): MutationPromise<AdminSoftDeleteQuizQuestionData, AdminSoftDeleteQuizQuestionVariables>;

interface AdminSoftDeleteQuizQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSoftDeleteQuizQuestionVariables): MutationRef<AdminSoftDeleteQuizQuestionData, AdminSoftDeleteQuizQuestionVariables>;
}
export const adminSoftDeleteQuizQuestionRef: AdminSoftDeleteQuizQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminSoftDeleteQuizQuestion(dc: DataConnect, vars: AdminSoftDeleteQuizQuestionVariables): MutationPromise<AdminSoftDeleteQuizQuestionData, AdminSoftDeleteQuizQuestionVariables>;

interface AdminSoftDeleteQuizQuestionRef {
  ...
  (dc: DataConnect, vars: AdminSoftDeleteQuizQuestionVariables): MutationRef<AdminSoftDeleteQuizQuestionData, AdminSoftDeleteQuizQuestionVariables>;
}
export const adminSoftDeleteQuizQuestionRef: AdminSoftDeleteQuizQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminSoftDeleteQuizQuestionRef:
```typescript
const name = adminSoftDeleteQuizQuestionRef.operationName;
console.log(name);
```

### Variables
The `AdminSoftDeleteQuizQuestion` mutation requires an argument of type `AdminSoftDeleteQuizQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminSoftDeleteQuizQuestionVariables {
  questionId: UUIDString;
}
```
### Return Type
Recall that executing the `AdminSoftDeleteQuizQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminSoftDeleteQuizQuestionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminSoftDeleteQuizQuestionData {
  quizQuestion_update?: QuizQuestion_Key | null;
}
```
### Using `AdminSoftDeleteQuizQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminSoftDeleteQuizQuestion, AdminSoftDeleteQuizQuestionVariables } from '@dataconnect/functions-generated';

// The `AdminSoftDeleteQuizQuestion` mutation requires an argument of type `AdminSoftDeleteQuizQuestionVariables`:
const adminSoftDeleteQuizQuestionVars: AdminSoftDeleteQuizQuestionVariables = {
  questionId: ..., 
};

// Call the `adminSoftDeleteQuizQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminSoftDeleteQuizQuestion(adminSoftDeleteQuizQuestionVars);
// Variables can be defined inline as well.
const { data } = await adminSoftDeleteQuizQuestion({ questionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminSoftDeleteQuizQuestion(dataConnect, adminSoftDeleteQuizQuestionVars);

console.log(data.quizQuestion_update);

// Or, you can use the `Promise` API.
adminSoftDeleteQuizQuestion(adminSoftDeleteQuizQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.quizQuestion_update);
});
```

### Using `AdminSoftDeleteQuizQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminSoftDeleteQuizQuestionRef, AdminSoftDeleteQuizQuestionVariables } from '@dataconnect/functions-generated';

// The `AdminSoftDeleteQuizQuestion` mutation requires an argument of type `AdminSoftDeleteQuizQuestionVariables`:
const adminSoftDeleteQuizQuestionVars: AdminSoftDeleteQuizQuestionVariables = {
  questionId: ..., 
};

// Call the `adminSoftDeleteQuizQuestionRef()` function to get a reference to the mutation.
const ref = adminSoftDeleteQuizQuestionRef(adminSoftDeleteQuizQuestionVars);
// Variables can be defined inline as well.
const ref = adminSoftDeleteQuizQuestionRef({ questionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminSoftDeleteQuizQuestionRef(dataConnect, adminSoftDeleteQuizQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quizQuestion_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quizQuestion_update);
});
```

## AdminUpdateQuizQuestionOrder
You can execute the `AdminUpdateQuizQuestionOrder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminUpdateQuizQuestionOrder(vars: AdminUpdateQuizQuestionOrderVariables): MutationPromise<AdminUpdateQuizQuestionOrderData, AdminUpdateQuizQuestionOrderVariables>;

interface AdminUpdateQuizQuestionOrderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateQuizQuestionOrderVariables): MutationRef<AdminUpdateQuizQuestionOrderData, AdminUpdateQuizQuestionOrderVariables>;
}
export const adminUpdateQuizQuestionOrderRef: AdminUpdateQuizQuestionOrderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminUpdateQuizQuestionOrder(dc: DataConnect, vars: AdminUpdateQuizQuestionOrderVariables): MutationPromise<AdminUpdateQuizQuestionOrderData, AdminUpdateQuizQuestionOrderVariables>;

interface AdminUpdateQuizQuestionOrderRef {
  ...
  (dc: DataConnect, vars: AdminUpdateQuizQuestionOrderVariables): MutationRef<AdminUpdateQuizQuestionOrderData, AdminUpdateQuizQuestionOrderVariables>;
}
export const adminUpdateQuizQuestionOrderRef: AdminUpdateQuizQuestionOrderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminUpdateQuizQuestionOrderRef:
```typescript
const name = adminUpdateQuizQuestionOrderRef.operationName;
console.log(name);
```

### Variables
The `AdminUpdateQuizQuestionOrder` mutation requires an argument of type `AdminUpdateQuizQuestionOrderVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminUpdateQuizQuestionOrderVariables {
  questionId: UUIDString;
  order: number;
}
```
### Return Type
Recall that executing the `AdminUpdateQuizQuestionOrder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminUpdateQuizQuestionOrderData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminUpdateQuizQuestionOrderData {
  quizQuestion_update?: QuizQuestion_Key | null;
}
```
### Using `AdminUpdateQuizQuestionOrder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminUpdateQuizQuestionOrder, AdminUpdateQuizQuestionOrderVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateQuizQuestionOrder` mutation requires an argument of type `AdminUpdateQuizQuestionOrderVariables`:
const adminUpdateQuizQuestionOrderVars: AdminUpdateQuizQuestionOrderVariables = {
  questionId: ..., 
  order: ..., 
};

// Call the `adminUpdateQuizQuestionOrder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminUpdateQuizQuestionOrder(adminUpdateQuizQuestionOrderVars);
// Variables can be defined inline as well.
const { data } = await adminUpdateQuizQuestionOrder({ questionId: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminUpdateQuizQuestionOrder(dataConnect, adminUpdateQuizQuestionOrderVars);

console.log(data.quizQuestion_update);

// Or, you can use the `Promise` API.
adminUpdateQuizQuestionOrder(adminUpdateQuizQuestionOrderVars).then((response) => {
  const data = response.data;
  console.log(data.quizQuestion_update);
});
```

### Using `AdminUpdateQuizQuestionOrder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminUpdateQuizQuestionOrderRef, AdminUpdateQuizQuestionOrderVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateQuizQuestionOrder` mutation requires an argument of type `AdminUpdateQuizQuestionOrderVariables`:
const adminUpdateQuizQuestionOrderVars: AdminUpdateQuizQuestionOrderVariables = {
  questionId: ..., 
  order: ..., 
};

// Call the `adminUpdateQuizQuestionOrderRef()` function to get a reference to the mutation.
const ref = adminUpdateQuizQuestionOrderRef(adminUpdateQuizQuestionOrderVars);
// Variables can be defined inline as well.
const ref = adminUpdateQuizQuestionOrderRef({ questionId: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminUpdateQuizQuestionOrderRef(dataConnect, adminUpdateQuizQuestionOrderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quizQuestion_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quizQuestion_update);
});
```

## AdminCreateQuizOption
You can execute the `AdminCreateQuizOption` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminCreateQuizOption(vars: AdminCreateQuizOptionVariables): MutationPromise<AdminCreateQuizOptionData, AdminCreateQuizOptionVariables>;

interface AdminCreateQuizOptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateQuizOptionVariables): MutationRef<AdminCreateQuizOptionData, AdminCreateQuizOptionVariables>;
}
export const adminCreateQuizOptionRef: AdminCreateQuizOptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminCreateQuizOption(dc: DataConnect, vars: AdminCreateQuizOptionVariables): MutationPromise<AdminCreateQuizOptionData, AdminCreateQuizOptionVariables>;

interface AdminCreateQuizOptionRef {
  ...
  (dc: DataConnect, vars: AdminCreateQuizOptionVariables): MutationRef<AdminCreateQuizOptionData, AdminCreateQuizOptionVariables>;
}
export const adminCreateQuizOptionRef: AdminCreateQuizOptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminCreateQuizOptionRef:
```typescript
const name = adminCreateQuizOptionRef.operationName;
console.log(name);
```

### Variables
The `AdminCreateQuizOption` mutation requires an argument of type `AdminCreateQuizOptionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminCreateQuizOptionVariables {
  questionId: UUIDString;
  text: string;
  order: number;
  isCorrect: boolean;
}
```
### Return Type
Recall that executing the `AdminCreateQuizOption` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminCreateQuizOptionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminCreateQuizOptionData {
  quizOption_insert: QuizOption_Key;
}
```
### Using `AdminCreateQuizOption`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminCreateQuizOption, AdminCreateQuizOptionVariables } from '@dataconnect/functions-generated';

// The `AdminCreateQuizOption` mutation requires an argument of type `AdminCreateQuizOptionVariables`:
const adminCreateQuizOptionVars: AdminCreateQuizOptionVariables = {
  questionId: ..., 
  text: ..., 
  order: ..., 
  isCorrect: ..., 
};

// Call the `adminCreateQuizOption()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminCreateQuizOption(adminCreateQuizOptionVars);
// Variables can be defined inline as well.
const { data } = await adminCreateQuizOption({ questionId: ..., text: ..., order: ..., isCorrect: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminCreateQuizOption(dataConnect, adminCreateQuizOptionVars);

console.log(data.quizOption_insert);

// Or, you can use the `Promise` API.
adminCreateQuizOption(adminCreateQuizOptionVars).then((response) => {
  const data = response.data;
  console.log(data.quizOption_insert);
});
```

### Using `AdminCreateQuizOption`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminCreateQuizOptionRef, AdminCreateQuizOptionVariables } from '@dataconnect/functions-generated';

// The `AdminCreateQuizOption` mutation requires an argument of type `AdminCreateQuizOptionVariables`:
const adminCreateQuizOptionVars: AdminCreateQuizOptionVariables = {
  questionId: ..., 
  text: ..., 
  order: ..., 
  isCorrect: ..., 
};

// Call the `adminCreateQuizOptionRef()` function to get a reference to the mutation.
const ref = adminCreateQuizOptionRef(adminCreateQuizOptionVars);
// Variables can be defined inline as well.
const ref = adminCreateQuizOptionRef({ questionId: ..., text: ..., order: ..., isCorrect: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminCreateQuizOptionRef(dataConnect, adminCreateQuizOptionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quizOption_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quizOption_insert);
});
```

## AdminUpdateQuizOption
You can execute the `AdminUpdateQuizOption` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminUpdateQuizOption(vars: AdminUpdateQuizOptionVariables): MutationPromise<AdminUpdateQuizOptionData, AdminUpdateQuizOptionVariables>;

interface AdminUpdateQuizOptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateQuizOptionVariables): MutationRef<AdminUpdateQuizOptionData, AdminUpdateQuizOptionVariables>;
}
export const adminUpdateQuizOptionRef: AdminUpdateQuizOptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminUpdateQuizOption(dc: DataConnect, vars: AdminUpdateQuizOptionVariables): MutationPromise<AdminUpdateQuizOptionData, AdminUpdateQuizOptionVariables>;

interface AdminUpdateQuizOptionRef {
  ...
  (dc: DataConnect, vars: AdminUpdateQuizOptionVariables): MutationRef<AdminUpdateQuizOptionData, AdminUpdateQuizOptionVariables>;
}
export const adminUpdateQuizOptionRef: AdminUpdateQuizOptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminUpdateQuizOptionRef:
```typescript
const name = adminUpdateQuizOptionRef.operationName;
console.log(name);
```

### Variables
The `AdminUpdateQuizOption` mutation requires an argument of type `AdminUpdateQuizOptionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminUpdateQuizOptionVariables {
  optionId: UUIDString;
  text?: string | null;
  isCorrect?: boolean | null;
}
```
### Return Type
Recall that executing the `AdminUpdateQuizOption` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminUpdateQuizOptionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminUpdateQuizOptionData {
  quizOption_update?: QuizOption_Key | null;
}
```
### Using `AdminUpdateQuizOption`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminUpdateQuizOption, AdminUpdateQuizOptionVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateQuizOption` mutation requires an argument of type `AdminUpdateQuizOptionVariables`:
const adminUpdateQuizOptionVars: AdminUpdateQuizOptionVariables = {
  optionId: ..., 
  text: ..., // optional
  isCorrect: ..., // optional
};

// Call the `adminUpdateQuizOption()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminUpdateQuizOption(adminUpdateQuizOptionVars);
// Variables can be defined inline as well.
const { data } = await adminUpdateQuizOption({ optionId: ..., text: ..., isCorrect: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminUpdateQuizOption(dataConnect, adminUpdateQuizOptionVars);

console.log(data.quizOption_update);

// Or, you can use the `Promise` API.
adminUpdateQuizOption(adminUpdateQuizOptionVars).then((response) => {
  const data = response.data;
  console.log(data.quizOption_update);
});
```

### Using `AdminUpdateQuizOption`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminUpdateQuizOptionRef, AdminUpdateQuizOptionVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateQuizOption` mutation requires an argument of type `AdminUpdateQuizOptionVariables`:
const adminUpdateQuizOptionVars: AdminUpdateQuizOptionVariables = {
  optionId: ..., 
  text: ..., // optional
  isCorrect: ..., // optional
};

// Call the `adminUpdateQuizOptionRef()` function to get a reference to the mutation.
const ref = adminUpdateQuizOptionRef(adminUpdateQuizOptionVars);
// Variables can be defined inline as well.
const ref = adminUpdateQuizOptionRef({ optionId: ..., text: ..., isCorrect: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminUpdateQuizOptionRef(dataConnect, adminUpdateQuizOptionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quizOption_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quizOption_update);
});
```

## AdminDeleteQuizOption
You can execute the `AdminDeleteQuizOption` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminDeleteQuizOption(vars: AdminDeleteQuizOptionVariables): MutationPromise<AdminDeleteQuizOptionData, AdminDeleteQuizOptionVariables>;

interface AdminDeleteQuizOptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteQuizOptionVariables): MutationRef<AdminDeleteQuizOptionData, AdminDeleteQuizOptionVariables>;
}
export const adminDeleteQuizOptionRef: AdminDeleteQuizOptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminDeleteQuizOption(dc: DataConnect, vars: AdminDeleteQuizOptionVariables): MutationPromise<AdminDeleteQuizOptionData, AdminDeleteQuizOptionVariables>;

interface AdminDeleteQuizOptionRef {
  ...
  (dc: DataConnect, vars: AdminDeleteQuizOptionVariables): MutationRef<AdminDeleteQuizOptionData, AdminDeleteQuizOptionVariables>;
}
export const adminDeleteQuizOptionRef: AdminDeleteQuizOptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminDeleteQuizOptionRef:
```typescript
const name = adminDeleteQuizOptionRef.operationName;
console.log(name);
```

### Variables
The `AdminDeleteQuizOption` mutation requires an argument of type `AdminDeleteQuizOptionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminDeleteQuizOptionVariables {
  optionId: UUIDString;
}
```
### Return Type
Recall that executing the `AdminDeleteQuizOption` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminDeleteQuizOptionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminDeleteQuizOptionData {
  quizOption_delete?: QuizOption_Key | null;
}
```
### Using `AdminDeleteQuizOption`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminDeleteQuizOption, AdminDeleteQuizOptionVariables } from '@dataconnect/functions-generated';

// The `AdminDeleteQuizOption` mutation requires an argument of type `AdminDeleteQuizOptionVariables`:
const adminDeleteQuizOptionVars: AdminDeleteQuizOptionVariables = {
  optionId: ..., 
};

// Call the `adminDeleteQuizOption()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminDeleteQuizOption(adminDeleteQuizOptionVars);
// Variables can be defined inline as well.
const { data } = await adminDeleteQuizOption({ optionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminDeleteQuizOption(dataConnect, adminDeleteQuizOptionVars);

console.log(data.quizOption_delete);

// Or, you can use the `Promise` API.
adminDeleteQuizOption(adminDeleteQuizOptionVars).then((response) => {
  const data = response.data;
  console.log(data.quizOption_delete);
});
```

### Using `AdminDeleteQuizOption`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminDeleteQuizOptionRef, AdminDeleteQuizOptionVariables } from '@dataconnect/functions-generated';

// The `AdminDeleteQuizOption` mutation requires an argument of type `AdminDeleteQuizOptionVariables`:
const adminDeleteQuizOptionVars: AdminDeleteQuizOptionVariables = {
  optionId: ..., 
};

// Call the `adminDeleteQuizOptionRef()` function to get a reference to the mutation.
const ref = adminDeleteQuizOptionRef(adminDeleteQuizOptionVars);
// Variables can be defined inline as well.
const ref = adminDeleteQuizOptionRef({ optionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminDeleteQuizOptionRef(dataConnect, adminDeleteQuizOptionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quizOption_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quizOption_delete);
});
```

## AdminUpdateQuizOptionOrder
You can execute the `AdminUpdateQuizOptionOrder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminUpdateQuizOptionOrder(vars: AdminUpdateQuizOptionOrderVariables): MutationPromise<AdminUpdateQuizOptionOrderData, AdminUpdateQuizOptionOrderVariables>;

interface AdminUpdateQuizOptionOrderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateQuizOptionOrderVariables): MutationRef<AdminUpdateQuizOptionOrderData, AdminUpdateQuizOptionOrderVariables>;
}
export const adminUpdateQuizOptionOrderRef: AdminUpdateQuizOptionOrderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
adminUpdateQuizOptionOrder(dc: DataConnect, vars: AdminUpdateQuizOptionOrderVariables): MutationPromise<AdminUpdateQuizOptionOrderData, AdminUpdateQuizOptionOrderVariables>;

interface AdminUpdateQuizOptionOrderRef {
  ...
  (dc: DataConnect, vars: AdminUpdateQuizOptionOrderVariables): MutationRef<AdminUpdateQuizOptionOrderData, AdminUpdateQuizOptionOrderVariables>;
}
export const adminUpdateQuizOptionOrderRef: AdminUpdateQuizOptionOrderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminUpdateQuizOptionOrderRef:
```typescript
const name = adminUpdateQuizOptionOrderRef.operationName;
console.log(name);
```

### Variables
The `AdminUpdateQuizOptionOrder` mutation requires an argument of type `AdminUpdateQuizOptionOrderVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminUpdateQuizOptionOrderVariables {
  optionId: UUIDString;
  order: number;
}
```
### Return Type
Recall that executing the `AdminUpdateQuizOptionOrder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminUpdateQuizOptionOrderData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AdminUpdateQuizOptionOrderData {
  quizOption_update?: QuizOption_Key | null;
}
```
### Using `AdminUpdateQuizOptionOrder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminUpdateQuizOptionOrder, AdminUpdateQuizOptionOrderVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateQuizOptionOrder` mutation requires an argument of type `AdminUpdateQuizOptionOrderVariables`:
const adminUpdateQuizOptionOrderVars: AdminUpdateQuizOptionOrderVariables = {
  optionId: ..., 
  order: ..., 
};

// Call the `adminUpdateQuizOptionOrder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminUpdateQuizOptionOrder(adminUpdateQuizOptionOrderVars);
// Variables can be defined inline as well.
const { data } = await adminUpdateQuizOptionOrder({ optionId: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminUpdateQuizOptionOrder(dataConnect, adminUpdateQuizOptionOrderVars);

console.log(data.quizOption_update);

// Or, you can use the `Promise` API.
adminUpdateQuizOptionOrder(adminUpdateQuizOptionOrderVars).then((response) => {
  const data = response.data;
  console.log(data.quizOption_update);
});
```

### Using `AdminUpdateQuizOptionOrder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, adminUpdateQuizOptionOrderRef, AdminUpdateQuizOptionOrderVariables } from '@dataconnect/functions-generated';

// The `AdminUpdateQuizOptionOrder` mutation requires an argument of type `AdminUpdateQuizOptionOrderVariables`:
const adminUpdateQuizOptionOrderVars: AdminUpdateQuizOptionOrderVariables = {
  optionId: ..., 
  order: ..., 
};

// Call the `adminUpdateQuizOptionOrderRef()` function to get a reference to the mutation.
const ref = adminUpdateQuizOptionOrderRef(adminUpdateQuizOptionOrderVars);
// Variables can be defined inline as well.
const ref = adminUpdateQuizOptionOrderRef({ optionId: ..., order: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminUpdateQuizOptionOrderRef(dataConnect, adminUpdateQuizOptionOrderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.quizOption_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.quizOption_update);
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
import { connectorConfig, checkInToSession, CheckInToSessionVariables } from '@dataconnect/functions-generated';

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
import { connectorConfig, checkInToSessionRef, CheckInToSessionVariables } from '@dataconnect/functions-generated';

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
import { connectorConfig, syncUser, SyncUserVariables } from '@dataconnect/functions-generated';

// The `SyncUser` mutation requires an argument of type `SyncUserVariables`:
const syncUserVars: SyncUserVariables = {
  email: ..., 
  name: ..., 
  avatar: ..., // optional
};

// Call the `syncUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await syncUser(syncUserVars);
// Variables can be defined inline as well.
const { data } = await syncUser({ email: ..., name: ..., avatar: ..., });

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
import { connectorConfig, syncUserRef, SyncUserVariables } from '@dataconnect/functions-generated';

// The `SyncUser` mutation requires an argument of type `SyncUserVariables`:
const syncUserVars: SyncUserVariables = {
  email: ..., 
  name: ..., 
  avatar: ..., // optional
};

// Call the `syncUserRef()` function to get a reference to the mutation.
const ref = syncUserRef(syncUserVars);
// Variables can be defined inline as well.
const ref = syncUserRef({ email: ..., name: ..., avatar: ..., });

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
import { connectorConfig, updateMyProfile, UpdateMyProfileVariables } from '@dataconnect/functions-generated';

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
import { connectorConfig, updateMyProfileRef, UpdateMyProfileVariables } from '@dataconnect/functions-generated';

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

