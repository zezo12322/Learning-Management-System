# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`dataconnect-generated/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@dataconnect/generated/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
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
  - [*GetCourseCompletionStatus*](#getcoursecompletionstatus)
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
  - [*MyPaymentHistory*](#mypaymenthistory)
  - [*GetPendingSubmissions*](#getpendingsubmissions)
  - [*GetCourseInstructors*](#getcourseinstructors)
  - [*GetCourseSessions*](#getcoursesessions)
  - [*GetMe*](#getme)
- [**Mutations**](#mutations)
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
  - [*EnrollInCourse*](#enrollincourse)
  - [*EnrollInMission*](#enrollinmission)
  - [*UpdateLectureProgress*](#updatelectureprogress)
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
  - [*LogPayment*](#logpayment)
  - [*AddPaymentItem*](#addpaymentitem)
  - [*AdminAddCourseInstructor*](#adminaddcourseinstructor)
  - [*AdminRemoveCourseInstructor*](#adminremovecourseinstructor)
  - [*CheckInToSession*](#checkintosession)
  - [*SyncUser*](#syncuser)
  - [*UpdateMyProfile*](#updatemyprofile)
  - [*AdminCreateCourse*](#admincreatecourse)
  - [*AdminDeleteCourse*](#admindeletecourse)
  - [*AdminCreateSession*](#admincreatesession)
  - [*AdminCancelSession*](#admincancelsession)
  - [*AdminCreateSubscriptionTier*](#admincreatesubscriptiontier)
  - [*AdminDeprecateSubscriptionTier*](#admindeprecatesubscriptiontier)
  - [*AdminCreateCategory*](#admincreatecategory)

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `default`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#tanstack-install), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries).

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no variables, the Query hook function does not require arguments.
- If the Query has any required variables, the Query hook function will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks functions can be called with or without passing in an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query hook function without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `default` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## GetUserClaims
You can execute the `GetUserClaims` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetUserClaims(dc: DataConnect, vars: GetUserClaimsVariables, options?: useDataConnectQueryOptions<GetUserClaimsData>): UseDataConnectQueryResult<GetUserClaimsData, GetUserClaimsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUserClaims(vars: GetUserClaimsVariables, options?: useDataConnectQueryOptions<GetUserClaimsData>): UseDataConnectQueryResult<GetUserClaimsData, GetUserClaimsVariables>;
```

### Variables
The `GetUserClaims` Query requires an argument of type `GetUserClaimsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetUserClaimsVariables {
  uid: string;
}
```
### Return Type
Recall that calling the `GetUserClaims` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserClaims` Query is of type `GetUserClaimsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUserClaims`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetUserClaimsVariables } from '@dataconnect/generated';
import { useGetUserClaims } from '@dataconnect/generated/react'

export default function GetUserClaimsComponent() {
  // The `useGetUserClaims` Query hook requires an argument of type `GetUserClaimsVariables`:
  const getUserClaimsVars: GetUserClaimsVariables = {
    uid: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUserClaims(getUserClaimsVars);
  // Variables can be defined inline as well.
  const query = useGetUserClaims({ uid: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUserClaims(dataConnect, getUserClaimsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserClaims(getUserClaimsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserClaims(dataConnect, getUserClaimsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.user);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## MyCertificates
You can execute the `MyCertificates` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useMyCertificates(dc: DataConnect, options?: useDataConnectQueryOptions<MyCertificatesData>): UseDataConnectQueryResult<MyCertificatesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useMyCertificates(options?: useDataConnectQueryOptions<MyCertificatesData>): UseDataConnectQueryResult<MyCertificatesData, undefined>;
```

### Variables
The `MyCertificates` Query has no variables.
### Return Type
Recall that calling the `MyCertificates` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `MyCertificates` Query is of type `MyCertificatesData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `MyCertificates`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useMyCertificates } from '@dataconnect/generated/react'

export default function MyCertificatesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useMyCertificates();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useMyCertificates(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useMyCertificates(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useMyCertificates(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.certificates);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## VerifyCertificate
You can execute the `VerifyCertificate` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useVerifyCertificate(dc: DataConnect, vars: VerifyCertificateVariables, options?: useDataConnectQueryOptions<VerifyCertificateData>): UseDataConnectQueryResult<VerifyCertificateData, VerifyCertificateVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useVerifyCertificate(vars: VerifyCertificateVariables, options?: useDataConnectQueryOptions<VerifyCertificateData>): UseDataConnectQueryResult<VerifyCertificateData, VerifyCertificateVariables>;
```

### Variables
The `VerifyCertificate` Query requires an argument of type `VerifyCertificateVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface VerifyCertificateVariables {
  hash: string;
}
```
### Return Type
Recall that calling the `VerifyCertificate` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `VerifyCertificate` Query is of type `VerifyCertificateData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `VerifyCertificate`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, VerifyCertificateVariables } from '@dataconnect/generated';
import { useVerifyCertificate } from '@dataconnect/generated/react'

export default function VerifyCertificateComponent() {
  // The `useVerifyCertificate` Query hook requires an argument of type `VerifyCertificateVariables`:
  const verifyCertificateVars: VerifyCertificateVariables = {
    hash: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useVerifyCertificate(verifyCertificateVars);
  // Variables can be defined inline as well.
  const query = useVerifyCertificate({ hash: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useVerifyCertificate(dataConnect, verifyCertificateVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useVerifyCertificate(verifyCertificateVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useVerifyCertificate(dataConnect, verifyCertificateVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.certificates);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListPublishedCourses
You can execute the `ListPublishedCourses` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListPublishedCourses(dc: DataConnect, options?: useDataConnectQueryOptions<ListPublishedCoursesData>): UseDataConnectQueryResult<ListPublishedCoursesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListPublishedCourses(options?: useDataConnectQueryOptions<ListPublishedCoursesData>): UseDataConnectQueryResult<ListPublishedCoursesData, undefined>;
```

### Variables
The `ListPublishedCourses` Query has no variables.
### Return Type
Recall that calling the `ListPublishedCourses` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListPublishedCourses` Query is of type `ListPublishedCoursesData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListPublishedCourses`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListPublishedCourses } from '@dataconnect/generated/react'

export default function ListPublishedCoursesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListPublishedCourses();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListPublishedCourses(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListPublishedCourses(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListPublishedCourses(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courses);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCourseCurriculum
You can execute the `GetCourseCurriculum` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCourseCurriculum(dc: DataConnect, vars: GetCourseCurriculumVariables, options?: useDataConnectQueryOptions<GetCourseCurriculumData>): UseDataConnectQueryResult<GetCourseCurriculumData, GetCourseCurriculumVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCourseCurriculum(vars: GetCourseCurriculumVariables, options?: useDataConnectQueryOptions<GetCourseCurriculumData>): UseDataConnectQueryResult<GetCourseCurriculumData, GetCourseCurriculumVariables>;
```

### Variables
The `GetCourseCurriculum` Query requires an argument of type `GetCourseCurriculumVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCourseCurriculumVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that calling the `GetCourseCurriculum` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCourseCurriculum` Query is of type `GetCourseCurriculumData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCourseCurriculum`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCourseCurriculumVariables } from '@dataconnect/generated';
import { useGetCourseCurriculum } from '@dataconnect/generated/react'

export default function GetCourseCurriculumComponent() {
  // The `useGetCourseCurriculum` Query hook requires an argument of type `GetCourseCurriculumVariables`:
  const getCourseCurriculumVars: GetCourseCurriculumVariables = {
    courseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCourseCurriculum(getCourseCurriculumVars);
  // Variables can be defined inline as well.
  const query = useGetCourseCurriculum({ courseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCourseCurriculum(dataConnect, getCourseCurriculumVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseCurriculum(getCourseCurriculumVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseCurriculum(dataConnect, getCourseCurriculumVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.course);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetLectureContent
You can execute the `GetLectureContent` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetLectureContent(dc: DataConnect, vars: GetLectureContentVariables, options?: useDataConnectQueryOptions<GetLectureContentData>): UseDataConnectQueryResult<GetLectureContentData, GetLectureContentVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetLectureContent(vars: GetLectureContentVariables, options?: useDataConnectQueryOptions<GetLectureContentData>): UseDataConnectQueryResult<GetLectureContentData, GetLectureContentVariables>;
```

### Variables
The `GetLectureContent` Query requires an argument of type `GetLectureContentVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetLectureContentVariables {
  lectureId: UUIDString;
}
```
### Return Type
Recall that calling the `GetLectureContent` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetLectureContent` Query is of type `GetLectureContentData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
      } & Course_Key;
    };
  } & CourseLecture_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetLectureContent`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetLectureContentVariables } from '@dataconnect/generated';
import { useGetLectureContent } from '@dataconnect/generated/react'

export default function GetLectureContentComponent() {
  // The `useGetLectureContent` Query hook requires an argument of type `GetLectureContentVariables`:
  const getLectureContentVars: GetLectureContentVariables = {
    lectureId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetLectureContent(getLectureContentVars);
  // Variables can be defined inline as well.
  const query = useGetLectureContent({ lectureId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetLectureContent(dataConnect, getLectureContentVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetLectureContent(getLectureContentVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetLectureContent(dataConnect, getLectureContentVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courseLecture);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetUserLectureProgress
You can execute the `GetUserLectureProgress` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetUserLectureProgress(dc: DataConnect, vars: GetUserLectureProgressVariables, options?: useDataConnectQueryOptions<GetUserLectureProgressData>): UseDataConnectQueryResult<GetUserLectureProgressData, GetUserLectureProgressVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUserLectureProgress(vars: GetUserLectureProgressVariables, options?: useDataConnectQueryOptions<GetUserLectureProgressData>): UseDataConnectQueryResult<GetUserLectureProgressData, GetUserLectureProgressVariables>;
```

### Variables
The `GetUserLectureProgress` Query requires an argument of type `GetUserLectureProgressVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetUserLectureProgressVariables {
  lectureId: UUIDString;
}
```
### Return Type
Recall that calling the `GetUserLectureProgress` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserLectureProgress` Query is of type `GetUserLectureProgressData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetUserLectureProgressData {
  lectureProgresses: ({
    lastWatchedSecond: number;
    completedAt?: TimestampString | null;
  })[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUserLectureProgress`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetUserLectureProgressVariables } from '@dataconnect/generated';
import { useGetUserLectureProgress } from '@dataconnect/generated/react'

export default function GetUserLectureProgressComponent() {
  // The `useGetUserLectureProgress` Query hook requires an argument of type `GetUserLectureProgressVariables`:
  const getUserLectureProgressVars: GetUserLectureProgressVariables = {
    lectureId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUserLectureProgress(getUserLectureProgressVars);
  // Variables can be defined inline as well.
  const query = useGetUserLectureProgress({ lectureId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUserLectureProgress(dataConnect, getUserLectureProgressVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserLectureProgress(getUserLectureProgressVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserLectureProgress(dataConnect, getUserLectureProgressVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.lectureProgresses);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetMyCourseProgress
You can execute the `GetMyCourseProgress` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetMyCourseProgress(dc: DataConnect, vars: GetMyCourseProgressVariables, options?: useDataConnectQueryOptions<GetMyCourseProgressData>): UseDataConnectQueryResult<GetMyCourseProgressData, GetMyCourseProgressVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetMyCourseProgress(vars: GetMyCourseProgressVariables, options?: useDataConnectQueryOptions<GetMyCourseProgressData>): UseDataConnectQueryResult<GetMyCourseProgressData, GetMyCourseProgressVariables>;
```

### Variables
The `GetMyCourseProgress` Query requires an argument of type `GetMyCourseProgressVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetMyCourseProgressVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that calling the `GetMyCourseProgress` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetMyCourseProgress` Query is of type `GetMyCourseProgressData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetMyCourseProgress`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetMyCourseProgressVariables } from '@dataconnect/generated';
import { useGetMyCourseProgress } from '@dataconnect/generated/react'

export default function GetMyCourseProgressComponent() {
  // The `useGetMyCourseProgress` Query hook requires an argument of type `GetMyCourseProgressVariables`:
  const getMyCourseProgressVars: GetMyCourseProgressVariables = {
    courseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetMyCourseProgress(getMyCourseProgressVars);
  // Variables can be defined inline as well.
  const query = useGetMyCourseProgress({ courseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetMyCourseProgress(dataConnect, getMyCourseProgressVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyCourseProgress(getMyCourseProgressVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyCourseProgress(dataConnect, getMyCourseProgressVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.sections);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCourseForEnrollment
You can execute the `GetCourseForEnrollment` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCourseForEnrollment(dc: DataConnect, vars: GetCourseForEnrollmentVariables, options?: useDataConnectQueryOptions<GetCourseForEnrollmentData>): UseDataConnectQueryResult<GetCourseForEnrollmentData, GetCourseForEnrollmentVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCourseForEnrollment(vars: GetCourseForEnrollmentVariables, options?: useDataConnectQueryOptions<GetCourseForEnrollmentData>): UseDataConnectQueryResult<GetCourseForEnrollmentData, GetCourseForEnrollmentVariables>;
```

### Variables
The `GetCourseForEnrollment` Query requires an argument of type `GetCourseForEnrollmentVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCourseForEnrollmentVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that calling the `GetCourseForEnrollment` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCourseForEnrollment` Query is of type `GetCourseForEnrollmentData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetCourseForEnrollmentData {
  course?: {
    id: UUIDString;
    status: CourseStatus;
    price: number;
    deletedAt?: TimestampString | null;
  } & Course_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCourseForEnrollment`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCourseForEnrollmentVariables } from '@dataconnect/generated';
import { useGetCourseForEnrollment } from '@dataconnect/generated/react'

export default function GetCourseForEnrollmentComponent() {
  // The `useGetCourseForEnrollment` Query hook requires an argument of type `GetCourseForEnrollmentVariables`:
  const getCourseForEnrollmentVars: GetCourseForEnrollmentVariables = {
    courseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCourseForEnrollment(getCourseForEnrollmentVars);
  // Variables can be defined inline as well.
  const query = useGetCourseForEnrollment({ courseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCourseForEnrollment(dataConnect, getCourseForEnrollmentVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseForEnrollment(getCourseForEnrollmentVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseForEnrollment(dataConnect, getCourseForEnrollmentVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.course);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminGetCourse
You can execute the `AdminGetCourse` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useAdminGetCourse(dc: DataConnect, vars: AdminGetCourseVariables, options?: useDataConnectQueryOptions<AdminGetCourseData>): UseDataConnectQueryResult<AdminGetCourseData, AdminGetCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useAdminGetCourse(vars: AdminGetCourseVariables, options?: useDataConnectQueryOptions<AdminGetCourseData>): UseDataConnectQueryResult<AdminGetCourseData, AdminGetCourseVariables>;
```

### Variables
The `AdminGetCourse` Query requires an argument of type `AdminGetCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminGetCourseVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that calling the `AdminGetCourse` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `AdminGetCourse` Query is of type `AdminGetCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `AdminGetCourse`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminGetCourseVariables } from '@dataconnect/generated';
import { useAdminGetCourse } from '@dataconnect/generated/react'

export default function AdminGetCourseComponent() {
  // The `useAdminGetCourse` Query hook requires an argument of type `AdminGetCourseVariables`:
  const adminGetCourseVars: AdminGetCourseVariables = {
    courseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useAdminGetCourse(adminGetCourseVars);
  // Variables can be defined inline as well.
  const query = useAdminGetCourse({ courseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useAdminGetCourse(dataConnect, adminGetCourseVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useAdminGetCourse(adminGetCourseVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useAdminGetCourse(dataConnect, adminGetCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.course);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminListMyCourses
You can execute the `AdminListMyCourses` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useAdminListMyCourses(dc: DataConnect, options?: useDataConnectQueryOptions<AdminListMyCoursesData>): UseDataConnectQueryResult<AdminListMyCoursesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useAdminListMyCourses(options?: useDataConnectQueryOptions<AdminListMyCoursesData>): UseDataConnectQueryResult<AdminListMyCoursesData, undefined>;
```

### Variables
The `AdminListMyCourses` Query has no variables.
### Return Type
Recall that calling the `AdminListMyCourses` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `AdminListMyCourses` Query is of type `AdminListMyCoursesData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `AdminListMyCourses`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useAdminListMyCourses } from '@dataconnect/generated/react'

export default function AdminListMyCoursesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useAdminListMyCourses();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useAdminListMyCourses(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useAdminListMyCourses(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useAdminListMyCourses(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courses);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCourseCompletionStatus
You can execute the `GetCourseCompletionStatus` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCourseCompletionStatus(dc: DataConnect, vars: GetCourseCompletionStatusVariables, options?: useDataConnectQueryOptions<GetCourseCompletionStatusData>): UseDataConnectQueryResult<GetCourseCompletionStatusData, GetCourseCompletionStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCourseCompletionStatus(vars: GetCourseCompletionStatusVariables, options?: useDataConnectQueryOptions<GetCourseCompletionStatusData>): UseDataConnectQueryResult<GetCourseCompletionStatusData, GetCourseCompletionStatusVariables>;
```

### Variables
The `GetCourseCompletionStatus` Query requires an argument of type `GetCourseCompletionStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCourseCompletionStatusVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that calling the `GetCourseCompletionStatus` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCourseCompletionStatus` Query is of type `GetCourseCompletionStatusData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCourseCompletionStatus`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCourseCompletionStatusVariables } from '@dataconnect/generated';
import { useGetCourseCompletionStatus } from '@dataconnect/generated/react'

export default function GetCourseCompletionStatusComponent() {
  // The `useGetCourseCompletionStatus` Query hook requires an argument of type `GetCourseCompletionStatusVariables`:
  const getCourseCompletionStatusVars: GetCourseCompletionStatusVariables = {
    courseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCourseCompletionStatus(getCourseCompletionStatusVars);
  // Variables can be defined inline as well.
  const query = useGetCourseCompletionStatus({ courseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCourseCompletionStatus(dataConnect, getCourseCompletionStatusVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseCompletionStatus(getCourseCompletionStatusVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseCompletionStatus(dataConnect, getCourseCompletionStatusVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.sections);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetUserEnrollmentForCourse
You can execute the `GetUserEnrollmentForCourse` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetUserEnrollmentForCourse(dc: DataConnect, vars: GetUserEnrollmentForCourseVariables, options?: useDataConnectQueryOptions<GetUserEnrollmentForCourseData>): UseDataConnectQueryResult<GetUserEnrollmentForCourseData, GetUserEnrollmentForCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUserEnrollmentForCourse(vars: GetUserEnrollmentForCourseVariables, options?: useDataConnectQueryOptions<GetUserEnrollmentForCourseData>): UseDataConnectQueryResult<GetUserEnrollmentForCourseData, GetUserEnrollmentForCourseVariables>;
```

### Variables
The `GetUserEnrollmentForCourse` Query requires an argument of type `GetUserEnrollmentForCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetUserEnrollmentForCourseVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that calling the `GetUserEnrollmentForCourse` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserEnrollmentForCourse` Query is of type `GetUserEnrollmentForCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetUserEnrollmentForCourseData {
  enrollments: ({
    id: UUIDString;
    status: EnrollmentStatus;
    completedAt?: TimestampString | null;
  } & Enrollment_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUserEnrollmentForCourse`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetUserEnrollmentForCourseVariables } from '@dataconnect/generated';
import { useGetUserEnrollmentForCourse } from '@dataconnect/generated/react'

export default function GetUserEnrollmentForCourseComponent() {
  // The `useGetUserEnrollmentForCourse` Query hook requires an argument of type `GetUserEnrollmentForCourseVariables`:
  const getUserEnrollmentForCourseVars: GetUserEnrollmentForCourseVariables = {
    courseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUserEnrollmentForCourse(getUserEnrollmentForCourseVars);
  // Variables can be defined inline as well.
  const query = useGetUserEnrollmentForCourse({ courseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUserEnrollmentForCourse(dataConnect, getUserEnrollmentForCourseVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserEnrollmentForCourse(getUserEnrollmentForCourseVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserEnrollmentForCourse(dataConnect, getUserEnrollmentForCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.enrollments);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetUserEnrollmentForMission
You can execute the `GetUserEnrollmentForMission` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetUserEnrollmentForMission(dc: DataConnect, vars: GetUserEnrollmentForMissionVariables, options?: useDataConnectQueryOptions<GetUserEnrollmentForMissionData>): UseDataConnectQueryResult<GetUserEnrollmentForMissionData, GetUserEnrollmentForMissionVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUserEnrollmentForMission(vars: GetUserEnrollmentForMissionVariables, options?: useDataConnectQueryOptions<GetUserEnrollmentForMissionData>): UseDataConnectQueryResult<GetUserEnrollmentForMissionData, GetUserEnrollmentForMissionVariables>;
```

### Variables
The `GetUserEnrollmentForMission` Query requires an argument of type `GetUserEnrollmentForMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetUserEnrollmentForMissionVariables {
  missionId: UUIDString;
}
```
### Return Type
Recall that calling the `GetUserEnrollmentForMission` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserEnrollmentForMission` Query is of type `GetUserEnrollmentForMissionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetUserEnrollmentForMissionData {
  enrollments: ({
    id: UUIDString;
    status: EnrollmentStatus;
    completedAt?: TimestampString | null;
  } & Enrollment_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUserEnrollmentForMission`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetUserEnrollmentForMissionVariables } from '@dataconnect/generated';
import { useGetUserEnrollmentForMission } from '@dataconnect/generated/react'

export default function GetUserEnrollmentForMissionComponent() {
  // The `useGetUserEnrollmentForMission` Query hook requires an argument of type `GetUserEnrollmentForMissionVariables`:
  const getUserEnrollmentForMissionVars: GetUserEnrollmentForMissionVariables = {
    missionId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUserEnrollmentForMission(getUserEnrollmentForMissionVars);
  // Variables can be defined inline as well.
  const query = useGetUserEnrollmentForMission({ missionId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUserEnrollmentForMission(dataConnect, getUserEnrollmentForMissionVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserEnrollmentForMission(getUserEnrollmentForMissionVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserEnrollmentForMission(dataConnect, getUserEnrollmentForMissionVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.enrollments);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetMissionForEnrollment
You can execute the `GetMissionForEnrollment` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetMissionForEnrollment(dc: DataConnect, vars: GetMissionForEnrollmentVariables, options?: useDataConnectQueryOptions<GetMissionForEnrollmentData>): UseDataConnectQueryResult<GetMissionForEnrollmentData, GetMissionForEnrollmentVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetMissionForEnrollment(vars: GetMissionForEnrollmentVariables, options?: useDataConnectQueryOptions<GetMissionForEnrollmentData>): UseDataConnectQueryResult<GetMissionForEnrollmentData, GetMissionForEnrollmentVariables>;
```

### Variables
The `GetMissionForEnrollment` Query requires an argument of type `GetMissionForEnrollmentVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetMissionForEnrollmentVariables {
  missionId: UUIDString;
}
```
### Return Type
Recall that calling the `GetMissionForEnrollment` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetMissionForEnrollment` Query is of type `GetMissionForEnrollmentData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetMissionForEnrollmentData {
  mission?: {
    id: UUIDString;
    deletedAt?: TimestampString | null;
  } & Mission_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetMissionForEnrollment`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetMissionForEnrollmentVariables } from '@dataconnect/generated';
import { useGetMissionForEnrollment } from '@dataconnect/generated/react'

export default function GetMissionForEnrollmentComponent() {
  // The `useGetMissionForEnrollment` Query hook requires an argument of type `GetMissionForEnrollmentVariables`:
  const getMissionForEnrollmentVars: GetMissionForEnrollmentVariables = {
    missionId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetMissionForEnrollment(getMissionForEnrollmentVars);
  // Variables can be defined inline as well.
  const query = useGetMissionForEnrollment({ missionId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetMissionForEnrollment(dataConnect, getMissionForEnrollmentVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetMissionForEnrollment(getMissionForEnrollmentVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetMissionForEnrollment(dataConnect, getMissionForEnrollmentVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.mission);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## MySubmissions
You can execute the `MySubmissions` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useMySubmissions(dc: DataConnect, options?: useDataConnectQueryOptions<MySubmissionsData>): UseDataConnectQueryResult<MySubmissionsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useMySubmissions(options?: useDataConnectQueryOptions<MySubmissionsData>): UseDataConnectQueryResult<MySubmissionsData, undefined>;
```

### Variables
The `MySubmissions` Query has no variables.
### Return Type
Recall that calling the `MySubmissions` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `MySubmissions` Query is of type `MySubmissionsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `MySubmissions`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useMySubmissions } from '@dataconnect/generated/react'

export default function MySubmissionsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useMySubmissions();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useMySubmissions(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useMySubmissions(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useMySubmissions(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.missionSubmissions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetSubmissionForGrading
You can execute the `GetSubmissionForGrading` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetSubmissionForGrading(dc: DataConnect, vars: GetSubmissionForGradingVariables, options?: useDataConnectQueryOptions<GetSubmissionForGradingData>): UseDataConnectQueryResult<GetSubmissionForGradingData, GetSubmissionForGradingVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetSubmissionForGrading(vars: GetSubmissionForGradingVariables, options?: useDataConnectQueryOptions<GetSubmissionForGradingData>): UseDataConnectQueryResult<GetSubmissionForGradingData, GetSubmissionForGradingVariables>;
```

### Variables
The `GetSubmissionForGrading` Query requires an argument of type `GetSubmissionForGradingVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetSubmissionForGradingVariables {
  submissionId: UUIDString;
}
```
### Return Type
Recall that calling the `GetSubmissionForGrading` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetSubmissionForGrading` Query is of type `GetSubmissionForGradingData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetSubmissionForGrading`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetSubmissionForGradingVariables } from '@dataconnect/generated';
import { useGetSubmissionForGrading } from '@dataconnect/generated/react'

export default function GetSubmissionForGradingComponent() {
  // The `useGetSubmissionForGrading` Query hook requires an argument of type `GetSubmissionForGradingVariables`:
  const getSubmissionForGradingVars: GetSubmissionForGradingVariables = {
    submissionId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetSubmissionForGrading(getSubmissionForGradingVars);
  // Variables can be defined inline as well.
  const query = useGetSubmissionForGrading({ submissionId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetSubmissionForGrading(dataConnect, getSubmissionForGradingVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetSubmissionForGrading(getSubmissionForGradingVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetSubmissionForGrading(dataConnect, getSubmissionForGradingVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.missionSubmission);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetEnrollmentForUserMission
You can execute the `GetEnrollmentForUserMission` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetEnrollmentForUserMission(dc: DataConnect, vars: GetEnrollmentForUserMissionVariables, options?: useDataConnectQueryOptions<GetEnrollmentForUserMissionData>): UseDataConnectQueryResult<GetEnrollmentForUserMissionData, GetEnrollmentForUserMissionVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetEnrollmentForUserMission(vars: GetEnrollmentForUserMissionVariables, options?: useDataConnectQueryOptions<GetEnrollmentForUserMissionData>): UseDataConnectQueryResult<GetEnrollmentForUserMissionData, GetEnrollmentForUserMissionVariables>;
```

### Variables
The `GetEnrollmentForUserMission` Query requires an argument of type `GetEnrollmentForUserMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetEnrollmentForUserMissionVariables {
  userId: string;
  missionId: UUIDString;
}
```
### Return Type
Recall that calling the `GetEnrollmentForUserMission` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetEnrollmentForUserMission` Query is of type `GetEnrollmentForUserMissionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetEnrollmentForUserMissionData {
  enrollments: ({
    id: UUIDString;
    status: EnrollmentStatus;
    completedAt?: TimestampString | null;
  } & Enrollment_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetEnrollmentForUserMission`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetEnrollmentForUserMissionVariables } from '@dataconnect/generated';
import { useGetEnrollmentForUserMission } from '@dataconnect/generated/react'

export default function GetEnrollmentForUserMissionComponent() {
  // The `useGetEnrollmentForUserMission` Query hook requires an argument of type `GetEnrollmentForUserMissionVariables`:
  const getEnrollmentForUserMissionVars: GetEnrollmentForUserMissionVariables = {
    userId: ..., 
    missionId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetEnrollmentForUserMission(getEnrollmentForUserMissionVars);
  // Variables can be defined inline as well.
  const query = useGetEnrollmentForUserMission({ userId: ..., missionId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetEnrollmentForUserMission(dataConnect, getEnrollmentForUserMissionVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetEnrollmentForUserMission(getEnrollmentForUserMissionVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetEnrollmentForUserMission(dataConnect, getEnrollmentForUserMissionVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.enrollments);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminGetMission
You can execute the `AdminGetMission` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useAdminGetMission(dc: DataConnect, vars: AdminGetMissionVariables, options?: useDataConnectQueryOptions<AdminGetMissionData>): UseDataConnectQueryResult<AdminGetMissionData, AdminGetMissionVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useAdminGetMission(vars: AdminGetMissionVariables, options?: useDataConnectQueryOptions<AdminGetMissionData>): UseDataConnectQueryResult<AdminGetMissionData, AdminGetMissionVariables>;
```

### Variables
The `AdminGetMission` Query requires an argument of type `AdminGetMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminGetMissionVariables {
  missionId: UUIDString;
}
```
### Return Type
Recall that calling the `AdminGetMission` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `AdminGetMission` Query is of type `AdminGetMissionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `AdminGetMission`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminGetMissionVariables } from '@dataconnect/generated';
import { useAdminGetMission } from '@dataconnect/generated/react'

export default function AdminGetMissionComponent() {
  // The `useAdminGetMission` Query hook requires an argument of type `AdminGetMissionVariables`:
  const adminGetMissionVars: AdminGetMissionVariables = {
    missionId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useAdminGetMission(adminGetMissionVars);
  // Variables can be defined inline as well.
  const query = useAdminGetMission({ missionId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useAdminGetMission(dataConnect, adminGetMissionVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useAdminGetMission(adminGetMissionVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useAdminGetMission(dataConnect, adminGetMissionVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.mission);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminListMyMissions
You can execute the `AdminListMyMissions` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useAdminListMyMissions(dc: DataConnect, options?: useDataConnectQueryOptions<AdminListMyMissionsData>): UseDataConnectQueryResult<AdminListMyMissionsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useAdminListMyMissions(options?: useDataConnectQueryOptions<AdminListMyMissionsData>): UseDataConnectQueryResult<AdminListMyMissionsData, undefined>;
```

### Variables
The `AdminListMyMissions` Query has no variables.
### Return Type
Recall that calling the `AdminListMyMissions` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `AdminListMyMissions` Query is of type `AdminListMyMissionsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `AdminListMyMissions`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useAdminListMyMissions } from '@dataconnect/generated/react'

export default function AdminListMyMissionsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useAdminListMyMissions();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useAdminListMyMissions(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useAdminListMyMissions(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useAdminListMyMissions(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.missions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetMissionTemplates
You can execute the `GetMissionTemplates` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetMissionTemplates(dc: DataConnect, vars: GetMissionTemplatesVariables, options?: useDataConnectQueryOptions<GetMissionTemplatesData>): UseDataConnectQueryResult<GetMissionTemplatesData, GetMissionTemplatesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetMissionTemplates(vars: GetMissionTemplatesVariables, options?: useDataConnectQueryOptions<GetMissionTemplatesData>): UseDataConnectQueryResult<GetMissionTemplatesData, GetMissionTemplatesVariables>;
```

### Variables
The `GetMissionTemplates` Query requires an argument of type `GetMissionTemplatesVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetMissionTemplatesVariables {
  missionId: UUIDString;
}
```
### Return Type
Recall that calling the `GetMissionTemplates` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetMissionTemplates` Query is of type `GetMissionTemplatesData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetMissionTemplatesData {
  missionTemplates: ({
    id: UUIDString;
    title: string;
    fileUrl: string;
    fileType: string;
  } & MissionTemplate_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetMissionTemplates`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetMissionTemplatesVariables } from '@dataconnect/generated';
import { useGetMissionTemplates } from '@dataconnect/generated/react'

export default function GetMissionTemplatesComponent() {
  // The `useGetMissionTemplates` Query hook requires an argument of type `GetMissionTemplatesVariables`:
  const getMissionTemplatesVars: GetMissionTemplatesVariables = {
    missionId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetMissionTemplates(getMissionTemplatesVars);
  // Variables can be defined inline as well.
  const query = useGetMissionTemplates({ missionId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetMissionTemplates(dataConnect, getMissionTemplatesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetMissionTemplates(getMissionTemplatesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetMissionTemplates(dataConnect, getMissionTemplatesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.missionTemplates);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetQuizQuestions
You can execute the `GetQuizQuestions` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetQuizQuestions(dc: DataConnect, vars: GetQuizQuestionsVariables, options?: useDataConnectQueryOptions<GetQuizQuestionsData>): UseDataConnectQueryResult<GetQuizQuestionsData, GetQuizQuestionsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetQuizQuestions(vars: GetQuizQuestionsVariables, options?: useDataConnectQueryOptions<GetQuizQuestionsData>): UseDataConnectQueryResult<GetQuizQuestionsData, GetQuizQuestionsVariables>;
```

### Variables
The `GetQuizQuestions` Query requires an argument of type `GetQuizQuestionsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetQuizQuestionsVariables {
  lectureId: UUIDString;
}
```
### Return Type
Recall that calling the `GetQuizQuestions` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetQuizQuestions` Query is of type `GetQuizQuestionsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetQuizQuestions`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetQuizQuestionsVariables } from '@dataconnect/generated';
import { useGetQuizQuestions } from '@dataconnect/generated/react'

export default function GetQuizQuestionsComponent() {
  // The `useGetQuizQuestions` Query hook requires an argument of type `GetQuizQuestionsVariables`:
  const getQuizQuestionsVars: GetQuizQuestionsVariables = {
    lectureId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetQuizQuestions(getQuizQuestionsVars);
  // Variables can be defined inline as well.
  const query = useGetQuizQuestions({ lectureId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetQuizQuestions(dataConnect, getQuizQuestionsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuizQuestions(getQuizQuestionsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuizQuestions(dataConnect, getQuizQuestionsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courseQuizs);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetExpiredAttempts
You can execute the `GetExpiredAttempts` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetExpiredAttempts(dc: DataConnect, options?: useDataConnectQueryOptions<GetExpiredAttemptsData>): UseDataConnectQueryResult<GetExpiredAttemptsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetExpiredAttempts(options?: useDataConnectQueryOptions<GetExpiredAttemptsData>): UseDataConnectQueryResult<GetExpiredAttemptsData, undefined>;
```

### Variables
The `GetExpiredAttempts` Query has no variables.
### Return Type
Recall that calling the `GetExpiredAttempts` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetExpiredAttempts` Query is of type `GetExpiredAttemptsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetExpiredAttempts`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useGetExpiredAttempts } from '@dataconnect/generated/react'

export default function GetExpiredAttemptsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetExpiredAttempts();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetExpiredAttempts(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetExpiredAttempts(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetExpiredAttempts(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.quizAttempts);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetUserQuizAttempts
You can execute the `GetUserQuizAttempts` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetUserQuizAttempts(dc: DataConnect, vars: GetUserQuizAttemptsVariables, options?: useDataConnectQueryOptions<GetUserQuizAttemptsData>): UseDataConnectQueryResult<GetUserQuizAttemptsData, GetUserQuizAttemptsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUserQuizAttempts(vars: GetUserQuizAttemptsVariables, options?: useDataConnectQueryOptions<GetUserQuizAttemptsData>): UseDataConnectQueryResult<GetUserQuizAttemptsData, GetUserQuizAttemptsVariables>;
```

### Variables
The `GetUserQuizAttempts` Query requires an argument of type `GetUserQuizAttemptsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetUserQuizAttemptsVariables {
  quizId: UUIDString;
}
```
### Return Type
Recall that calling the `GetUserQuizAttempts` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserQuizAttempts` Query is of type `GetUserQuizAttemptsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUserQuizAttempts`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetUserQuizAttemptsVariables } from '@dataconnect/generated';
import { useGetUserQuizAttempts } from '@dataconnect/generated/react'

export default function GetUserQuizAttemptsComponent() {
  // The `useGetUserQuizAttempts` Query hook requires an argument of type `GetUserQuizAttemptsVariables`:
  const getUserQuizAttemptsVars: GetUserQuizAttemptsVariables = {
    quizId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUserQuizAttempts(getUserQuizAttemptsVars);
  // Variables can be defined inline as well.
  const query = useGetUserQuizAttempts({ quizId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUserQuizAttempts(dataConnect, getUserQuizAttemptsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserQuizAttempts(getUserQuizAttemptsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserQuizAttempts(dataConnect, getUserQuizAttemptsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.quizAttempts);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetQuizAttemptById
You can execute the `GetQuizAttemptById` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetQuizAttemptById(dc: DataConnect, vars: GetQuizAttemptByIdVariables, options?: useDataConnectQueryOptions<GetQuizAttemptByIdData>): UseDataConnectQueryResult<GetQuizAttemptByIdData, GetQuizAttemptByIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetQuizAttemptById(vars: GetQuizAttemptByIdVariables, options?: useDataConnectQueryOptions<GetQuizAttemptByIdData>): UseDataConnectQueryResult<GetQuizAttemptByIdData, GetQuizAttemptByIdVariables>;
```

### Variables
The `GetQuizAttemptById` Query requires an argument of type `GetQuizAttemptByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetQuizAttemptByIdVariables {
  attemptId: UUIDString;
}
```
### Return Type
Recall that calling the `GetQuizAttemptById` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetQuizAttemptById` Query is of type `GetQuizAttemptByIdData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetQuizAttemptById`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetQuizAttemptByIdVariables } from '@dataconnect/generated';
import { useGetQuizAttemptById } from '@dataconnect/generated/react'

export default function GetQuizAttemptByIdComponent() {
  // The `useGetQuizAttemptById` Query hook requires an argument of type `GetQuizAttemptByIdVariables`:
  const getQuizAttemptByIdVars: GetQuizAttemptByIdVariables = {
    attemptId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetQuizAttemptById(getQuizAttemptByIdVars);
  // Variables can be defined inline as well.
  const query = useGetQuizAttemptById({ attemptId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetQuizAttemptById(dataConnect, getQuizAttemptByIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuizAttemptById(getQuizAttemptByIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuizAttemptById(dataConnect, getQuizAttemptByIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.quizAttempt);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetQuizQuestionPoints
You can execute the `GetQuizQuestionPoints` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetQuizQuestionPoints(dc: DataConnect, vars: GetQuizQuestionPointsVariables, options?: useDataConnectQueryOptions<GetQuizQuestionPointsData>): UseDataConnectQueryResult<GetQuizQuestionPointsData, GetQuizQuestionPointsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetQuizQuestionPoints(vars: GetQuizQuestionPointsVariables, options?: useDataConnectQueryOptions<GetQuizQuestionPointsData>): UseDataConnectQueryResult<GetQuizQuestionPointsData, GetQuizQuestionPointsVariables>;
```

### Variables
The `GetQuizQuestionPoints` Query requires an argument of type `GetQuizQuestionPointsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetQuizQuestionPointsVariables {
  quizId: UUIDString;
}
```
### Return Type
Recall that calling the `GetQuizQuestionPoints` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetQuizQuestionPoints` Query is of type `GetQuizQuestionPointsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetQuizQuestionPointsData {
  quizQuestions: ({
    id: UUIDString;
    points: number;
  } & QuizQuestion_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetQuizQuestionPoints`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetQuizQuestionPointsVariables } from '@dataconnect/generated';
import { useGetQuizQuestionPoints } from '@dataconnect/generated/react'

export default function GetQuizQuestionPointsComponent() {
  // The `useGetQuizQuestionPoints` Query hook requires an argument of type `GetQuizQuestionPointsVariables`:
  const getQuizQuestionPointsVars: GetQuizQuestionPointsVariables = {
    quizId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetQuizQuestionPoints(getQuizQuestionPointsVars);
  // Variables can be defined inline as well.
  const query = useGetQuizQuestionPoints({ quizId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetQuizQuestionPoints(dataConnect, getQuizQuestionPointsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuizQuestionPoints(getQuizQuestionPointsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuizQuestionPoints(dataConnect, getQuizQuestionPointsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.quizQuestions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetAttemptAnswersWithCorrect
You can execute the `GetAttemptAnswersWithCorrect` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetAttemptAnswersWithCorrect(dc: DataConnect, vars: GetAttemptAnswersWithCorrectVariables, options?: useDataConnectQueryOptions<GetAttemptAnswersWithCorrectData>): UseDataConnectQueryResult<GetAttemptAnswersWithCorrectData, GetAttemptAnswersWithCorrectVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetAttemptAnswersWithCorrect(vars: GetAttemptAnswersWithCorrectVariables, options?: useDataConnectQueryOptions<GetAttemptAnswersWithCorrectData>): UseDataConnectQueryResult<GetAttemptAnswersWithCorrectData, GetAttemptAnswersWithCorrectVariables>;
```

### Variables
The `GetAttemptAnswersWithCorrect` Query requires an argument of type `GetAttemptAnswersWithCorrectVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetAttemptAnswersWithCorrectVariables {
  attemptId: UUIDString;
}
```
### Return Type
Recall that calling the `GetAttemptAnswersWithCorrect` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetAttemptAnswersWithCorrect` Query is of type `GetAttemptAnswersWithCorrectData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetAttemptAnswersWithCorrect`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetAttemptAnswersWithCorrectVariables } from '@dataconnect/generated';
import { useGetAttemptAnswersWithCorrect } from '@dataconnect/generated/react'

export default function GetAttemptAnswersWithCorrectComponent() {
  // The `useGetAttemptAnswersWithCorrect` Query hook requires an argument of type `GetAttemptAnswersWithCorrectVariables`:
  const getAttemptAnswersWithCorrectVars: GetAttemptAnswersWithCorrectVariables = {
    attemptId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetAttemptAnswersWithCorrect(getAttemptAnswersWithCorrectVars);
  // Variables can be defined inline as well.
  const query = useGetAttemptAnswersWithCorrect({ attemptId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetAttemptAnswersWithCorrect(dataConnect, getAttemptAnswersWithCorrectVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetAttemptAnswersWithCorrect(getAttemptAnswersWithCorrectVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetAttemptAnswersWithCorrect(dataConnect, getAttemptAnswersWithCorrectVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.quizAttemptAnswers);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetQuizSettings
You can execute the `GetQuizSettings` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetQuizSettings(dc: DataConnect, vars: GetQuizSettingsVariables, options?: useDataConnectQueryOptions<GetQuizSettingsData>): UseDataConnectQueryResult<GetQuizSettingsData, GetQuizSettingsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetQuizSettings(vars: GetQuizSettingsVariables, options?: useDataConnectQueryOptions<GetQuizSettingsData>): UseDataConnectQueryResult<GetQuizSettingsData, GetQuizSettingsVariables>;
```

### Variables
The `GetQuizSettings` Query requires an argument of type `GetQuizSettingsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetQuizSettingsVariables {
  quizId: UUIDString;
}
```
### Return Type
Recall that calling the `GetQuizSettings` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetQuizSettings` Query is of type `GetQuizSettingsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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
        } & Course_Key;
      };
    } & CourseLecture_Key;
  } & CourseQuiz_Key;
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetQuizSettings`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetQuizSettingsVariables } from '@dataconnect/generated';
import { useGetQuizSettings } from '@dataconnect/generated/react'

export default function GetQuizSettingsComponent() {
  // The `useGetQuizSettings` Query hook requires an argument of type `GetQuizSettingsVariables`:
  const getQuizSettingsVars: GetQuizSettingsVariables = {
    quizId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetQuizSettings(getQuizSettingsVars);
  // Variables can be defined inline as well.
  const query = useGetQuizSettings({ quizId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetQuizSettings(dataConnect, getQuizSettingsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuizSettings(getQuizSettingsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuizSettings(dataConnect, getQuizSettingsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courseQuiz);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetQuestionOptions
You can execute the `GetQuestionOptions` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetQuestionOptions(dc: DataConnect, vars: GetQuestionOptionsVariables, options?: useDataConnectQueryOptions<GetQuestionOptionsData>): UseDataConnectQueryResult<GetQuestionOptionsData, GetQuestionOptionsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetQuestionOptions(vars: GetQuestionOptionsVariables, options?: useDataConnectQueryOptions<GetQuestionOptionsData>): UseDataConnectQueryResult<GetQuestionOptionsData, GetQuestionOptionsVariables>;
```

### Variables
The `GetQuestionOptions` Query requires an argument of type `GetQuestionOptionsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetQuestionOptionsVariables {
  questionId: UUIDString;
}
```
### Return Type
Recall that calling the `GetQuestionOptions` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetQuestionOptions` Query is of type `GetQuestionOptionsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetQuestionOptionsData {
  quizOptions: ({
    id: UUIDString;
    text: string;
    order: number;
    isCorrect: boolean;
  } & QuizOption_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetQuestionOptions`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetQuestionOptionsVariables } from '@dataconnect/generated';
import { useGetQuestionOptions } from '@dataconnect/generated/react'

export default function GetQuestionOptionsComponent() {
  // The `useGetQuestionOptions` Query hook requires an argument of type `GetQuestionOptionsVariables`:
  const getQuestionOptionsVars: GetQuestionOptionsVariables = {
    questionId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetQuestionOptions(getQuestionOptionsVars);
  // Variables can be defined inline as well.
  const query = useGetQuestionOptions({ questionId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetQuestionOptions(dataConnect, getQuestionOptionsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuestionOptions(getQuestionOptionsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuestionOptions(dataConnect, getQuestionOptionsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.quizOptions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetOptionWithQuestion
You can execute the `GetOptionWithQuestion` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetOptionWithQuestion(dc: DataConnect, vars: GetOptionWithQuestionVariables, options?: useDataConnectQueryOptions<GetOptionWithQuestionData>): UseDataConnectQueryResult<GetOptionWithQuestionData, GetOptionWithQuestionVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetOptionWithQuestion(vars: GetOptionWithQuestionVariables, options?: useDataConnectQueryOptions<GetOptionWithQuestionData>): UseDataConnectQueryResult<GetOptionWithQuestionData, GetOptionWithQuestionVariables>;
```

### Variables
The `GetOptionWithQuestion` Query requires an argument of type `GetOptionWithQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetOptionWithQuestionVariables {
  optionId: UUIDString;
}
```
### Return Type
Recall that calling the `GetOptionWithQuestion` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOptionWithQuestion` Query is of type `GetOptionWithQuestionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetOptionWithQuestion`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetOptionWithQuestionVariables } from '@dataconnect/generated';
import { useGetOptionWithQuestion } from '@dataconnect/generated/react'

export default function GetOptionWithQuestionComponent() {
  // The `useGetOptionWithQuestion` Query hook requires an argument of type `GetOptionWithQuestionVariables`:
  const getOptionWithQuestionVars: GetOptionWithQuestionVariables = {
    optionId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetOptionWithQuestion(getOptionWithQuestionVars);
  // Variables can be defined inline as well.
  const query = useGetOptionWithQuestion({ optionId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetOptionWithQuestion(dataConnect, getOptionWithQuestionVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetOptionWithQuestion(getOptionWithQuestionVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetOptionWithQuestion(dataConnect, getOptionWithQuestionVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.quizOption);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetActiveQuizSession
You can execute the `GetActiveQuizSession` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetActiveQuizSession(dc: DataConnect, vars: GetActiveQuizSessionVariables, options?: useDataConnectQueryOptions<GetActiveQuizSessionData>): UseDataConnectQueryResult<GetActiveQuizSessionData, GetActiveQuizSessionVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetActiveQuizSession(vars: GetActiveQuizSessionVariables, options?: useDataConnectQueryOptions<GetActiveQuizSessionData>): UseDataConnectQueryResult<GetActiveQuizSessionData, GetActiveQuizSessionVariables>;
```

### Variables
The `GetActiveQuizSession` Query requires an argument of type `GetActiveQuizSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetActiveQuizSessionVariables {
  attemptId: UUIDString;
}
```
### Return Type
Recall that calling the `GetActiveQuizSession` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetActiveQuizSession` Query is of type `GetActiveQuizSessionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetActiveQuizSession`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetActiveQuizSessionVariables } from '@dataconnect/generated';
import { useGetActiveQuizSession } from '@dataconnect/generated/react'

export default function GetActiveQuizSessionComponent() {
  // The `useGetActiveQuizSession` Query hook requires an argument of type `GetActiveQuizSessionVariables`:
  const getActiveQuizSessionVars: GetActiveQuizSessionVariables = {
    attemptId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetActiveQuizSession(getActiveQuizSessionVars);
  // Variables can be defined inline as well.
  const query = useGetActiveQuizSession({ attemptId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetActiveQuizSession(dataConnect, getActiveQuizSessionVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetActiveQuizSession(getActiveQuizSessionVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetActiveQuizSession(dataConnect, getActiveQuizSessionVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.quizAttempt);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminGetQuiz
You can execute the `AdminGetQuiz` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useAdminGetQuiz(dc: DataConnect, vars: AdminGetQuizVariables, options?: useDataConnectQueryOptions<AdminGetQuizData>): UseDataConnectQueryResult<AdminGetQuizData, AdminGetQuizVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useAdminGetQuiz(vars: AdminGetQuizVariables, options?: useDataConnectQueryOptions<AdminGetQuizData>): UseDataConnectQueryResult<AdminGetQuizData, AdminGetQuizVariables>;
```

### Variables
The `AdminGetQuiz` Query requires an argument of type `AdminGetQuizVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminGetQuizVariables {
  quizId: UUIDString;
}
```
### Return Type
Recall that calling the `AdminGetQuiz` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `AdminGetQuiz` Query is of type `AdminGetQuizData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `AdminGetQuiz`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminGetQuizVariables } from '@dataconnect/generated';
import { useAdminGetQuiz } from '@dataconnect/generated/react'

export default function AdminGetQuizComponent() {
  // The `useAdminGetQuiz` Query hook requires an argument of type `AdminGetQuizVariables`:
  const adminGetQuizVars: AdminGetQuizVariables = {
    quizId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useAdminGetQuiz(adminGetQuizVars);
  // Variables can be defined inline as well.
  const query = useAdminGetQuiz({ quizId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useAdminGetQuiz(dataConnect, adminGetQuizVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useAdminGetQuiz(adminGetQuizVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useAdminGetQuiz(dataConnect, adminGetQuizVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courseQuiz);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetMyCourseAccess
You can execute the `GetMyCourseAccess` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetMyCourseAccess(dc: DataConnect, vars: GetMyCourseAccessVariables, options?: useDataConnectQueryOptions<GetMyCourseAccessData>): UseDataConnectQueryResult<GetMyCourseAccessData, GetMyCourseAccessVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetMyCourseAccess(vars: GetMyCourseAccessVariables, options?: useDataConnectQueryOptions<GetMyCourseAccessData>): UseDataConnectQueryResult<GetMyCourseAccessData, GetMyCourseAccessVariables>;
```

### Variables
The `GetMyCourseAccess` Query requires an argument of type `GetMyCourseAccessVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetMyCourseAccessVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that calling the `GetMyCourseAccess` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetMyCourseAccess` Query is of type `GetMyCourseAccessData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetMyCourseAccess`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetMyCourseAccessVariables } from '@dataconnect/generated';
import { useGetMyCourseAccess } from '@dataconnect/generated/react'

export default function GetMyCourseAccessComponent() {
  // The `useGetMyCourseAccess` Query hook requires an argument of type `GetMyCourseAccessVariables`:
  const getMyCourseAccessVars: GetMyCourseAccessVariables = {
    courseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetMyCourseAccess(getMyCourseAccessVars);
  // Variables can be defined inline as well.
  const query = useGetMyCourseAccess({ courseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetMyCourseAccess(dataConnect, getMyCourseAccessVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyCourseAccess(getMyCourseAccessVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyCourseAccess(dataConnect, getMyCourseAccessVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.course);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetMyMissionAccess
You can execute the `GetMyMissionAccess` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetMyMissionAccess(dc: DataConnect, vars: GetMyMissionAccessVariables, options?: useDataConnectQueryOptions<GetMyMissionAccessData>): UseDataConnectQueryResult<GetMyMissionAccessData, GetMyMissionAccessVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetMyMissionAccess(vars: GetMyMissionAccessVariables, options?: useDataConnectQueryOptions<GetMyMissionAccessData>): UseDataConnectQueryResult<GetMyMissionAccessData, GetMyMissionAccessVariables>;
```

### Variables
The `GetMyMissionAccess` Query requires an argument of type `GetMyMissionAccessVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetMyMissionAccessVariables {
  missionId: UUIDString;
}
```
### Return Type
Recall that calling the `GetMyMissionAccess` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetMyMissionAccess` Query is of type `GetMyMissionAccessData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetMyMissionAccess`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetMyMissionAccessVariables } from '@dataconnect/generated';
import { useGetMyMissionAccess } from '@dataconnect/generated/react'

export default function GetMyMissionAccessComponent() {
  // The `useGetMyMissionAccess` Query hook requires an argument of type `GetMyMissionAccessVariables`:
  const getMyMissionAccessVars: GetMyMissionAccessVariables = {
    missionId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetMyMissionAccess(getMyMissionAccessVars);
  // Variables can be defined inline as well.
  const query = useGetMyMissionAccess({ missionId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetMyMissionAccess(dataConnect, getMyMissionAccessVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyMissionAccess(getMyMissionAccessVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetMyMissionAccess(dataConnect, getMyMissionAccessVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.mission);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetQuestionCourse
You can execute the `GetQuestionCourse` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetQuestionCourse(dc: DataConnect, vars: GetQuestionCourseVariables, options?: useDataConnectQueryOptions<GetQuestionCourseData>): UseDataConnectQueryResult<GetQuestionCourseData, GetQuestionCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetQuestionCourse(vars: GetQuestionCourseVariables, options?: useDataConnectQueryOptions<GetQuestionCourseData>): UseDataConnectQueryResult<GetQuestionCourseData, GetQuestionCourseVariables>;
```

### Variables
The `GetQuestionCourse` Query requires an argument of type `GetQuestionCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetQuestionCourseVariables {
  questionId: UUIDString;
}
```
### Return Type
Recall that calling the `GetQuestionCourse` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetQuestionCourse` Query is of type `GetQuestionCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetQuestionCourseData {
  quizQuestion?: {
    quiz: {
      lecture: {
        section: {
          course: {
            id: UUIDString;
          } & Course_Key;
        };
      };
    };
  };
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetQuestionCourse`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetQuestionCourseVariables } from '@dataconnect/generated';
import { useGetQuestionCourse } from '@dataconnect/generated/react'

export default function GetQuestionCourseComponent() {
  // The `useGetQuestionCourse` Query hook requires an argument of type `GetQuestionCourseVariables`:
  const getQuestionCourseVars: GetQuestionCourseVariables = {
    questionId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetQuestionCourse(getQuestionCourseVars);
  // Variables can be defined inline as well.
  const query = useGetQuestionCourse({ questionId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetQuestionCourse(dataConnect, getQuestionCourseVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuestionCourse(getQuestionCourseVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetQuestionCourse(dataConnect, getQuestionCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.quizQuestion);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetOptionCourse
You can execute the `GetOptionCourse` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetOptionCourse(dc: DataConnect, vars: GetOptionCourseVariables, options?: useDataConnectQueryOptions<GetOptionCourseData>): UseDataConnectQueryResult<GetOptionCourseData, GetOptionCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetOptionCourse(vars: GetOptionCourseVariables, options?: useDataConnectQueryOptions<GetOptionCourseData>): UseDataConnectQueryResult<GetOptionCourseData, GetOptionCourseVariables>;
```

### Variables
The `GetOptionCourse` Query requires an argument of type `GetOptionCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetOptionCourseVariables {
  optionId: UUIDString;
}
```
### Return Type
Recall that calling the `GetOptionCourse` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOptionCourse` Query is of type `GetOptionCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetOptionCourseData {
  quizOption?: {
    question: {
      quiz: {
        lecture: {
          section: {
            course: {
              id: UUIDString;
            } & Course_Key;
          };
        };
      };
    };
  };
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetOptionCourse`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetOptionCourseVariables } from '@dataconnect/generated';
import { useGetOptionCourse } from '@dataconnect/generated/react'

export default function GetOptionCourseComponent() {
  // The `useGetOptionCourse` Query hook requires an argument of type `GetOptionCourseVariables`:
  const getOptionCourseVars: GetOptionCourseVariables = {
    optionId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetOptionCourse(getOptionCourseVars);
  // Variables can be defined inline as well.
  const query = useGetOptionCourse({ optionId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetOptionCourse(dataConnect, getOptionCourseVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetOptionCourse(getOptionCourseVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetOptionCourse(dataConnect, getOptionCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.quizOption);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetSectionCourse
You can execute the `GetSectionCourse` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetSectionCourse(dc: DataConnect, vars: GetSectionCourseVariables, options?: useDataConnectQueryOptions<GetSectionCourseData>): UseDataConnectQueryResult<GetSectionCourseData, GetSectionCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetSectionCourse(vars: GetSectionCourseVariables, options?: useDataConnectQueryOptions<GetSectionCourseData>): UseDataConnectQueryResult<GetSectionCourseData, GetSectionCourseVariables>;
```

### Variables
The `GetSectionCourse` Query requires an argument of type `GetSectionCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetSectionCourseVariables {
  sectionId: UUIDString;
}
```
### Return Type
Recall that calling the `GetSectionCourse` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetSectionCourse` Query is of type `GetSectionCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetSectionCourseData {
  courseSection?: {
    course: {
      id: UUIDString;
    } & Course_Key;
  };
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetSectionCourse`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetSectionCourseVariables } from '@dataconnect/generated';
import { useGetSectionCourse } from '@dataconnect/generated/react'

export default function GetSectionCourseComponent() {
  // The `useGetSectionCourse` Query hook requires an argument of type `GetSectionCourseVariables`:
  const getSectionCourseVars: GetSectionCourseVariables = {
    sectionId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetSectionCourse(getSectionCourseVars);
  // Variables can be defined inline as well.
  const query = useGetSectionCourse({ sectionId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetSectionCourse(dataConnect, getSectionCourseVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetSectionCourse(getSectionCourseVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetSectionCourse(dataConnect, getSectionCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courseSection);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetMicroLessonMission
You can execute the `GetMicroLessonMission` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetMicroLessonMission(dc: DataConnect, vars: GetMicroLessonMissionVariables, options?: useDataConnectQueryOptions<GetMicroLessonMissionData>): UseDataConnectQueryResult<GetMicroLessonMissionData, GetMicroLessonMissionVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetMicroLessonMission(vars: GetMicroLessonMissionVariables, options?: useDataConnectQueryOptions<GetMicroLessonMissionData>): UseDataConnectQueryResult<GetMicroLessonMissionData, GetMicroLessonMissionVariables>;
```

### Variables
The `GetMicroLessonMission` Query requires an argument of type `GetMicroLessonMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetMicroLessonMissionVariables {
  microLessonId: UUIDString;
}
```
### Return Type
Recall that calling the `GetMicroLessonMission` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetMicroLessonMission` Query is of type `GetMicroLessonMissionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetMicroLessonMissionData {
  missionMicroLesson?: {
    mission: {
      id: UUIDString;
    } & Mission_Key;
  };
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetMicroLessonMission`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetMicroLessonMissionVariables } from '@dataconnect/generated';
import { useGetMicroLessonMission } from '@dataconnect/generated/react'

export default function GetMicroLessonMissionComponent() {
  // The `useGetMicroLessonMission` Query hook requires an argument of type `GetMicroLessonMissionVariables`:
  const getMicroLessonMissionVars: GetMicroLessonMissionVariables = {
    microLessonId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetMicroLessonMission(getMicroLessonMissionVars);
  // Variables can be defined inline as well.
  const query = useGetMicroLessonMission({ microLessonId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetMicroLessonMission(dataConnect, getMicroLessonMissionVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetMicroLessonMission(getMicroLessonMissionVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetMicroLessonMission(dataConnect, getMicroLessonMissionVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.missionMicroLesson);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCriterionMission
You can execute the `GetCriterionMission` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCriterionMission(dc: DataConnect, vars: GetCriterionMissionVariables, options?: useDataConnectQueryOptions<GetCriterionMissionData>): UseDataConnectQueryResult<GetCriterionMissionData, GetCriterionMissionVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCriterionMission(vars: GetCriterionMissionVariables, options?: useDataConnectQueryOptions<GetCriterionMissionData>): UseDataConnectQueryResult<GetCriterionMissionData, GetCriterionMissionVariables>;
```

### Variables
The `GetCriterionMission` Query requires an argument of type `GetCriterionMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCriterionMissionVariables {
  criterionId: UUIDString;
}
```
### Return Type
Recall that calling the `GetCriterionMission` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCriterionMission` Query is of type `GetCriterionMissionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetCriterionMissionData {
  rubricCriterion?: {
    mission: {
      id: UUIDString;
    } & Mission_Key;
  };
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCriterionMission`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCriterionMissionVariables } from '@dataconnect/generated';
import { useGetCriterionMission } from '@dataconnect/generated/react'

export default function GetCriterionMissionComponent() {
  // The `useGetCriterionMission` Query hook requires an argument of type `GetCriterionMissionVariables`:
  const getCriterionMissionVars: GetCriterionMissionVariables = {
    criterionId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCriterionMission(getCriterionMissionVars);
  // Variables can be defined inline as well.
  const query = useGetCriterionMission({ criterionId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCriterionMission(dataConnect, getCriterionMissionVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCriterionMission(getCriterionMissionVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCriterionMission(dataConnect, getCriterionMissionVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.rubricCriterion);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetTemplateMission
You can execute the `GetTemplateMission` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetTemplateMission(dc: DataConnect, vars: GetTemplateMissionVariables, options?: useDataConnectQueryOptions<GetTemplateMissionData>): UseDataConnectQueryResult<GetTemplateMissionData, GetTemplateMissionVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetTemplateMission(vars: GetTemplateMissionVariables, options?: useDataConnectQueryOptions<GetTemplateMissionData>): UseDataConnectQueryResult<GetTemplateMissionData, GetTemplateMissionVariables>;
```

### Variables
The `GetTemplateMission` Query requires an argument of type `GetTemplateMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetTemplateMissionVariables {
  templateId: UUIDString;
}
```
### Return Type
Recall that calling the `GetTemplateMission` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetTemplateMission` Query is of type `GetTemplateMissionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetTemplateMissionData {
  missionTemplate?: {
    mission: {
      id: UUIDString;
    } & Mission_Key;
  };
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetTemplateMission`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetTemplateMissionVariables } from '@dataconnect/generated';
import { useGetTemplateMission } from '@dataconnect/generated/react'

export default function GetTemplateMissionComponent() {
  // The `useGetTemplateMission` Query hook requires an argument of type `GetTemplateMissionVariables`:
  const getTemplateMissionVars: GetTemplateMissionVariables = {
    templateId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetTemplateMission(getTemplateMissionVars);
  // Variables can be defined inline as well.
  const query = useGetTemplateMission({ templateId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetTemplateMission(dataConnect, getTemplateMissionVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetTemplateMission(getTemplateMissionVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetTemplateMission(dataConnect, getTemplateMissionVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.missionTemplate);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## MyPaymentHistory
You can execute the `MyPaymentHistory` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useMyPaymentHistory(dc: DataConnect, options?: useDataConnectQueryOptions<MyPaymentHistoryData>): UseDataConnectQueryResult<MyPaymentHistoryData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useMyPaymentHistory(options?: useDataConnectQueryOptions<MyPaymentHistoryData>): UseDataConnectQueryResult<MyPaymentHistoryData, undefined>;
```

### Variables
The `MyPaymentHistory` Query has no variables.
### Return Type
Recall that calling the `MyPaymentHistory` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `MyPaymentHistory` Query is of type `MyPaymentHistoryData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `MyPaymentHistory`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useMyPaymentHistory } from '@dataconnect/generated/react'

export default function MyPaymentHistoryComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useMyPaymentHistory();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useMyPaymentHistory(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useMyPaymentHistory(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useMyPaymentHistory(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.payments);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetPendingSubmissions
You can execute the `GetPendingSubmissions` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetPendingSubmissions(dc: DataConnect, options?: useDataConnectQueryOptions<GetPendingSubmissionsData>): UseDataConnectQueryResult<GetPendingSubmissionsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetPendingSubmissions(options?: useDataConnectQueryOptions<GetPendingSubmissionsData>): UseDataConnectQueryResult<GetPendingSubmissionsData, undefined>;
```

### Variables
The `GetPendingSubmissions` Query has no variables.
### Return Type
Recall that calling the `GetPendingSubmissions` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetPendingSubmissions` Query is of type `GetPendingSubmissionsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetPendingSubmissions`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useGetPendingSubmissions } from '@dataconnect/generated/react'

export default function GetPendingSubmissionsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetPendingSubmissions();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetPendingSubmissions(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetPendingSubmissions(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetPendingSubmissions(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.missionSubmissions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCourseInstructors
You can execute the `GetCourseInstructors` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCourseInstructors(dc: DataConnect, vars: GetCourseInstructorsVariables, options?: useDataConnectQueryOptions<GetCourseInstructorsData>): UseDataConnectQueryResult<GetCourseInstructorsData, GetCourseInstructorsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCourseInstructors(vars: GetCourseInstructorsVariables, options?: useDataConnectQueryOptions<GetCourseInstructorsData>): UseDataConnectQueryResult<GetCourseInstructorsData, GetCourseInstructorsVariables>;
```

### Variables
The `GetCourseInstructors` Query requires an argument of type `GetCourseInstructorsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCourseInstructorsVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that calling the `GetCourseInstructors` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCourseInstructors` Query is of type `GetCourseInstructorsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCourseInstructors`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCourseInstructorsVariables } from '@dataconnect/generated';
import { useGetCourseInstructors } from '@dataconnect/generated/react'

export default function GetCourseInstructorsComponent() {
  // The `useGetCourseInstructors` Query hook requires an argument of type `GetCourseInstructorsVariables`:
  const getCourseInstructorsVars: GetCourseInstructorsVariables = {
    courseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCourseInstructors(getCourseInstructorsVars);
  // Variables can be defined inline as well.
  const query = useGetCourseInstructors({ courseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCourseInstructors(dataConnect, getCourseInstructorsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseInstructors(getCourseInstructorsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseInstructors(dataConnect, getCourseInstructorsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.courseInstructors);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCourseSessions
You can execute the `GetCourseSessions` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetCourseSessions(dc: DataConnect, vars: GetCourseSessionsVariables, options?: useDataConnectQueryOptions<GetCourseSessionsData>): UseDataConnectQueryResult<GetCourseSessionsData, GetCourseSessionsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCourseSessions(vars: GetCourseSessionsVariables, options?: useDataConnectQueryOptions<GetCourseSessionsData>): UseDataConnectQueryResult<GetCourseSessionsData, GetCourseSessionsVariables>;
```

### Variables
The `GetCourseSessions` Query requires an argument of type `GetCourseSessionsVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCourseSessionsVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that calling the `GetCourseSessions` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCourseSessions` Query is of type `GetCourseSessionsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCourseSessions`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCourseSessionsVariables } from '@dataconnect/generated';
import { useGetCourseSessions } from '@dataconnect/generated/react'

export default function GetCourseSessionsComponent() {
  // The `useGetCourseSessions` Query hook requires an argument of type `GetCourseSessionsVariables`:
  const getCourseSessionsVars: GetCourseSessionsVariables = {
    courseId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCourseSessions(getCourseSessionsVars);
  // Variables can be defined inline as well.
  const query = useGetCourseSessions({ courseId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCourseSessions(dataConnect, getCourseSessionsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseSessions(getCourseSessionsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCourseSessions(dataConnect, getCourseSessionsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.sessions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetMe
You can execute the `GetMe` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useGetMe(dc: DataConnect, options?: useDataConnectQueryOptions<GetMeData>): UseDataConnectQueryResult<GetMeData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetMe(options?: useDataConnectQueryOptions<GetMeData>): UseDataConnectQueryResult<GetMeData, undefined>;
```

### Variables
The `GetMe` Query has no variables.
### Return Type
Recall that calling the `GetMe` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetMe` Query is of type `GetMeData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetMe`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useGetMe } from '@dataconnect/generated/react'

export default function GetMeComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetMe();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetMe(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetMe(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetMe(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.user);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the Mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation hook function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `UseMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `default` connector's generated Mutation hook functions to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## AdminUpdateCourse
You can execute the `AdminUpdateCourse` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminUpdateCourse(options?: useDataConnectMutationOptions<AdminUpdateCourseData, FirebaseError, AdminUpdateCourseVariables>): UseDataConnectMutationResult<AdminUpdateCourseData, AdminUpdateCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminUpdateCourse(dc: DataConnect, options?: useDataConnectMutationOptions<AdminUpdateCourseData, FirebaseError, AdminUpdateCourseVariables>): UseDataConnectMutationResult<AdminUpdateCourseData, AdminUpdateCourseVariables>;
```

### Variables
The `AdminUpdateCourse` Mutation requires an argument of type `AdminUpdateCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminUpdateCourse` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminUpdateCourse` Mutation is of type `AdminUpdateCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminUpdateCourseData {
  course_update?: Course_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminUpdateCourse`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminUpdateCourseVariables } from '@dataconnect/generated';
import { useAdminUpdateCourse } from '@dataconnect/generated/react'

export default function AdminUpdateCourseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminUpdateCourse();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminUpdateCourse(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateCourse(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateCourse(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminUpdateCourse` Mutation requires an argument of type `AdminUpdateCourseVariables`:
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
  mutation.mutate(adminUpdateCourseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseId: ..., title: ..., description: ..., price: ..., language: ..., level: ..., categoryId: ..., tags: ..., thumbnail: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminUpdateCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.course_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminUpdateCourseStatus
You can execute the `AdminUpdateCourseStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminUpdateCourseStatus(options?: useDataConnectMutationOptions<AdminUpdateCourseStatusData, FirebaseError, AdminUpdateCourseStatusVariables>): UseDataConnectMutationResult<AdminUpdateCourseStatusData, AdminUpdateCourseStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminUpdateCourseStatus(dc: DataConnect, options?: useDataConnectMutationOptions<AdminUpdateCourseStatusData, FirebaseError, AdminUpdateCourseStatusVariables>): UseDataConnectMutationResult<AdminUpdateCourseStatusData, AdminUpdateCourseStatusVariables>;
```

### Variables
The `AdminUpdateCourseStatus` Mutation requires an argument of type `AdminUpdateCourseStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminUpdateCourseStatusVariables {
  courseId: UUIDString;
  status: CourseStatus;
}
```
### Return Type
Recall that calling the `AdminUpdateCourseStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminUpdateCourseStatus` Mutation is of type `AdminUpdateCourseStatusData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminUpdateCourseStatusData {
  course_update?: Course_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminUpdateCourseStatus`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminUpdateCourseStatusVariables } from '@dataconnect/generated';
import { useAdminUpdateCourseStatus } from '@dataconnect/generated/react'

export default function AdminUpdateCourseStatusComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminUpdateCourseStatus();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminUpdateCourseStatus(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateCourseStatus(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateCourseStatus(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminUpdateCourseStatus` Mutation requires an argument of type `AdminUpdateCourseStatusVariables`:
  const adminUpdateCourseStatusVars: AdminUpdateCourseStatusVariables = {
    courseId: ..., 
    status: ..., 
  };
  mutation.mutate(adminUpdateCourseStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseId: ..., status: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminUpdateCourseStatusVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.course_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminCreateSection
You can execute the `AdminCreateSection` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminCreateSection(options?: useDataConnectMutationOptions<AdminCreateSectionData, FirebaseError, AdminCreateSectionVariables>): UseDataConnectMutationResult<AdminCreateSectionData, AdminCreateSectionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminCreateSection(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateSectionData, FirebaseError, AdminCreateSectionVariables>): UseDataConnectMutationResult<AdminCreateSectionData, AdminCreateSectionVariables>;
```

### Variables
The `AdminCreateSection` Mutation requires an argument of type `AdminCreateSectionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminCreateSectionVariables {
  courseId: UUIDString;
  title: string;
  order: number;
}
```
### Return Type
Recall that calling the `AdminCreateSection` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminCreateSection` Mutation is of type `AdminCreateSectionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminCreateSectionData {
  courseSection_insert: CourseSection_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminCreateSection`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminCreateSectionVariables } from '@dataconnect/generated';
import { useAdminCreateSection } from '@dataconnect/generated/react'

export default function AdminCreateSectionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminCreateSection();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminCreateSection(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateSection(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateSection(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminCreateSection` Mutation requires an argument of type `AdminCreateSectionVariables`:
  const adminCreateSectionVars: AdminCreateSectionVariables = {
    courseId: ..., 
    title: ..., 
    order: ..., 
  };
  mutation.mutate(adminCreateSectionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseId: ..., title: ..., order: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminCreateSectionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseSection_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminUpdateSection
You can execute the `AdminUpdateSection` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminUpdateSection(options?: useDataConnectMutationOptions<AdminUpdateSectionData, FirebaseError, AdminUpdateSectionVariables>): UseDataConnectMutationResult<AdminUpdateSectionData, AdminUpdateSectionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminUpdateSection(dc: DataConnect, options?: useDataConnectMutationOptions<AdminUpdateSectionData, FirebaseError, AdminUpdateSectionVariables>): UseDataConnectMutationResult<AdminUpdateSectionData, AdminUpdateSectionVariables>;
```

### Variables
The `AdminUpdateSection` Mutation requires an argument of type `AdminUpdateSectionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminUpdateSectionVariables {
  sectionId: UUIDString;
  title: string;
}
```
### Return Type
Recall that calling the `AdminUpdateSection` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminUpdateSection` Mutation is of type `AdminUpdateSectionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminUpdateSectionData {
  courseSection_update?: CourseSection_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminUpdateSection`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminUpdateSectionVariables } from '@dataconnect/generated';
import { useAdminUpdateSection } from '@dataconnect/generated/react'

export default function AdminUpdateSectionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminUpdateSection();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminUpdateSection(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateSection(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateSection(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminUpdateSection` Mutation requires an argument of type `AdminUpdateSectionVariables`:
  const adminUpdateSectionVars: AdminUpdateSectionVariables = {
    sectionId: ..., 
    title: ..., 
  };
  mutation.mutate(adminUpdateSectionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ sectionId: ..., title: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminUpdateSectionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseSection_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminSoftDeleteSection
You can execute the `AdminSoftDeleteSection` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSoftDeleteSection(options?: useDataConnectMutationOptions<AdminSoftDeleteSectionData, FirebaseError, AdminSoftDeleteSectionVariables>): UseDataConnectMutationResult<AdminSoftDeleteSectionData, AdminSoftDeleteSectionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSoftDeleteSection(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSoftDeleteSectionData, FirebaseError, AdminSoftDeleteSectionVariables>): UseDataConnectMutationResult<AdminSoftDeleteSectionData, AdminSoftDeleteSectionVariables>;
```

### Variables
The `AdminSoftDeleteSection` Mutation requires an argument of type `AdminSoftDeleteSectionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminSoftDeleteSectionVariables {
  sectionId: UUIDString;
}
```
### Return Type
Recall that calling the `AdminSoftDeleteSection` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSoftDeleteSection` Mutation is of type `AdminSoftDeleteSectionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSoftDeleteSectionData {
  courseSection_update?: CourseSection_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSoftDeleteSection`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSoftDeleteSectionVariables } from '@dataconnect/generated';
import { useAdminSoftDeleteSection } from '@dataconnect/generated/react'

export default function AdminSoftDeleteSectionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSoftDeleteSection();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSoftDeleteSection(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSoftDeleteSection(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSoftDeleteSection(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSoftDeleteSection` Mutation requires an argument of type `AdminSoftDeleteSectionVariables`:
  const adminSoftDeleteSectionVars: AdminSoftDeleteSectionVariables = {
    sectionId: ..., 
  };
  mutation.mutate(adminSoftDeleteSectionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ sectionId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSoftDeleteSectionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseSection_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminUpdateSectionOrder
You can execute the `AdminUpdateSectionOrder` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminUpdateSectionOrder(options?: useDataConnectMutationOptions<AdminUpdateSectionOrderData, FirebaseError, AdminUpdateSectionOrderVariables>): UseDataConnectMutationResult<AdminUpdateSectionOrderData, AdminUpdateSectionOrderVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminUpdateSectionOrder(dc: DataConnect, options?: useDataConnectMutationOptions<AdminUpdateSectionOrderData, FirebaseError, AdminUpdateSectionOrderVariables>): UseDataConnectMutationResult<AdminUpdateSectionOrderData, AdminUpdateSectionOrderVariables>;
```

### Variables
The `AdminUpdateSectionOrder` Mutation requires an argument of type `AdminUpdateSectionOrderVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminUpdateSectionOrderVariables {
  sectionId: UUIDString;
  order: number;
}
```
### Return Type
Recall that calling the `AdminUpdateSectionOrder` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminUpdateSectionOrder` Mutation is of type `AdminUpdateSectionOrderData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminUpdateSectionOrderData {
  courseSection_update?: CourseSection_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminUpdateSectionOrder`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminUpdateSectionOrderVariables } from '@dataconnect/generated';
import { useAdminUpdateSectionOrder } from '@dataconnect/generated/react'

export default function AdminUpdateSectionOrderComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminUpdateSectionOrder();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminUpdateSectionOrder(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateSectionOrder(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateSectionOrder(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminUpdateSectionOrder` Mutation requires an argument of type `AdminUpdateSectionOrderVariables`:
  const adminUpdateSectionOrderVars: AdminUpdateSectionOrderVariables = {
    sectionId: ..., 
    order: ..., 
  };
  mutation.mutate(adminUpdateSectionOrderVars);
  // Variables can be defined inline as well.
  mutation.mutate({ sectionId: ..., order: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminUpdateSectionOrderVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseSection_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminCreateLectureFull
You can execute the `AdminCreateLectureFull` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminCreateLectureFull(options?: useDataConnectMutationOptions<AdminCreateLectureFullData, FirebaseError, AdminCreateLectureFullVariables>): UseDataConnectMutationResult<AdminCreateLectureFullData, AdminCreateLectureFullVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminCreateLectureFull(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateLectureFullData, FirebaseError, AdminCreateLectureFullVariables>): UseDataConnectMutationResult<AdminCreateLectureFullData, AdminCreateLectureFullVariables>;
```

### Variables
The `AdminCreateLectureFull` Mutation requires an argument of type `AdminCreateLectureFullVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminCreateLectureFull` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminCreateLectureFull` Mutation is of type `AdminCreateLectureFullData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminCreateLectureFullData {
  courseLecture_insert: CourseLecture_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminCreateLectureFull`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminCreateLectureFullVariables } from '@dataconnect/generated';
import { useAdminCreateLectureFull } from '@dataconnect/generated/react'

export default function AdminCreateLectureFullComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminCreateLectureFull();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminCreateLectureFull(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateLectureFull(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateLectureFull(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminCreateLectureFull` Mutation requires an argument of type `AdminCreateLectureFullVariables`:
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
  mutation.mutate(adminCreateLectureFullVars);
  // Variables can be defined inline as well.
  mutation.mutate({ sectionId: ..., title: ..., type: ..., videoUrl: ..., content: ..., duration: ..., transcriptUrl: ..., isFreePreview: ..., order: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminCreateLectureFullVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseLecture_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminUpdateLecture
You can execute the `AdminUpdateLecture` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminUpdateLecture(options?: useDataConnectMutationOptions<AdminUpdateLectureData, FirebaseError, AdminUpdateLectureVariables>): UseDataConnectMutationResult<AdminUpdateLectureData, AdminUpdateLectureVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminUpdateLecture(dc: DataConnect, options?: useDataConnectMutationOptions<AdminUpdateLectureData, FirebaseError, AdminUpdateLectureVariables>): UseDataConnectMutationResult<AdminUpdateLectureData, AdminUpdateLectureVariables>;
```

### Variables
The `AdminUpdateLecture` Mutation requires an argument of type `AdminUpdateLectureVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminUpdateLecture` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminUpdateLecture` Mutation is of type `AdminUpdateLectureData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminUpdateLectureData {
  courseLecture_update?: CourseLecture_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminUpdateLecture`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminUpdateLectureVariables } from '@dataconnect/generated';
import { useAdminUpdateLecture } from '@dataconnect/generated/react'

export default function AdminUpdateLectureComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminUpdateLecture();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminUpdateLecture(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateLecture(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateLecture(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminUpdateLecture` Mutation requires an argument of type `AdminUpdateLectureVariables`:
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
  mutation.mutate(adminUpdateLectureVars);
  // Variables can be defined inline as well.
  mutation.mutate({ lectureId: ..., title: ..., type: ..., videoUrl: ..., content: ..., duration: ..., transcriptUrl: ..., isFreePreview: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminUpdateLectureVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseLecture_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminSoftDeleteLecture
You can execute the `AdminSoftDeleteLecture` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSoftDeleteLecture(options?: useDataConnectMutationOptions<AdminSoftDeleteLectureData, FirebaseError, AdminSoftDeleteLectureVariables>): UseDataConnectMutationResult<AdminSoftDeleteLectureData, AdminSoftDeleteLectureVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSoftDeleteLecture(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSoftDeleteLectureData, FirebaseError, AdminSoftDeleteLectureVariables>): UseDataConnectMutationResult<AdminSoftDeleteLectureData, AdminSoftDeleteLectureVariables>;
```

### Variables
The `AdminSoftDeleteLecture` Mutation requires an argument of type `AdminSoftDeleteLectureVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminSoftDeleteLectureVariables {
  lectureId: UUIDString;
}
```
### Return Type
Recall that calling the `AdminSoftDeleteLecture` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSoftDeleteLecture` Mutation is of type `AdminSoftDeleteLectureData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSoftDeleteLectureData {
  courseLecture_update?: CourseLecture_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSoftDeleteLecture`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSoftDeleteLectureVariables } from '@dataconnect/generated';
import { useAdminSoftDeleteLecture } from '@dataconnect/generated/react'

export default function AdminSoftDeleteLectureComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSoftDeleteLecture();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSoftDeleteLecture(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSoftDeleteLecture(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSoftDeleteLecture(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSoftDeleteLecture` Mutation requires an argument of type `AdminSoftDeleteLectureVariables`:
  const adminSoftDeleteLectureVars: AdminSoftDeleteLectureVariables = {
    lectureId: ..., 
  };
  mutation.mutate(adminSoftDeleteLectureVars);
  // Variables can be defined inline as well.
  mutation.mutate({ lectureId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSoftDeleteLectureVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseLecture_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminUpdateLectureOrder
You can execute the `AdminUpdateLectureOrder` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminUpdateLectureOrder(options?: useDataConnectMutationOptions<AdminUpdateLectureOrderData, FirebaseError, AdminUpdateLectureOrderVariables>): UseDataConnectMutationResult<AdminUpdateLectureOrderData, AdminUpdateLectureOrderVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminUpdateLectureOrder(dc: DataConnect, options?: useDataConnectMutationOptions<AdminUpdateLectureOrderData, FirebaseError, AdminUpdateLectureOrderVariables>): UseDataConnectMutationResult<AdminUpdateLectureOrderData, AdminUpdateLectureOrderVariables>;
```

### Variables
The `AdminUpdateLectureOrder` Mutation requires an argument of type `AdminUpdateLectureOrderVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminUpdateLectureOrderVariables {
  lectureId: UUIDString;
  order: number;
}
```
### Return Type
Recall that calling the `AdminUpdateLectureOrder` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminUpdateLectureOrder` Mutation is of type `AdminUpdateLectureOrderData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminUpdateLectureOrderData {
  courseLecture_update?: CourseLecture_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminUpdateLectureOrder`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminUpdateLectureOrderVariables } from '@dataconnect/generated';
import { useAdminUpdateLectureOrder } from '@dataconnect/generated/react'

export default function AdminUpdateLectureOrderComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminUpdateLectureOrder();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminUpdateLectureOrder(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateLectureOrder(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateLectureOrder(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminUpdateLectureOrder` Mutation requires an argument of type `AdminUpdateLectureOrderVariables`:
  const adminUpdateLectureOrderVars: AdminUpdateLectureOrderVariables = {
    lectureId: ..., 
    order: ..., 
  };
  mutation.mutate(adminUpdateLectureOrderVars);
  // Variables can be defined inline as well.
  mutation.mutate({ lectureId: ..., order: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminUpdateLectureOrderVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseLecture_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminMoveLectureToSection
You can execute the `AdminMoveLectureToSection` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminMoveLectureToSection(options?: useDataConnectMutationOptions<AdminMoveLectureToSectionData, FirebaseError, AdminMoveLectureToSectionVariables>): UseDataConnectMutationResult<AdminMoveLectureToSectionData, AdminMoveLectureToSectionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminMoveLectureToSection(dc: DataConnect, options?: useDataConnectMutationOptions<AdminMoveLectureToSectionData, FirebaseError, AdminMoveLectureToSectionVariables>): UseDataConnectMutationResult<AdminMoveLectureToSectionData, AdminMoveLectureToSectionVariables>;
```

### Variables
The `AdminMoveLectureToSection` Mutation requires an argument of type `AdminMoveLectureToSectionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminMoveLectureToSectionVariables {
  lectureId: UUIDString;
  newSectionId: UUIDString;
  order: number;
}
```
### Return Type
Recall that calling the `AdminMoveLectureToSection` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminMoveLectureToSection` Mutation is of type `AdminMoveLectureToSectionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminMoveLectureToSectionData {
  courseLecture_update?: CourseLecture_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminMoveLectureToSection`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminMoveLectureToSectionVariables } from '@dataconnect/generated';
import { useAdminMoveLectureToSection } from '@dataconnect/generated/react'

export default function AdminMoveLectureToSectionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminMoveLectureToSection();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminMoveLectureToSection(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminMoveLectureToSection(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminMoveLectureToSection(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminMoveLectureToSection` Mutation requires an argument of type `AdminMoveLectureToSectionVariables`:
  const adminMoveLectureToSectionVars: AdminMoveLectureToSectionVariables = {
    lectureId: ..., 
    newSectionId: ..., 
    order: ..., 
  };
  mutation.mutate(adminMoveLectureToSectionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ lectureId: ..., newSectionId: ..., order: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminMoveLectureToSectionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseLecture_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminSoftDeleteLecturesBySection
You can execute the `AdminSoftDeleteLecturesBySection` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSoftDeleteLecturesBySection(options?: useDataConnectMutationOptions<AdminSoftDeleteLecturesBySectionData, FirebaseError, AdminSoftDeleteLecturesBySectionVariables>): UseDataConnectMutationResult<AdminSoftDeleteLecturesBySectionData, AdminSoftDeleteLecturesBySectionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSoftDeleteLecturesBySection(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSoftDeleteLecturesBySectionData, FirebaseError, AdminSoftDeleteLecturesBySectionVariables>): UseDataConnectMutationResult<AdminSoftDeleteLecturesBySectionData, AdminSoftDeleteLecturesBySectionVariables>;
```

### Variables
The `AdminSoftDeleteLecturesBySection` Mutation requires an argument of type `AdminSoftDeleteLecturesBySectionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminSoftDeleteLecturesBySectionVariables {
  sectionId: UUIDString;
}
```
### Return Type
Recall that calling the `AdminSoftDeleteLecturesBySection` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSoftDeleteLecturesBySection` Mutation is of type `AdminSoftDeleteLecturesBySectionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSoftDeleteLecturesBySectionData {
  courseLecture_updateMany: number;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSoftDeleteLecturesBySection`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSoftDeleteLecturesBySectionVariables } from '@dataconnect/generated';
import { useAdminSoftDeleteLecturesBySection } from '@dataconnect/generated/react'

export default function AdminSoftDeleteLecturesBySectionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSoftDeleteLecturesBySection();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSoftDeleteLecturesBySection(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSoftDeleteLecturesBySection(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSoftDeleteLecturesBySection(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSoftDeleteLecturesBySection` Mutation requires an argument of type `AdminSoftDeleteLecturesBySectionVariables`:
  const adminSoftDeleteLecturesBySectionVars: AdminSoftDeleteLecturesBySectionVariables = {
    sectionId: ..., 
  };
  mutation.mutate(adminSoftDeleteLecturesBySectionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ sectionId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSoftDeleteLecturesBySectionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseLecture_updateMany);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## EnrollInCourse
You can execute the `EnrollInCourse` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useEnrollInCourse(options?: useDataConnectMutationOptions<EnrollInCourseData, FirebaseError, EnrollInCourseVariables>): UseDataConnectMutationResult<EnrollInCourseData, EnrollInCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useEnrollInCourse(dc: DataConnect, options?: useDataConnectMutationOptions<EnrollInCourseData, FirebaseError, EnrollInCourseVariables>): UseDataConnectMutationResult<EnrollInCourseData, EnrollInCourseVariables>;
```

### Variables
The `EnrollInCourse` Mutation requires an argument of type `EnrollInCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface EnrollInCourseVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that calling the `EnrollInCourse` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `EnrollInCourse` Mutation is of type `EnrollInCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface EnrollInCourseData {
  enrollment_insert: Enrollment_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EnrollInCourse`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, EnrollInCourseVariables } from '@dataconnect/generated';
import { useEnrollInCourse } from '@dataconnect/generated/react'

export default function EnrollInCourseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useEnrollInCourse();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useEnrollInCourse(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEnrollInCourse(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEnrollInCourse(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useEnrollInCourse` Mutation requires an argument of type `EnrollInCourseVariables`:
  const enrollInCourseVars: EnrollInCourseVariables = {
    courseId: ..., 
  };
  mutation.mutate(enrollInCourseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(enrollInCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.enrollment_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## EnrollInMission
You can execute the `EnrollInMission` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useEnrollInMission(options?: useDataConnectMutationOptions<EnrollInMissionData, FirebaseError, EnrollInMissionVariables>): UseDataConnectMutationResult<EnrollInMissionData, EnrollInMissionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useEnrollInMission(dc: DataConnect, options?: useDataConnectMutationOptions<EnrollInMissionData, FirebaseError, EnrollInMissionVariables>): UseDataConnectMutationResult<EnrollInMissionData, EnrollInMissionVariables>;
```

### Variables
The `EnrollInMission` Mutation requires an argument of type `EnrollInMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface EnrollInMissionVariables {
  missionId: UUIDString;
}
```
### Return Type
Recall that calling the `EnrollInMission` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `EnrollInMission` Mutation is of type `EnrollInMissionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface EnrollInMissionData {
  enrollment_insert: Enrollment_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EnrollInMission`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, EnrollInMissionVariables } from '@dataconnect/generated';
import { useEnrollInMission } from '@dataconnect/generated/react'

export default function EnrollInMissionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useEnrollInMission();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useEnrollInMission(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEnrollInMission(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEnrollInMission(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useEnrollInMission` Mutation requires an argument of type `EnrollInMissionVariables`:
  const enrollInMissionVars: EnrollInMissionVariables = {
    missionId: ..., 
  };
  mutation.mutate(enrollInMissionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ missionId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(enrollInMissionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.enrollment_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateLectureProgress
You can execute the `UpdateLectureProgress` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateLectureProgress(options?: useDataConnectMutationOptions<UpdateLectureProgressData, FirebaseError, UpdateLectureProgressVariables>): UseDataConnectMutationResult<UpdateLectureProgressData, UpdateLectureProgressVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateLectureProgress(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateLectureProgressData, FirebaseError, UpdateLectureProgressVariables>): UseDataConnectMutationResult<UpdateLectureProgressData, UpdateLectureProgressVariables>;
```

### Variables
The `UpdateLectureProgress` Mutation requires an argument of type `UpdateLectureProgressVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateLectureProgressVariables {
  lectureId: UUIDString;
  lastWatchedSecond: number;
  completedAt?: TimestampString | null;
}
```
### Return Type
Recall that calling the `UpdateLectureProgress` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateLectureProgress` Mutation is of type `UpdateLectureProgressData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateLectureProgressData {
  lectureProgress_upsert: LectureProgress_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateLectureProgress`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateLectureProgressVariables } from '@dataconnect/generated';
import { useUpdateLectureProgress } from '@dataconnect/generated/react'

export default function UpdateLectureProgressComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateLectureProgress();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateLectureProgress(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateLectureProgress(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateLectureProgress(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateLectureProgress` Mutation requires an argument of type `UpdateLectureProgressVariables`:
  const updateLectureProgressVars: UpdateLectureProgressVariables = {
    lectureId: ..., 
    lastWatchedSecond: ..., 
    completedAt: ..., // optional
  };
  mutation.mutate(updateLectureProgressVars);
  // Variables can be defined inline as well.
  mutation.mutate({ lectureId: ..., lastWatchedSecond: ..., completedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateLectureProgressVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.lectureProgress_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateEnrollmentStatus
You can execute the `UpdateEnrollmentStatus` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateEnrollmentStatus(options?: useDataConnectMutationOptions<UpdateEnrollmentStatusData, FirebaseError, UpdateEnrollmentStatusVariables>): UseDataConnectMutationResult<UpdateEnrollmentStatusData, UpdateEnrollmentStatusVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateEnrollmentStatus(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateEnrollmentStatusData, FirebaseError, UpdateEnrollmentStatusVariables>): UseDataConnectMutationResult<UpdateEnrollmentStatusData, UpdateEnrollmentStatusVariables>;
```

### Variables
The `UpdateEnrollmentStatus` Mutation requires an argument of type `UpdateEnrollmentStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateEnrollmentStatusVariables {
  enrollmentId: UUIDString;
  status: EnrollmentStatus;
  completedAt?: TimestampString | null;
}
```
### Return Type
Recall that calling the `UpdateEnrollmentStatus` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateEnrollmentStatus` Mutation is of type `UpdateEnrollmentStatusData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateEnrollmentStatusData {
  enrollment_update?: Enrollment_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateEnrollmentStatus`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateEnrollmentStatusVariables } from '@dataconnect/generated';
import { useUpdateEnrollmentStatus } from '@dataconnect/generated/react'

export default function UpdateEnrollmentStatusComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateEnrollmentStatus();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateEnrollmentStatus(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateEnrollmentStatus(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateEnrollmentStatus(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateEnrollmentStatus` Mutation requires an argument of type `UpdateEnrollmentStatusVariables`:
  const updateEnrollmentStatusVars: UpdateEnrollmentStatusVariables = {
    enrollmentId: ..., 
    status: ..., 
    completedAt: ..., // optional
  };
  mutation.mutate(updateEnrollmentStatusVars);
  // Variables can be defined inline as well.
  mutation.mutate({ enrollmentId: ..., status: ..., completedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateEnrollmentStatusVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.enrollment_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## SubmitMission
You can execute the `SubmitMission` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useSubmitMission(options?: useDataConnectMutationOptions<SubmitMissionData, FirebaseError, SubmitMissionVariables>): UseDataConnectMutationResult<SubmitMissionData, SubmitMissionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useSubmitMission(dc: DataConnect, options?: useDataConnectMutationOptions<SubmitMissionData, FirebaseError, SubmitMissionVariables>): UseDataConnectMutationResult<SubmitMissionData, SubmitMissionVariables>;
```

### Variables
The `SubmitMission` Mutation requires an argument of type `SubmitMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SubmitMissionVariables {
  missionId: UUIDString;
  fileUrl: string;
}
```
### Return Type
Recall that calling the `SubmitMission` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `SubmitMission` Mutation is of type `SubmitMissionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SubmitMissionData {
  missionSubmission_insert: MissionSubmission_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `SubmitMission`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, SubmitMissionVariables } from '@dataconnect/generated';
import { useSubmitMission } from '@dataconnect/generated/react'

export default function SubmitMissionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useSubmitMission();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useSubmitMission(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSubmitMission(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSubmitMission(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useSubmitMission` Mutation requires an argument of type `SubmitMissionVariables`:
  const submitMissionVars: SubmitMissionVariables = {
    missionId: ..., 
    fileUrl: ..., 
  };
  mutation.mutate(submitMissionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ missionId: ..., fileUrl: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(submitMissionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.missionSubmission_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GradeSubmission
You can execute the `GradeSubmission` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useGradeSubmission(options?: useDataConnectMutationOptions<GradeSubmissionData, FirebaseError, GradeSubmissionVariables>): UseDataConnectMutationResult<GradeSubmissionData, GradeSubmissionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useGradeSubmission(dc: DataConnect, options?: useDataConnectMutationOptions<GradeSubmissionData, FirebaseError, GradeSubmissionVariables>): UseDataConnectMutationResult<GradeSubmissionData, GradeSubmissionVariables>;
```

### Variables
The `GradeSubmission` Mutation requires an argument of type `GradeSubmissionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GradeSubmissionVariables {
  submissionId: UUIDString;
  feedback?: string | null;
}
```
### Return Type
Recall that calling the `GradeSubmission` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `GradeSubmission` Mutation is of type `GradeSubmissionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GradeSubmissionData {
  missionSubmission_update?: MissionSubmission_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `GradeSubmission`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GradeSubmissionVariables } from '@dataconnect/generated';
import { useGradeSubmission } from '@dataconnect/generated/react'

export default function GradeSubmissionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useGradeSubmission();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useGradeSubmission(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useGradeSubmission(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useGradeSubmission(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useGradeSubmission` Mutation requires an argument of type `GradeSubmissionVariables`:
  const gradeSubmissionVars: GradeSubmissionVariables = {
    submissionId: ..., 
    feedback: ..., // optional
  };
  mutation.mutate(gradeSubmissionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ submissionId: ..., feedback: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(gradeSubmissionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.missionSubmission_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AddCriterionScore
You can execute the `AddCriterionScore` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAddCriterionScore(options?: useDataConnectMutationOptions<AddCriterionScoreData, FirebaseError, AddCriterionScoreVariables>): UseDataConnectMutationResult<AddCriterionScoreData, AddCriterionScoreVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAddCriterionScore(dc: DataConnect, options?: useDataConnectMutationOptions<AddCriterionScoreData, FirebaseError, AddCriterionScoreVariables>): UseDataConnectMutationResult<AddCriterionScoreData, AddCriterionScoreVariables>;
```

### Variables
The `AddCriterionScore` Mutation requires an argument of type `AddCriterionScoreVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AddCriterionScoreVariables {
  submissionId: UUIDString;
  criterionId: UUIDString;
  score: number;
}
```
### Return Type
Recall that calling the `AddCriterionScore` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AddCriterionScore` Mutation is of type `AddCriterionScoreData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AddCriterionScoreData {
  missionSubmissionScore_upsert: MissionSubmissionScore_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AddCriterionScore`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AddCriterionScoreVariables } from '@dataconnect/generated';
import { useAddCriterionScore } from '@dataconnect/generated/react'

export default function AddCriterionScoreComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAddCriterionScore();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAddCriterionScore(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAddCriterionScore(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAddCriterionScore(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAddCriterionScore` Mutation requires an argument of type `AddCriterionScoreVariables`:
  const addCriterionScoreVars: AddCriterionScoreVariables = {
    submissionId: ..., 
    criterionId: ..., 
    score: ..., 
  };
  mutation.mutate(addCriterionScoreVars);
  // Variables can be defined inline as well.
  mutation.mutate({ submissionId: ..., criterionId: ..., score: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(addCriterionScoreVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.missionSubmissionScore_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminCreateMission
You can execute the `AdminCreateMission` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminCreateMission(options?: useDataConnectMutationOptions<AdminCreateMissionData, FirebaseError, AdminCreateMissionVariables>): UseDataConnectMutationResult<AdminCreateMissionData, AdminCreateMissionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminCreateMission(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateMissionData, FirebaseError, AdminCreateMissionVariables>): UseDataConnectMutationResult<AdminCreateMissionData, AdminCreateMissionVariables>;
```

### Variables
The `AdminCreateMission` Mutation requires an argument of type `AdminCreateMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminCreateMission` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminCreateMission` Mutation is of type `AdminCreateMissionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminCreateMissionData {
  mission_insert: Mission_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminCreateMission`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminCreateMissionVariables } from '@dataconnect/generated';
import { useAdminCreateMission } from '@dataconnect/generated/react'

export default function AdminCreateMissionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminCreateMission();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminCreateMission(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateMission(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateMission(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminCreateMission` Mutation requires an argument of type `AdminCreateMissionVariables`:
  const adminCreateMissionVars: AdminCreateMissionVariables = {
    title: ..., 
    scenarioDescription: ..., 
    durationMinutes: ..., 
    categoryId: ..., 
    difficulty: ..., 
    skillsTested: ..., 
    courseId: ..., // optional
  };
  mutation.mutate(adminCreateMissionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ title: ..., scenarioDescription: ..., durationMinutes: ..., categoryId: ..., difficulty: ..., skillsTested: ..., courseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminCreateMissionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.mission_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminUpdateMission
You can execute the `AdminUpdateMission` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminUpdateMission(options?: useDataConnectMutationOptions<AdminUpdateMissionData, FirebaseError, AdminUpdateMissionVariables>): UseDataConnectMutationResult<AdminUpdateMissionData, AdminUpdateMissionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminUpdateMission(dc: DataConnect, options?: useDataConnectMutationOptions<AdminUpdateMissionData, FirebaseError, AdminUpdateMissionVariables>): UseDataConnectMutationResult<AdminUpdateMissionData, AdminUpdateMissionVariables>;
```

### Variables
The `AdminUpdateMission` Mutation requires an argument of type `AdminUpdateMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminUpdateMission` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminUpdateMission` Mutation is of type `AdminUpdateMissionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminUpdateMissionData {
  mission_update?: Mission_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminUpdateMission`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminUpdateMissionVariables } from '@dataconnect/generated';
import { useAdminUpdateMission } from '@dataconnect/generated/react'

export default function AdminUpdateMissionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminUpdateMission();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminUpdateMission(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateMission(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateMission(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminUpdateMission` Mutation requires an argument of type `AdminUpdateMissionVariables`:
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
  mutation.mutate(adminUpdateMissionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ missionId: ..., title: ..., scenarioDescription: ..., durationMinutes: ..., categoryId: ..., difficulty: ..., skillsTested: ..., courseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminUpdateMissionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.mission_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminSoftDeleteMission
You can execute the `AdminSoftDeleteMission` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSoftDeleteMission(options?: useDataConnectMutationOptions<AdminSoftDeleteMissionData, FirebaseError, AdminSoftDeleteMissionVariables>): UseDataConnectMutationResult<AdminSoftDeleteMissionData, AdminSoftDeleteMissionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSoftDeleteMission(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSoftDeleteMissionData, FirebaseError, AdminSoftDeleteMissionVariables>): UseDataConnectMutationResult<AdminSoftDeleteMissionData, AdminSoftDeleteMissionVariables>;
```

### Variables
The `AdminSoftDeleteMission` Mutation requires an argument of type `AdminSoftDeleteMissionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminSoftDeleteMissionVariables {
  missionId: UUIDString;
}
```
### Return Type
Recall that calling the `AdminSoftDeleteMission` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSoftDeleteMission` Mutation is of type `AdminSoftDeleteMissionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSoftDeleteMissionData {
  mission_update?: Mission_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSoftDeleteMission`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSoftDeleteMissionVariables } from '@dataconnect/generated';
import { useAdminSoftDeleteMission } from '@dataconnect/generated/react'

export default function AdminSoftDeleteMissionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSoftDeleteMission();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSoftDeleteMission(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSoftDeleteMission(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSoftDeleteMission(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSoftDeleteMission` Mutation requires an argument of type `AdminSoftDeleteMissionVariables`:
  const adminSoftDeleteMissionVars: AdminSoftDeleteMissionVariables = {
    missionId: ..., 
  };
  mutation.mutate(adminSoftDeleteMissionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ missionId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSoftDeleteMissionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.mission_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminCreateMicroLesson
You can execute the `AdminCreateMicroLesson` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminCreateMicroLesson(options?: useDataConnectMutationOptions<AdminCreateMicroLessonData, FirebaseError, AdminCreateMicroLessonVariables>): UseDataConnectMutationResult<AdminCreateMicroLessonData, AdminCreateMicroLessonVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminCreateMicroLesson(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateMicroLessonData, FirebaseError, AdminCreateMicroLessonVariables>): UseDataConnectMutationResult<AdminCreateMicroLessonData, AdminCreateMicroLessonVariables>;
```

### Variables
The `AdminCreateMicroLesson` Mutation requires an argument of type `AdminCreateMicroLessonVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminCreateMicroLesson` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminCreateMicroLesson` Mutation is of type `AdminCreateMicroLessonData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminCreateMicroLessonData {
  missionMicroLesson_insert: MissionMicroLesson_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminCreateMicroLesson`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminCreateMicroLessonVariables } from '@dataconnect/generated';
import { useAdminCreateMicroLesson } from '@dataconnect/generated/react'

export default function AdminCreateMicroLessonComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminCreateMicroLesson();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminCreateMicroLesson(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateMicroLesson(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateMicroLesson(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminCreateMicroLesson` Mutation requires an argument of type `AdminCreateMicroLessonVariables`:
  const adminCreateMicroLessonVars: AdminCreateMicroLessonVariables = {
    missionId: ..., 
    title: ..., 
    type: ..., 
    assetUrl: ..., // optional
    content: ..., // optional
    durationSeconds: ..., // optional
    order: ..., 
  };
  mutation.mutate(adminCreateMicroLessonVars);
  // Variables can be defined inline as well.
  mutation.mutate({ missionId: ..., title: ..., type: ..., assetUrl: ..., content: ..., durationSeconds: ..., order: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminCreateMicroLessonVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.missionMicroLesson_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminUpdateMicroLesson
You can execute the `AdminUpdateMicroLesson` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminUpdateMicroLesson(options?: useDataConnectMutationOptions<AdminUpdateMicroLessonData, FirebaseError, AdminUpdateMicroLessonVariables>): UseDataConnectMutationResult<AdminUpdateMicroLessonData, AdminUpdateMicroLessonVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminUpdateMicroLesson(dc: DataConnect, options?: useDataConnectMutationOptions<AdminUpdateMicroLessonData, FirebaseError, AdminUpdateMicroLessonVariables>): UseDataConnectMutationResult<AdminUpdateMicroLessonData, AdminUpdateMicroLessonVariables>;
```

### Variables
The `AdminUpdateMicroLesson` Mutation requires an argument of type `AdminUpdateMicroLessonVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminUpdateMicroLesson` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminUpdateMicroLesson` Mutation is of type `AdminUpdateMicroLessonData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminUpdateMicroLessonData {
  missionMicroLesson_update?: MissionMicroLesson_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminUpdateMicroLesson`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminUpdateMicroLessonVariables } from '@dataconnect/generated';
import { useAdminUpdateMicroLesson } from '@dataconnect/generated/react'

export default function AdminUpdateMicroLessonComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminUpdateMicroLesson();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminUpdateMicroLesson(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateMicroLesson(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateMicroLesson(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminUpdateMicroLesson` Mutation requires an argument of type `AdminUpdateMicroLessonVariables`:
  const adminUpdateMicroLessonVars: AdminUpdateMicroLessonVariables = {
    microLessonId: ..., 
    title: ..., // optional
    type: ..., // optional
    assetUrl: ..., // optional
    content: ..., // optional
    durationSeconds: ..., // optional
  };
  mutation.mutate(adminUpdateMicroLessonVars);
  // Variables can be defined inline as well.
  mutation.mutate({ microLessonId: ..., title: ..., type: ..., assetUrl: ..., content: ..., durationSeconds: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminUpdateMicroLessonVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.missionMicroLesson_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminDeleteMicroLesson
You can execute the `AdminDeleteMicroLesson` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminDeleteMicroLesson(options?: useDataConnectMutationOptions<AdminDeleteMicroLessonData, FirebaseError, AdminDeleteMicroLessonVariables>): UseDataConnectMutationResult<AdminDeleteMicroLessonData, AdminDeleteMicroLessonVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminDeleteMicroLesson(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeleteMicroLessonData, FirebaseError, AdminDeleteMicroLessonVariables>): UseDataConnectMutationResult<AdminDeleteMicroLessonData, AdminDeleteMicroLessonVariables>;
```

### Variables
The `AdminDeleteMicroLesson` Mutation requires an argument of type `AdminDeleteMicroLessonVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminDeleteMicroLessonVariables {
  microLessonId: UUIDString;
}
```
### Return Type
Recall that calling the `AdminDeleteMicroLesson` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminDeleteMicroLesson` Mutation is of type `AdminDeleteMicroLessonData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminDeleteMicroLessonData {
  missionMicroLesson_delete?: MissionMicroLesson_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminDeleteMicroLesson`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminDeleteMicroLessonVariables } from '@dataconnect/generated';
import { useAdminDeleteMicroLesson } from '@dataconnect/generated/react'

export default function AdminDeleteMicroLessonComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminDeleteMicroLesson();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminDeleteMicroLesson(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteMicroLesson(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteMicroLesson(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminDeleteMicroLesson` Mutation requires an argument of type `AdminDeleteMicroLessonVariables`:
  const adminDeleteMicroLessonVars: AdminDeleteMicroLessonVariables = {
    microLessonId: ..., 
  };
  mutation.mutate(adminDeleteMicroLessonVars);
  // Variables can be defined inline as well.
  mutation.mutate({ microLessonId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminDeleteMicroLessonVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.missionMicroLesson_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminUpdateMicroLessonOrder
You can execute the `AdminUpdateMicroLessonOrder` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminUpdateMicroLessonOrder(options?: useDataConnectMutationOptions<AdminUpdateMicroLessonOrderData, FirebaseError, AdminUpdateMicroLessonOrderVariables>): UseDataConnectMutationResult<AdminUpdateMicroLessonOrderData, AdminUpdateMicroLessonOrderVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminUpdateMicroLessonOrder(dc: DataConnect, options?: useDataConnectMutationOptions<AdminUpdateMicroLessonOrderData, FirebaseError, AdminUpdateMicroLessonOrderVariables>): UseDataConnectMutationResult<AdminUpdateMicroLessonOrderData, AdminUpdateMicroLessonOrderVariables>;
```

### Variables
The `AdminUpdateMicroLessonOrder` Mutation requires an argument of type `AdminUpdateMicroLessonOrderVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminUpdateMicroLessonOrderVariables {
  microLessonId: UUIDString;
  order: number;
}
```
### Return Type
Recall that calling the `AdminUpdateMicroLessonOrder` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminUpdateMicroLessonOrder` Mutation is of type `AdminUpdateMicroLessonOrderData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminUpdateMicroLessonOrderData {
  missionMicroLesson_update?: MissionMicroLesson_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminUpdateMicroLessonOrder`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminUpdateMicroLessonOrderVariables } from '@dataconnect/generated';
import { useAdminUpdateMicroLessonOrder } from '@dataconnect/generated/react'

export default function AdminUpdateMicroLessonOrderComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminUpdateMicroLessonOrder();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminUpdateMicroLessonOrder(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateMicroLessonOrder(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateMicroLessonOrder(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminUpdateMicroLessonOrder` Mutation requires an argument of type `AdminUpdateMicroLessonOrderVariables`:
  const adminUpdateMicroLessonOrderVars: AdminUpdateMicroLessonOrderVariables = {
    microLessonId: ..., 
    order: ..., 
  };
  mutation.mutate(adminUpdateMicroLessonOrderVars);
  // Variables can be defined inline as well.
  mutation.mutate({ microLessonId: ..., order: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminUpdateMicroLessonOrderVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.missionMicroLesson_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminCreateMissionTemplate
You can execute the `AdminCreateMissionTemplate` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminCreateMissionTemplate(options?: useDataConnectMutationOptions<AdminCreateMissionTemplateData, FirebaseError, AdminCreateMissionTemplateVariables>): UseDataConnectMutationResult<AdminCreateMissionTemplateData, AdminCreateMissionTemplateVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminCreateMissionTemplate(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateMissionTemplateData, FirebaseError, AdminCreateMissionTemplateVariables>): UseDataConnectMutationResult<AdminCreateMissionTemplateData, AdminCreateMissionTemplateVariables>;
```

### Variables
The `AdminCreateMissionTemplate` Mutation requires an argument of type `AdminCreateMissionTemplateVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminCreateMissionTemplateVariables {
  missionId: UUIDString;
  title: string;
  fileUrl: string;
  fileType: string;
}
```
### Return Type
Recall that calling the `AdminCreateMissionTemplate` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminCreateMissionTemplate` Mutation is of type `AdminCreateMissionTemplateData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminCreateMissionTemplateData {
  missionTemplate_insert: MissionTemplate_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminCreateMissionTemplate`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminCreateMissionTemplateVariables } from '@dataconnect/generated';
import { useAdminCreateMissionTemplate } from '@dataconnect/generated/react'

export default function AdminCreateMissionTemplateComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminCreateMissionTemplate();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminCreateMissionTemplate(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateMissionTemplate(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateMissionTemplate(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminCreateMissionTemplate` Mutation requires an argument of type `AdminCreateMissionTemplateVariables`:
  const adminCreateMissionTemplateVars: AdminCreateMissionTemplateVariables = {
    missionId: ..., 
    title: ..., 
    fileUrl: ..., 
    fileType: ..., 
  };
  mutation.mutate(adminCreateMissionTemplateVars);
  // Variables can be defined inline as well.
  mutation.mutate({ missionId: ..., title: ..., fileUrl: ..., fileType: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminCreateMissionTemplateVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.missionTemplate_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminDeleteMissionTemplate
You can execute the `AdminDeleteMissionTemplate` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminDeleteMissionTemplate(options?: useDataConnectMutationOptions<AdminDeleteMissionTemplateData, FirebaseError, AdminDeleteMissionTemplateVariables>): UseDataConnectMutationResult<AdminDeleteMissionTemplateData, AdminDeleteMissionTemplateVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminDeleteMissionTemplate(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeleteMissionTemplateData, FirebaseError, AdminDeleteMissionTemplateVariables>): UseDataConnectMutationResult<AdminDeleteMissionTemplateData, AdminDeleteMissionTemplateVariables>;
```

### Variables
The `AdminDeleteMissionTemplate` Mutation requires an argument of type `AdminDeleteMissionTemplateVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminDeleteMissionTemplateVariables {
  templateId: UUIDString;
}
```
### Return Type
Recall that calling the `AdminDeleteMissionTemplate` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminDeleteMissionTemplate` Mutation is of type `AdminDeleteMissionTemplateData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminDeleteMissionTemplateData {
  missionTemplate_delete?: MissionTemplate_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminDeleteMissionTemplate`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminDeleteMissionTemplateVariables } from '@dataconnect/generated';
import { useAdminDeleteMissionTemplate } from '@dataconnect/generated/react'

export default function AdminDeleteMissionTemplateComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminDeleteMissionTemplate();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminDeleteMissionTemplate(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteMissionTemplate(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteMissionTemplate(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminDeleteMissionTemplate` Mutation requires an argument of type `AdminDeleteMissionTemplateVariables`:
  const adminDeleteMissionTemplateVars: AdminDeleteMissionTemplateVariables = {
    templateId: ..., 
  };
  mutation.mutate(adminDeleteMissionTemplateVars);
  // Variables can be defined inline as well.
  mutation.mutate({ templateId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminDeleteMissionTemplateVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.missionTemplate_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminCreateRubricCriterion
You can execute the `AdminCreateRubricCriterion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminCreateRubricCriterion(options?: useDataConnectMutationOptions<AdminCreateRubricCriterionData, FirebaseError, AdminCreateRubricCriterionVariables>): UseDataConnectMutationResult<AdminCreateRubricCriterionData, AdminCreateRubricCriterionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminCreateRubricCriterion(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateRubricCriterionData, FirebaseError, AdminCreateRubricCriterionVariables>): UseDataConnectMutationResult<AdminCreateRubricCriterionData, AdminCreateRubricCriterionVariables>;
```

### Variables
The `AdminCreateRubricCriterion` Mutation requires an argument of type `AdminCreateRubricCriterionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminCreateRubricCriterionVariables {
  missionId: UUIDString;
  criterionName: string;
  description?: string | null;
  maxPoints: number;
  order: number;
}
```
### Return Type
Recall that calling the `AdminCreateRubricCriterion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminCreateRubricCriterion` Mutation is of type `AdminCreateRubricCriterionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminCreateRubricCriterionData {
  rubricCriterion_insert: RubricCriterion_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminCreateRubricCriterion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminCreateRubricCriterionVariables } from '@dataconnect/generated';
import { useAdminCreateRubricCriterion } from '@dataconnect/generated/react'

export default function AdminCreateRubricCriterionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminCreateRubricCriterion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminCreateRubricCriterion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateRubricCriterion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateRubricCriterion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminCreateRubricCriterion` Mutation requires an argument of type `AdminCreateRubricCriterionVariables`:
  const adminCreateRubricCriterionVars: AdminCreateRubricCriterionVariables = {
    missionId: ..., 
    criterionName: ..., 
    description: ..., // optional
    maxPoints: ..., 
    order: ..., 
  };
  mutation.mutate(adminCreateRubricCriterionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ missionId: ..., criterionName: ..., description: ..., maxPoints: ..., order: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminCreateRubricCriterionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.rubricCriterion_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminUpdateRubricCriterion
You can execute the `AdminUpdateRubricCriterion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminUpdateRubricCriterion(options?: useDataConnectMutationOptions<AdminUpdateRubricCriterionData, FirebaseError, AdminUpdateRubricCriterionVariables>): UseDataConnectMutationResult<AdminUpdateRubricCriterionData, AdminUpdateRubricCriterionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminUpdateRubricCriterion(dc: DataConnect, options?: useDataConnectMutationOptions<AdminUpdateRubricCriterionData, FirebaseError, AdminUpdateRubricCriterionVariables>): UseDataConnectMutationResult<AdminUpdateRubricCriterionData, AdminUpdateRubricCriterionVariables>;
```

### Variables
The `AdminUpdateRubricCriterion` Mutation requires an argument of type `AdminUpdateRubricCriterionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminUpdateRubricCriterionVariables {
  criterionId: UUIDString;
  criterionName?: string | null;
  description?: string | null;
  maxPoints?: number | null;
}
```
### Return Type
Recall that calling the `AdminUpdateRubricCriterion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminUpdateRubricCriterion` Mutation is of type `AdminUpdateRubricCriterionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminUpdateRubricCriterionData {
  rubricCriterion_update?: RubricCriterion_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminUpdateRubricCriterion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminUpdateRubricCriterionVariables } from '@dataconnect/generated';
import { useAdminUpdateRubricCriterion } from '@dataconnect/generated/react'

export default function AdminUpdateRubricCriterionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminUpdateRubricCriterion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminUpdateRubricCriterion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateRubricCriterion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateRubricCriterion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminUpdateRubricCriterion` Mutation requires an argument of type `AdminUpdateRubricCriterionVariables`:
  const adminUpdateRubricCriterionVars: AdminUpdateRubricCriterionVariables = {
    criterionId: ..., 
    criterionName: ..., // optional
    description: ..., // optional
    maxPoints: ..., // optional
  };
  mutation.mutate(adminUpdateRubricCriterionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ criterionId: ..., criterionName: ..., description: ..., maxPoints: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminUpdateRubricCriterionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.rubricCriterion_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminDeleteRubricCriterion
You can execute the `AdminDeleteRubricCriterion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminDeleteRubricCriterion(options?: useDataConnectMutationOptions<AdminDeleteRubricCriterionData, FirebaseError, AdminDeleteRubricCriterionVariables>): UseDataConnectMutationResult<AdminDeleteRubricCriterionData, AdminDeleteRubricCriterionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminDeleteRubricCriterion(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeleteRubricCriterionData, FirebaseError, AdminDeleteRubricCriterionVariables>): UseDataConnectMutationResult<AdminDeleteRubricCriterionData, AdminDeleteRubricCriterionVariables>;
```

### Variables
The `AdminDeleteRubricCriterion` Mutation requires an argument of type `AdminDeleteRubricCriterionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminDeleteRubricCriterionVariables {
  criterionId: UUIDString;
}
```
### Return Type
Recall that calling the `AdminDeleteRubricCriterion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminDeleteRubricCriterion` Mutation is of type `AdminDeleteRubricCriterionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminDeleteRubricCriterionData {
  rubricCriterion_delete?: RubricCriterion_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminDeleteRubricCriterion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminDeleteRubricCriterionVariables } from '@dataconnect/generated';
import { useAdminDeleteRubricCriterion } from '@dataconnect/generated/react'

export default function AdminDeleteRubricCriterionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminDeleteRubricCriterion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminDeleteRubricCriterion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteRubricCriterion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteRubricCriterion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminDeleteRubricCriterion` Mutation requires an argument of type `AdminDeleteRubricCriterionVariables`:
  const adminDeleteRubricCriterionVars: AdminDeleteRubricCriterionVariables = {
    criterionId: ..., 
  };
  mutation.mutate(adminDeleteRubricCriterionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ criterionId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminDeleteRubricCriterionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.rubricCriterion_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminUpdateRubricCriterionOrder
You can execute the `AdminUpdateRubricCriterionOrder` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminUpdateRubricCriterionOrder(options?: useDataConnectMutationOptions<AdminUpdateRubricCriterionOrderData, FirebaseError, AdminUpdateRubricCriterionOrderVariables>): UseDataConnectMutationResult<AdminUpdateRubricCriterionOrderData, AdminUpdateRubricCriterionOrderVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminUpdateRubricCriterionOrder(dc: DataConnect, options?: useDataConnectMutationOptions<AdminUpdateRubricCriterionOrderData, FirebaseError, AdminUpdateRubricCriterionOrderVariables>): UseDataConnectMutationResult<AdminUpdateRubricCriterionOrderData, AdminUpdateRubricCriterionOrderVariables>;
```

### Variables
The `AdminUpdateRubricCriterionOrder` Mutation requires an argument of type `AdminUpdateRubricCriterionOrderVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminUpdateRubricCriterionOrderVariables {
  criterionId: UUIDString;
  order: number;
}
```
### Return Type
Recall that calling the `AdminUpdateRubricCriterionOrder` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminUpdateRubricCriterionOrder` Mutation is of type `AdminUpdateRubricCriterionOrderData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminUpdateRubricCriterionOrderData {
  rubricCriterion_update?: RubricCriterion_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminUpdateRubricCriterionOrder`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminUpdateRubricCriterionOrderVariables } from '@dataconnect/generated';
import { useAdminUpdateRubricCriterionOrder } from '@dataconnect/generated/react'

export default function AdminUpdateRubricCriterionOrderComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminUpdateRubricCriterionOrder();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminUpdateRubricCriterionOrder(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateRubricCriterionOrder(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateRubricCriterionOrder(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminUpdateRubricCriterionOrder` Mutation requires an argument of type `AdminUpdateRubricCriterionOrderVariables`:
  const adminUpdateRubricCriterionOrderVars: AdminUpdateRubricCriterionOrderVariables = {
    criterionId: ..., 
    order: ..., 
  };
  mutation.mutate(adminUpdateRubricCriterionOrderVars);
  // Variables can be defined inline as well.
  mutation.mutate({ criterionId: ..., order: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminUpdateRubricCriterionOrderVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.rubricCriterion_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## StartQuizAttempt
You can execute the `StartQuizAttempt` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useStartQuizAttempt(options?: useDataConnectMutationOptions<StartQuizAttemptData, FirebaseError, StartQuizAttemptVariables>): UseDataConnectMutationResult<StartQuizAttemptData, StartQuizAttemptVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useStartQuizAttempt(dc: DataConnect, options?: useDataConnectMutationOptions<StartQuizAttemptData, FirebaseError, StartQuizAttemptVariables>): UseDataConnectMutationResult<StartQuizAttemptData, StartQuizAttemptVariables>;
```

### Variables
The `StartQuizAttempt` Mutation requires an argument of type `StartQuizAttemptVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface StartQuizAttemptVariables {
  quizId: UUIDString;
}
```
### Return Type
Recall that calling the `StartQuizAttempt` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `StartQuizAttempt` Mutation is of type `StartQuizAttemptData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface StartQuizAttemptData {
  quizAttempt_insert: QuizAttempt_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `StartQuizAttempt`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, StartQuizAttemptVariables } from '@dataconnect/generated';
import { useStartQuizAttempt } from '@dataconnect/generated/react'

export default function StartQuizAttemptComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useStartQuizAttempt();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useStartQuizAttempt(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useStartQuizAttempt(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useStartQuizAttempt(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useStartQuizAttempt` Mutation requires an argument of type `StartQuizAttemptVariables`:
  const startQuizAttemptVars: StartQuizAttemptVariables = {
    quizId: ..., 
  };
  mutation.mutate(startQuizAttemptVars);
  // Variables can be defined inline as well.
  mutation.mutate({ quizId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(startQuizAttemptVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quizAttempt_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## SubmitQuizAnswer
You can execute the `SubmitQuizAnswer` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useSubmitQuizAnswer(options?: useDataConnectMutationOptions<SubmitQuizAnswerData, FirebaseError, SubmitQuizAnswerVariables>): UseDataConnectMutationResult<SubmitQuizAnswerData, SubmitQuizAnswerVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useSubmitQuizAnswer(dc: DataConnect, options?: useDataConnectMutationOptions<SubmitQuizAnswerData, FirebaseError, SubmitQuizAnswerVariables>): UseDataConnectMutationResult<SubmitQuizAnswerData, SubmitQuizAnswerVariables>;
```

### Variables
The `SubmitQuizAnswer` Mutation requires an argument of type `SubmitQuizAnswerVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SubmitQuizAnswerVariables {
  attemptId: UUIDString;
  questionId: UUIDString;
  optionId: UUIDString;
}
```
### Return Type
Recall that calling the `SubmitQuizAnswer` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `SubmitQuizAnswer` Mutation is of type `SubmitQuizAnswerData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SubmitQuizAnswerData {
  quizAttemptAnswer_upsert: QuizAttemptAnswer_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `SubmitQuizAnswer`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, SubmitQuizAnswerVariables } from '@dataconnect/generated';
import { useSubmitQuizAnswer } from '@dataconnect/generated/react'

export default function SubmitQuizAnswerComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useSubmitQuizAnswer();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useSubmitQuizAnswer(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSubmitQuizAnswer(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSubmitQuizAnswer(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useSubmitQuizAnswer` Mutation requires an argument of type `SubmitQuizAnswerVariables`:
  const submitQuizAnswerVars: SubmitQuizAnswerVariables = {
    attemptId: ..., 
    questionId: ..., 
    optionId: ..., 
  };
  mutation.mutate(submitQuizAnswerVars);
  // Variables can be defined inline as well.
  mutation.mutate({ attemptId: ..., questionId: ..., optionId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(submitQuizAnswerVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quizAttemptAnswer_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## FinishQuizAttemptIfOpen
You can execute the `FinishQuizAttemptIfOpen` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useFinishQuizAttemptIfOpen(options?: useDataConnectMutationOptions<FinishQuizAttemptIfOpenData, FirebaseError, FinishQuizAttemptIfOpenVariables>): UseDataConnectMutationResult<FinishQuizAttemptIfOpenData, FinishQuizAttemptIfOpenVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useFinishQuizAttemptIfOpen(dc: DataConnect, options?: useDataConnectMutationOptions<FinishQuizAttemptIfOpenData, FirebaseError, FinishQuizAttemptIfOpenVariables>): UseDataConnectMutationResult<FinishQuizAttemptIfOpenData, FinishQuizAttemptIfOpenVariables>;
```

### Variables
The `FinishQuizAttemptIfOpen` Mutation requires an argument of type `FinishQuizAttemptIfOpenVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface FinishQuizAttemptIfOpenVariables {
  attemptId: UUIDString;
  score: number;
  passed: boolean;
}
```
### Return Type
Recall that calling the `FinishQuizAttemptIfOpen` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `FinishQuizAttemptIfOpen` Mutation is of type `FinishQuizAttemptIfOpenData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface FinishQuizAttemptIfOpenData {
  quizAttempt_updateMany: number;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `FinishQuizAttemptIfOpen`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, FinishQuizAttemptIfOpenVariables } from '@dataconnect/generated';
import { useFinishQuizAttemptIfOpen } from '@dataconnect/generated/react'

export default function FinishQuizAttemptIfOpenComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useFinishQuizAttemptIfOpen();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useFinishQuizAttemptIfOpen(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useFinishQuizAttemptIfOpen(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useFinishQuizAttemptIfOpen(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useFinishQuizAttemptIfOpen` Mutation requires an argument of type `FinishQuizAttemptIfOpenVariables`:
  const finishQuizAttemptIfOpenVars: FinishQuizAttemptIfOpenVariables = {
    attemptId: ..., 
    score: ..., 
    passed: ..., 
  };
  mutation.mutate(finishQuizAttemptIfOpenVars);
  // Variables can be defined inline as well.
  mutation.mutate({ attemptId: ..., score: ..., passed: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(finishQuizAttemptIfOpenVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quizAttempt_updateMany);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminCreateQuiz
You can execute the `AdminCreateQuiz` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminCreateQuiz(options?: useDataConnectMutationOptions<AdminCreateQuizData, FirebaseError, AdminCreateQuizVariables>): UseDataConnectMutationResult<AdminCreateQuizData, AdminCreateQuizVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminCreateQuiz(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateQuizData, FirebaseError, AdminCreateQuizVariables>): UseDataConnectMutationResult<AdminCreateQuizData, AdminCreateQuizVariables>;
```

### Variables
The `AdminCreateQuiz` Mutation requires an argument of type `AdminCreateQuizVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminCreateQuizVariables {
  lectureId: UUIDString;
  passingScore: number;
  maxAttempts: number;
  timeLimitMinutes?: number | null;
}
```
### Return Type
Recall that calling the `AdminCreateQuiz` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminCreateQuiz` Mutation is of type `AdminCreateQuizData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminCreateQuizData {
  courseQuiz_insert: CourseQuiz_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminCreateQuiz`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminCreateQuizVariables } from '@dataconnect/generated';
import { useAdminCreateQuiz } from '@dataconnect/generated/react'

export default function AdminCreateQuizComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminCreateQuiz();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminCreateQuiz(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateQuiz(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateQuiz(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminCreateQuiz` Mutation requires an argument of type `AdminCreateQuizVariables`:
  const adminCreateQuizVars: AdminCreateQuizVariables = {
    lectureId: ..., 
    passingScore: ..., 
    maxAttempts: ..., 
    timeLimitMinutes: ..., // optional
  };
  mutation.mutate(adminCreateQuizVars);
  // Variables can be defined inline as well.
  mutation.mutate({ lectureId: ..., passingScore: ..., maxAttempts: ..., timeLimitMinutes: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminCreateQuizVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseQuiz_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminUpdateQuiz
You can execute the `AdminUpdateQuiz` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminUpdateQuiz(options?: useDataConnectMutationOptions<AdminUpdateQuizData, FirebaseError, AdminUpdateQuizVariables>): UseDataConnectMutationResult<AdminUpdateQuizData, AdminUpdateQuizVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminUpdateQuiz(dc: DataConnect, options?: useDataConnectMutationOptions<AdminUpdateQuizData, FirebaseError, AdminUpdateQuizVariables>): UseDataConnectMutationResult<AdminUpdateQuizData, AdminUpdateQuizVariables>;
```

### Variables
The `AdminUpdateQuiz` Mutation requires an argument of type `AdminUpdateQuizVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminUpdateQuizVariables {
  quizId: UUIDString;
  passingScore?: number | null;
  maxAttempts?: number | null;
  timeLimitMinutes?: number | null;
}
```
### Return Type
Recall that calling the `AdminUpdateQuiz` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminUpdateQuiz` Mutation is of type `AdminUpdateQuizData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminUpdateQuizData {
  courseQuiz_update?: CourseQuiz_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminUpdateQuiz`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminUpdateQuizVariables } from '@dataconnect/generated';
import { useAdminUpdateQuiz } from '@dataconnect/generated/react'

export default function AdminUpdateQuizComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminUpdateQuiz();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminUpdateQuiz(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateQuiz(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateQuiz(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminUpdateQuiz` Mutation requires an argument of type `AdminUpdateQuizVariables`:
  const adminUpdateQuizVars: AdminUpdateQuizVariables = {
    quizId: ..., 
    passingScore: ..., // optional
    maxAttempts: ..., // optional
    timeLimitMinutes: ..., // optional
  };
  mutation.mutate(adminUpdateQuizVars);
  // Variables can be defined inline as well.
  mutation.mutate({ quizId: ..., passingScore: ..., maxAttempts: ..., timeLimitMinutes: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminUpdateQuizVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseQuiz_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminDeleteQuiz
You can execute the `AdminDeleteQuiz` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminDeleteQuiz(options?: useDataConnectMutationOptions<AdminDeleteQuizData, FirebaseError, AdminDeleteQuizVariables>): UseDataConnectMutationResult<AdminDeleteQuizData, AdminDeleteQuizVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminDeleteQuiz(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeleteQuizData, FirebaseError, AdminDeleteQuizVariables>): UseDataConnectMutationResult<AdminDeleteQuizData, AdminDeleteQuizVariables>;
```

### Variables
The `AdminDeleteQuiz` Mutation requires an argument of type `AdminDeleteQuizVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminDeleteQuizVariables {
  quizId: UUIDString;
}
```
### Return Type
Recall that calling the `AdminDeleteQuiz` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminDeleteQuiz` Mutation is of type `AdminDeleteQuizData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminDeleteQuizData {
  courseQuiz_delete?: CourseQuiz_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminDeleteQuiz`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminDeleteQuizVariables } from '@dataconnect/generated';
import { useAdminDeleteQuiz } from '@dataconnect/generated/react'

export default function AdminDeleteQuizComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminDeleteQuiz();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminDeleteQuiz(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteQuiz(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteQuiz(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminDeleteQuiz` Mutation requires an argument of type `AdminDeleteQuizVariables`:
  const adminDeleteQuizVars: AdminDeleteQuizVariables = {
    quizId: ..., 
  };
  mutation.mutate(adminDeleteQuizVars);
  // Variables can be defined inline as well.
  mutation.mutate({ quizId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminDeleteQuizVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseQuiz_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminCreateQuizQuestion
You can execute the `AdminCreateQuizQuestion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminCreateQuizQuestion(options?: useDataConnectMutationOptions<AdminCreateQuizQuestionData, FirebaseError, AdminCreateQuizQuestionVariables>): UseDataConnectMutationResult<AdminCreateQuizQuestionData, AdminCreateQuizQuestionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminCreateQuizQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateQuizQuestionData, FirebaseError, AdminCreateQuizQuestionVariables>): UseDataConnectMutationResult<AdminCreateQuizQuestionData, AdminCreateQuizQuestionVariables>;
```

### Variables
The `AdminCreateQuizQuestion` Mutation requires an argument of type `AdminCreateQuizQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminCreateQuizQuestionVariables {
  quizId: UUIDString;
  questionText: string;
  order: number;
  points: number;
  explanation?: string | null;
}
```
### Return Type
Recall that calling the `AdminCreateQuizQuestion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminCreateQuizQuestion` Mutation is of type `AdminCreateQuizQuestionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminCreateQuizQuestionData {
  quizQuestion_insert: QuizQuestion_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminCreateQuizQuestion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminCreateQuizQuestionVariables } from '@dataconnect/generated';
import { useAdminCreateQuizQuestion } from '@dataconnect/generated/react'

export default function AdminCreateQuizQuestionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminCreateQuizQuestion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminCreateQuizQuestion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateQuizQuestion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateQuizQuestion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminCreateQuizQuestion` Mutation requires an argument of type `AdminCreateQuizQuestionVariables`:
  const adminCreateQuizQuestionVars: AdminCreateQuizQuestionVariables = {
    quizId: ..., 
    questionText: ..., 
    order: ..., 
    points: ..., 
    explanation: ..., // optional
  };
  mutation.mutate(adminCreateQuizQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ quizId: ..., questionText: ..., order: ..., points: ..., explanation: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminCreateQuizQuestionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quizQuestion_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminUpdateQuizQuestion
You can execute the `AdminUpdateQuizQuestion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminUpdateQuizQuestion(options?: useDataConnectMutationOptions<AdminUpdateQuizQuestionData, FirebaseError, AdminUpdateQuizQuestionVariables>): UseDataConnectMutationResult<AdminUpdateQuizQuestionData, AdminUpdateQuizQuestionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminUpdateQuizQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<AdminUpdateQuizQuestionData, FirebaseError, AdminUpdateQuizQuestionVariables>): UseDataConnectMutationResult<AdminUpdateQuizQuestionData, AdminUpdateQuizQuestionVariables>;
```

### Variables
The `AdminUpdateQuizQuestion` Mutation requires an argument of type `AdminUpdateQuizQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminUpdateQuizQuestionVariables {
  questionId: UUIDString;
  questionText?: string | null;
  points?: number | null;
  explanation?: string | null;
}
```
### Return Type
Recall that calling the `AdminUpdateQuizQuestion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminUpdateQuizQuestion` Mutation is of type `AdminUpdateQuizQuestionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminUpdateQuizQuestionData {
  quizQuestion_update?: QuizQuestion_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminUpdateQuizQuestion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminUpdateQuizQuestionVariables } from '@dataconnect/generated';
import { useAdminUpdateQuizQuestion } from '@dataconnect/generated/react'

export default function AdminUpdateQuizQuestionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminUpdateQuizQuestion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminUpdateQuizQuestion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateQuizQuestion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateQuizQuestion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminUpdateQuizQuestion` Mutation requires an argument of type `AdminUpdateQuizQuestionVariables`:
  const adminUpdateQuizQuestionVars: AdminUpdateQuizQuestionVariables = {
    questionId: ..., 
    questionText: ..., // optional
    points: ..., // optional
    explanation: ..., // optional
  };
  mutation.mutate(adminUpdateQuizQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionId: ..., questionText: ..., points: ..., explanation: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminUpdateQuizQuestionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quizQuestion_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminSoftDeleteQuizQuestion
You can execute the `AdminSoftDeleteQuizQuestion` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminSoftDeleteQuizQuestion(options?: useDataConnectMutationOptions<AdminSoftDeleteQuizQuestionData, FirebaseError, AdminSoftDeleteQuizQuestionVariables>): UseDataConnectMutationResult<AdminSoftDeleteQuizQuestionData, AdminSoftDeleteQuizQuestionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminSoftDeleteQuizQuestion(dc: DataConnect, options?: useDataConnectMutationOptions<AdminSoftDeleteQuizQuestionData, FirebaseError, AdminSoftDeleteQuizQuestionVariables>): UseDataConnectMutationResult<AdminSoftDeleteQuizQuestionData, AdminSoftDeleteQuizQuestionVariables>;
```

### Variables
The `AdminSoftDeleteQuizQuestion` Mutation requires an argument of type `AdminSoftDeleteQuizQuestionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminSoftDeleteQuizQuestionVariables {
  questionId: UUIDString;
}
```
### Return Type
Recall that calling the `AdminSoftDeleteQuizQuestion` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminSoftDeleteQuizQuestion` Mutation is of type `AdminSoftDeleteQuizQuestionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminSoftDeleteQuizQuestionData {
  quizQuestion_update?: QuizQuestion_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminSoftDeleteQuizQuestion`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminSoftDeleteQuizQuestionVariables } from '@dataconnect/generated';
import { useAdminSoftDeleteQuizQuestion } from '@dataconnect/generated/react'

export default function AdminSoftDeleteQuizQuestionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminSoftDeleteQuizQuestion();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminSoftDeleteQuizQuestion(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSoftDeleteQuizQuestion(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminSoftDeleteQuizQuestion(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminSoftDeleteQuizQuestion` Mutation requires an argument of type `AdminSoftDeleteQuizQuestionVariables`:
  const adminSoftDeleteQuizQuestionVars: AdminSoftDeleteQuizQuestionVariables = {
    questionId: ..., 
  };
  mutation.mutate(adminSoftDeleteQuizQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminSoftDeleteQuizQuestionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quizQuestion_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminUpdateQuizQuestionOrder
You can execute the `AdminUpdateQuizQuestionOrder` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminUpdateQuizQuestionOrder(options?: useDataConnectMutationOptions<AdminUpdateQuizQuestionOrderData, FirebaseError, AdminUpdateQuizQuestionOrderVariables>): UseDataConnectMutationResult<AdminUpdateQuizQuestionOrderData, AdminUpdateQuizQuestionOrderVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminUpdateQuizQuestionOrder(dc: DataConnect, options?: useDataConnectMutationOptions<AdminUpdateQuizQuestionOrderData, FirebaseError, AdminUpdateQuizQuestionOrderVariables>): UseDataConnectMutationResult<AdminUpdateQuizQuestionOrderData, AdminUpdateQuizQuestionOrderVariables>;
```

### Variables
The `AdminUpdateQuizQuestionOrder` Mutation requires an argument of type `AdminUpdateQuizQuestionOrderVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminUpdateQuizQuestionOrderVariables {
  questionId: UUIDString;
  order: number;
}
```
### Return Type
Recall that calling the `AdminUpdateQuizQuestionOrder` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminUpdateQuizQuestionOrder` Mutation is of type `AdminUpdateQuizQuestionOrderData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminUpdateQuizQuestionOrderData {
  quizQuestion_update?: QuizQuestion_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminUpdateQuizQuestionOrder`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminUpdateQuizQuestionOrderVariables } from '@dataconnect/generated';
import { useAdminUpdateQuizQuestionOrder } from '@dataconnect/generated/react'

export default function AdminUpdateQuizQuestionOrderComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminUpdateQuizQuestionOrder();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminUpdateQuizQuestionOrder(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateQuizQuestionOrder(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateQuizQuestionOrder(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminUpdateQuizQuestionOrder` Mutation requires an argument of type `AdminUpdateQuizQuestionOrderVariables`:
  const adminUpdateQuizQuestionOrderVars: AdminUpdateQuizQuestionOrderVariables = {
    questionId: ..., 
    order: ..., 
  };
  mutation.mutate(adminUpdateQuizQuestionOrderVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionId: ..., order: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminUpdateQuizQuestionOrderVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quizQuestion_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminCreateQuizOption
You can execute the `AdminCreateQuizOption` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminCreateQuizOption(options?: useDataConnectMutationOptions<AdminCreateQuizOptionData, FirebaseError, AdminCreateQuizOptionVariables>): UseDataConnectMutationResult<AdminCreateQuizOptionData, AdminCreateQuizOptionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminCreateQuizOption(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateQuizOptionData, FirebaseError, AdminCreateQuizOptionVariables>): UseDataConnectMutationResult<AdminCreateQuizOptionData, AdminCreateQuizOptionVariables>;
```

### Variables
The `AdminCreateQuizOption` Mutation requires an argument of type `AdminCreateQuizOptionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminCreateQuizOptionVariables {
  questionId: UUIDString;
  text: string;
  order: number;
  isCorrect: boolean;
}
```
### Return Type
Recall that calling the `AdminCreateQuizOption` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminCreateQuizOption` Mutation is of type `AdminCreateQuizOptionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminCreateQuizOptionData {
  quizOption_insert: QuizOption_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminCreateQuizOption`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminCreateQuizOptionVariables } from '@dataconnect/generated';
import { useAdminCreateQuizOption } from '@dataconnect/generated/react'

export default function AdminCreateQuizOptionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminCreateQuizOption();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminCreateQuizOption(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateQuizOption(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateQuizOption(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminCreateQuizOption` Mutation requires an argument of type `AdminCreateQuizOptionVariables`:
  const adminCreateQuizOptionVars: AdminCreateQuizOptionVariables = {
    questionId: ..., 
    text: ..., 
    order: ..., 
    isCorrect: ..., 
  };
  mutation.mutate(adminCreateQuizOptionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionId: ..., text: ..., order: ..., isCorrect: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminCreateQuizOptionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quizOption_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminUpdateQuizOption
You can execute the `AdminUpdateQuizOption` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminUpdateQuizOption(options?: useDataConnectMutationOptions<AdminUpdateQuizOptionData, FirebaseError, AdminUpdateQuizOptionVariables>): UseDataConnectMutationResult<AdminUpdateQuizOptionData, AdminUpdateQuizOptionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminUpdateQuizOption(dc: DataConnect, options?: useDataConnectMutationOptions<AdminUpdateQuizOptionData, FirebaseError, AdminUpdateQuizOptionVariables>): UseDataConnectMutationResult<AdminUpdateQuizOptionData, AdminUpdateQuizOptionVariables>;
```

### Variables
The `AdminUpdateQuizOption` Mutation requires an argument of type `AdminUpdateQuizOptionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminUpdateQuizOptionVariables {
  optionId: UUIDString;
  text?: string | null;
  isCorrect?: boolean | null;
}
```
### Return Type
Recall that calling the `AdminUpdateQuizOption` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminUpdateQuizOption` Mutation is of type `AdminUpdateQuizOptionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminUpdateQuizOptionData {
  quizOption_update?: QuizOption_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminUpdateQuizOption`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminUpdateQuizOptionVariables } from '@dataconnect/generated';
import { useAdminUpdateQuizOption } from '@dataconnect/generated/react'

export default function AdminUpdateQuizOptionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminUpdateQuizOption();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminUpdateQuizOption(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateQuizOption(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateQuizOption(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminUpdateQuizOption` Mutation requires an argument of type `AdminUpdateQuizOptionVariables`:
  const adminUpdateQuizOptionVars: AdminUpdateQuizOptionVariables = {
    optionId: ..., 
    text: ..., // optional
    isCorrect: ..., // optional
  };
  mutation.mutate(adminUpdateQuizOptionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ optionId: ..., text: ..., isCorrect: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminUpdateQuizOptionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quizOption_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminDeleteQuizOption
You can execute the `AdminDeleteQuizOption` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminDeleteQuizOption(options?: useDataConnectMutationOptions<AdminDeleteQuizOptionData, FirebaseError, AdminDeleteQuizOptionVariables>): UseDataConnectMutationResult<AdminDeleteQuizOptionData, AdminDeleteQuizOptionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminDeleteQuizOption(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeleteQuizOptionData, FirebaseError, AdminDeleteQuizOptionVariables>): UseDataConnectMutationResult<AdminDeleteQuizOptionData, AdminDeleteQuizOptionVariables>;
```

### Variables
The `AdminDeleteQuizOption` Mutation requires an argument of type `AdminDeleteQuizOptionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminDeleteQuizOptionVariables {
  optionId: UUIDString;
}
```
### Return Type
Recall that calling the `AdminDeleteQuizOption` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminDeleteQuizOption` Mutation is of type `AdminDeleteQuizOptionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminDeleteQuizOptionData {
  quizOption_delete?: QuizOption_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminDeleteQuizOption`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminDeleteQuizOptionVariables } from '@dataconnect/generated';
import { useAdminDeleteQuizOption } from '@dataconnect/generated/react'

export default function AdminDeleteQuizOptionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminDeleteQuizOption();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminDeleteQuizOption(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteQuizOption(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteQuizOption(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminDeleteQuizOption` Mutation requires an argument of type `AdminDeleteQuizOptionVariables`:
  const adminDeleteQuizOptionVars: AdminDeleteQuizOptionVariables = {
    optionId: ..., 
  };
  mutation.mutate(adminDeleteQuizOptionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ optionId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminDeleteQuizOptionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quizOption_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminUpdateQuizOptionOrder
You can execute the `AdminUpdateQuizOptionOrder` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminUpdateQuizOptionOrder(options?: useDataConnectMutationOptions<AdminUpdateQuizOptionOrderData, FirebaseError, AdminUpdateQuizOptionOrderVariables>): UseDataConnectMutationResult<AdminUpdateQuizOptionOrderData, AdminUpdateQuizOptionOrderVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminUpdateQuizOptionOrder(dc: DataConnect, options?: useDataConnectMutationOptions<AdminUpdateQuizOptionOrderData, FirebaseError, AdminUpdateQuizOptionOrderVariables>): UseDataConnectMutationResult<AdminUpdateQuizOptionOrderData, AdminUpdateQuizOptionOrderVariables>;
```

### Variables
The `AdminUpdateQuizOptionOrder` Mutation requires an argument of type `AdminUpdateQuizOptionOrderVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminUpdateQuizOptionOrderVariables {
  optionId: UUIDString;
  order: number;
}
```
### Return Type
Recall that calling the `AdminUpdateQuizOptionOrder` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminUpdateQuizOptionOrder` Mutation is of type `AdminUpdateQuizOptionOrderData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminUpdateQuizOptionOrderData {
  quizOption_update?: QuizOption_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminUpdateQuizOptionOrder`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminUpdateQuizOptionOrderVariables } from '@dataconnect/generated';
import { useAdminUpdateQuizOptionOrder } from '@dataconnect/generated/react'

export default function AdminUpdateQuizOptionOrderComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminUpdateQuizOptionOrder();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminUpdateQuizOptionOrder(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateQuizOptionOrder(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminUpdateQuizOptionOrder(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminUpdateQuizOptionOrder` Mutation requires an argument of type `AdminUpdateQuizOptionOrderVariables`:
  const adminUpdateQuizOptionOrderVars: AdminUpdateQuizOptionOrderVariables = {
    optionId: ..., 
    order: ..., 
  };
  mutation.mutate(adminUpdateQuizOptionOrderVars);
  // Variables can be defined inline as well.
  mutation.mutate({ optionId: ..., order: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminUpdateQuizOptionOrderVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quizOption_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## LogPayment
You can execute the `LogPayment` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useLogPayment(options?: useDataConnectMutationOptions<LogPaymentData, FirebaseError, LogPaymentVariables>): UseDataConnectMutationResult<LogPaymentData, LogPaymentVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useLogPayment(dc: DataConnect, options?: useDataConnectMutationOptions<LogPaymentData, FirebaseError, LogPaymentVariables>): UseDataConnectMutationResult<LogPaymentData, LogPaymentVariables>;
```

### Variables
The `LogPayment` Mutation requires an argument of type `LogPaymentVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface LogPaymentVariables {
  gateway: PaymentGateway;
  referenceId: string;
  amount: number;
  currency?: string | null;
}
```
### Return Type
Recall that calling the `LogPayment` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `LogPayment` Mutation is of type `LogPaymentData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface LogPaymentData {
  payment_insert: Payment_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `LogPayment`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, LogPaymentVariables } from '@dataconnect/generated';
import { useLogPayment } from '@dataconnect/generated/react'

export default function LogPaymentComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useLogPayment();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useLogPayment(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useLogPayment(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useLogPayment(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useLogPayment` Mutation requires an argument of type `LogPaymentVariables`:
  const logPaymentVars: LogPaymentVariables = {
    gateway: ..., 
    referenceId: ..., 
    amount: ..., 
    currency: ..., // optional
  };
  mutation.mutate(logPaymentVars);
  // Variables can be defined inline as well.
  mutation.mutate({ gateway: ..., referenceId: ..., amount: ..., currency: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(logPaymentVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.payment_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AddPaymentItem
You can execute the `AddPaymentItem` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAddPaymentItem(options?: useDataConnectMutationOptions<AddPaymentItemData, FirebaseError, AddPaymentItemVariables>): UseDataConnectMutationResult<AddPaymentItemData, AddPaymentItemVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAddPaymentItem(dc: DataConnect, options?: useDataConnectMutationOptions<AddPaymentItemData, FirebaseError, AddPaymentItemVariables>): UseDataConnectMutationResult<AddPaymentItemData, AddPaymentItemVariables>;
```

### Variables
The `AddPaymentItem` Mutation requires an argument of type `AddPaymentItemVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AddPaymentItem` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AddPaymentItem` Mutation is of type `AddPaymentItemData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AddPaymentItemData {
  paymentItem_insert: PaymentItem_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AddPaymentItem`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AddPaymentItemVariables } from '@dataconnect/generated';
import { useAddPaymentItem } from '@dataconnect/generated/react'

export default function AddPaymentItemComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAddPaymentItem();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAddPaymentItem(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAddPaymentItem(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAddPaymentItem(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAddPaymentItem` Mutation requires an argument of type `AddPaymentItemVariables`:
  const addPaymentItemVars: AddPaymentItemVariables = {
    paymentId: ..., 
    targetType: ..., 
    courseId: ..., // optional
    missionId: ..., // optional
    subscriptionTierId: ..., // optional
    price: ..., 
  };
  mutation.mutate(addPaymentItemVars);
  // Variables can be defined inline as well.
  mutation.mutate({ paymentId: ..., targetType: ..., courseId: ..., missionId: ..., subscriptionTierId: ..., price: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(addPaymentItemVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.paymentItem_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminAddCourseInstructor
You can execute the `AdminAddCourseInstructor` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminAddCourseInstructor(options?: useDataConnectMutationOptions<AdminAddCourseInstructorData, FirebaseError, AdminAddCourseInstructorVariables>): UseDataConnectMutationResult<AdminAddCourseInstructorData, AdminAddCourseInstructorVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminAddCourseInstructor(dc: DataConnect, options?: useDataConnectMutationOptions<AdminAddCourseInstructorData, FirebaseError, AdminAddCourseInstructorVariables>): UseDataConnectMutationResult<AdminAddCourseInstructorData, AdminAddCourseInstructorVariables>;
```

### Variables
The `AdminAddCourseInstructor` Mutation requires an argument of type `AdminAddCourseInstructorVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminAddCourseInstructorVariables {
  courseId: UUIDString;
  userId: string;
}
```
### Return Type
Recall that calling the `AdminAddCourseInstructor` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminAddCourseInstructor` Mutation is of type `AdminAddCourseInstructorData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminAddCourseInstructorData {
  courseInstructor_insert: CourseInstructor_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminAddCourseInstructor`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminAddCourseInstructorVariables } from '@dataconnect/generated';
import { useAdminAddCourseInstructor } from '@dataconnect/generated/react'

export default function AdminAddCourseInstructorComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminAddCourseInstructor();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminAddCourseInstructor(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminAddCourseInstructor(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminAddCourseInstructor(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminAddCourseInstructor` Mutation requires an argument of type `AdminAddCourseInstructorVariables`:
  const adminAddCourseInstructorVars: AdminAddCourseInstructorVariables = {
    courseId: ..., 
    userId: ..., 
  };
  mutation.mutate(adminAddCourseInstructorVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseId: ..., userId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminAddCourseInstructorVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseInstructor_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminRemoveCourseInstructor
You can execute the `AdminRemoveCourseInstructor` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminRemoveCourseInstructor(options?: useDataConnectMutationOptions<AdminRemoveCourseInstructorData, FirebaseError, AdminRemoveCourseInstructorVariables>): UseDataConnectMutationResult<AdminRemoveCourseInstructorData, AdminRemoveCourseInstructorVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminRemoveCourseInstructor(dc: DataConnect, options?: useDataConnectMutationOptions<AdminRemoveCourseInstructorData, FirebaseError, AdminRemoveCourseInstructorVariables>): UseDataConnectMutationResult<AdminRemoveCourseInstructorData, AdminRemoveCourseInstructorVariables>;
```

### Variables
The `AdminRemoveCourseInstructor` Mutation requires an argument of type `AdminRemoveCourseInstructorVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminRemoveCourseInstructorVariables {
  courseId: UUIDString;
  userId: string;
}
```
### Return Type
Recall that calling the `AdminRemoveCourseInstructor` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminRemoveCourseInstructor` Mutation is of type `AdminRemoveCourseInstructorData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminRemoveCourseInstructorData {
  courseInstructor_delete?: CourseInstructor_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminRemoveCourseInstructor`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminRemoveCourseInstructorVariables } from '@dataconnect/generated';
import { useAdminRemoveCourseInstructor } from '@dataconnect/generated/react'

export default function AdminRemoveCourseInstructorComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminRemoveCourseInstructor();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminRemoveCourseInstructor(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminRemoveCourseInstructor(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminRemoveCourseInstructor(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminRemoveCourseInstructor` Mutation requires an argument of type `AdminRemoveCourseInstructorVariables`:
  const adminRemoveCourseInstructorVars: AdminRemoveCourseInstructorVariables = {
    courseId: ..., 
    userId: ..., 
  };
  mutation.mutate(adminRemoveCourseInstructorVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseId: ..., userId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminRemoveCourseInstructorVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.courseInstructor_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CheckInToSession
You can execute the `CheckInToSession` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCheckInToSession(options?: useDataConnectMutationOptions<CheckInToSessionData, FirebaseError, CheckInToSessionVariables>): UseDataConnectMutationResult<CheckInToSessionData, CheckInToSessionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCheckInToSession(dc: DataConnect, options?: useDataConnectMutationOptions<CheckInToSessionData, FirebaseError, CheckInToSessionVariables>): UseDataConnectMutationResult<CheckInToSessionData, CheckInToSessionVariables>;
```

### Variables
The `CheckInToSession` Mutation requires an argument of type `CheckInToSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CheckInToSessionVariables {
  sessionId: UUIDString;
  status: AttendanceStatus;
  method: AttendanceMethod;
}
```
### Return Type
Recall that calling the `CheckInToSession` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CheckInToSession` Mutation is of type `CheckInToSessionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CheckInToSessionData {
  attendance_insert: Attendance_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CheckInToSession`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CheckInToSessionVariables } from '@dataconnect/generated';
import { useCheckInToSession } from '@dataconnect/generated/react'

export default function CheckInToSessionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCheckInToSession();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCheckInToSession(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCheckInToSession(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCheckInToSession(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCheckInToSession` Mutation requires an argument of type `CheckInToSessionVariables`:
  const checkInToSessionVars: CheckInToSessionVariables = {
    sessionId: ..., 
    status: ..., 
    method: ..., 
  };
  mutation.mutate(checkInToSessionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ sessionId: ..., status: ..., method: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(checkInToSessionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.attendance_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## SyncUser
You can execute the `SyncUser` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useSyncUser(options?: useDataConnectMutationOptions<SyncUserData, FirebaseError, SyncUserVariables>): UseDataConnectMutationResult<SyncUserData, SyncUserVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useSyncUser(dc: DataConnect, options?: useDataConnectMutationOptions<SyncUserData, FirebaseError, SyncUserVariables>): UseDataConnectMutationResult<SyncUserData, SyncUserVariables>;
```

### Variables
The `SyncUser` Mutation requires an argument of type `SyncUserVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SyncUserVariables {
  email: string;
  name: string;
  avatar?: string | null;
}
```
### Return Type
Recall that calling the `SyncUser` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `SyncUser` Mutation is of type `SyncUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SyncUserData {
  user_upsert: User_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `SyncUser`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, SyncUserVariables } from '@dataconnect/generated';
import { useSyncUser } from '@dataconnect/generated/react'

export default function SyncUserComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useSyncUser();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useSyncUser(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSyncUser(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSyncUser(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useSyncUser` Mutation requires an argument of type `SyncUserVariables`:
  const syncUserVars: SyncUserVariables = {
    email: ..., 
    name: ..., 
    avatar: ..., // optional
  };
  mutation.mutate(syncUserVars);
  // Variables can be defined inline as well.
  mutation.mutate({ email: ..., name: ..., avatar: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(syncUserVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.user_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateMyProfile
You can execute the `UpdateMyProfile` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateMyProfile(options?: useDataConnectMutationOptions<UpdateMyProfileData, FirebaseError, UpdateMyProfileVariables | void>): UseDataConnectMutationResult<UpdateMyProfileData, UpdateMyProfileVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateMyProfile(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateMyProfileData, FirebaseError, UpdateMyProfileVariables | void>): UseDataConnectMutationResult<UpdateMyProfileData, UpdateMyProfileVariables>;
```

### Variables
The `UpdateMyProfile` Mutation has an optional argument of type `UpdateMyProfileVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateMyProfileVariables {
  bio?: string | null;
  company?: string | null;
  phone?: string | null;
  preferences?: unknown | null;
}
```
### Return Type
Recall that calling the `UpdateMyProfile` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateMyProfile` Mutation is of type `UpdateMyProfileData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateMyProfileData {
  profile_upsert: Profile_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateMyProfile`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateMyProfileVariables } from '@dataconnect/generated';
import { useUpdateMyProfile } from '@dataconnect/generated/react'

export default function UpdateMyProfileComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateMyProfile();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateMyProfile(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateMyProfile(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateMyProfile(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateMyProfile` Mutation has an optional argument of type `UpdateMyProfileVariables`:
  const updateMyProfileVars: UpdateMyProfileVariables = {
    bio: ..., // optional
    company: ..., // optional
    phone: ..., // optional
    preferences: ..., // optional
  };
  mutation.mutate(updateMyProfileVars);
  // Variables can be defined inline as well.
  mutation.mutate({ bio: ..., company: ..., phone: ..., preferences: ..., });
  // Since all variables are optional for this Mutation, you can omit the `UpdateMyProfileVariables` argument.
  mutation.mutate();

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  // Since all variables are optional for this Mutation, you can provide options without providing any variables.
  // To do so, you must pass `undefined` where you would normally pass the variables.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateMyProfileVars /** or undefined */, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.profile_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminCreateCourse
You can execute the `AdminCreateCourse` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminCreateCourse(options?: useDataConnectMutationOptions<AdminCreateCourseData, FirebaseError, AdminCreateCourseVariables>): UseDataConnectMutationResult<AdminCreateCourseData, AdminCreateCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminCreateCourse(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateCourseData, FirebaseError, AdminCreateCourseVariables>): UseDataConnectMutationResult<AdminCreateCourseData, AdminCreateCourseVariables>;
```

### Variables
The `AdminCreateCourse` Mutation requires an argument of type `AdminCreateCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminCreateCourse` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminCreateCourse` Mutation is of type `AdminCreateCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminCreateCourseData {
  course_insert: Course_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminCreateCourse`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminCreateCourseVariables } from '@dataconnect/generated';
import { useAdminCreateCourse } from '@dataconnect/generated/react'

export default function AdminCreateCourseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminCreateCourse();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminCreateCourse(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateCourse(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateCourse(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminCreateCourse` Mutation requires an argument of type `AdminCreateCourseVariables`:
  const adminCreateCourseVars: AdminCreateCourseVariables = {
    title: ..., 
    description: ..., // optional
    price: ..., 
    language: ..., 
    level: ..., 
    categoryId: ..., 
    tags: ..., 
  };
  mutation.mutate(adminCreateCourseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ title: ..., description: ..., price: ..., language: ..., level: ..., categoryId: ..., tags: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminCreateCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.course_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminDeleteCourse
You can execute the `AdminDeleteCourse` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminDeleteCourse(options?: useDataConnectMutationOptions<AdminDeleteCourseData, FirebaseError, AdminDeleteCourseVariables>): UseDataConnectMutationResult<AdminDeleteCourseData, AdminDeleteCourseVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminDeleteCourse(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeleteCourseData, FirebaseError, AdminDeleteCourseVariables>): UseDataConnectMutationResult<AdminDeleteCourseData, AdminDeleteCourseVariables>;
```

### Variables
The `AdminDeleteCourse` Mutation requires an argument of type `AdminDeleteCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminDeleteCourseVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that calling the `AdminDeleteCourse` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminDeleteCourse` Mutation is of type `AdminDeleteCourseData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminDeleteCourseData {
  course_update?: Course_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminDeleteCourse`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminDeleteCourseVariables } from '@dataconnect/generated';
import { useAdminDeleteCourse } from '@dataconnect/generated/react'

export default function AdminDeleteCourseComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminDeleteCourse();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminDeleteCourse(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteCourse(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeleteCourse(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminDeleteCourse` Mutation requires an argument of type `AdminDeleteCourseVariables`:
  const adminDeleteCourseVars: AdminDeleteCourseVariables = {
    courseId: ..., 
  };
  mutation.mutate(adminDeleteCourseVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminDeleteCourseVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.course_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminCreateSession
You can execute the `AdminCreateSession` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminCreateSession(options?: useDataConnectMutationOptions<AdminCreateSessionData, FirebaseError, AdminCreateSessionVariables>): UseDataConnectMutationResult<AdminCreateSessionData, AdminCreateSessionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminCreateSession(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateSessionData, FirebaseError, AdminCreateSessionVariables>): UseDataConnectMutationResult<AdminCreateSessionData, AdminCreateSessionVariables>;
```

### Variables
The `AdminCreateSession` Mutation requires an argument of type `AdminCreateSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AdminCreateSession` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminCreateSession` Mutation is of type `AdminCreateSessionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminCreateSessionData {
  session_insert: Session_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminCreateSession`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminCreateSessionVariables } from '@dataconnect/generated';
import { useAdminCreateSession } from '@dataconnect/generated/react'

export default function AdminCreateSessionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminCreateSession();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminCreateSession(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateSession(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateSession(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminCreateSession` Mutation requires an argument of type `AdminCreateSessionVariables`:
  const adminCreateSessionVars: AdminCreateSessionVariables = {
    courseId: ..., 
    title: ..., 
    capacity: ..., // optional
    startTime: ..., 
    endTime: ..., 
    type: ..., 
    locationOrUrl: ..., 
  };
  mutation.mutate(adminCreateSessionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseId: ..., title: ..., capacity: ..., startTime: ..., endTime: ..., type: ..., locationOrUrl: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminCreateSessionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.session_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminCancelSession
You can execute the `AdminCancelSession` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminCancelSession(options?: useDataConnectMutationOptions<AdminCancelSessionData, FirebaseError, AdminCancelSessionVariables>): UseDataConnectMutationResult<AdminCancelSessionData, AdminCancelSessionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminCancelSession(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCancelSessionData, FirebaseError, AdminCancelSessionVariables>): UseDataConnectMutationResult<AdminCancelSessionData, AdminCancelSessionVariables>;
```

### Variables
The `AdminCancelSession` Mutation requires an argument of type `AdminCancelSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminCancelSessionVariables {
  sessionId: UUIDString;
}
```
### Return Type
Recall that calling the `AdminCancelSession` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminCancelSession` Mutation is of type `AdminCancelSessionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminCancelSessionData {
  session_update?: Session_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminCancelSession`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminCancelSessionVariables } from '@dataconnect/generated';
import { useAdminCancelSession } from '@dataconnect/generated/react'

export default function AdminCancelSessionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminCancelSession();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminCancelSession(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCancelSession(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCancelSession(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminCancelSession` Mutation requires an argument of type `AdminCancelSessionVariables`:
  const adminCancelSessionVars: AdminCancelSessionVariables = {
    sessionId: ..., 
  };
  mutation.mutate(adminCancelSessionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ sessionId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminCancelSessionVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.session_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminCreateSubscriptionTier
You can execute the `AdminCreateSubscriptionTier` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminCreateSubscriptionTier(options?: useDataConnectMutationOptions<AdminCreateSubscriptionTierData, FirebaseError, AdminCreateSubscriptionTierVariables>): UseDataConnectMutationResult<AdminCreateSubscriptionTierData, AdminCreateSubscriptionTierVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminCreateSubscriptionTier(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateSubscriptionTierData, FirebaseError, AdminCreateSubscriptionTierVariables>): UseDataConnectMutationResult<AdminCreateSubscriptionTierData, AdminCreateSubscriptionTierVariables>;
```

### Variables
The `AdminCreateSubscriptionTier` Mutation requires an argument of type `AdminCreateSubscriptionTierVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminCreateSubscriptionTierVariables {
  name: string;
  price: number;
  billingCycle: BillingCycle;
  features: string[];
}
```
### Return Type
Recall that calling the `AdminCreateSubscriptionTier` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminCreateSubscriptionTier` Mutation is of type `AdminCreateSubscriptionTierData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminCreateSubscriptionTierData {
  subscriptionTier_insert: SubscriptionTier_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminCreateSubscriptionTier`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminCreateSubscriptionTierVariables } from '@dataconnect/generated';
import { useAdminCreateSubscriptionTier } from '@dataconnect/generated/react'

export default function AdminCreateSubscriptionTierComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminCreateSubscriptionTier();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminCreateSubscriptionTier(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateSubscriptionTier(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateSubscriptionTier(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminCreateSubscriptionTier` Mutation requires an argument of type `AdminCreateSubscriptionTierVariables`:
  const adminCreateSubscriptionTierVars: AdminCreateSubscriptionTierVariables = {
    name: ..., 
    price: ..., 
    billingCycle: ..., 
    features: ..., 
  };
  mutation.mutate(adminCreateSubscriptionTierVars);
  // Variables can be defined inline as well.
  mutation.mutate({ name: ..., price: ..., billingCycle: ..., features: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminCreateSubscriptionTierVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.subscriptionTier_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminDeprecateSubscriptionTier
You can execute the `AdminDeprecateSubscriptionTier` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminDeprecateSubscriptionTier(options?: useDataConnectMutationOptions<AdminDeprecateSubscriptionTierData, FirebaseError, AdminDeprecateSubscriptionTierVariables>): UseDataConnectMutationResult<AdminDeprecateSubscriptionTierData, AdminDeprecateSubscriptionTierVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminDeprecateSubscriptionTier(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeprecateSubscriptionTierData, FirebaseError, AdminDeprecateSubscriptionTierVariables>): UseDataConnectMutationResult<AdminDeprecateSubscriptionTierData, AdminDeprecateSubscriptionTierVariables>;
```

### Variables
The `AdminDeprecateSubscriptionTier` Mutation requires an argument of type `AdminDeprecateSubscriptionTierVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminDeprecateSubscriptionTierVariables {
  tierId: UUIDString;
}
```
### Return Type
Recall that calling the `AdminDeprecateSubscriptionTier` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminDeprecateSubscriptionTier` Mutation is of type `AdminDeprecateSubscriptionTierData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminDeprecateSubscriptionTierData {
  subscriptionTier_update?: SubscriptionTier_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminDeprecateSubscriptionTier`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminDeprecateSubscriptionTierVariables } from '@dataconnect/generated';
import { useAdminDeprecateSubscriptionTier } from '@dataconnect/generated/react'

export default function AdminDeprecateSubscriptionTierComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminDeprecateSubscriptionTier();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminDeprecateSubscriptionTier(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeprecateSubscriptionTier(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminDeprecateSubscriptionTier(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminDeprecateSubscriptionTier` Mutation requires an argument of type `AdminDeprecateSubscriptionTierVariables`:
  const adminDeprecateSubscriptionTierVars: AdminDeprecateSubscriptionTierVariables = {
    tierId: ..., 
  };
  mutation.mutate(adminDeprecateSubscriptionTierVars);
  // Variables can be defined inline as well.
  mutation.mutate({ tierId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminDeprecateSubscriptionTierVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.subscriptionTier_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AdminCreateCategory
You can execute the `AdminCreateCategory` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminCreateCategory(options?: useDataConnectMutationOptions<AdminCreateCategoryData, FirebaseError, AdminCreateCategoryVariables>): UseDataConnectMutationResult<AdminCreateCategoryData, AdminCreateCategoryVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminCreateCategory(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateCategoryData, FirebaseError, AdminCreateCategoryVariables>): UseDataConnectMutationResult<AdminCreateCategoryData, AdminCreateCategoryVariables>;
```

### Variables
The `AdminCreateCategory` Mutation requires an argument of type `AdminCreateCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminCreateCategoryVariables {
  name: string;
  description?: string | null;
}
```
### Return Type
Recall that calling the `AdminCreateCategory` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminCreateCategory` Mutation is of type `AdminCreateCategoryData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminCreateCategoryData {
  category_insert: Category_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminCreateCategory`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminCreateCategoryVariables } from '@dataconnect/generated';
import { useAdminCreateCategory } from '@dataconnect/generated/react'

export default function AdminCreateCategoryComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminCreateCategory();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminCreateCategory(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateCategory(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateCategory(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminCreateCategory` Mutation requires an argument of type `AdminCreateCategoryVariables`:
  const adminCreateCategoryVars: AdminCreateCategoryVariables = {
    name: ..., 
    description: ..., // optional
  };
  mutation.mutate(adminCreateCategoryVars);
  // Variables can be defined inline as well.
  mutation.mutate({ name: ..., description: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminCreateCategoryVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.category_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

