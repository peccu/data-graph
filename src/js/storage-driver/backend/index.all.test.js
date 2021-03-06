import BrowserFSBackend from './browserfs';
import FSBackend from './fs';
import IsomorphicGitBackend from './isomorphic-git';
const fs = jest.genMockFromModule('fs');

export let implementedTypes = [{
  storage: IsomorphicGitBackend,
  type: 'isomorphic-git',
  repo: 'https://github.com/peccu/data-graph-data.git',
  backend: 'fs',
  wd: './data/test/'
},{
  storage: BrowserFSBackend,
  type: 'browserfs',
  backend: 'IndexedDB',
  wd: './data/test/'
},{
  storage: FSBackend,
  type: 'fs',
  wd: './data/test/'
}];

const testByType = conf => {
  let storageBackend = conf.storage;
  describe(conf.type, () => {
    let storage;
    beforeEach(() => {
      storage = new storageBackend(conf);
    });
    describe('node management', () => {
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
    });

    describe('relation management', () => {
      test('add relation from id to id on type', () => {
        let first = storage.addNode('some content');
        let second = storage.addNode('some next content');
        expect(storage.addRelation(first, second, 'child')).toBeTruthy();
      });
      test('get child nodes from id with type', () => {
        let first = storage.addNode('some content');
        let second = storage.addNode('some next content');
        storage.addRelation(first, second, 'child');
        expect(storage.getRelations(first, 'child')).toEqual({
          id: first,
          type: 'child',
          relations: [
            {
              id: second,
              weight: ''
            }
          ]
        });
      });
      test('exists inverse relation', () => {
        let first = storage.addNode('some content');
        let second = storage.addNode('some next content');
        storage.addRelation(first, second, 'child');
        expect(storage.getRelations(second, 'parent')).toEqual({
          id: second,
          type: 'parent',
          relations: [
            {
              id: first,
              weight: ''
            }
          ]
        });
      });
      test('set weight to the relation', () => {
        let first = storage.addNode('some content');
        let second = storage.addNode('some next content');
        storage.addRelation(first, second, 'child');
        expect(storage.addRelation(first, second, 'child', 100)).toBeTruthy();
        expect(storage.getRelations(first, 'child')).toEqual({
          id: first,
          type: 'child',
          relations: [
            {
              id: second,
              weight: '100'
            }
          ]
        });
        expect(storage.getRelations(second, 'parent')).toEqual({
          id: second,
          type: 'parent',
          relations: [
            {
              id: first,
              weight: '100'
            }
          ]
        });

      });
      test('overwrite weight to the relation', () => {
        let first = storage.addNode('some content');
        let second = storage.addNode('some next content');
        storage.addRelation(first, second, 'child');
        expect(storage.addRelation(first, second, 'child', 100)).toBeTruthy();
        expect(storage.addRelation(first, second, 'child', 200)).toBeTruthy();
        expect(storage.getRelations(first, 'child')).toEqual({
          id: first,
          type: 'child',
          relations: [
            {
              id: second,
              weight: '200'
            }
          ]
        });
        expect(storage.getRelations(second, 'parent')).toEqual({
          id: second,
          type: 'parent',
          relations: [
            {
              id: first,
              weight: '200'
            }
          ]
        });

      });
      test('remove relation from id to id on type', () => {
        let first = storage.addNode('some content');
        let second = storage.addNode('some next content');
        storage.addRelation(first, second, 'child');
        expect(storage.removeRelation(first, second, 'child')).toBeTruthy();
        expect(storage.getRelations(first, 'child')).toEqual({
          id: first,
          type: 'child',
          relations: []
        });
        expect(storage.getRelations(second, 'parent')).toEqual({
          id: second,
          type: 'parent',
          relations: []
        });
      });
    });
  });
};

implementedTypes.map(testByType);
