import yaml from 'js-yaml';

const parseFile = (content, format) => {
  if (format === 'json') {
    return JSON.parse(content);
  }
  if (format === 'yml') {
    return yaml.load(content);
  }
  return null;
};

export default parseFile;
