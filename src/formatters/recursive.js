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

  return ast.reduce((acc, node) => {
    if (node.type === types.added) {
      const valueToString = getValue(node, level);
      const line = `${offset}${signs[node.type]} ${node.key}: ${valueToString}`;
      return [...acc, line];
    }
    if (node.type === types.deleted) {
      const valueToString = getValue(node, level);
      const line = `${offset}${signs[node.type]} ${node.key}: ${valueToString}`;
      return [...acc, line];
    }
    if (node.type === types.unchanged) {
      const valueToString = getValue(node, level);
      const line = `${offset}${signs[node.type]} ${node.key}: ${valueToString}`;
      return [...acc, line];
    }
    if (node.type === types.changed) {
      const deletedNode = {
        type: 'deleted',
        key: node.key,
        value: node.oldValue,
      };

      const addedNode = {
        type: 'added',
        key: node.key,
        value: node.newValue,
      };
      return flatten([...acc, format([deletedNode, addedNode], level)]);
    }
    if (node.type === types.nested) {
      return [...acc,
        `${offset}${signs[node.type]} ${node.key}: {`,
        ...format(node.children, level + 1),
        `${offset}  }`,
      ];
    }
    return acc;
  }, []);
};

const formatToString = (lines) => `{\n${lines.join('\n')}\n}`;

export default (ast) => {
  const lines = format(ast);
  const result = formatToString(lines);
  return result;
};
