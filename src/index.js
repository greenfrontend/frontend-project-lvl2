import fs from 'fs';

const readFile = (path) => {
  const content = fs.readFileSync(path);
  return content.toString();
};

const parseFile = (content) => {
  const data = JSON.parse(content);
  return data;
};

const format = (lines) => {
  const lineBreak = '\n';
  const offset = ' '.repeat(2);

  const result = lines.map((line) => {
    const [sign, key, value] = line;
    const string = `${sign} ${key}: ${value}`;
    return `${offset}${string}${lineBreak}`;
  });

  return `{\n${result.join('')}}`;
};

const compare = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const changedKeys = keys1
    .reduce((acc, key) => {
      const value1 = data1[key];
      const value2 = data2[key];

      if (!keys2.includes(key)) {
        return [...acc, ['-', key, value1]];
      }

      if (value1 === value2) {
        return [...acc, [' ', key, value1]];
      }
      return [...acc,
        ['+', key, value2],
        ['-', key, value1],
      ];
    }, []);

  const addedKeys = keys2
    .reduce((acc, key) => ((!keys1.includes(key))
      ? [...acc, ['+', key, data2[key]]]
      : acc), []);

  return [...changedKeys, ...addedKeys];
};

export default (path1, path2) => {
  const content1 = readFile(path1);
  const content2 = readFile(path2);

  const data1 = parseFile(content1);
  const data2 = parseFile(content2);

  const difference = compare(data1, data2);
  const result = format(difference);

  return result;
};
