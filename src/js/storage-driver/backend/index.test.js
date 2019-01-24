import Backend from './';
describe('Plain Backend', () => {
  let storage;
  const first = 'dummyId';
  const second = 'dummyId2';
  const content = 'dummy Content';
  beforeEach(() => {
    storage = new Backend();
  });
  test('add node with content should be truthy', () => {
    expect(() => storage.addNode('some content')).toThrow('not implemented');
  });
  test('get node by id', () => {
    expect(() => storage.getNode(first)).toThrow('not implemented');
  });
  test('update node by id with content', () => {
    expect(() => storage.updateNode(first, content)).toThrow('not implemented');
  });
  test('remove node by id', () => {
    expect(() => storage.removeNode(first)).toThrow('not implemented');
  });
  test('add relation from id to id on type', () => {
    expect(() => storage.addRelation(first, second, 'child')).toThrow('not implemented');
  });
  test('get child nodes from id with type', () => {
    expect(() => storage.getRelations(first, 'child')).toThrow('not implemented');
  });
  test('exists inverse relation', () => {
    expect(() => storage.getRelations(second, 'parent')).toThrow('not implemented');
  });
  test('remove relation from id to id on type', () => {
    expect(() => storage.removeRelation(first, second, 'child')).toThrow('not implemented');
  });
});
