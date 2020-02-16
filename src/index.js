import fs from 'fs';
import path from 'path';
import { has, union, isObject } from 'lodash';
import parse from './parsers';
import format from './formatters';
import types from './types';

const readFile = (filePath) => {
  const fileFormat = path.extname(filePath).slice(1);
  const absolutePath = path.join(process.cwd(), filePath);
  const content = fs.readFileSync(absolutePath);
  return [content.toString(), fileFormat];
};

const compare = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = union(keys1, keys2);

  const result = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    // added
    if (!has(data1, key)) {
      return {
        key,
        value: value2,
        type: types.added,
      };
    }

    // deleted
    if (!has(data2, key)) {
      return {
        key,
        value: value1,
        type: types.deleted,
      };
    }

    // unchanged
    if (value1 === value2) {
      return {
        key,
        value: value1,
        type: types.unchanged,
      };
    }

    // changed
    if (value1 !== value2) {
      // nested
      if (isObject(value1) && isObject(value2)) {
        return {
          key,
          oldValue: value1,
          newValue: value2,
          type: types.nested,
          children: compare(value1, value2),
        };
      }

      // simple
      return {
        key,
        oldValue: value1,
        newValue: value2,
        type: types.changed,
      };
    }

    return null;
  });

  return result;
};

export default (path1, path2, selectedFormat = 'recursive') => {
  const [content1, format1] = readFile(path1);
  const [content2, format2] = readFile(path2);

  const data1 = parse(content1, format1);
  const data2 = parse(content2, format2);

  const difference = compare(data1, data2);
  const result = format(difference, selectedFormat);

  return result;
};
