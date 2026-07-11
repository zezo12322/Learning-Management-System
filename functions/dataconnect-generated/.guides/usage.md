# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { logPayment, addPaymentItem, myPaymentHistory, getPendingSubmissions, getMyPendingSubmissions, adminAddCourseInstructor, adminRemoveCourseInstructor, getCourseInstructors, enrollInCourse, enrollInMission } from '@dataconnect/functions-generated';


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

// Operation EnrollInCourse:  For variables, look at type EnrollInCourseVars in ../index.d.ts
const { data } = await EnrollInCourse(dataConnect, enrollInCourseVars);

// Operation EnrollInMission:  For variables, look at type EnrollInMissionVars in ../index.d.ts
const { data } = await EnrollInMission(dataConnect, enrollInMissionVars);


```