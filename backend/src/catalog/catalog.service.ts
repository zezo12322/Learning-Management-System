import { Injectable, NotFoundException } from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';

/**
 * Student-facing course discovery (catalog) + curriculum outline. Read-only.
 * `listPublished` runs against the PUBLIC connector op (no auth required);
 * `getCurriculum` is USER-level.
 */
@Injectable()
export class CatalogService {
  constructor(private readonly dc: DataConnectService) {}

  async listPublished() {
    // PUBLIC operation — no end-user token needed.
    const data = await this.dc.executeQuery('ListPublishedCourses', {}, undefined);
    return data?.courses ?? [];
  }

  async getCurriculum(courseId: string, authToken: string) {
    const data = await this.dc.executeQuery(
      'GetCourseCurriculum',
      { courseId },
      authToken,
    );
    if (!data?.course) {
      throw new NotFoundException(`Course ${courseId} not found`);
    }
    return data.course;
  }
}
