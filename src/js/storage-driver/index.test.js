const storage = require('./');

describe('non initialized', () => {
  test('add node with content', () => {
    expect(() => storage.addNode('some content')).toThrow('not initialized');
  });
  test('get node by id', () => {
    expect(() => storage.getNode('1234567890')).toThrow('not initialized');
  });
  test('update node by id with content', () => {
    expect(() => storage.updateNode('1234567890', 'updated content')).toThrow('not initialized');
  });
  test('add relation from id to id on type', () => {
    expect(() => storage.addRelation('1234567890', '2345678901', 'child')).toThrow('not initialized');
  });
  test('get child nodes from id with type', () => {
    expect(() => storage.getRelations('1234567890', 'child')).toThrow('not initialized');
  });
  test('remove relation from id to id on type', () => {
    expect(() => storage.removeRelation('1234567890', '2345678901', 'child')).toThrow('not initialized');
    expect(() => storage.getRelations('1234567890', 'child')).toThrow('not initialized');
  });
  test('remove node by id', () => {
    expect(() => storage.removeNode('1234567890')).toThrow('not initialized');
  });
});

// for initialize
test('get current storage config', () => {
  expect(storage.getStorageConfig()).toEqual({
    type: null,
    storage: null,
    config: {}
  });
});

test('get activated storages', () => {
  expect(storage.getActiveStorage()).toContain('isomorphic-git');
  expect(storage.getActiveStorage()).toContain('browserfs');
  expect(storage.getActiveStorage()).toContain('fs');
  expect(storage.getActiveStorage()).toEqual([
    'isomorphic-git',
    'browserfs',
    'fs',
    // 'mongodb',
    // 'postgresql',
    // 'mysql',
    // 'mariadb',
    // 'redis',
    // 's3',
    // 'indexeddb'
  ]);
});

test.skip('sync', () => {
  expect();
});

// for root node informations
test.skip('get user info', () => {
  expect();
});
test.skip('get permission info', () => {
  expect();
});
test.skip('get group info', () => {
  expect();
});
test.skip('get root view info', () => {
  expect(storage.fetchViews()).toBe({
    view: 'tree',
    types: [                    // fetching types
      'child',
      'parent',
      'color',
      'meta'                    // This need to split specific types
    ],
    root: '1234567890',
  });
});
test.skip('get configure', () => {
  expect(storage.getConfigure()).toBe({
    views: {},
    keyBind: {},
    css: {},
    js: {}
  });
});
test.skip('update configure', () => {
  expect(storage.updateConfigure('keyBind', 'C-M-j', '(e) => {console.log(\'c-m-j typed!!\');}')).toBeTruthy();
});
