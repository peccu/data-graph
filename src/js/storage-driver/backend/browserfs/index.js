import uuid from '../../uuid';
import DataRelations from '../../../data-relations';
import BrowserFS from 'browserfs';
import Backend from '../';
// import fs from 'fs';

export default class BrowserFSBackend extends Backend {
  nodePath(id){
    return this.wd + id + '.node';
  }

  relationPath(id, type){
    return this.wd + id + '/' + type + '.relations';
  }

  constructor(config){
    console.log('config', config);
    super(config);
    this.wd = '/';
    if(config && config.hasOwnProperty('wd')){
      this.wd = config.wd;
    }
    if(!this.wd.match(/\/$/)){
      this.wd += '/';
    }
    if(typeof(window) === 'undefined'){
      this.fs = require('fs');
      this.wd = './data' + this.wd;
    }else{
      // BrowserFS.configure({ fs: "IndexedDB", options: {} }, function (err) {
      //   if (err) return console.log(err);
      //   window.fs = BrowserFS.BFSRequire("fs");
      //   git.plugins.set('fs', window.fs);
      // });
      BrowserFS.configure({
        fs: "LocalStorage"
      }, function(e) {
        if (e) {
          // An error happened!
          throw e;
        }
        // Otherwise, BrowserFS is ready-to-use!
      });
      this.fs = BrowserFS.BFSRequire('fs');
    }
    console.log('wd', [this.wd]);
    if(!this.fs.existsSync(this.wd)){
      console.log('creating directory', this.wd);
      this.fs.mkdirSync(this.wd, 0o777);
    }
  }

  addNode(content){
    const id = uuid();
    console.log('uuid', id);
    this.fs.writeFileSync(this.nodePath(id), content);
    let contents = this.fs.readFileSync(this.nodePath(id));
    console.log(contents.toString());
    return id;
  };

  getNode(id){
    let contents = this.fs.readFileSync(this.nodePath(id));
    console.log(contents.toString());
    return contents.toString();
  };

  updateNode(id, content){
    this.fs.writeFileSync(this.nodePath(id), content);
    let contents = this.fs.readFileSync(this.nodePath(id));
    console.log(contents.toString());
    return id;
  };

  removeNode(id){
    this.fs.unlinkSync(this.nodePath(id));
    return true;
  };

  _addRelation(src, dest, type){
    if(!this.fs.existsSync(this.wd + src)){
      console.log('creating directory', this.wd + src);
      this.fs.mkdirSync(this.wd + src, 0o777);
    }
    let relations = [];
    if(this.fs.existsSync(this.relationPath(src, type))){
      let contents = this.fs.readFileSync(this.relationPath(src, type));
      console.log(contents.toString());
      relations = (contents.length > 0) ? contents.toString().split(/\n/) : [];
      if(relations.indexOf(dest) === -1){
        console.warn('already has relation', [src, dest, type]);
        return false;
      }
    }
    relations.push(dest);
    this.fs.writeFileSync(this.relationPath(src, type), relations.join('\n'));
    console.log('add relation', [src, dest, type]);
    return true;
  }

  addRelation(src, dest, type){
    if(!this._addRelation(src, dest, type)){
      return false;
    }
    return this._addRelation(dest, src, DataRelations[type]);
  };

  getRelation(src, type){
    if(!this.fs.existsSync(this.wd + src)){
      console.log('creating directory', this.wd + src);
      this.fs.mkdirSync(this.wd + src, 0o777);
    }
    let relations = [];
    if(this.fs.existsSync(this.relationPath(src, type))){
      let contents = this.fs.readFileSync(this.relationPath(src, type));
      console.log(contents.toString());
      relations = (contents.length > 0) ? contents.toString().split(/\n/) : [];
    }
    return {
      id: src,
      type: type,
      relations: relations
    };
  };

  _removeRelation(src, dest, type){
    if(!this.fs.existsSync(this.wd + src)){
      console.warn('there are no relations', [src, dest, type]);
      return false;
    }
    let contents = this.fs.readFileSync(this.relationPath(src, type));
    console.log(contents.toString());
    let relations = contents.toString().split(/\n/);
    let index = relations.indexOf(dest);
    if(index === -1){
      console.warn('there are no relation about this', [src, dest, type]);
      return false;
    }
    relations.splice(index, 1);
    this.fs.writeFileSync(this.relationPath(src, type), relations.join('\n'));
    return dest;
  };

  removeRelation(src, dest, type){
    if(!this._removeRelation(src, dest, type)){
      return false;
    }
    return this._removeRelation(dest, src, DataRelations[type]);
  };
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
        'fs'
      ],
      required: true
    }]
  }
};
