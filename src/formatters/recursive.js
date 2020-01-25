import { flatten } from 'lodash';

const signs = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const format = (ast, level = 0) => {
  const baseOffset = '  ';
  const offset = baseOffset + baseOffset.repeat(level * 2);
  const iter = (nodes, acc) => nodes.map((node) => {
    if (node.status === 'changed') {
      const deletedNode = {
        type: node.previousType,
        status: 'deleted',
        key: node.key,
        value: node.previousValue,
        children: node.previousChildren,
      };

      const addedNode = {
        type: node.type,
        status: 'added',
        key: node.key,
        value: node.value,
        children: node.children,
      };

      return flatten([...acc, format([addedNode, deletedNode], level)]);
    }

    const sign = signs[node.status];

    if (node.type === 'flat') {
      const line = `${offset}${sign} ${node.key}: ${node.value}`;
      return [...acc, line];
    }

    return [...acc,
      `${offset}${sign} ${node.key}: {`,
      ...format(node.children, level + 1),
      `${offset}  }`,
    ];
  });
  return flatten(iter(ast, []));
};

const formatToString = (lines) => `{\n${lines.join('\n')}\n}`;

export default (ast) => {
  const lines = format(ast);
  const result = formatToString(lines);
  return result;
};
