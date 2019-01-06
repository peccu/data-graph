import BrowserFS from '../browserfs/';
export default class IsomorphicGit extends BrowserFS {
  constructor(config){
    super();
    this.notImplemented();
  }
};

IsomorphicGit.info = {
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
      description: 'fs or BrowserFS(IndexedDB, LocalStorage, or so)',
      type: 'Selection',
      selection: [
        'IndexedDB',
        'LocalStorage',
        'fs'
      ],
      inferit: 'browserfs',
      required: false
    }]
  }
};
