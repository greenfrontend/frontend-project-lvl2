import { flatten, isObject } from 'lodash';
import types from '../types';

const signs = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
  nested: ' ',
};

const stringify = (obj, level) => {
  const baseOffset = '    '; // 4
  const keys = Object.keys(obj);
  const result = keys.map((key) => {
    const value = obj[key];
    return `${baseOffset.repeat(level + 1)}${key}: ${value}`;
  });
  return `{\n${result.join('')}\n${baseOffset.repeat(level)}}`;
};

const getValue = (node, level) => (isObject(node.value)
  ? stringify(node.value, level + 1)
  : node.value);

const format = (ast, level = 0) => {
  const baseOffset = '  ';
  const offset = baseOffset + baseOffset.repeat(level * 2);

  return ast.map((node) => {
    switch (node.type) {
      case types.changed:
        return flatten(format([{
          type: 'deleted',
          key: node.key,
          value: node.oldValue,
        }, {
          type: 'added',
          key: node.key,
          value: node.newValue,
        }], level));
      case types.nested:
        return flatten([
          `${offset}${signs[node.type]} ${node.key}: {`,
          ...format(node.children, level + 1),
          `${offset}  }`,
        ]);
      case types.added:
      case types.deleted:
      case types.unchanged:
        return [`${offset}${signs[node.type]} ${node.key}: ${getValue(node, level)}`];
      default:
        return null;
    }
  });
};

const formatToString = (lines) => `{\n${lines.join('\n')}\n}`;

export default (ast) => {
  const lines = flatten(format(ast));
  const result = formatToString(lines);
  return result;
};
