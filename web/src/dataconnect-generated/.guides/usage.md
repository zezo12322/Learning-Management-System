# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useGetCourseSessions, useCheckInToSession, useSyncUser, useGetMe, useUpdateMyProfile, useAdminCreateCourse, useInstructorDeleteCourse, useSuperAdminDeleteCourse, useAdminCreateSession, useInstructorCancelSession } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useGetCourseSessions(getCourseSessionsVars);

const { data, isPending, isSuccess, isError, error } = useCheckInToSession(checkInToSessionVars);

const { data, isPending, isSuccess, isError, error } = useSyncUser(syncUserVars);

const { data, isPending, isSuccess, isError, error } = useGetMe();

const { data, isPending, isSuccess, isError, error } = useUpdateMyProfile(updateMyProfileVars);

const { data, isPending, isSuccess, isError, error } = useAdminCreateCourse(adminCreateCourseVars);

const { data, isPending, isSuccess, isError, error } = useInstructorDeleteCourse(instructorDeleteCourseVars);

const { data, isPending, isSuccess, isError, error } = useSuperAdminDeleteCourse(superAdminDeleteCourseVars);

const { data, isPending, isSuccess, isError, error } = useAdminCreateSession(adminCreateSessionVars);

const { data, isPending, isSuccess, isError, error } = useInstructorCancelSession(instructorCancelSessionVars);

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
import { getCourseSessions, checkInToSession, syncUser, getMe, updateMyProfile, adminCreateCourse, instructorDeleteCourse, superAdminDeleteCourse, adminCreateSession, instructorCancelSession } from '@dataconnect/generated';


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

// Operation AdminCreateCourse:  For variables, look at type AdminCreateCourseVars in ../index.d.ts
const { data } = await AdminCreateCourse(dataConnect, adminCreateCourseVars);

// Operation InstructorDeleteCourse:  For variables, look at type InstructorDeleteCourseVars in ../index.d.ts
const { data } = await InstructorDeleteCourse(dataConnect, instructorDeleteCourseVars);

// Operation SuperAdminDeleteCourse:  For variables, look at type SuperAdminDeleteCourseVars in ../index.d.ts
const { data } = await SuperAdminDeleteCourse(dataConnect, superAdminDeleteCourseVars);

// Operation AdminCreateSession:  For variables, look at type AdminCreateSessionVars in ../index.d.ts
const { data } = await AdminCreateSession(dataConnect, adminCreateSessionVars);

// Operation InstructorCancelSession:  For variables, look at type InstructorCancelSessionVars in ../index.d.ts
const { data } = await InstructorCancelSession(dataConnect, instructorCancelSessionVars);


```