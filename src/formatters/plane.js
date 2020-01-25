import { flatten } from 'lodash';

const format = (ast, parentKey = '') => {
  const iter = (nodes, acc) => nodes
    .map((node) => {
      if (node.type === 'flat' && node.status === 'unchanged') {
        return acc;
      }
      const currentKey = parentKey !== '' ? `${parentKey}.${node.key}` : node.key;
      if (node.status === 'changed') {
        const previous = node.previousType === 'flat' ? node.previousValue : '[complex value]';
        const current = node.type === 'flat' ? node.value : '[complex value]';
        return [...acc, `Property '${currentKey}' was ${node.status}. From ${previous} to ${current}`];
      }
      if (node.status === 'added') {
        const value = node.type === 'flat' ? node.value : '[complex value]';
        return [...acc, `Property '${currentKey}' was ${node.status} with value: ${value}`];
      }
      if (node.status === 'deleted') {
        return [...acc, `Property '${currentKey}' was ${node.status}`];
      }

      return [...acc,
        ...format(node.children, `${parentKey !== '' ? `${parentKey}.` : ''}${node.key}`),
      ];
    });
  return flatten(iter(ast, []));
};

const formatToString = (lines) => `\n${lines.join('\n')}\n`;

export default (ast) => {
  const lines = format(ast);
  const result = formatToString(lines);
  return result;
};
