# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { adminCreateCourse, adminDeleteCourse, adminCreateSession, adminCancelSession, adminCreateSubscriptionTier, adminDeprecateSubscriptionTier, adminCreateCategory, getUserClaims, myCertificates, verifyCertificate } from '@dataconnect/functions-generated';


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