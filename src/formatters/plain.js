import { isObject } from 'lodash';
import types from '../types';

const getValue = (value) => (isObject(value) ? '[complex value]' : value);

const format = (ast, parentKey = '') => ast.reduce((acc, node) => {
  const currentKey = parentKey !== '' ? `${parentKey}.${node.key}` : node.key;

  if (node.type === types.unchanged) {
    return acc;
  }

  if (node.type === types.deleted) {
    return [...acc, `Property '${currentKey}' was ${node.type}`];
  }

  if (node.type === types.added) {
    const value = getValue(node.value);
    return [...acc, `Property '${currentKey}' was ${node.type} with value: ${value}`];
  }

  if (node.type === types.changed) {
    const oldValue = getValue(node.oldValue);
    const newValue = getValue(node.newValue);
    return [...acc, `Property '${currentKey}' was ${node.type}. From ${oldValue} to ${newValue}`];
  }

  if (node.type === types.nested) {
    return [...acc,
      ...format(node.children, `${parentKey !== '' ? `${parentKey}.` : ''}${node.key}`),
    ];
  }

  return null;
}, []);

const formatToString = (lines) => lines.join('\n');

export default (ast) => {
  const lines = format(ast);
  const result = formatToString(lines);
  return result;
};
