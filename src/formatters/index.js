import recursive from './recursive';
import plain from './plain';
import json from './json';

export default (ast, format) => {
  const formats = {
    recursive,
    plain,
    json,
  };

  return formats[format](ast);
};
