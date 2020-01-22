import fs from 'fs';
import path from 'path';
import { has, union } from 'lodash';
import parseFile from './parsers';

const readFile = (filePath) => {
  const fileFormat = path.extname(filePath).slice(1);
  const absolutePath = path.join(process.cwd(), filePath);
  const content = fs.readFileSync(absolutePath);
  return [content.toString(), fileFormat];
};

// status: ADDED, REMOVED, CHANGED, UNCHANGED
// ['status', 'key', 'value', 'children?']

const isObject = (data) => typeof data === "object";

const stringify = (data) => {
  const keys = Object.keys(data);
  return keys.reduce((acc, key) => {
    if (isObject(data[key])) {
      return [...acc, [' ', key, stringify(data[key])]]
    }
    return [...acc, [' ', key, data[key]]];
  }, [])
};

const compare = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = union(keys1, keys2);

  const buildAST = (acc, key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (has(data1, key) && has(data2, key)) {
      if (isObject(value1) && isObject(value2)) {
        const children = compare(value1, value2);
        return [...acc, [
          ' ',
          key,
          value1,
          children
        ]]
      }
      if (value1 === value2) {
        return [...acc, [' ', key, value1]]
      } else {
        return [...acc,
          ['+', key, value2, isObject(value2) ? stringify(value2) : []],
          ['-', key, value1, isObject(value1) ? stringify(value1) : []]
        ]
      }
    }
    if (!keys1.includes(key)) {
      if (isObject(data2[key])) {
        return [...acc, ['+', key, stringify(data2[key])]]
      }
      return [...acc, ['+', key, data2[key]]]
    }
    if (!keys2.includes(key)) {
      if (isObject(data1[key])) {
        return [...acc, ['-', key, stringify(data1[key])]]
      }
      return [...acc, ['-', key, data1[key]]]
    }
  };

  const ast = keys.reduce(buildAST, []);
  return ast;
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
