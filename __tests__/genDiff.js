import path from 'path';
import genDiff from '../src';
import resultRecursive from '../__fixtures__/resultRecursive';
import resultPlane from '../__fixtures__/resultPlane';

const formats = ['json', 'yml', 'ini'];
const fixturesPath = '__fixtures__';

const nestedTestTable = formats.map((format) => [
  format,
  path.join(fixturesPath, `beforeNested.${format}`),
  path.join(fixturesPath, `afterNested.${format}`),
]);

test.each(nestedTestTable)('compare with recursive format: %s', (format, path1, path2) => {
  expect(genDiff(path1, path2)).toEqual(resultRecursive);
});

test.each(nestedTestTable)('compare with plane format: %s', (format, path1, path2) => {
  expect(genDiff(path1, path2, 'plane')).toEqual(resultPlane);
});
