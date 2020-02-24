import { isObject, flatten } from 'lodash';
import types from '../types';

const getValue = (value) => (isObject(value) ? '[complex value]' : value);

const format = (ast, parentKey = '') => ast.map((node) => {
  const currentKey = parentKey !== '' ? `${parentKey}.${node.key}` : node.key;

  switch (node.type) {
    case types.unchanged:
      return null;
    case types.deleted:
      return `Property '${currentKey}' was ${node.type}`;
    case types.added:
      return `Property '${currentKey}' was ${node.type} with value: ${getValue(node.value)}`;
    case types.changed:
      return `Property '${currentKey}' was ${node.type}. From ${getValue(node.oldValue)} to ${getValue(node.newValue)}`;
    case types.nested:
      return flatten(format(node.children, `${parentKey !== '' ? `${parentKey}.` : ''}${node.key}`));
    default:
      return null;
  }
});

const formatToString = (lines) => lines.filter((node) => node !== null).join('\n');

export default (ast) => {
  const lines = flatten(format(ast));
  const result = formatToString(lines);
  return result;
};
