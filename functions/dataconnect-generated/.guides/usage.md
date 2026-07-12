# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { myCertificates, verifyCertificate, listCategories, listPublishedCourses, searchPublishedCourses, listPopularCourses, listRecommendedCourses, getMyEnrolledCourseCategories, getMyContinueLearning, getCourseVideos } from '@dataconnect/functions-generated';


// Operation MyCertificates: 
const { data } = await MyCertificates(dataConnect);

// Operation VerifyCertificate:  For variables, look at type VerifyCertificateVars in ../index.d.ts
const { data } = await VerifyCertificate(dataConnect, verifyCertificateVars);

// Operation ListCategories: 
const { data } = await ListCategories(dataConnect);

// Operation ListPublishedCourses: 
const { data } = await ListPublishedCourses(dataConnect);

// Operation SearchPublishedCourses:  For variables, look at type SearchPublishedCoursesVars in ../index.d.ts
const { data } = await SearchPublishedCourses(dataConnect, searchPublishedCoursesVars);

// Operation ListPopularCourses:  For variables, look at type ListPopularCoursesVars in ../index.d.ts
const { data } = await ListPopularCourses(dataConnect, listPopularCoursesVars);

// Operation ListRecommendedCourses:  For variables, look at type ListRecommendedCoursesVars in ../index.d.ts
const { data } = await ListRecommendedCourses(dataConnect, listRecommendedCoursesVars);

// Operation GetMyEnrolledCourseCategories: 
const { data } = await GetMyEnrolledCourseCategories(dataConnect);

// Operation GetMyContinueLearning: 
const { data } = await GetMyContinueLearning(dataConnect);

// Operation GetCourseVideos:  For variables, look at type GetCourseVideosVars in ../index.d.ts
const { data } = await GetCourseVideos(dataConnect, getCourseVideosVars);


```