import {flatten} from "lodash";

const format = (ast) => {
  const iter = (nodes, acc) => nodes.map((node) => {
    if (node.type === 'flat') {
      return [...acc, node.key];
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
  return result
}
