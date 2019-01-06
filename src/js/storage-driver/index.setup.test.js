const storage = require('./');
import {implementedTypes as backendTestTypes} from './backend/index.all.test.js';
const fs = jest.genMockFromModule('fs');

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

  backendTestTypes.map(config => {
    test(config.type, () => {
      expect(storage.setup(config)).toBeTruthy();
      expect(storage.getStorageConfig().type).toBe(config.type);
    });
  });
});
