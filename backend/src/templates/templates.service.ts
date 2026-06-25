import { Injectable } from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { FirebaseService } from '../firebase/firebase.service';
import { MissionStoragePaths, ALLOWED_TEMPLATE_MIME_TYPES } from '../common/constants/storage-paths';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TemplatesService {
  constructor(
    private readonly dc: DataConnectService,
    private readonly firebase: FirebaseService,
  ) {}

  async upload(
    missionId: string,
    title: string,
    file: Express.Multer.File,
    authToken: string,
  ) {
    const templateId = uuidv4();
    const ext = ALLOWED_TEMPLATE_MIME_TYPES[file.mimetype] ?? '.bin';
    const filename = `${title.replace(/[^a-zA-Z0-9]/g, '_')}${ext}`;
    const storagePath = MissionStoragePaths.template(missionId, templateId, filename);

    // Upload privately (H2); persist the storage PATH, not a public URL.
    const storedPath = await this.firebase.uploadFile(
      storagePath,
      file.buffer,
      file.mimetype,
      { uploadedBy: 'admin', missionId },
    );

    // Insert record in Data Connect
    return this.dc.executeMutation(
      'AdminCreateMissionTemplate',
      {
        missionId,
        title,
        fileUrl: storedPath,
        fileType: ext.replace('.', ''),
      },
      authToken,
    );
  }

  async delete(missionId: string, templateId: string, authToken: string) {
    // Delete storage assets
    const prefix = `missions/${missionId}/templates/${templateId}/`;
    await this.firebase.deleteDirectory(prefix);

    // Delete DB record
    return this.dc.executeMutation(
      'AdminDeleteMissionTemplate',
      { templateId },
      authToken,
    );
  }

  async findAll(missionId: string, authToken: string) {
    const data = await this.dc.executeQuery(
      'GetMissionTemplates',
      { missionId },
      authToken,
    );
    const templates: any[] = data?.missionTemplates ?? [];
    // Exchange stored private paths for short-lived signed read URLs (H2).
    return Promise.all(
      templates.map(async (t) => ({
        ...t,
        fileUrl: await this.firebase.resolveReadUrl(t.fileUrl),
      })),
    );
  }
}
