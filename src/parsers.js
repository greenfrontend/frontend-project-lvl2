import yaml from 'js-yaml';
import ini from 'ini';

const formats = {
  yml: yaml.load,
  json: JSON.parse,
  ini: ini.parse,
};

export default (content, format) => formats[format](content);
