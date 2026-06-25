import { BadRequestException } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadEntityType } from './dto/upload.dto';

describe('UploadsService', () => {
  let firebase: any;
  let dc: any;
  let access: { assertCourseAccess: jest.Mock };
  let svc: UploadsService;
  const caller = { uid: 'u1', token: 'tok', isAdmin: false };

  beforeEach(() => {
    firebase = {
      generateSignedUploadUrl: jest.fn().mockResolvedValue({ uploadUrl: 'PUT', downloadUrl: 'GET' }),
      generateSignedReadUrl: jest.fn().mockResolvedValue('signed-read'),
      makeFilePublic: jest.fn().mockResolvedValue('https://public/url'),
      fileExists: jest.fn().mockResolvedValue(true),
      getBucket: jest.fn().mockReturnValue({ name: 'bucket' }),
    };
    dc = { executeQuery: jest.fn(), executeMutation: jest.fn().mockResolvedValue({}) };
    access = { assertCourseAccess: jest.fn().mockResolvedValue(undefined) };
    svc = new UploadsService(firebase, dc as any, access as any);
  });

  describe('generateSignedUrl', () => {
    it('requires a lectureId for lecture-scoped uploads', async () => {
      await expect(
        svc.generateSignedUrl(
          { entityType: UploadEntityType.LECTURE_VIDEO, courseId: 'c1', filename: 'a.mp4', contentType: 'video/mp4' } as any,
          caller,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects a disallowed content type', async () => {
      await expect(
        svc.generateSignedUrl(
          { entityType: UploadEntityType.COURSE_THUMBNAIL, courseId: 'c1', filename: 'a.exe', contentType: 'application/x-msdownload' } as any,
          caller,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('returns a signed URL with a server-derived path for a valid request', async () => {
      const res = await svc.generateSignedUrl(
        { entityType: UploadEntityType.COURSE_THUMBNAIL, courseId: 'c1', filename: 'pic.png', contentType: 'image/png' } as any,
        caller,
      );
      expect(res.uploadUrl).toBe('PUT');
      expect(res.storagePath).toContain('courses/c1/thumbnail/');
      expect(access.assertCourseAccess).toHaveBeenCalledWith('c1', 'u1', 'tok', false);
    });
  });

  describe('confirmUpload (H3 cross-course IDOR)', () => {
    const dto = {
      entityType: UploadEntityType.LECTURE_VIDEO,
      courseId: 'c1',
      lectureId: 'L1',
      storagePath: 'courses/c1/lectures/L1/video/x.mp4',
    } as any;

    it('rejects when the lecture belongs to a different course', async () => {
      dc.executeQuery.mockResolvedValue({ courseLecture: { section: { course: { id: 'OTHER' } } } });
      await expect(svc.confirmUpload(dto, caller)).rejects.toBeInstanceOf(BadRequestException);
      expect(dc.executeMutation).not.toHaveBeenCalled();
    });

    it('persists the storage PATH (private) when the lecture matches the course', async () => {
      dc.executeQuery.mockResolvedValue({ courseLecture: { section: { course: { id: 'c1' } } } });
      const res = await svc.confirmUpload(dto, caller);
      expect(dc.executeMutation).toHaveBeenCalledWith(
        'AdminUpdateLecture',
        { lectureId: 'L1', videoUrl: dto.storagePath },
        'tok',
      );
      expect(firebase.makeFilePublic).not.toHaveBeenCalled();
      expect(res.downloadUrl).toBe('signed-read');
    });

    it('rejects a storagePath outside the course prefix', async () => {
      await expect(
        svc.confirmUpload({ ...dto, storagePath: 'courses/EVIL/x.mp4' }, caller),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('makes thumbnails public and stores the public URL', async () => {
      const thumbDto = {
        entityType: UploadEntityType.COURSE_THUMBNAIL,
        courseId: 'c1',
        storagePath: 'courses/c1/thumbnail/x.png',
      } as any;
      await svc.confirmUpload(thumbDto, caller);
      expect(firebase.makeFilePublic).toHaveBeenCalledWith('courses/c1/thumbnail/x.png');
      expect(dc.executeMutation).toHaveBeenCalledWith(
        'AdminUpdateCourse',
        { courseId: 'c1', thumbnail: 'https://public/url' },
        'tok',
      );
    });
  });
});
