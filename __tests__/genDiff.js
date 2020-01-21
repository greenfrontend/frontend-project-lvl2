import path from 'path';
import genDiff from '../src/'

test('compare flat json files', () => {

  const fixturesPath = `__fixtures__`;

  const path1 = path.join(fixturesPath, 'before.json');
  const path2 = path.join(fixturesPath, 'after.json');

  const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

  expect(genDiff(path1, path2)).toEqual(result)
});
