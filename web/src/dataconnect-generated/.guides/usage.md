# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useMyCertificates, useVerifyCertificate, useGetPendingSubmissions, useEnrollInCourse, useEnrollInMission, useUpdateLectureProgress, useGetQuizQuestions, useStartQuizAttempt, useSubmitQuizAnswer, useFinishQuizAttempt } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useMyCertificates();

const { data, isPending, isSuccess, isError, error } = useVerifyCertificate(verifyCertificateVars);

const { data, isPending, isSuccess, isError, error } = useGetPendingSubmissions();

const { data, isPending, isSuccess, isError, error } = useEnrollInCourse(enrollInCourseVars);

const { data, isPending, isSuccess, isError, error } = useEnrollInMission(enrollInMissionVars);

const { data, isPending, isSuccess, isError, error } = useUpdateLectureProgress(updateLectureProgressVars);

const { data, isPending, isSuccess, isError, error } = useGetQuizQuestions(getQuizQuestionsVars);

const { data, isPending, isSuccess, isError, error } = useStartQuizAttempt(startQuizAttemptVars);

const { data, isPending, isSuccess, isError, error } = useSubmitQuizAnswer(submitQuizAnswerVars);

const { data, isPending, isSuccess, isError, error } = useFinishQuizAttempt(finishQuizAttemptVars);

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
import { myCertificates, verifyCertificate, getPendingSubmissions, enrollInCourse, enrollInMission, updateLectureProgress, getQuizQuestions, startQuizAttempt, submitQuizAnswer, finishQuizAttempt } from '@dataconnect/generated';


// Operation MyCertificates: 
const { data } = await MyCertificates(dataConnect);

// Operation VerifyCertificate:  For variables, look at type VerifyCertificateVars in ../index.d.ts
const { data } = await VerifyCertificate(dataConnect, verifyCertificateVars);

// Operation GetPendingSubmissions: 
const { data } = await GetPendingSubmissions(dataConnect);

// Operation EnrollInCourse:  For variables, look at type EnrollInCourseVars in ../index.d.ts
const { data } = await EnrollInCourse(dataConnect, enrollInCourseVars);

// Operation EnrollInMission:  For variables, look at type EnrollInMissionVars in ../index.d.ts
const { data } = await EnrollInMission(dataConnect, enrollInMissionVars);

// Operation UpdateLectureProgress:  For variables, look at type UpdateLectureProgressVars in ../index.d.ts
const { data } = await UpdateLectureProgress(dataConnect, updateLectureProgressVars);

// Operation GetQuizQuestions:  For variables, look at type GetQuizQuestionsVars in ../index.d.ts
const { data } = await GetQuizQuestions(dataConnect, getQuizQuestionsVars);

// Operation StartQuizAttempt:  For variables, look at type StartQuizAttemptVars in ../index.d.ts
const { data } = await StartQuizAttempt(dataConnect, startQuizAttemptVars);

// Operation SubmitQuizAnswer:  For variables, look at type SubmitQuizAnswerVars in ../index.d.ts
const { data } = await SubmitQuizAnswer(dataConnect, submitQuizAnswerVars);

// Operation FinishQuizAttempt:  For variables, look at type FinishQuizAttemptVars in ../index.d.ts
const { data } = await FinishQuizAttempt(dataConnect, finishQuizAttemptVars);


```