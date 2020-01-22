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

const isObject = (data) => typeof data === 'object';

const stringify = (data) => {
  const keys = Object.keys(data);
  return keys.reduce((acc, key) => {
    if (isObject(data[key])) {
      return [...acc, [' ', key, stringify(data[key])]];
    }
    return [...acc, [' ', key, data[key]]];
  }, []);
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
          children,
        ]];
      }

      if (value1 === value2) {
        return [...acc, [' ', key, value1]];
      }

      return [...acc,
        ['+', key, value2, isObject(value2) ? stringify(value2) : []],
        ['-', key, value1, isObject(value1) ? stringify(value1) : []],
      ];
    }
    if (!keys1.includes(key)) {
      if (isObject(data2[key])) {
        return [...acc, ['+', key, value2, stringify(data2[key])]];
      }
      return [...acc, ['+', key, data2[key]]];
    }
    if (!keys2.includes(key)) {
      if (isObject(data1[key])) {
        return [...acc, ['-', key, value1, stringify(data1[key])]];
      }
      return [...acc, ['-', key, data1[key]]];
    }
    return null;
  };

  const ast = keys.reduce(buildAST, []);
  return ast;
};

const format = (ast) => {
  const iter = (lines, level) => lines.map((line) => {
    const baseOffset = ' '.repeat(2);
    const offset = baseOffset + baseOffset.repeat(level);
    const [sign, key, value, children] = line;

    if (children && children.length > 0) {
      const childrenStrings = iter(children, level + 2);
      return `\n${offset}${sign} ${key}: {${childrenStrings}\n${offset}  }`;
    }

    return `\n${offset}${sign} ${key}: ${value}`;
  });

  const result = iter(ast, 0);

  const start = '{';
  const end = '\n}';

  return `${start}${result.join('')}${end}`;
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
