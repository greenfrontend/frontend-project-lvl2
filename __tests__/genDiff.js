import path from 'path';
import genDiff from '../src';
import result from '../__fixtures__/flatResult';

test('compare flat json files', () => {
  const fixturesPath = '__fixtures__';
  const path1 = path.join(fixturesPath, 'before.json');
  const path2 = path.join(fixturesPath, 'after.json');

  expect(genDiff(path1, path2)).toEqual(result);
});

test('compare flat yml files', () => {
  const fixturesPath = '__fixtures__';
  const path1 = path.join(fixturesPath, 'before.yml');
  const path2 = path.join(fixturesPath, 'after.yml');

  expect(genDiff(path1, path2)).toEqual(result);
});
