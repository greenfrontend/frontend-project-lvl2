import path from 'path';
import genDiff from '../src';
import resultFlat from '../__fixtures__/resultFlat';
import resultNested from '../__fixtures__/resultNested';

const formats = ['json', 'yml', 'ini'];
const fixturesPath = '__fixtures__';

// const testTable = formats.map((format) => [
//   format,
//   path.join(fixturesPath, `before.${format}`),
//   path.join(fixturesPath, `after.${format}`),
// ]);
//
// test.each(testTable)('compare files %s', (format, path1, path2) => {
//   expect(genDiff(path1, path2)).toEqual(resultFlat);
// });

test('compare nested files', () => {
  const path1 = path.join(fixturesPath, `beforeNested.json`);
  const path2 = path.join(fixturesPath, `afterNested.json`);

  expect(genDiff(path1, path2)).toEqual(resultNested)
});

// test('compare nested files', () => {
//   const path1 = path.join(fixturesPath, `before.json`);
//   const path2 = path.join(fixturesPath, `after.json`);
//
//   expect(genDiff(path1, path2)).toEqual(resultFlat)
// });
