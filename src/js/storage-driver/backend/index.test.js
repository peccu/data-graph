const storage = require('../');
let implementedTypes = [
  // 'isomorphic-git',
  'browserfs'
];

const testByType = type => {
  describe(type, () => {
    beforeEach(() => {
      storage.setup({type: type, wd: '/test/'});
    });
    test('add node with content should be truthy', () => {
      expect(storage.addNode('some content')).toBeTruthy();
    });
    test('add node with content', () => {
      let first = storage.addNode('some content');
      let second = storage.addNode('some next content');
      expect(first).not.toBe(second);
    });
    test('get node by id', () => {
      let content = 'some content';
      let first = storage.addNode(content);
      expect(storage.getNode(first)).toBe(content);
    });
    test('update node by id with content', () => {
      let first = storage.addNode('some content');
      let content = 'updated content';
      expect(storage.updateNode(first, content)).not.toBeNull();
      expect(storage.getNode(first)).toBe(content);
    });
    test('remove node by id', () => {
      let content = 'some content';
      let first = storage.addNode(content);
      expect(storage.getNode(first)).toBe(content);
      expect(storage.removeNode(first)).toBeTruthy();
      expect(() => storage.getNode(first)).toThrow();
    });
    test('add relation from id to id on type', () => {
      let first = storage.addNode('some content');
      let second = storage.addNode('some next content');
      expect(storage.addRelation(first, second, 'child')).toBeTruthy();
    });
    test('get child nodes from id with type', () => {
      let first = storage.addNode('some content');
      let second = storage.addNode('some next content');
      storage.addRelation(first, second, 'child');
      expect(storage.getRelation(first, 'child')).toEqual({
        id: first,
        type: 'child',
        relations: [
          second
        ]
      });
    });
    test('exists inverse relation', () => {
      let first = storage.addNode('some content');
      let second = storage.addNode('some next content');
      storage.addRelation(first, second, 'child');
      expect(storage.getRelation(second, 'parent')).toEqual({
        id: second,
        type: 'parent',
        relations: [
          first
        ]
      });
    });
    test('remove relation from id to id on type', () => {
      let first = storage.addNode('some content');
      let second = storage.addNode('some next content');
      storage.addRelation(first, second, 'child');
      expect(storage.removeRelation(first, second, 'child')).toBeTruthy();
      expect(storage.getRelation(first, 'child')).toEqual({
        id: first,
        type: 'child',
        relations: []
      });
      expect(storage.getRelation(second, 'parent')).toEqual({
        id: second,
        type: 'parent',
        relations: []
      });
    });
  });
};

implementedTypes.map(testByType);
