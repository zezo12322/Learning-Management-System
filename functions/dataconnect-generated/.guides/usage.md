# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { instructorDeleteCourse, superAdminDeleteCourse, adminCreateSession, instructorCancelSession, superAdminCancelSession, adminCreateSubscriptionTier, adminDeprecateSubscriptionTier, adminCreateCategory, getUserClaims, myCertificates } from '@dataconnect/functions-generated';


// Operation InstructorDeleteCourse:  For variables, look at type InstructorDeleteCourseVars in ../index.d.ts
const { data } = await InstructorDeleteCourse(dataConnect, instructorDeleteCourseVars);

// Operation AdminRemoveCourseInstructor:  For variables, look at type AdminRemoveCourseInstructorVars in ../index.d.ts
const { data } = await AdminRemoveCourseInstructor(dataConnect, adminRemoveCourseInstructorVars);

// Operation GetCourseInstructors:  For variables, look at type GetCourseInstructorsVars in ../index.d.ts
const { data } = await GetCourseInstructors(dataConnect, getCourseInstructorsVars);

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

// Operation MyCertificates: 
const { data } = await MyCertificates(dataConnect);


```