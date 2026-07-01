# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useGetPendingSubmissions, useAdminAddCourseInstructor, useAdminRemoveCourseInstructor, useGetCourseInstructors, useGetQuizQuestions, useStartQuizAttempt, useSubmitQuizAnswer, useFinishQuizAttemptIfOpen, useGetExpiredAttempts, useGetUserQuizAttempts } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useGetPendingSubmissions();

const { data, isPending, isSuccess, isError, error } = useAdminAddCourseInstructor(adminAddCourseInstructorVars);

const { data, isPending, isSuccess, isError, error } = useAdminRemoveCourseInstructor(adminRemoveCourseInstructorVars);

const { data, isPending, isSuccess, isError, error } = useGetCourseInstructors(getCourseInstructorsVars);

const { data, isPending, isSuccess, isError, error } = useGetQuizQuestions(getQuizQuestionsVars);

const { data, isPending, isSuccess, isError, error } = useStartQuizAttempt(startQuizAttemptVars);

const { data, isPending, isSuccess, isError, error } = useSubmitQuizAnswer(submitQuizAnswerVars);

const { data, isPending, isSuccess, isError, error } = useFinishQuizAttemptIfOpen(finishQuizAttemptIfOpenVars);

const { data, isPending, isSuccess, isError, error } = useGetExpiredAttempts();

const { data, isPending, isSuccess, isError, error } = useGetUserQuizAttempts(getUserQuizAttemptsVars);

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
import { getPendingSubmissions, adminAddCourseInstructor, adminRemoveCourseInstructor, getCourseInstructors, getQuizQuestions, startQuizAttempt, submitQuizAnswer, finishQuizAttemptIfOpen, getExpiredAttempts, getUserQuizAttempts } from '@dataconnect/generated';


// Operation GetPendingSubmissions: 
const { data } = await GetPendingSubmissions(dataConnect);

// Operation AdminAddCourseInstructor:  For variables, look at type AdminAddCourseInstructorVars in ../index.d.ts
const { data } = await AdminAddCourseInstructor(dataConnect, adminAddCourseInstructorVars);

// Operation AdminRemoveCourseInstructor:  For variables, look at type AdminRemoveCourseInstructorVars in ../index.d.ts
const { data } = await AdminRemoveCourseInstructor(dataConnect, adminRemoveCourseInstructorVars);

// Operation GetCourseInstructors:  For variables, look at type GetCourseInstructorsVars in ../index.d.ts
const { data } = await GetCourseInstructors(dataConnect, getCourseInstructorsVars);

// Operation GetQuizQuestions:  For variables, look at type GetQuizQuestionsVars in ../index.d.ts
const { data } = await GetQuizQuestions(dataConnect, getQuizQuestionsVars);

// Operation StartQuizAttempt:  For variables, look at type StartQuizAttemptVars in ../index.d.ts
const { data } = await StartQuizAttempt(dataConnect, startQuizAttemptVars);

// Operation SubmitQuizAnswer:  For variables, look at type SubmitQuizAnswerVars in ../index.d.ts
const { data } = await SubmitQuizAnswer(dataConnect, submitQuizAnswerVars);

// Operation FinishQuizAttemptIfOpen:  For variables, look at type FinishQuizAttemptIfOpenVars in ../index.d.ts
const { data } = await FinishQuizAttemptIfOpen(dataConnect, finishQuizAttemptIfOpenVars);

// Operation GetExpiredAttempts: 
const { data } = await GetExpiredAttempts(dataConnect);

// Operation GetUserQuizAttempts:  For variables, look at type GetUserQuizAttemptsVars in ../index.d.ts
const { data } = await GetUserQuizAttempts(dataConnect, getUserQuizAttemptsVars);


```