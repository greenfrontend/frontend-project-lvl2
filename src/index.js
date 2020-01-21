import fs from 'fs';
import path from 'path';
import { difference } from 'lodash';
import parseFile from "./parsers";

const readFile = (filePath) => {
  const fileFormat = path.extname(filePath).slice(1);
  const absolutePath = path.join(process.cwd(), filePath);
  const content = fs.readFileSync(absolutePath);
  return [content.toString(), fileFormat];
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

  const addedKeys = difference(keys2, keys1)
    .map((key) => ['+', key, data2[key]]);

  return [...changedKeys, ...addedKeys];
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

export default (path1, path2) => {
  const [content1, format1] = readFile(path1);
  const [content2, format2] = readFile(path2);

  const data1 = parseFile(content1, format1);
  const data2 = parseFile(content2, format2);

  const differenceInFiles = compare(data1, data2);
  const result = format(differenceInFiles);

  return result;
};
