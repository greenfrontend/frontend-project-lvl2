import program from 'commander';

const gendiff = () => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log({ firstConfig, secondConfig });
    })
    .parse(process.argv);
};

export default gendiff;
