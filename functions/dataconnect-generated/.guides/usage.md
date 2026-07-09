# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { getUserClaimsFn, createDefaultUserAndProfileFn, deleteUserRecordFn, createDefaultUserFn, getTargetUserRolesFn, removeRoleFn, assignNewRoleFn, getPendingSubmissions, getMyPendingSubmissions, adminAddCourseInstructor } from '@dataconnect/functions-generated';


// Operation GetUserClaimsFn:  For variables, look at type GetUserClaimsFnVars in ../index.d.ts
const { data } = await GetUserClaimsFn(dataConnect, getUserClaimsFnVars);

// Operation CreateDefaultUserAndProfileFn:  For variables, look at type CreateDefaultUserAndProfileFnVars in ../index.d.ts
const { data } = await CreateDefaultUserAndProfileFn(dataConnect, createDefaultUserAndProfileFnVars);

// Operation DeleteUserRecordFn:  For variables, look at type DeleteUserRecordFnVars in ../index.d.ts
const { data } = await DeleteUserRecordFn(dataConnect, deleteUserRecordFnVars);

// Operation CreateDefaultUserFn:  For variables, look at type CreateDefaultUserFnVars in ../index.d.ts
const { data } = await CreateDefaultUserFn(dataConnect, createDefaultUserFnVars);

// Operation GetTargetUserRolesFn:  For variables, look at type GetTargetUserRolesFnVars in ../index.d.ts
const { data } = await GetTargetUserRolesFn(dataConnect, getTargetUserRolesFnVars);

// Operation RemoveRoleFn:  For variables, look at type RemoveRoleFnVars in ../index.d.ts
const { data } = await RemoveRoleFn(dataConnect, removeRoleFnVars);

// Operation AssignNewRoleFn:  For variables, look at type AssignNewRoleFnVars in ../index.d.ts
const { data } = await AssignNewRoleFn(dataConnect, assignNewRoleFnVars);

// Operation GetPendingSubmissions: 
const { data } = await GetPendingSubmissions(dataConnect);

// Operation GetMyPendingSubmissions: 
const { data } = await GetMyPendingSubmissions(dataConnect);

// Operation AdminAddCourseInstructor:  For variables, look at type AdminAddCourseInstructorVars in ../index.d.ts
const { data } = await AdminAddCourseInstructor(dataConnect, adminAddCourseInstructorVars);


```