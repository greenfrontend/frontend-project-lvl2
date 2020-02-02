import { flatten, isObject, has } from 'lodash';

const signs = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
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

const format = (ast, level = 0) => {
  const baseOffset = '  ';
  const offset = baseOffset + baseOffset.repeat(level * 2);

  const iter = (nodes, acc) => nodes.map((node) => {
    const sign = signs[node.status];
    if (node.status === 'changed') {
      const deletedNode = {
        status: 'deleted',
        key: node.key,
        value: node.oldValue,
      };

      const addedNode = {
        status: 'added',
        key: node.key,
        value: node.newValue,
      };

      return flatten([...acc, format([deletedNode, addedNode], level)]);
    }

    if (!has(node, 'children')) {
      const valueToString = isObject(node.value) ? stringify(node.value, level + 1) : node.value;
      const line = `${offset}${sign} ${node.key}: ${valueToString}`;
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
