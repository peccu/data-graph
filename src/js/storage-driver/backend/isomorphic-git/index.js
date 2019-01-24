import FS from '../fs/';
import BrowserFS from '../browserfs/';
const git = require('isomorphic-git');

// https://www.mikedoesweb.com/2017/dynamic-super-classes-extends-in-es6/
const IsomorphicGit = function(config = {}){
  if(!new.target){
    throw 'Uncaught TypeError: Class constructor IsomorphicGit cannot be invoked without \'new\'';
  }
  if(config.backend === 'fs'){
    class IsomorphicGit extends FS {
      constructor(config){
        super(config);
        git.plugins.set('fs', this.fs);
      }
    };
    return new IsomorphicGit(config);
  }

  class IsomorphicGit extends BrowserFS {
    constructor(config){
      super(config);
      git.plugins.set('fs', this.fs);
    }
  };
  return new IsomorphicGit(config);
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

export default IsomorphicGit;
