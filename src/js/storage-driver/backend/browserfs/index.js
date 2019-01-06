import FSBackend from '../fs';

export default class BrowserFSBackend extends FSBackend {
  constructor(config){
    super(config);
    this.wd = this._setupWd(config);
    if(typeof(window) === 'undefined'){
      console.warn('Do you want to use browserfs in non browser?');
      return;
    }
    const BrowserFS = require('browserfs');
    BrowserFS.install(window);
    BrowserFS.configure({
      fs: config.backend
    }, function(e){
      if(e){
        // An error happened!
        throw e;
      }
      // Otherwise, BrowserFS is ready-to-use!
    });
    this.fs = BrowserFS.BFSRequire('fs');
  }
};

BrowserFSBackend.info = {
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
};
