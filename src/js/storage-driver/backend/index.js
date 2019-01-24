export default class Backend {
  constructor(){
  }

  notImplemented(){
    throw new Error('not implemented');
  };

  addNode(content){
    this.notImplemented();
  };

  getNode(id){
    this.notImplemented();
  };

  updateNode(id, content){
    this.notImplemented();
  };

  removeNode(id){
    this.notImplemented();
  };

  addRelation(src, dest, type){
    this.notImplemented();
  };

  getRelations(src, type){
    this.notImplemented();
  };

  removeRelation(src, dest, type){
    this.notImplemented();
  };
};
