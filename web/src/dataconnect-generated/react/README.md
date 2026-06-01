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
  - [*InstructorCourses*](#instructorcourses)
  - [*ListSubscriptionTiers*](#listsubscriptiontiers)
  - [*ListCategories*](#listcategories)
  - [*GetPendingSubmissions*](#getpendingsubmissions)
  - [*MySubmissions*](#mysubmissions)
  - [*GetCourseSessions*](#getcoursesessions)
  - [*GetMe*](#getme)
  - [*MyCertificates*](#mycertificates)
  - [*VerifyCertificate*](#verifycertificate)
  - [*ListPublishedCourses*](#listpublishedcourses)
  - [*GetCourseCurriculum*](#getcoursecurriculum)
  - [*MyPaymentHistory*](#mypaymenthistory)
  - [*GetQuizQuestions*](#getquizquestions)
- [**Mutations**](#mutations)
  - [*AdminCreateCourse*](#admincreatecourse)
  - [*AdminDeleteCourse*](#admindeletecourse)
  - [*AdminCreateCourseSection*](#admincreatecoursesection)
  - [*AdminCreateLecture*](#admincreatelecture)
  - [*AdminCreateSession*](#admincreatesession)
  - [*AdminCancelSession*](#admincancelsession)
  - [*AdminCreateSubscriptionTier*](#admincreatesubscriptiontier)
  - [*AdminDeprecateSubscriptionTier*](#admindeprecatesubscriptiontier)
  - [*AdminCreateCategory*](#admincreatecategory)
  - [*AdminCreateQuiz*](#admincreatequiz)
  - [*AdminCreateQuizQuestion*](#admincreatequizquestion)
  - [*AdminCreateQuizOption*](#admincreatequizoption)
  - [*AdminCreateMission*](#admincreatemission)
  - [*AdminCreateRubricCriterion*](#admincreaterubriccriterion)
  - [*AdminIssueCertificate*](#adminissuecertificate)
  - [*SubmitMission*](#submitmission)
  - [*GradeSubmission*](#gradesubmission)
  - [*AddCriterionScore*](#addcriterionscore)
  - [*CheckInToSession*](#checkintosession)
  - [*SyncUser*](#syncuser)
  - [*UpdateMyProfile*](#updatemyprofile)
  - [*LogPayment*](#logpayment)
  - [*AddPaymentItem*](#addpaymentitem)
  - [*EnrollInCourse*](#enrollincourse)
  - [*EnrollInMission*](#enrollinmission)
  - [*UpdateLectureProgress*](#updatelectureprogress)
  - [*StartQuizAttempt*](#startquizattempt)
  - [*SubmitQuizAnswer*](#submitquizanswer)
  - [*FinishQuizAttempt*](#finishquizattempt)

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

## InstructorCourses
You can execute the `InstructorCourses` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useInstructorCourses(dc: DataConnect, options?: useDataConnectQueryOptions<InstructorCoursesData>): UseDataConnectQueryResult<InstructorCoursesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useInstructorCourses(options?: useDataConnectQueryOptions<InstructorCoursesData>): UseDataConnectQueryResult<InstructorCoursesData, undefined>;
```

### Variables
The `InstructorCourses` Query has no variables.
### Return Type
Recall that calling the `InstructorCourses` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `InstructorCourses` Query is of type `InstructorCoursesData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface InstructorCoursesData {
  courses: ({
    id: UUIDString;
    title: string;
    status: CourseStatus;
    createdAt: TimestampString;
    price: number;
    language: string;
    level: CourseLevel;
  } & Course_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `InstructorCourses`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useInstructorCourses } from '@dataconnect/generated/react'

export default function InstructorCoursesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useInstructorCourses();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useInstructorCourses(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useInstructorCourses(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useInstructorCourses(dataConnect, options);

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

## ListSubscriptionTiers
You can execute the `ListSubscriptionTiers` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListSubscriptionTiers(dc: DataConnect, options?: useDataConnectQueryOptions<ListSubscriptionTiersData>): UseDataConnectQueryResult<ListSubscriptionTiersData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListSubscriptionTiers(options?: useDataConnectQueryOptions<ListSubscriptionTiersData>): UseDataConnectQueryResult<ListSubscriptionTiersData, undefined>;
```

### Variables
The `ListSubscriptionTiers` Query has no variables.
### Return Type
Recall that calling the `ListSubscriptionTiers` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListSubscriptionTiers` Query is of type `ListSubscriptionTiersData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListSubscriptionTiersData {
  subscriptionTiers: ({
    id: UUIDString;
    name: string;
    price: number;
    billingCycle: BillingCycle;
    features: string[];
  } & SubscriptionTier_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListSubscriptionTiers`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListSubscriptionTiers } from '@dataconnect/generated/react'

export default function ListSubscriptionTiersComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListSubscriptionTiers();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListSubscriptionTiers(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListSubscriptionTiers(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListSubscriptionTiers(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.subscriptionTiers);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListCategories
You can execute the `ListCategories` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListCategories(dc: DataConnect, options?: useDataConnectQueryOptions<ListCategoriesData>): UseDataConnectQueryResult<ListCategoriesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListCategories(options?: useDataConnectQueryOptions<ListCategoriesData>): UseDataConnectQueryResult<ListCategoriesData, undefined>;
```

### Variables
The `ListCategories` Query has no variables.
### Return Type
Recall that calling the `ListCategories` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListCategories` Query is of type `ListCategoriesData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListCategoriesData {
  categories: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & Category_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListCategories`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListCategories } from '@dataconnect/generated/react'

export default function ListCategoriesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListCategories();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListCategories(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListCategories(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListCategories(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.categories);
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
      courseInstructors_on_course: ({
        user: {
          name: string;
          avatar?: string | null;
        };
      })[];
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
    courseSections_on_course: ({
      id: UUIDString;
      title: string;
      courseLectures_on_section: ({
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
    quizQuestions_on_quiz: ({
      id: UUIDString;
      questionText: string;
      points: number;
      quizOptions_on_question: ({
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

## AdminCreateCourseSection
You can execute the `AdminCreateCourseSection` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminCreateCourseSection(options?: useDataConnectMutationOptions<AdminCreateCourseSectionData, FirebaseError, AdminCreateCourseSectionVariables>): UseDataConnectMutationResult<AdminCreateCourseSectionData, AdminCreateCourseSectionVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminCreateCourseSection(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateCourseSectionData, FirebaseError, AdminCreateCourseSectionVariables>): UseDataConnectMutationResult<AdminCreateCourseSectionData, AdminCreateCourseSectionVariables>;
```

### Variables
The `AdminCreateCourseSection` Mutation requires an argument of type `AdminCreateCourseSectionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminCreateCourseSectionVariables {
  courseId: UUIDString;
  title: string;
  order: number;
}
```
### Return Type
Recall that calling the `AdminCreateCourseSection` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminCreateCourseSection` Mutation is of type `AdminCreateCourseSectionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminCreateCourseSectionData {
  courseSection_insert: CourseSection_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminCreateCourseSection`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminCreateCourseSectionVariables } from '@dataconnect/generated';
import { useAdminCreateCourseSection } from '@dataconnect/generated/react'

export default function AdminCreateCourseSectionComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminCreateCourseSection();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminCreateCourseSection(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateCourseSection(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateCourseSection(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminCreateCourseSection` Mutation requires an argument of type `AdminCreateCourseSectionVariables`:
  const adminCreateCourseSectionVars: AdminCreateCourseSectionVariables = {
    courseId: ..., 
    title: ..., 
    order: ..., 
  };
  mutation.mutate(adminCreateCourseSectionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseId: ..., title: ..., order: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminCreateCourseSectionVars, options);

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

## AdminCreateLecture
You can execute the `AdminCreateLecture` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminCreateLecture(options?: useDataConnectMutationOptions<AdminCreateLectureData, FirebaseError, AdminCreateLectureVariables>): UseDataConnectMutationResult<AdminCreateLectureData, AdminCreateLectureVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminCreateLecture(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateLectureData, FirebaseError, AdminCreateLectureVariables>): UseDataConnectMutationResult<AdminCreateLectureData, AdminCreateLectureVariables>;
```

### Variables
The `AdminCreateLecture` Mutation requires an argument of type `AdminCreateLectureVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminCreateLectureVariables {
  sectionId: UUIDString;
  title: string;
  type: LectureType;
  videoUrl?: string | null;
  content?: string | null;
  order: number;
}
```
### Return Type
Recall that calling the `AdminCreateLecture` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminCreateLecture` Mutation is of type `AdminCreateLectureData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminCreateLectureData {
  courseLecture_insert: CourseLecture_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminCreateLecture`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminCreateLectureVariables } from '@dataconnect/generated';
import { useAdminCreateLecture } from '@dataconnect/generated/react'

export default function AdminCreateLectureComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminCreateLecture();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminCreateLecture(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateLecture(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminCreateLecture(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminCreateLecture` Mutation requires an argument of type `AdminCreateLectureVariables`:
  const adminCreateLectureVars: AdminCreateLectureVariables = {
    sectionId: ..., 
    title: ..., 
    type: ..., 
    videoUrl: ..., // optional
    content: ..., // optional
    order: ..., 
  };
  mutation.mutate(adminCreateLectureVars);
  // Variables can be defined inline as well.
  mutation.mutate({ sectionId: ..., title: ..., type: ..., videoUrl: ..., content: ..., order: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminCreateLectureVars, options);

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
  };
  mutation.mutate(adminCreateQuizVars);
  // Variables can be defined inline as well.
  mutation.mutate({ lectureId: ..., passingScore: ..., maxAttempts: ..., });

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
  points?: number | null;
  correctOptionId: UUIDString;
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
    points: ..., // optional
    correctOptionId: ..., 
  };
  mutation.mutate(adminCreateQuizQuestionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ quizId: ..., questionText: ..., order: ..., points: ..., correctOptionId: ..., });

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
  };
  mutation.mutate(adminCreateQuizOptionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ questionId: ..., text: ..., order: ..., });

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
  courseId?: UUIDString | null;
  title: string;
  scenarioDescription: string;
  durationMinutes: number;
  categoryId: UUIDString;
  difficulty: MissionDifficulty;
  skillsTested: string[];
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
    courseId: ..., // optional
    title: ..., 
    scenarioDescription: ..., 
    durationMinutes: ..., 
    categoryId: ..., 
    difficulty: ..., 
    skillsTested: ..., 
  };
  mutation.mutate(adminCreateMissionVars);
  // Variables can be defined inline as well.
  mutation.mutate({ courseId: ..., title: ..., scenarioDescription: ..., durationMinutes: ..., categoryId: ..., difficulty: ..., skillsTested: ..., });

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

## AdminIssueCertificate
You can execute the `AdminIssueCertificate` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAdminIssueCertificate(options?: useDataConnectMutationOptions<AdminIssueCertificateData, FirebaseError, AdminIssueCertificateVariables>): UseDataConnectMutationResult<AdminIssueCertificateData, AdminIssueCertificateVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAdminIssueCertificate(dc: DataConnect, options?: useDataConnectMutationOptions<AdminIssueCertificateData, FirebaseError, AdminIssueCertificateVariables>): UseDataConnectMutationResult<AdminIssueCertificateData, AdminIssueCertificateVariables>;
```

### Variables
The `AdminIssueCertificate` Mutation requires an argument of type `AdminIssueCertificateVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AdminIssueCertificateVariables {
  userId: string;
  targetType: CertificateTarget;
  courseId?: UUIDString | null;
  missionId?: UUIDString | null;
  expiresAt?: TimestampString | null;
  verificationHash: string;
  assetUrl: string;
}
```
### Return Type
Recall that calling the `AdminIssueCertificate` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AdminIssueCertificate` Mutation is of type `AdminIssueCertificateData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AdminIssueCertificateData {
  certificate_insert: Certificate_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AdminIssueCertificate`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AdminIssueCertificateVariables } from '@dataconnect/generated';
import { useAdminIssueCertificate } from '@dataconnect/generated/react'

export default function AdminIssueCertificateComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAdminIssueCertificate();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAdminIssueCertificate(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminIssueCertificate(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAdminIssueCertificate(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAdminIssueCertificate` Mutation requires an argument of type `AdminIssueCertificateVariables`:
  const adminIssueCertificateVars: AdminIssueCertificateVariables = {
    userId: ..., 
    targetType: ..., 
    courseId: ..., // optional
    missionId: ..., // optional
    expiresAt: ..., // optional
    verificationHash: ..., 
    assetUrl: ..., 
  };
  mutation.mutate(adminIssueCertificateVars);
  // Variables can be defined inline as well.
  mutation.mutate({ userId: ..., targetType: ..., courseId: ..., missionId: ..., expiresAt: ..., verificationHash: ..., assetUrl: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(adminIssueCertificateVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.certificate_insert);
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

## FinishQuizAttempt
You can execute the `FinishQuizAttempt` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useFinishQuizAttempt(options?: useDataConnectMutationOptions<FinishQuizAttemptData, FirebaseError, FinishQuizAttemptVariables>): UseDataConnectMutationResult<FinishQuizAttemptData, FinishQuizAttemptVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useFinishQuizAttempt(dc: DataConnect, options?: useDataConnectMutationOptions<FinishQuizAttemptData, FirebaseError, FinishQuizAttemptVariables>): UseDataConnectMutationResult<FinishQuizAttemptData, FinishQuizAttemptVariables>;
```

### Variables
The `FinishQuizAttempt` Mutation requires an argument of type `FinishQuizAttemptVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface FinishQuizAttemptVariables {
  attemptId: UUIDString;
  score: number;
  passed: boolean;
}
```
### Return Type
Recall that calling the `FinishQuizAttempt` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `FinishQuizAttempt` Mutation is of type `FinishQuizAttemptData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface FinishQuizAttemptData {
  quizAttempt_update?: QuizAttempt_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `FinishQuizAttempt`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, FinishQuizAttemptVariables } from '@dataconnect/generated';
import { useFinishQuizAttempt } from '@dataconnect/generated/react'

export default function FinishQuizAttemptComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useFinishQuizAttempt();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useFinishQuizAttempt(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useFinishQuizAttempt(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useFinishQuizAttempt(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useFinishQuizAttempt` Mutation requires an argument of type `FinishQuizAttemptVariables`:
  const finishQuizAttemptVars: FinishQuizAttemptVariables = {
    attemptId: ..., 
    score: ..., 
    passed: ..., 
  };
  mutation.mutate(finishQuizAttemptVars);
  // Variables can be defined inline as well.
  mutation.mutate({ attemptId: ..., score: ..., passed: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(finishQuizAttemptVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.quizAttempt_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

