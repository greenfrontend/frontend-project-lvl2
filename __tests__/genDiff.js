import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const fixturesPath = '__fixtures__';
const formats = ['json', 'yml', 'ini'];
// const formats = ['json'];

const nestedTestTable = formats.map((format) => [
  format,
  path.join(fixturesPath, `before.${format}`),
  path.join(fixturesPath, `after.${format}`),
]);

test.each(nestedTestTable)('compare with recursive format: %s', (format, path1, path2) => {
  const resultRecursive = fs.readFileSync(path.join(fixturesPath, 'resultRecursive.txt'), 'utf-8');
  expect(genDiff(path1, path2)).toEqual(resultRecursive.trim());
});
//
//
// test.each(nestedTestTable)('compare with plain format: %s', (format, path1, path2) => {
//   const resultPlane = fs.readFileSync(path.join(fixturesPath, 'resultPlane.txt'), 'utf-8');
//   expect(genDiff(path1, path2, 'plain')).toEqual(resultPlane.trim());
// });
//
// test.each(nestedTestTable)('compare with json format: %s', (format, path1, path2) => {
//   const resultJson = fs.readFileSync(path.join(fixturesPath, 'resultJson.txt'), 'utf-8');
//   expect(genDiff(path1, path2, 'json')).toEqual(resultJson.trim());
// });
