# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useEnrollInCourse, useEnrollInMission, useUpdateLectureProgress, useAdminUpsertLectureProgress, useGetLectureDuration, useGetCourseCompletionStatus, useGetCourseCompletionStatusForUser, useGetUserEnrollmentForCourseByUser, useUpdateEnrollmentStatus, useGetUserEnrollmentForCourse } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useEnrollInCourse(enrollInCourseVars);

const { data, isPending, isSuccess, isError, error } = useEnrollInMission(enrollInMissionVars);

const { data, isPending, isSuccess, isError, error } = useUpdateLectureProgress(updateLectureProgressVars);

const { data, isPending, isSuccess, isError, error } = useAdminUpsertLectureProgress(adminUpsertLectureProgressVars);

const { data, isPending, isSuccess, isError, error } = useGetLectureDuration(getLectureDurationVars);

const { data, isPending, isSuccess, isError, error } = useGetCourseCompletionStatus(getCourseCompletionStatusVars);

const { data, isPending, isSuccess, isError, error } = useGetCourseCompletionStatusForUser(getCourseCompletionStatusForUserVars);

const { data, isPending, isSuccess, isError, error } = useGetUserEnrollmentForCourseByUser(getUserEnrollmentForCourseByUserVars);

const { data, isPending, isSuccess, isError, error } = useUpdateEnrollmentStatus(updateEnrollmentStatusVars);

const { data, isPending, isSuccess, isError, error } = useGetUserEnrollmentForCourse(getUserEnrollmentForCourseVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { enrollInCourse, enrollInMission, updateLectureProgress, adminUpsertLectureProgress, getLectureDuration, getCourseCompletionStatus, getCourseCompletionStatusForUser, getUserEnrollmentForCourseByUser, updateEnrollmentStatus, getUserEnrollmentForCourse } from '@dataconnect/generated';


// Operation EnrollInCourse:  For variables, look at type EnrollInCourseVars in ../index.d.ts
const { data } = await EnrollInCourse(dataConnect, enrollInCourseVars);

// Operation EnrollInMission:  For variables, look at type EnrollInMissionVars in ../index.d.ts
const { data } = await EnrollInMission(dataConnect, enrollInMissionVars);

// Operation UpdateLectureProgress:  For variables, look at type UpdateLectureProgressVars in ../index.d.ts
const { data } = await UpdateLectureProgress(dataConnect, updateLectureProgressVars);

// Operation AdminUpsertLectureProgress:  For variables, look at type AdminUpsertLectureProgressVars in ../index.d.ts
const { data } = await AdminUpsertLectureProgress(dataConnect, adminUpsertLectureProgressVars);

// Operation GetLectureDuration:  For variables, look at type GetLectureDurationVars in ../index.d.ts
const { data } = await GetLectureDuration(dataConnect, getLectureDurationVars);

// Operation GetCourseCompletionStatus:  For variables, look at type GetCourseCompletionStatusVars in ../index.d.ts
const { data } = await GetCourseCompletionStatus(dataConnect, getCourseCompletionStatusVars);

// Operation GetCourseCompletionStatusForUser:  For variables, look at type GetCourseCompletionStatusForUserVars in ../index.d.ts
const { data } = await GetCourseCompletionStatusForUser(dataConnect, getCourseCompletionStatusForUserVars);

// Operation GetUserEnrollmentForCourseByUser:  For variables, look at type GetUserEnrollmentForCourseByUserVars in ../index.d.ts
const { data } = await GetUserEnrollmentForCourseByUser(dataConnect, getUserEnrollmentForCourseByUserVars);

// Operation UpdateEnrollmentStatus:  For variables, look at type UpdateEnrollmentStatusVars in ../index.d.ts
const { data } = await UpdateEnrollmentStatus(dataConnect, updateEnrollmentStatusVars);

// Operation GetUserEnrollmentForCourse:  For variables, look at type GetUserEnrollmentForCourseVars in ../index.d.ts
const { data } = await GetUserEnrollmentForCourse(dataConnect, getUserEnrollmentForCourseVars);


```