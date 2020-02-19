import recursive from './recursive';
import plain from './plain';
import json from './json';

const formats = {
  recursive,
  plain,
  json,
};

export default (ast, format) => formats[format](ast);
