# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useLogPayment, useAddPaymentItem, useMyPaymentHistory, useGetPendingSubmissions, useGetQuizQuestions, useStartQuizAttempt, useSubmitQuizAnswer, useFinishQuizAttempt, useGetCourseSessions, useCheckInToSession } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useLogPayment(logPaymentVars);

const { data, isPending, isSuccess, isError, error } = useAddPaymentItem(addPaymentItemVars);

const { data, isPending, isSuccess, isError, error } = useMyPaymentHistory();

const { data, isPending, isSuccess, isError, error } = useGetPendingSubmissions();

const { data, isPending, isSuccess, isError, error } = useGetQuizQuestions(getQuizQuestionsVars);

const { data, isPending, isSuccess, isError, error } = useStartQuizAttempt(startQuizAttemptVars);

const { data, isPending, isSuccess, isError, error } = useSubmitQuizAnswer(submitQuizAnswerVars);

const { data, isPending, isSuccess, isError, error } = useFinishQuizAttempt(finishQuizAttemptVars);

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
import { logPayment, addPaymentItem, myPaymentHistory, getPendingSubmissions, getQuizQuestions, startQuizAttempt, submitQuizAnswer, finishQuizAttempt, getCourseSessions, checkInToSession } from '@dataconnect/generated';


// Operation LogPayment:  For variables, look at type LogPaymentVars in ../index.d.ts
const { data } = await LogPayment(dataConnect, logPaymentVars);

// Operation AddPaymentItem:  For variables, look at type AddPaymentItemVars in ../index.d.ts
const { data } = await AddPaymentItem(dataConnect, addPaymentItemVars);

// Operation MyPaymentHistory: 
const { data } = await MyPaymentHistory(dataConnect);

// Operation GetPendingSubmissions: 
const { data } = await GetPendingSubmissions(dataConnect);

// Operation GetQuizQuestions:  For variables, look at type GetQuizQuestionsVars in ../index.d.ts
const { data } = await GetQuizQuestions(dataConnect, getQuizQuestionsVars);

// Operation StartQuizAttempt:  For variables, look at type StartQuizAttemptVars in ../index.d.ts
const { data } = await StartQuizAttempt(dataConnect, startQuizAttemptVars);

// Operation SubmitQuizAnswer:  For variables, look at type SubmitQuizAnswerVars in ../index.d.ts
const { data } = await SubmitQuizAnswer(dataConnect, submitQuizAnswerVars);

// Operation FinishQuizAttempt:  For variables, look at type FinishQuizAttemptVars in ../index.d.ts
const { data } = await FinishQuizAttempt(dataConnect, finishQuizAttemptVars);

// Operation GetCourseSessions:  For variables, look at type GetCourseSessionsVars in ../index.d.ts
const { data } = await GetCourseSessions(dataConnect, getCourseSessionsVars);

// Operation CheckInToSession:  For variables, look at type CheckInToSessionVars in ../index.d.ts
const { data } = await CheckInToSession(dataConnect, checkInToSessionVars);


```