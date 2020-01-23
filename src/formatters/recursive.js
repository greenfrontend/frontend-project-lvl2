import {flatten} from "lodash";

const signs = {
  added: '+',
  deleted: '-',
  changed: '-',
  unchanged: ' ',
};

const format = (ast, level = 0) => {
  const baseOffset = '  ';
  const offset = baseOffset + baseOffset.repeat(level * 2);
  const iter = (nodes, acc) => nodes.map((node) => {
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
  return result
}
