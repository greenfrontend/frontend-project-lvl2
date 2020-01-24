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
    const sign = signs[node.status];
    if (node.type === 'flat') {
      if (node.status === 'changed') {

        const prevChildren = node.previousChildren ? format(node.previousChildren, level) : node.previousValue;
        const lineBefore = `${offset}- ${node.key}: {\n${prevChildren}\n${offset}}`;

        const currChildren = node.children ? format(node.children, level) : node.value;
        const lineAfter = `${offset}+ ${node.key}: ${currChildren}`;
        return [...acc, lineAfter, lineBefore];
      }
      const line = `${offset}${sign} ${node.key}: ${node.value}`;
      return [...acc, line];
    }

    if (node.status === 'changed') {
    }

    // console.log({key: node.key, t: node.type})
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
  // console.log(result)
  return result;
};
