# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { getCourseSessions, checkInToSession, syncUser, getMe, updateMyProfile, adminCreateCourse, adminDeleteCourse, adminCreateSession, adminCancelSession, adminCreateSubscriptionTier } from '@dataconnect/functions-generated';


// Operation GetCourseSessions:  For variables, look at type GetCourseSessionsVars in ../index.d.ts
const { data } = await GetCourseSessions(dataConnect, getCourseSessionsVars);

// Operation CheckInToSession:  For variables, look at type CheckInToSessionVars in ../index.d.ts
const { data } = await CheckInToSession(dataConnect, checkInToSessionVars);

// Operation SyncUser:  For variables, look at type SyncUserVars in ../index.d.ts
const { data } = await SyncUser(dataConnect, syncUserVars);

// Operation GetMe: 
const { data } = await GetMe(dataConnect);

// Operation UpdateMyProfile:  For variables, look at type UpdateMyProfileVars in ../index.d.ts
const { data } = await UpdateMyProfile(dataConnect, updateMyProfileVars);

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


```