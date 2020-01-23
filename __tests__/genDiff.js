import path from 'path';
import genDiff from '../src';
import resultFlat from '../__fixtures__/resultFlat';
import resultNested from '../__fixtures__/resultNested';

const formats = ['json', 'yml', 'ini'];
const fixturesPath = '__fixtures__';

const flatTestTable = formats.map((format) => [
  format,
  path.join(fixturesPath, `before.${format}`),
  path.join(fixturesPath, `after.${format}`),
]);

const nestedTestTable = formats.map((format) => [
  format,
  path.join(fixturesPath, `beforeNested.${format}`),
  path.join(fixturesPath, `afterNested.${format}`),
]);

test.each(flatTestTable)('compare flat files %s', (format, path1, path2) => {
  expect(genDiff(path1, path2)).toEqual(resultFlat);
});

test.each(nestedTestTable)('compare nested files %s', (format, path1, path2) => {
  expect(genDiff(path1, path2)).toEqual(resultNested);
});
