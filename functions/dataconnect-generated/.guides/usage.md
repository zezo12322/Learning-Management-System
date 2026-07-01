# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { myCertificates, verifyCertificate, listPublishedCourses, getCourseCurriculum, getLectureContent, getUserLectureProgress, getMyCourseProgress, getCourseForEnrollment, adminGetCourse, adminListMyCourses } from '@dataconnect/functions-generated';


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

// Operation AdminListMyCourses: 
const { data } = await AdminListMyCourses(dataConnect);


```