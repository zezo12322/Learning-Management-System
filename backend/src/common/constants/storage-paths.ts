/**
 * Firebase Storage path builder utilities.
 * Centralizes all storage path conventions for the LMS platform.
 */

export const STORAGE_BUCKET_SUFFIX = '.appspot.com';

// ==========================================
// COURSE STORAGE PATHS
// ==========================================

export const CourseStoragePaths = {
  thumbnail: (courseId: string, filename: string) =>
    `courses/${courseId}/thumbnail/${filename}`,

  lectureVideo: (courseId: string, lectureId: string, filename: string) =>
    `courses/${courseId}/lectures/${lectureId}/video/${filename}`,

  lectureTranscript: (courseId: string, lectureId: string, filename: string) =>
    `courses/${courseId}/lectures/${lectureId}/transcript/${filename}`,
} as const;

// ==========================================
// MISSION STORAGE PATHS
// ==========================================

export const MissionStoragePaths = {
  microLessonAsset: (missionId: string, microLessonId: string, filename: string) =>
    `missions/${missionId}/micro-lessons/${microLessonId}/${filename}`,

  template: (missionId: string, templateId: string, filename: string) =>
    `missions/${missionId}/templates/${templateId}/${filename}`,
} as const;

// ==========================================
// ALLOWED MIME TYPES
// ==========================================

export const ALLOWED_TEMPLATE_MIME_TYPES: Record<string, string> = {
  'application/pdf': '.pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
};

export const ALLOWED_TEMPLATE_EXTENSIONS = ['.pdf', '.docx', '.xlsx'];

export const ALLOWED_VIDEO_MIME_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
];

export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
];

// ==========================================
// FILE SIZE LIMITS (in bytes)
// ==========================================

export const FILE_SIZE_LIMITS = {
  TEMPLATE: 50 * 1024 * 1024,     // 50MB
  VIDEO: 500 * 1024 * 1024,       // 500MB
  THUMBNAIL: 5 * 1024 * 1024,     // 5MB
  TRANSCRIPT: 10 * 1024 * 1024,   // 10MB
  MICRO_LESSON: 100 * 1024 * 1024, // 100MB
} as const;
