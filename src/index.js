import fs from 'fs';
import path from 'path';
import { has, union } from 'lodash';
import parseFile from './parsers';
import format from './formatters';

const readFile = (filePath) => {
  const fileFormat = path.extname(filePath).slice(1);
  const absolutePath = path.join(process.cwd(), filePath);
  const content = fs.readFileSync(absolutePath);
  return [content.toString(), fileFormat];
};

const types = {
  flat: 'flat',
  nested: 'nested',
};

const statuses = {
  added: 'added',
  deleted: 'deleted',
  changed: 'changed',
  unchanged: 'unchanged',
};

const isObject = (data) => typeof data === 'object';

const stringify = (data) => {
  const keys = Object.keys(data);
  return keys.reduce((acc, key) => {
    const value = data[key];
    return [...acc, {
      type: isObject(value) ? types.nested : types.flat,
      status: statuses.unchanged,
      key,
      value,
      children: isObject(value) ? stringify(value) : null,
    }];
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
        return [...acc, {
          type: types.nested,
          status: statuses.unchanged,
          key,
          value: value1,
          children,
        }];
      }
      if (value1 === value2) {
        return [...acc, {
          type: types.flat,
          status: statuses.unchanged,
          key,
          value: value1,
          children: null,
        }];
      }

      return [...acc,
        {
          previousType: isObject(value1) ? types.nested : types.flat,
          type: isObject(value2) ? types.nested : types.flat,
          status: statuses.changed,
          key,
          previousValue: value1,
          value: value2,
          previousChildren: isObject(value1) ? stringify(value1) : null,
          children: isObject(value2) ? stringify(value2) : null,
        }
      ];
    }
    if (!keys1.includes(key)) {
      if (isObject(value2)) {
        return [...acc, {
          type: types.nested,
          status: statuses.added,
          key,
          value: value2,
          children: stringify(value2),
        }];
      }
      return [...acc, {
        type: types.flat,
        status: statuses.added,
        key,
        value: value2,
        children: null,
      }];
    }
    if (!keys2.includes(key)) {
      if (isObject(value1)) {
        return [...acc, {
          type: types.nested,
          status: statuses.deleted,
          key,
          value: value1,
          children: stringify(value1),
        }];
      }
      return [...acc, {
        type: types.flat,
        status: statuses.deleted,
        key,
        value: value1,
        children: null,
      }];
    }
    return null;
  };

  const ast = keys.reduce(buildAST, []);
  return ast;
};

export default (path1, path2, selectedFormat = 'recursive') => {
  const [content1, format1] = readFile(path1);
  const [content2, format2] = readFile(path2);

  const data1 = parseFile(content1, format1);
  const data2 = parseFile(content2, format2);

  const differenceInFiles = compare(data1, data2);

  const result = format(differenceInFiles, selectedFormat);
  console.log(JSON.stringify(differenceInFiles))

  return result;
};
