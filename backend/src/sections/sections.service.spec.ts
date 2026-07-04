import { SectionsService } from './sections.service';

function makeDc(queryMap: Record<string, any>, mutationMap: Record<string, any> = {}) {
  return {
    executeQuery: jest.fn((op: string) => Promise.resolve(queryMap[op])),
    executeMutation: jest.fn((op: string) => Promise.resolve(mutationMap[op] ?? {})),
  };
}

describe('SectionsService', () => {
  let ordering: { nextOrder: jest.Mock; applyOrder: jest.Mock };

  beforeEach(() => {
    ordering = { nextOrder: jest.fn().mockReturnValue(3), applyOrder: jest.fn().mockResolvedValue(undefined) };
  });

  it('create() appends with the next order value', async () => {
    const dc = makeDc(
      { AdminGetCourse: { course: { adminSections: [{ order: 1 }, { order: 2 }] } } },
      { AdminCreateSection: { courseSection_insert: { id: 's3' } } },
    );
    const svc = new SectionsService(dc as any, ordering as any);
    await svc.create('c1', { title: 'New' } as any, 'tok');
    expect(ordering.nextOrder).toHaveBeenCalled();
    expect(dc.executeMutation).toHaveBeenCalledWith(
      'AdminCreateSection',
      { courseId: 'c1', title: 'New', order: 3 },
      'tok',
    );
  });

  it('delete() soft-deletes child lectures then SOFT-deletes the section (H4)', async () => {
    const dc = makeDc({
      AdminGetCourse: { course: { adminSections: [{ id: 's2' }] } },
    });
    const svc = new SectionsService(dc as any, ordering as any);
    await svc.delete('c1', 's1', 'tok');

    const ops = dc.executeMutation.mock.calls.map((c) => c[0]);
    expect(ops).toContain('AdminSoftDeleteLecturesBySection');
    expect(ops).toContain('AdminSoftDeleteSection'); // not a hard delete
    expect(ops).not.toContain('AdminDeleteSection');
    // remaining section order is re-normalized
    expect(ordering.applyOrder).toHaveBeenCalledWith(['s2'], 'AdminUpdateSectionOrder', 'sectionId', 'tok');
  });

  it('reorder() rejects ids that do not belong to the course', async () => {
    const dc = makeDc({ AdminGetCourse: { course: { adminSections: [{ id: 's1' }, { id: 's2' }] } } });
    const svc = new SectionsService(dc as any, ordering as any);
    await expect(svc.reorder('c1', ['s1', 'FOREIGN'], 'tok')).rejects.toThrow();
  });
});
