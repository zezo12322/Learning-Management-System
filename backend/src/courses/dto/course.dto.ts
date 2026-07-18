import {
  IsString,
  IsInt,
  IsEnum,
  IsOptional,
  IsArray,
  Min,
} from 'class-validator';
import { IsFlexUUID } from '../../common/validators/is-flex-uuid.validator';

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsString()
  language: string;

  @IsEnum(CourseLevel)
  level: CourseLevel;

  @IsFlexUUID()
  categoryId: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsEnum(CourseLevel)
  level?: CourseLevel;

  @IsOptional()
  @IsFlexUUID()
  categoryId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  thumbnail?: string;
}

export class UpdateCourseStatusDto {
  @IsEnum(CourseStatus)
  status: CourseStatus;
}

// ==========================================
// INSTRUCTOR COURSE OVERVIEW (analytics)
//
// Response shape of GET /courses/:courseId/overview. Not a request DTO — it
// documents the structured summary CoursesService.getOverview computes from the
// AdminGetCourseOverview rows. Kept here so the contract lives next to the other
// course DTOs.
// ==========================================
export interface CourseOverview {
  course: {
    id: string;
    title: string;
    description: string | null;
    price: number;
    status: string;
    language: string;
    level: string;
    thumbnail: string | null;
    tags: string[];
    category: { id: string; name: string } | null;
    author: {
      id: string;
      name: string;
      email: string;
      avatar: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  instructors: Array<{
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  }>;
  content: {
    totalSections: number;
    totalLectures: number;
    lecturesByType: {
      VIDEO: number;
      READING: number;
      INTERACTIVE: number;
      QUIZ: number;
    };
    totalQuizzes: number;
    totalDurationSeconds: number;
  };
  assignments: {
    total: number;
    submissions: {
      total: number;
      byStatus: {
        PENDING: number;
        GRADED: number;
        RETURNED: number;
        REJECTED: number;
      };
    };
  };
  enrollments: {
    total: number;
    byStatus: {
      ACTIVE: number;
      COMPLETED: number;
      DROPPED: number;
      SUSPENDED: number;
    };
  };
  progress: {
    // Learners counted for progress = ACTIVE + COMPLETED enrollments.
    activeLearners: number;
    // Mean percentage (0–100) of the course's lectures those learners completed.
    averageCompletionPercent: number;
    // Learners who completed every lecture (0 when the course has no lectures).
    fullyCompletedLearners: number;
    // fullyCompletedLearners / activeLearners as a percentage (0–100).
    completionRatePercent: number;
  };
  ratings: {
    average: number;
    count: number;
    distribution: { 1: number; 2: number; 3: number; 4: number; 5: number };
  };
}
