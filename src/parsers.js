import yaml from 'js-yaml';
import ini from 'ini';

const parseFile = (content, format) => {
  const formats = {
    yml: yaml.load,
    json: JSON.parse,
    ini: ini.parse,
  };
  return formats[format](content);
};

export default parseFile;
