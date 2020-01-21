import path from 'path';
import genDiff from '../src';
import result from '../__fixtures__/flatResult';

const formats = ['json', 'yml', 'ini'];
const fixturesPath = '__fixtures__';

const testTable = formats.map((format) => [
  format,
  path.join(fixturesPath, `before.${format}`),
  path.join(fixturesPath, `after.${format}`),
]);

test.each(testTable)('compare files %s', (format, path1, path2) => {
  expect(genDiff(path1, path2)).toBe(result);
});
