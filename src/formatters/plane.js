import { flatten } from 'lodash';

const format = (ast) => {
  const iter = (nodes, acc) => nodes
    .filter((node) => node.status !== 'unchanged')
    .map((node) => {
      if (node.status === 'changed') {
        const previous = node.previousType === 'flat' ? node.previousValue : '[complex value]';
        const current = node.type === 'flat' ? node.value : '[complex value]';
        return [...acc, `Property '${node.key}' was ${node.status}. From ${previous} to ${current}`];
      }
      if (node.status === 'added') {
        const value = node.type === 'flat' ? node.value : '[complex value]';
        return [...acc, `Property '${node.key}' was ${node.status} with value: ${value}`];
      }
      if (node.type === 'flat') {
        return [...acc, `Property '${node.key}' was ${node.status}`];
      }

      return [...acc,
        node.key,
        ...format(node.children),
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
