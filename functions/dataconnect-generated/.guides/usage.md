# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { adminCreateCourse, instructorDeleteCourse, superAdminDeleteCourse, adminCreateSession, instructorCancelSession, superAdminCancelSession, adminCreateSubscriptionTier, adminDeprecateSubscriptionTier, adminCreateCategory, getUserClaims } from '@dataconnect/functions-generated';


// Operation AdminCreateCourse:  For variables, look at type AdminCreateCourseVars in ../index.d.ts
const { data } = await AdminCreateCourse(dataConnect, adminCreateCourseVars);

// Operation InstructorDeleteCourse:  For variables, look at type InstructorDeleteCourseVars in ../index.d.ts
const { data } = await InstructorDeleteCourse(dataConnect, instructorDeleteCourseVars);

// Operation SuperAdminDeleteCourse:  For variables, look at type SuperAdminDeleteCourseVars in ../index.d.ts
const { data } = await SuperAdminDeleteCourse(dataConnect, superAdminDeleteCourseVars);

// Operation AdminCreateSession:  For variables, look at type AdminCreateSessionVars in ../index.d.ts
const { data } = await AdminCreateSession(dataConnect, adminCreateSessionVars);

// Operation InstructorCancelSession:  For variables, look at type InstructorCancelSessionVars in ../index.d.ts
const { data } = await InstructorCancelSession(dataConnect, instructorCancelSessionVars);

// Operation SuperAdminCancelSession:  For variables, look at type SuperAdminCancelSessionVars in ../index.d.ts
const { data } = await SuperAdminCancelSession(dataConnect, superAdminCancelSessionVars);

// Operation AdminCreateSubscriptionTier:  For variables, look at type AdminCreateSubscriptionTierVars in ../index.d.ts
const { data } = await AdminCreateSubscriptionTier(dataConnect, adminCreateSubscriptionTierVars);

// Operation AdminDeprecateSubscriptionTier:  For variables, look at type AdminDeprecateSubscriptionTierVars in ../index.d.ts
const { data } = await AdminDeprecateSubscriptionTier(dataConnect, adminDeprecateSubscriptionTierVars);

// Operation AdminCreateCategory:  For variables, look at type AdminCreateCategoryVars in ../index.d.ts
const { data } = await AdminCreateCategory(dataConnect, adminCreateCategoryVars);

// Operation GetUserClaims:  For variables, look at type GetUserClaimsVars in ../index.d.ts
const { data } = await GetUserClaims(dataConnect, getUserClaimsVars);


```