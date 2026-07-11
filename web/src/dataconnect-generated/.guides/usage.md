# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useUpsertCourseRating, useDeleteCourseRating, useGetMyCourseRating, useListCourseRatings, useGetCourseRatingsForSummary, useAdminUpdateCourseRatingAggregate, useGetMyCourseAccess, useGetMyMissionAccess, useGetQuestionCourse, useGetOptionCourse } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useUpsertCourseRating(upsertCourseRatingVars);

const { data, isPending, isSuccess, isError, error } = useDeleteCourseRating(deleteCourseRatingVars);

const { data, isPending, isSuccess, isError, error } = useGetMyCourseRating(getMyCourseRatingVars);

const { data, isPending, isSuccess, isError, error } = useListCourseRatings(listCourseRatingsVars);

const { data, isPending, isSuccess, isError, error } = useGetCourseRatingsForSummary(getCourseRatingsForSummaryVars);

const { data, isPending, isSuccess, isError, error } = useAdminUpdateCourseRatingAggregate(adminUpdateCourseRatingAggregateVars);

const { data, isPending, isSuccess, isError, error } = useGetMyCourseAccess(getMyCourseAccessVars);

const { data, isPending, isSuccess, isError, error } = useGetMyMissionAccess(getMyMissionAccessVars);

const { data, isPending, isSuccess, isError, error } = useGetQuestionCourse(getQuestionCourseVars);

const { data, isPending, isSuccess, isError, error } = useGetOptionCourse(getOptionCourseVars);

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
import { upsertCourseRating, deleteCourseRating, getMyCourseRating, listCourseRatings, getCourseRatingsForSummary, adminUpdateCourseRatingAggregate, getMyCourseAccess, getMyMissionAccess, getQuestionCourse, getOptionCourse } from '@dataconnect/generated';


// Operation UpsertCourseRating:  For variables, look at type UpsertCourseRatingVars in ../index.d.ts
const { data } = await UpsertCourseRating(dataConnect, upsertCourseRatingVars);

// Operation DeleteCourseRating:  For variables, look at type DeleteCourseRatingVars in ../index.d.ts
const { data } = await DeleteCourseRating(dataConnect, deleteCourseRatingVars);

// Operation GetMyCourseRating:  For variables, look at type GetMyCourseRatingVars in ../index.d.ts
const { data } = await GetMyCourseRating(dataConnect, getMyCourseRatingVars);

// Operation ListCourseRatings:  For variables, look at type ListCourseRatingsVars in ../index.d.ts
const { data } = await ListCourseRatings(dataConnect, listCourseRatingsVars);

// Operation GetCourseRatingsForSummary:  For variables, look at type GetCourseRatingsForSummaryVars in ../index.d.ts
const { data } = await GetCourseRatingsForSummary(dataConnect, getCourseRatingsForSummaryVars);

// Operation AdminUpdateCourseRatingAggregate:  For variables, look at type AdminUpdateCourseRatingAggregateVars in ../index.d.ts
const { data } = await AdminUpdateCourseRatingAggregate(dataConnect, adminUpdateCourseRatingAggregateVars);

// Operation GetMyCourseAccess:  For variables, look at type GetMyCourseAccessVars in ../index.d.ts
const { data } = await GetMyCourseAccess(dataConnect, getMyCourseAccessVars);

// Operation GetMyMissionAccess:  For variables, look at type GetMyMissionAccessVars in ../index.d.ts
const { data } = await GetMyMissionAccess(dataConnect, getMyMissionAccessVars);

// Operation GetQuestionCourse:  For variables, look at type GetQuestionCourseVars in ../index.d.ts
const { data } = await GetQuestionCourse(dataConnect, getQuestionCourseVars);

// Operation GetOptionCourse:  For variables, look at type GetOptionCourseVars in ../index.d.ts
const { data } = await GetOptionCourse(dataConnect, getOptionCourseVars);


```