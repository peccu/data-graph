const storage = require('./');
describe('getStorageInfo', () => {

  test('type is null', () => {
    expect(storage.getStorageInfo()).toBeFalsy();
  });
  test('type is blank', () => {
    expect(storage.getStorageInfo('')).toBeFalsy();
  });
  test('get non activted storage info', () => {
    expect(storage.getStorageInfo('not activated')).toBeFalsy();
  });
  test('get storage info isomorphic-git', () => {
    expect(storage.getStorageInfo('isomorphic-git'))
      .toEqual({
        type: 'isomorphic-git',
        configure: {
          params: [{
            key: 'repo',
            name: 'URL',
            description: 'Repository URL',
            type: 'url',
            required: true
          },{
            key: 'user',
            name: 'Username',
            description: 'Repository username',
            type: 'text',
            required: false
          },{
            key: 'pass',
            name: 'Password',
            description: 'Repository password',
            type: 'password',
            required: false
          },{
            key: 'wd',
            name: 'Working Directory',
            description: 'Working Directory used in BrowserFS',
            type: 'text',
            default: '/',
            required: false
          },{
            key: 'backend',
            name: 'Backend FS',
            description: '',
            type: 'Selection',
            selection: [
              'IndexedDB',
              'fs'
            ],
            inferit: 'browserfs',
            required: false
          }]
        }
      });
  });
  test('get storage info browserfs', () => {
    expect(storage.getStorageInfo('browserfs'))
      .toEqual({
        type: 'browserfs',
        configure: {
          params: [{
            key: 'wd',
            name: 'Working Directory',
            description: 'Working Directory used in BrowserFS',
            type: 'text',
            default: '/',
            required: false
          },{
            key: 'backend',
            name: 'Backend FS',
            description: '',
            type: 'Selection',
            selection: [
              'IndexedDB',
              'fs',
              'LocalStorage'
            ],
            required: true
          }]
        }
      });
  });

});
