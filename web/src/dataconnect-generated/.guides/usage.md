# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useEnrollInCourse, useEnrollInMission, useUpdateLectureProgress, useGetCourseSessions, useCheckInToSession, useSyncUser, useGetMe, useUpdateMyProfile, useMyCertificates, useVerifyCertificate } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useEnrollInCourse(enrollInCourseVars);

const { data, isPending, isSuccess, isError, error } = useEnrollInMission(enrollInMissionVars);

const { data, isPending, isSuccess, isError, error } = useUpdateLectureProgress(updateLectureProgressVars);

const { data, isPending, isSuccess, isError, error } = useGetCourseSessions(getCourseSessionsVars);

const { data, isPending, isSuccess, isError, error } = useCheckInToSession(checkInToSessionVars);

const { data, isPending, isSuccess, isError, error } = useSyncUser(syncUserVars);

const { data, isPending, isSuccess, isError, error } = useGetMe();

const { data, isPending, isSuccess, isError, error } = useUpdateMyProfile(updateMyProfileVars);

const { data, isPending, isSuccess, isError, error } = useMyCertificates();

const { data, isPending, isSuccess, isError, error } = useVerifyCertificate(verifyCertificateVars);

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
import { enrollInCourse, enrollInMission, updateLectureProgress, getCourseSessions, checkInToSession, syncUser, getMe, updateMyProfile, myCertificates, verifyCertificate } from '@dataconnect/generated';


// Operation EnrollInCourse:  For variables, look at type EnrollInCourseVars in ../index.d.ts
const { data } = await EnrollInCourse(dataConnect, enrollInCourseVars);

// Operation EnrollInMission:  For variables, look at type EnrollInMissionVars in ../index.d.ts
const { data } = await EnrollInMission(dataConnect, enrollInMissionVars);

// Operation UpdateLectureProgress:  For variables, look at type UpdateLectureProgressVars in ../index.d.ts
const { data } = await UpdateLectureProgress(dataConnect, updateLectureProgressVars);

// Operation GetCourseSessions:  For variables, look at type GetCourseSessionsVars in ../index.d.ts
const { data } = await GetCourseSessions(dataConnect, getCourseSessionsVars);

// Operation CheckInToSession:  For variables, look at type CheckInToSessionVars in ../index.d.ts
const { data } = await CheckInToSession(dataConnect, checkInToSessionVars);

// Operation SyncUser:  For variables, look at type SyncUserVars in ../index.d.ts
const { data } = await SyncUser(dataConnect, syncUserVars);

// Operation GetMe: 
const { data } = await GetMe(dataConnect);

// Operation UpdateMyProfile:  For variables, look at type UpdateMyProfileVars in ../index.d.ts
const { data } = await UpdateMyProfile(dataConnect, updateMyProfileVars);

// Operation MyCertificates: 
const { data } = await MyCertificates(dataConnect);

// Operation VerifyCertificate:  For variables, look at type VerifyCertificateVars in ../index.d.ts
const { data } = await VerifyCertificate(dataConnect, verifyCertificateVars);


```