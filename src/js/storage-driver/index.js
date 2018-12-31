import IsomorphicGit from './backend/isomorphic-git/';
import BrowserFS from './backend/browserfs/';
import FS from './backend/fs';

const storages = [
  IsomorphicGit,
  BrowserFS,
  FS
];

const getActiveStorage = () => storages.map(e => e.info.type);

const getStorage = (type) => {
  return storages.find(e => {
    return e.info.type === type;
  });
};

const getStorageInfo = (type) => {
  let found = getStorage(type);
  if(!found){
    return null;
  }
  return found.info;;
};

let current = {
  type: null,
  storage: null,
  config: {}
};

const setup = (config) => {
  if(!config || !config.type){
    return null;
  }
  let storageImpl = getStorage(config.type);
  if(!storageImpl){
    return null;
  }
  let storage = new storageImpl(config);
  if(!storage){
    return null;
  }
  current.type = config.type;
  current.storage = storage;
  current.config = config;
  return setup;
};

const getStorageConfig = () => current;

const assertStorage = () => {
  if(!current.type){
    throw new Error('not initialized');
  }
};
const addNode = (content) => {
  assertStorage();
  return current.storage.addNode(content);
};
const getNode = (id) => {
  assertStorage();
  return current.storage.getNode(id);
};
const updateNode = (id, content) => {
  assertStorage();
  return current.storage.updateNode(id, content);
};
const removeNode = (id) => {
  assertStorage();
  return current.storage.removeNode(id);
};
const addRelation = (src, dest, type) => {
  assertStorage();
  return current.storage.addRelation(src, dest, type);
};
const getRelation = (src, type) => {
  assertStorage();
  return current.storage.getRelation(src, type);
};
const removeRelation = (src, dest, type) => {
  assertStorage();
  return current.storage.removeRelation(src, dest, type);
};

export {
  getActiveStorage,
  getStorageInfo,
  setup,
  getStorageConfig,
  addNode,
  getNode,
  updateNode,
  removeNode,
  addRelation,
  getRelation,
  removeRelation
};
