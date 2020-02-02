import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const fixturesPath = '__fixtures__';
const formats = ['json', 'yml', 'ini'];

const nestedTestTable = formats.map((format) => [
  format,
  path.join(fixturesPath, `before.${format}`),
  path.join(fixturesPath, `after.${format}`),
]);

test.each(nestedTestTable)('compare with recursive format: %s', (format, path1, path2) => {
  const resultRecursive = fs.readFileSync(path.join(fixturesPath, 'resultRecursive.txt'), 'utf-8');
  expect(genDiff(path1, path2)).toEqual(resultRecursive);
});

//
// test.each(nestedTestTable)('compare with plane format: %s', (format, path1, path2) => {
//   expect(genDiff(path1, path2, 'plane')).toEqual(resultPlane);
// });
//
//
// test.each(nestedTestTable)('compare with json format: %s', (format, path1, path2) => {
//   expect(genDiff(path1, path2, 'json')).toEqual(resultJson);
// });
