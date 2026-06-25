import { OrderingService } from './ordering.service';

describe('OrderingService', () => {
  let dc: { executeMutation: jest.Mock };
  let service: OrderingService;

  beforeEach(() => {
    dc = { executeMutation: jest.fn().mockResolvedValue({}) };
    service = new OrderingService(dc as any);
  });

  describe('nextOrder', () => {
    it('returns 1 for an empty list', () => {
      expect(service.nextOrder([])).toBe(1);
    });

    it('returns one past the highest existing order', () => {
      expect(service.nextOrder([{ order: 1 }, { order: 5 }, { order: 3 }])).toBe(6);
    });

    it('treats missing order values as 0', () => {
      expect(service.nextOrder([{}, { order: 2 }])).toBe(3);
    });
  });

  describe('applyOrder', () => {
    it('assigns sequential 1-based order via the given mutation', async () => {
      await service.applyOrder(['a', 'b', 'c'], 'UpdateOrder', 'sectionId', 'tok');
      expect(dc.executeMutation).toHaveBeenCalledTimes(3);
      expect(dc.executeMutation).toHaveBeenNthCalledWith(1, 'UpdateOrder', { sectionId: 'a', order: 1 }, 'tok');
      expect(dc.executeMutation).toHaveBeenNthCalledWith(2, 'UpdateOrder', { sectionId: 'b', order: 2 }, 'tok');
      expect(dc.executeMutation).toHaveBeenNthCalledWith(3, 'UpdateOrder', { sectionId: 'c', order: 3 }, 'tok');
    });
  });
});
