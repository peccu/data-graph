import mkdirP from './mkdir-p';
const fs = jest.genMockFromModule('fs');
const targets = [
  ['./', './'],
  ['', './'],
  ['./data/test/', './data/test'],
  ['data/test/', './data/test'],
  ['/foo/bar/baz/data-graph/data/test/', '/foo/bar/baz/data-graph/data/test'],
  ['./data/test', './data/test'],
  ['././data/test', './data/test'],
  ['././data/./test', './data/test'],
  ['data/test', './data/test'],
  ['/foo/bar/baz/data-graph/data/test/', '/foo/bar/baz/data-graph/data/test'],
  ['/foo/bar/baz/./data-graph/data/test/', '/foo/bar/baz/data-graph/data/test'],
  ['../data/test', './data/test'],
  ['/foo/bar/baz/data-graph/src/js/../../data/test/', '/foo/bar/baz/data-graph/data/test'],
];

describe('mkdir -p', () => {
  targets.map(path => {
    test(path[0], () => {
      expect(mkdirP(fs, path[0])).toBe(path[1]);
    });
  });
});
