# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useGetMyCourseAccess, useGetMyMissionAccess, useGetQuestionCourse, useGetOptionCourse, useGetSectionCourse, useGetMicroLessonMission, useGetCriterionMission, useGetTemplateMission, useGetCourseSessions, useCheckInToSession } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useGetMyCourseAccess(getMyCourseAccessVars);

const { data, isPending, isSuccess, isError, error } = useGetMyMissionAccess(getMyMissionAccessVars);

const { data, isPending, isSuccess, isError, error } = useGetQuestionCourse(getQuestionCourseVars);

const { data, isPending, isSuccess, isError, error } = useGetOptionCourse(getOptionCourseVars);

const { data, isPending, isSuccess, isError, error } = useGetSectionCourse(getSectionCourseVars);

const { data, isPending, isSuccess, isError, error } = useGetMicroLessonMission(getMicroLessonMissionVars);

const { data, isPending, isSuccess, isError, error } = useGetCriterionMission(getCriterionMissionVars);

const { data, isPending, isSuccess, isError, error } = useGetTemplateMission(getTemplateMissionVars);

const { data, isPending, isSuccess, isError, error } = useGetCourseSessions(getCourseSessionsVars);

const { data, isPending, isSuccess, isError, error } = useCheckInToSession(checkInToSessionVars);

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
import { getMyCourseAccess, getMyMissionAccess, getQuestionCourse, getOptionCourse, getSectionCourse, getMicroLessonMission, getCriterionMission, getTemplateMission, getCourseSessions, checkInToSession } from '@dataconnect/generated';


// Operation GetMyCourseAccess:  For variables, look at type GetMyCourseAccessVars in ../index.d.ts
const { data } = await GetMyCourseAccess(dataConnect, getMyCourseAccessVars);

// Operation GetMyMissionAccess:  For variables, look at type GetMyMissionAccessVars in ../index.d.ts
const { data } = await GetMyMissionAccess(dataConnect, getMyMissionAccessVars);

// Operation GetQuestionCourse:  For variables, look at type GetQuestionCourseVars in ../index.d.ts
const { data } = await GetQuestionCourse(dataConnect, getQuestionCourseVars);

// Operation GetOptionCourse:  For variables, look at type GetOptionCourseVars in ../index.d.ts
const { data } = await GetOptionCourse(dataConnect, getOptionCourseVars);

// Operation GetSectionCourse:  For variables, look at type GetSectionCourseVars in ../index.d.ts
const { data } = await GetSectionCourse(dataConnect, getSectionCourseVars);

// Operation GetMicroLessonMission:  For variables, look at type GetMicroLessonMissionVars in ../index.d.ts
const { data } = await GetMicroLessonMission(dataConnect, getMicroLessonMissionVars);

// Operation GetCriterionMission:  For variables, look at type GetCriterionMissionVars in ../index.d.ts
const { data } = await GetCriterionMission(dataConnect, getCriterionMissionVars);

// Operation GetTemplateMission:  For variables, look at type GetTemplateMissionVars in ../index.d.ts
const { data } = await GetTemplateMission(dataConnect, getTemplateMissionVars);

// Operation GetCourseSessions:  For variables, look at type GetCourseSessionsVars in ../index.d.ts
const { data } = await GetCourseSessions(dataConnect, getCourseSessionsVars);

// Operation CheckInToSession:  For variables, look at type CheckInToSessionVars in ../index.d.ts
const { data } = await CheckInToSession(dataConnect, checkInToSessionVars);


```