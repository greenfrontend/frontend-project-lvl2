
import program from 'commander';
import genDiff from '..';

const main = () => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      const difference = genDiff(firstConfig, secondConfig, program.format);
      console.log(difference);
    })
    .parse(process.argv);
};

export default main;
