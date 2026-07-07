# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useMyCertificates, useVerifyCertificate, useLogPayment, useAddPaymentItem, useMyPaymentHistory, useGetPendingSubmissions, useGetMyPendingSubmissions, useAdminAddCourseInstructor, useAdminRemoveCourseInstructor, useGetCourseInstructors } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useMyCertificates();

const { data, isPending, isSuccess, isError, error } = useVerifyCertificate(verifyCertificateVars);

const { data, isPending, isSuccess, isError, error } = useLogPayment(logPaymentVars);

const { data, isPending, isSuccess, isError, error } = useAddPaymentItem(addPaymentItemVars);

const { data, isPending, isSuccess, isError, error } = useMyPaymentHistory();

const { data, isPending, isSuccess, isError, error } = useGetPendingSubmissions();

const { data, isPending, isSuccess, isError, error } = useGetMyPendingSubmissions();

const { data, isPending, isSuccess, isError, error } = useAdminAddCourseInstructor(adminAddCourseInstructorVars);

const { data, isPending, isSuccess, isError, error } = useAdminRemoveCourseInstructor(adminRemoveCourseInstructorVars);

const { data, isPending, isSuccess, isError, error } = useGetCourseInstructors(getCourseInstructorsVars);

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
import { myCertificates, verifyCertificate, logPayment, addPaymentItem, myPaymentHistory, getPendingSubmissions, getMyPendingSubmissions, adminAddCourseInstructor, adminRemoveCourseInstructor, getCourseInstructors } from '@dataconnect/generated';


// Operation MyCertificates: 
const { data } = await MyCertificates(dataConnect);

// Operation VerifyCertificate:  For variables, look at type VerifyCertificateVars in ../index.d.ts
const { data } = await VerifyCertificate(dataConnect, verifyCertificateVars);

// Operation LogPayment:  For variables, look at type LogPaymentVars in ../index.d.ts
const { data } = await LogPayment(dataConnect, logPaymentVars);

// Operation AddPaymentItem:  For variables, look at type AddPaymentItemVars in ../index.d.ts
const { data } = await AddPaymentItem(dataConnect, addPaymentItemVars);

// Operation MyPaymentHistory: 
const { data } = await MyPaymentHistory(dataConnect);

// Operation GetPendingSubmissions: 
const { data } = await GetPendingSubmissions(dataConnect);

// Operation GetMyPendingSubmissions: 
const { data } = await GetMyPendingSubmissions(dataConnect);

// Operation AdminAddCourseInstructor:  For variables, look at type AdminAddCourseInstructorVars in ../index.d.ts
const { data } = await AdminAddCourseInstructor(dataConnect, adminAddCourseInstructorVars);

// Operation AdminRemoveCourseInstructor:  For variables, look at type AdminRemoveCourseInstructorVars in ../index.d.ts
const { data } = await AdminRemoveCourseInstructor(dataConnect, adminRemoveCourseInstructorVars);

// Operation GetCourseInstructors:  For variables, look at type GetCourseInstructorsVars in ../index.d.ts
const { data } = await GetCourseInstructors(dataConnect, getCourseInstructorsVars);


```