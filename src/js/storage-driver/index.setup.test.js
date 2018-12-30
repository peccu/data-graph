const storage = require('./');
describe('setup', () => {
  test('null', () => {
    expect(storage.setup()).toBeFalsy();
  });
  test('no type', () => {
    expect(storage.setup({repo: 'some url'})).toBeFalsy();
  });
  test('non existing type', () => {
    const config = {
      type: 'not found'
    };
    expect(storage.setup(config)).toBeFalsy();
  });
  test.skip('isomorphic-git', () => {
    const config = {
      type: 'isomorphic-git',
      repo: 'https://github.com/peccu/data-graph.git',
    };
    expect(storage.setup(config)).toBeTruthy();
    expect(storage.getStorageConfig().type).toBe('isomorphic-git');
  });
  test('browserfs', () => {
    const config = {
      type: 'browserfs',
      backend: 'IndexedDB'
    };
    expect(storage.setup(config)).toBeTruthy();
    expect(storage.getStorageConfig().type).toBe('browserfs');
  });
});
