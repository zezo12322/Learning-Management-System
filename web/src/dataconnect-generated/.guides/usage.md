# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useGetUserClaims, useMyCertificates, useVerifyCertificate, useListPublishedCourses, useGetCourseCurriculum, useGetLectureContent, useGetUserLectureProgress, useGetMyCourseProgress, useGetCourseForEnrollment, useAdminGetCourse } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useGetUserClaims(getUserClaimsVars);

const { data, isPending, isSuccess, isError, error } = useMyCertificates();

const { data, isPending, isSuccess, isError, error } = useVerifyCertificate(verifyCertificateVars);

const { data, isPending, isSuccess, isError, error } = useListPublishedCourses();

const { data, isPending, isSuccess, isError, error } = useGetCourseCurriculum(getCourseCurriculumVars);

const { data, isPending, isSuccess, isError, error } = useGetLectureContent(getLectureContentVars);

const { data, isPending, isSuccess, isError, error } = useGetUserLectureProgress(getUserLectureProgressVars);

const { data, isPending, isSuccess, isError, error } = useGetMyCourseProgress(getMyCourseProgressVars);

const { data, isPending, isSuccess, isError, error } = useGetCourseForEnrollment(getCourseForEnrollmentVars);

const { data, isPending, isSuccess, isError, error } = useAdminGetCourse(adminGetCourseVars);

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
import { getUserClaims, myCertificates, verifyCertificate, listPublishedCourses, getCourseCurriculum, getLectureContent, getUserLectureProgress, getMyCourseProgress, getCourseForEnrollment, adminGetCourse } from '@dataconnect/generated';


// Operation GetUserClaims:  For variables, look at type GetUserClaimsVars in ../index.d.ts
const { data } = await GetUserClaims(dataConnect, getUserClaimsVars);

// Operation MyCertificates: 
const { data } = await MyCertificates(dataConnect);

// Operation VerifyCertificate:  For variables, look at type VerifyCertificateVars in ../index.d.ts
const { data } = await VerifyCertificate(dataConnect, verifyCertificateVars);

// Operation ListPublishedCourses: 
const { data } = await ListPublishedCourses(dataConnect);

// Operation GetCourseCurriculum:  For variables, look at type GetCourseCurriculumVars in ../index.d.ts
const { data } = await GetCourseCurriculum(dataConnect, getCourseCurriculumVars);

// Operation GetLectureContent:  For variables, look at type GetLectureContentVars in ../index.d.ts
const { data } = await GetLectureContent(dataConnect, getLectureContentVars);

// Operation GetUserLectureProgress:  For variables, look at type GetUserLectureProgressVars in ../index.d.ts
const { data } = await GetUserLectureProgress(dataConnect, getUserLectureProgressVars);

// Operation GetMyCourseProgress:  For variables, look at type GetMyCourseProgressVars in ../index.d.ts
const { data } = await GetMyCourseProgress(dataConnect, getMyCourseProgressVars);

// Operation GetCourseForEnrollment:  For variables, look at type GetCourseForEnrollmentVars in ../index.d.ts
const { data } = await GetCourseForEnrollment(dataConnect, getCourseForEnrollmentVars);

// Operation AdminGetCourse:  For variables, look at type AdminGetCourseVars in ../index.d.ts
const { data } = await AdminGetCourse(dataConnect, adminGetCourseVars);


```