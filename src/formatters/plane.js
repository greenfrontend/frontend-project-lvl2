import { flatten } from 'lodash';

const format = (ast) => {
  const iter = (nodes, acc) => nodes
    .filter((node) => node.status !== 'unchanged')
    .map((node) => {
      if (node.type === 'flat') {
        return [...acc, `Property: ${node.key} was ${node.status}`];
      }

      return [...acc,
        node.key,
        ...format(node.children),
      ];
    });
  return flatten(iter(ast, []));
};

const formatToString = (lines) => lines.join('\n');

export default (ast) => {
  const lines = format(ast);
  const result = formatToString(lines);
  return result;
};
