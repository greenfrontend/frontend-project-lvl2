import { flatten, has, isObject } from 'lodash';

const format = (ast, parentKey = '') => {
  const iter = (nodes, acc) => nodes.map((node) => {
    if (node.status === 'unchanged' && !has(node, 'children')) {
      return acc;
    }

    const currentKey = parentKey !== '' ? `${parentKey}.${node.key}` : node.key;

    if (node.status === 'changed') {
      const oldValue = isObject(node.oldValue) ? '[complex value]' : node.oldValue;
      const newValue = isObject(node.newValue) ? '[complex value]' : node.newValue;
      return [...acc, `Property '${currentKey}' was ${node.status}. From ${oldValue} to ${newValue}`];
    }

    if (node.status === 'deleted') {
      return [...acc, `Property '${currentKey}' was ${node.status}`];
    }

    if (node.status === 'added') {
      const value = isObject(node.value) ? '[complex value]' : node.value;
      return [...acc, `Property '${currentKey}' was ${node.status} with value: ${value}`];
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
