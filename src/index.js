import fs from 'fs';
import path from 'path';
import { has, union, isObject } from 'lodash';
import parse from './parsers';
import format from './formatters';

const readFile = (filePath) => {
  const fileFormat = path.extname(filePath).slice(1);
  const absolutePath = path.join(process.cwd(), filePath);
  const content = fs.readFileSync(absolutePath);
  return [content.toString(), fileFormat];
};

const statuses = {
  added: 'added',
  deleted: 'deleted',
  changed: 'changed',
  unchanged: 'unchanged',
};

const compare = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = union(keys1, keys2);

  const result = keys.reduce((acc, key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    // unchanged
    if (value1 === value2) {
      return [...acc, {
        key,
        value: value1,
        status: statuses.unchanged,
      }];
    }

    // deleted
    if (!has(data2, key)) {
      return [...acc, {
        key,
        value: value1,
        status: statuses.deleted,
      }];
    }

    // added
    if (!has(data1, key)) {
      return [...acc, {
        key,
        value: value2,
        status: statuses.added,
      }];
    }

    // changed
    if (value1 !== value2) {
      // both is objects
      if (isObject(value1) && isObject(value2)) {
        return [...acc, {
          key,
          oldValue: value1,
          newValue: value2,
          status: statuses.unchanged,
          children: compare(value1, value2),
        }];
      }

      // simple values
      return [...acc, {
        key,
        oldValue: value1,
        newValue: value2,
        status: statuses.changed,
      }];
    }

    return acc;
  }, []);

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
