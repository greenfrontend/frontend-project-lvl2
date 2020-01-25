import path from 'path';
import genDiff from '../src';
import resultRecursive from '../__fixtures__/resultRecursive';
import resultPlane from '../__fixtures__/resultPlane';
import resultJson from '../__fixtures__/resultJson';

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


test.each(nestedTestTable)('compare with json format: %s', (format, path1, path2) => {
  expect(genDiff(path1, path2, 'json')).toEqual(resultJson);
});
