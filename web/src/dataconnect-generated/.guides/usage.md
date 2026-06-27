# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useAdminCreateCourse, useAdminDeleteCourse, useAdminCreateSession, useAdminCancelSession, useAdminCreateSubscriptionTier, useAdminDeprecateSubscriptionTier, useAdminCreateCategory, useGetUserClaims, useMyCertificates, useVerifyCertificate } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useAdminCreateCourse(adminCreateCourseVars);

const { data, isPending, isSuccess, isError, error } = useAdminDeleteCourse(adminDeleteCourseVars);

const { data, isPending, isSuccess, isError, error } = useAdminCreateSession(adminCreateSessionVars);

const { data, isPending, isSuccess, isError, error } = useAdminCancelSession(adminCancelSessionVars);

const { data, isPending, isSuccess, isError, error } = useAdminCreateSubscriptionTier(adminCreateSubscriptionTierVars);

const { data, isPending, isSuccess, isError, error } = useAdminDeprecateSubscriptionTier(adminDeprecateSubscriptionTierVars);

const { data, isPending, isSuccess, isError, error } = useAdminCreateCategory(adminCreateCategoryVars);

const { data, isPending, isSuccess, isError, error } = useGetUserClaims(getUserClaimsVars);

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
import { adminCreateCourse, adminDeleteCourse, adminCreateSession, adminCancelSession, adminCreateSubscriptionTier, adminDeprecateSubscriptionTier, adminCreateCategory, getUserClaims, myCertificates, verifyCertificate } from '@dataconnect/generated';


// Operation AdminCreateCourse:  For variables, look at type AdminCreateCourseVars in ../index.d.ts
const { data } = await AdminCreateCourse(dataConnect, adminCreateCourseVars);

// Operation AdminDeleteCourse:  For variables, look at type AdminDeleteCourseVars in ../index.d.ts
const { data } = await AdminDeleteCourse(dataConnect, adminDeleteCourseVars);

// Operation AdminCreateSession:  For variables, look at type AdminCreateSessionVars in ../index.d.ts
const { data } = await AdminCreateSession(dataConnect, adminCreateSessionVars);

// Operation AdminCancelSession:  For variables, look at type AdminCancelSessionVars in ../index.d.ts
const { data } = await AdminCancelSession(dataConnect, adminCancelSessionVars);

// Operation AdminCreateSubscriptionTier:  For variables, look at type AdminCreateSubscriptionTierVars in ../index.d.ts
const { data } = await AdminCreateSubscriptionTier(dataConnect, adminCreateSubscriptionTierVars);

// Operation AdminDeprecateSubscriptionTier:  For variables, look at type AdminDeprecateSubscriptionTierVars in ../index.d.ts
const { data } = await AdminDeprecateSubscriptionTier(dataConnect, adminDeprecateSubscriptionTierVars);

// Operation AdminCreateCategory:  For variables, look at type AdminCreateCategoryVars in ../index.d.ts
const { data } = await AdminCreateCategory(dataConnect, adminCreateCategoryVars);

// Operation GetUserClaims:  For variables, look at type GetUserClaimsVars in ../index.d.ts
const { data } = await GetUserClaims(dataConnect, getUserClaimsVars);

// Operation MyCertificates: 
const { data } = await MyCertificates(dataConnect);

// Operation VerifyCertificate:  For variables, look at type VerifyCertificateVars in ../index.d.ts
const { data } = await VerifyCertificate(dataConnect, verifyCertificateVars);


```