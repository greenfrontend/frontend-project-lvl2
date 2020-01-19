import program from 'commander';

const gendiff = () => {
  program.version('0.0.1');

  program
    .option('-V, --version', 'output the version number')
    .option('-h, --help', 'output usage information');

  program.parse(process.argv);

  console.log('is works!');

  // description
  // version

  // gendiff -h
  //
  // Usage: gendiff [options]
  //
  // Compares two configuration files and shows a difference.
  //
  //   Options:
  // -V, --version        output the version number
  // -h, --help           output usage information
};

export default gendiff;
