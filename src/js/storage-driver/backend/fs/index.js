import uuid from '../../uuid';
import DataRelations from '../../../data-relations';
import Backend from '../';
import {default as mkdirP, normalize, resolveDoubleDots} from './mkdir-p';

const nodePath = (wd, id) => wd + '/' + id + '.node';
// TODO type will include utf-8 characters. need to be hash
const relationPath = (wd, src, dest, type) => wd + '/' + src + '/' + type + '.' + dest;
const relationDirPath = (wd, id) => wd + '/' + id;

export default class FSBackend extends Backend {
  _nodePath(id){
    return nodePath(this.wd, id);
  }

  _relationPath(src, dest, type){
    return relationPath(this.wd, src, dest, type);
  }

  _setupWd(config){
    let wd = './';
    if(config && config.hasOwnProperty('wd')){
      wd = config.wd;
    }
    return resolveDoubleDots(normalize(wd));
  }

  _ensureWd(){
    if(!this.fs.existsSync(this.wd)){
      mkdirP(this.fs, this.wd);
    }
  }

  constructor(config){
    super(config);
    this.wd = this._setupWd(config);
    this.fs = require('fs');
  }

  addNode(content){
    this._ensureWd();
    const id = uuid();
    this.fs.writeFileSync(this._nodePath(id), content);
    let contents = this.fs.readFileSync(this._nodePath(id));
    return id;
  };

  getNode(id){
    this._ensureWd();
    let contents = this.fs.readFileSync(this._nodePath(id));
    return contents.toString();
  };

  updateNode(id, content){
    this._ensureWd();
    this.fs.writeFileSync(this._nodePath(id), content);
    let contents = this.fs.readFileSync(this._nodePath(id));
    return id;
  };

  removeNode(id){
    this._ensureWd();
    this.fs.unlinkSync(this._nodePath(id));
    return true;
  };

  _addRelation(src, dest, type){
    if(!this.fs.existsSync(relationDirPath(this.wd, src))){
      mkdirP(this.fs, relationDirPath(this.wd, src));
    }
    if(this.fs.existsSync(this._relationPath(src, dest, type))){
      return true;
    }
    this.fs.writeFileSync(this._relationPath(src, dest, type), '');
    return true;
  };

  _setWeight(src, dest, type, weight){
    this._addRelation(src, dest, type);
    if(this.fs.existsSync(this._relationPath(src, dest, type))){
      let contents = this.fs.readFileSync(this._relationPath(src, dest, type));
    }
    if(!weight){
      return true;
    }
    this.fs.writeFileSync(this._relationPath(src, dest, type), weight);
    return true;
  }

  addRelation(src, dest, type, weight){
    this._ensureWd();
    if(!this._setWeight(src, dest, type, weight)){
      return false;
    }
    return this._setWeight(dest, src, DataRelations[type], weight);
  };

  getRelations(src, type){
    this._ensureWd();
    if(!this.fs.existsSync(relationDirPath(this.wd, src))){
      mkdirP(this.fs, relationDirPath(this.wd, src));
      return {
        id: src,
        type: type,
        relations: []
      };
    }
    let files = this.fs.readdirSync(relationDirPath(this.wd, src));
    const typePrefix = new RegExp('^' + type + '\.');
    let relations = files.filter(e => {
      return e.match(typePrefix);
    }).map(e => {
      const dest = e.replace(typePrefix, '');
      let weight = '';
      if(this.fs.existsSync(this._relationPath(src, dest, type))){
        weight = this.fs.readFileSync(this._relationPath(src, dest, type)).toString();
      }
      return {
        id: dest,
        weight: weight
      };
    });
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
    if(!this.fs.existsSync(this._relationPath(src, dest, type))){
      console.warn('there are no relation about this', [src, dest, type]);
      return false;
    }
    this.fs.unlinkSync(this._relationPath(src, dest, type));
    let files = this.fs.readdirSync(relationDirPath(this.wd, src));
    if(files.length === 0){
      this.fs.rmdirSync(relationDirPath(this.wd, src));
    }
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
