import { BadRequestException } from '@nestjs/common';
import { assertReorderMembership } from './ordering';

describe('assertReorderMembership', () => {
  it('passes when every id belongs to the parent', () => {
    expect(() =>
      assertReorderMembership(['a', 'b'], ['a', 'b', 'c'], 'section'),
    ).not.toThrow();
  });

  it('throws when an id does not belong to the parent (prevents cross-resource reorder)', () => {
    expect(() =>
      assertReorderMembership(['a', 'x'], ['a', 'b'], 'section'),
    ).toThrow(BadRequestException);
  });

  it('passes for an empty ordered set', () => {
    expect(() => assertReorderMembership([], ['a'], 'item')).not.toThrow();
  });
});
