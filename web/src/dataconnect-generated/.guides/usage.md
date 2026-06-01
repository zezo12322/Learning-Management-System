# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useAdminCreateCourse, useAdminDeleteCourse, useAdminCreateCourseSection, useAdminCreateLecture, useInstructorCourses, useAdminCreateSession, useAdminCancelSession, useAdminCreateSubscriptionTier, useAdminDeprecateSubscriptionTier, useListSubscriptionTiers } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useAdminCreateCourse(adminCreateCourseVars);

const { data, isPending, isSuccess, isError, error } = useAdminDeleteCourse(adminDeleteCourseVars);

const { data, isPending, isSuccess, isError, error } = useAdminCreateCourseSection(adminCreateCourseSectionVars);

const { data, isPending, isSuccess, isError, error } = useAdminCreateLecture(adminCreateLectureVars);

const { data, isPending, isSuccess, isError, error } = useInstructorCourses();

const { data, isPending, isSuccess, isError, error } = useAdminCreateSession(adminCreateSessionVars);

const { data, isPending, isSuccess, isError, error } = useAdminCancelSession(adminCancelSessionVars);

const { data, isPending, isSuccess, isError, error } = useAdminCreateSubscriptionTier(adminCreateSubscriptionTierVars);

const { data, isPending, isSuccess, isError, error } = useAdminDeprecateSubscriptionTier(adminDeprecateSubscriptionTierVars);

const { data, isPending, isSuccess, isError, error } = useListSubscriptionTiers();

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
import { adminCreateCourse, adminDeleteCourse, adminCreateCourseSection, adminCreateLecture, instructorCourses, adminCreateSession, adminCancelSession, adminCreateSubscriptionTier, adminDeprecateSubscriptionTier, listSubscriptionTiers } from '@dataconnect/generated';


// Operation AdminCreateCourse:  For variables, look at type AdminCreateCourseVars in ../index.d.ts
const { data } = await AdminCreateCourse(dataConnect, adminCreateCourseVars);

// Operation AdminDeleteCourse:  For variables, look at type AdminDeleteCourseVars in ../index.d.ts
const { data } = await AdminDeleteCourse(dataConnect, adminDeleteCourseVars);

// Operation AdminCreateCourseSection:  For variables, look at type AdminCreateCourseSectionVars in ../index.d.ts
const { data } = await AdminCreateCourseSection(dataConnect, adminCreateCourseSectionVars);

// Operation AdminCreateLecture:  For variables, look at type AdminCreateLectureVars in ../index.d.ts
const { data } = await AdminCreateLecture(dataConnect, adminCreateLectureVars);

// Operation InstructorCourses: 
const { data } = await InstructorCourses(dataConnect);

// Operation AdminCreateSession:  For variables, look at type AdminCreateSessionVars in ../index.d.ts
const { data } = await AdminCreateSession(dataConnect, adminCreateSessionVars);

// Operation AdminCancelSession:  For variables, look at type AdminCancelSessionVars in ../index.d.ts
const { data } = await AdminCancelSession(dataConnect, adminCancelSessionVars);

// Operation AdminCreateSubscriptionTier:  For variables, look at type AdminCreateSubscriptionTierVars in ../index.d.ts
const { data } = await AdminCreateSubscriptionTier(dataConnect, adminCreateSubscriptionTierVars);

// Operation AdminDeprecateSubscriptionTier:  For variables, look at type AdminDeprecateSubscriptionTierVars in ../index.d.ts
const { data } = await AdminDeprecateSubscriptionTier(dataConnect, adminDeprecateSubscriptionTierVars);

// Operation ListSubscriptionTiers: 
const { data } = await ListSubscriptionTiers(dataConnect);


```