import DataRelation from './';

describe('inverse data relation definition', () => {
  test('child\'s inverse relation is parent', () => {
    expect(DataRelation.child).toBe('parent');
  });
  test('parent\'s inverse relation is child', () => {
    expect(DataRelation.parent).toBe('child');
  });
});
