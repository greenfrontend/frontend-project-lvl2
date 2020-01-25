import recursive from './recursive';
import plane from './plane';
import json from './json';

export default (ast, format) => {
  const formats = {
    recursive,
    plane,
    json,
  };

  return formats[format](ast);
};
