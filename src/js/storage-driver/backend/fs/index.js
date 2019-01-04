import uuid from '../../uuid';
import DataRelations from '../../../data-relations';
import Backend from '../';
import {default as mkdirP, normalize, resolveDoubleDots} from './mkdir-p';

const nodePath = (wd, id) => wd + '/' + id + '.node';
// TODO type will include utf-8 characters. need to be hash
const relationPath = (wd, id, type) => wd + '/' + id + '/' + type + '.relations';
const relationDirPath = (wd, id) => wd + '/' + id;

export default class FSBackend extends Backend {
  _nodePath(id){
    return nodePath(this.wd, id);
  }

  _relationPath(id, type){
    return relationPath(this.wd, id, type);
  }

  _setupWd(config){
    let wd = './';
    if(config && config.hasOwnProperty('wd')){
      wd = config.wd;
    }
    return resolveDoubleDots(normalize(wd));
  }

  _ensureWd(){
    console.log('wd', [this.wd]);
    if(!this.fs.existsSync(this.wd)){
      console.log('creating directory', this.wd);
      mkdirP(this.fs, this.wd);
    }
  }

  constructor(config){
    console.log('config', config);
    super(config);
    this.wd = this._setupWd(config);
    this.fs = require('fs');
  }

  addNode(content){
    this._ensureWd();
    const id = uuid();
    console.log('uuid', id);
    this.fs.writeFileSync(this._nodePath(id), content);
    let contents = this.fs.readFileSync(this._nodePath(id));
    console.log(contents.toString());
    return id;
  };

  getNode(id){
    this._ensureWd();
    let contents = this.fs.readFileSync(this._nodePath(id));
    console.log(contents.toString());
    return contents.toString();
  };

  updateNode(id, content){
    this._ensureWd();
    this.fs.writeFileSync(this._nodePath(id), content);
    let contents = this.fs.readFileSync(this._nodePath(id));
    console.log(contents.toString());
    return id;
  };

  removeNode(id){
    this._ensureWd();
    this.fs.unlinkSync(this._nodePath(id));
    return true;
  };

  _addRelation(src, dest, type){
    if(!this.fs.existsSync(relationDirPath(this.wd, src))){
      console.log('creating directory', relationDirPath(this.wd, src));
      mkdirP(this.fs, relationDirPath(this.wd, src));
    }
    let relations = [];
    if(this.fs.existsSync(this._relationPath(src, type))){
      let contents = this.fs.readFileSync(this._relationPath(src, type));
      console.log(contents.toString());
      relations = (contents.length > 0) ? contents.toString().split(/\n/) : [];
      if(relations.indexOf(dest) === -1){
        console.warn('already has relation', [src, dest, type]);
        return false;
      }
    }
    relations.push(dest);
    this.fs.writeFileSync(this._relationPath(src, type), relations.join('\n'));
    console.log('add relation', [src, dest, type]);
    return true;
  }

  addRelation(src, dest, type){
    this._ensureWd();
    if(!this._addRelation(src, dest, type)){
      return false;
    }
    return this._addRelation(dest, src, DataRelations[type]);
  };

  getRelation(src, type){
    this._ensureWd();
    if(!this.fs.existsSync(relationDirPath(this.wd, src))){
      console.log('creating directory', relationDirPath(this.wd, src));
      mkdirP(this.fs, relationDirPath(this.wd, src));
    }
    let relations = [];
    if(this.fs.existsSync(this._relationPath(src, type))){
      let contents = this.fs.readFileSync(this._relationPath(src, type));
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
    if(!this.fs.existsSync(relationDirPath(this.wd, src))){
      console.warn('there are no relations', [src, dest, type]);
      return false;
    }
    let contents = this.fs.readFileSync(this._relationPath(src, type));
    console.log(contents.toString());
    let relations = contents.toString().split(/\n/);
    let index = relations.indexOf(dest);
    if(index === -1){
      console.warn('there are no relation about this', [src, dest, type]);
      return false;
    }
    relations.splice(index, 1);
    this.fs.writeFileSync(this._relationPath(src, type), relations.join('\n'));
    return dest;
  };

  removeRelation(src, dest, type){
    this._ensureWd();
    if(!this._removeRelation(src, dest, type)){
      return false;
    }
    return this._removeRelation(dest, src, DataRelations[type]);
  };
};

FSBackend.info = {
  type: 'fs',
  configure: {
    params: [{
      key: 'wd',
      name: 'Working Directory',
      description: 'Working Directory used in BrowserFS',
      type: 'text',
      default: '/',
      required: false
    }]
  }
};
