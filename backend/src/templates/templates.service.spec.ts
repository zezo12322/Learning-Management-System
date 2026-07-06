import { TemplatesService } from './templates.service';

describe('TemplatesService (H2 private storage)', () => {
  let dc: any;
  let firebase: any;
  let access: any;

  beforeEach(() => {
    dc = {
      executeQuery: jest.fn(),
      executeMutation: jest.fn().mockResolvedValue({}),
    };
    firebase = {
      uploadFile: jest
        .fn()
        .mockResolvedValue('missions/m1/templates/t1/Brief.pdf'),
      resolveReadUrl: jest.fn((v: string) => Promise.resolve(`signed:${v}`)),
      deleteDirectory: jest.fn().mockResolvedValue(undefined),
    };
    access = { assertMissionAccess: jest.fn().mockResolvedValue(undefined) };
  });

  it('uploads privately and persists the storage PATH (not a public URL)', async () => {
    const svc = new TemplatesService(dc, firebase, access);
    const file = {
      buffer: Buffer.from('x'),
      mimetype: 'application/pdf',
    } as any;
    await svc.upload('m1', 'Brief', file, 'tok');

    expect(firebase.uploadFile).toHaveBeenCalledWith(
      expect.stringContaining('missions/m1/templates/'),
      file.buffer,
      'application/pdf',
      expect.any(Object),
    );
    expect(dc.executeMutation).toHaveBeenCalledWith(
      'AdminCreateMissionTemplate',
      expect.objectContaining({
        fileUrl: 'missions/m1/templates/t1/Brief.pdf',
        fileType: 'pdf',
      }),
      'tok',
    );
  });

  it('findAll() exchanges stored paths for signed read URLs', async () => {
    dc.executeQuery.mockResolvedValue({
      missionTemplates: [
        {
          id: 't1',
          title: 'Brief',
          fileUrl: 'missions/m1/templates/t1/Brief.pdf',
        },
      ],
    });
    const svc = new TemplatesService(dc, firebase, access);
    const res = await svc.findAll('m1', 'tok', 'u1', true);
    expect(res[0].fileUrl).toBe('signed:missions/m1/templates/t1/Brief.pdf');
  });

  it('findAll() denies a caller who is neither an owner nor an active enrollee', async () => {
    access.assertMissionAccess.mockRejectedValueOnce(new Error('forbidden'));
    dc.executeQuery.mockResolvedValueOnce({
      enrollments: [{ status: 'CANCELLED' }],
    });
    const svc = new TemplatesService(dc, firebase, access);
    await expect(svc.findAll('m1', 'tok', 'intruder', false)).rejects.toThrow(
      /access to this mission/i,
    );
  });
});
