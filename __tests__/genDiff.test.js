import genDiff from "../src/gendiff";

test('compare plane files', () => {
  const before = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  };

  const after = {
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
  };

  const beforeJSON = JSON.stringify(before);
  const afterJSON = JSON.stringify(after);

  const result = `{
      host: hexlet.io
    + timeout: 20
    - timeout: 50
    - proxy: 123.234.53.22
    + verbose: true
    - follow: false
  }`;

  expect(genDiff(beforeJSON, afterJSON)).toEqual(result);
});
