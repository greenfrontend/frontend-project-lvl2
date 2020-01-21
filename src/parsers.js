import yaml from 'js-yaml';

const parseFile = (content, format) => {
  const formats = {
    yml: yaml.load,
    json: JSON.parse,
  };
  return formats[format](content);
};

export default parseFile;
