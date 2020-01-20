// import program from 'commander';
//
// const main = () => {
//   program
//     .version('0.0.1')
//     .description('Compares two configuration files and shows a difference.')
//     .option('-f, --format [type]', 'output format')
//     .arguments('<firstConfig> <secondConfig>')
//     .action((firstConfig, secondConfig) => {
//       console.log({ firstConfig, secondConfig });
//     })
//     .parse(process.argv);
// };
//
// export default main;

// То есть ваша библиотека должна экспортировать функцию по умолчанию,
// вызов которой возвращает разницу между данными в виде строки.
// path1 path2
// сравниваются данные
// Результатом работы функции genDiff является строка

const genDiff = (file1, file2) => {

};

export default genDiff;
