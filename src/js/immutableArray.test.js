import immutableArray from './immutableArray';

describe('immutableArray', () => {
  let target = [1,3,2,5,4];
  test('push', () => {
    expect(immutableArray.push(target, 6)).toEqual([1, 3, 2, 5, 4, 6]);
  });
  test('pop', () => {
    expect(immutableArray.pop(target)).toEqual([1, 3, 2, 5]);
  });
  test('shift', () => {
    expect(immutableArray.shift(target)).toEqual([3, 2, 5, 4]);
  });
  test('unshift', () => {
    expect(immutableArray.unshift(target, 0)).toEqual([0, 1, 3, 2, 5, 4]);
  });
  test('sort', () => {
    expect(immutableArray.sort(target)).toEqual([1, 2, 3, 4, 5]);
  });
  test('reverse', () => {
    expect(immutableArray.reverse(target)).toEqual([4, 5, 2, 3, 1]);
  });
  test('splice', () => {
    expect(immutableArray.splice(target, 2, 2, 1, 1)).toEqual([1, 3, 1, 1, 4]);
  });
  test('immutableDelete', () => {
    expect(immutableArray.immutableDelete(target, 3)).toEqual([1, 3, 2, 4]);
  });
});
