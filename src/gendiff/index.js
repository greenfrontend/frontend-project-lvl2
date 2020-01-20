import { has } from 'lodash';

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

// use: NODE FS SYNC
// const file1 = getFile(path1);
// const file2 = getFile(path2);
//
// use: JSON.parse
// const data1 = getData(file1);
// const data2 = getData(file2);
//
// use: lodash has +
// const diff = genDiff(data1, data2);

// как представить строку? в виде массива из трех значений?
// знак: + (добавлен), - (удален), пусто (без изменений)
// [ 'знак', 'ключ', 'значение' ]

const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const result = keys1
    .reduce((acc, key) => {
      const value1 = data1[key];
      const value2 = data2[key];

      if (!keys2.includes(key)) {
        return [...acc, ['-', key, value1]]
      }

      if (value1 === value2) {
        return [...acc, [' ', key, value1]]
      } else {
        return [...acc,
          ['+', key, value2],
          ['-', key, value1]
        ]
      }
    }, []);

  const addedKeys = keys2
    .reduce((acc ,key) => (!keys1.includes(key))
      ? [...acc, ['+', key, data2[key]]]
      : acc, []);

  return [...result, ...addedKeys]
};

export const linesToString = (lines) => {
  const lineBreak = "\n";
  const offset = " ".repeat(2);
  const result = [];
  for (const line of lines) {
    const [sign, key, value] = line;
    const string = `${sign} ${key}: ${value}`;
    result.push(`${offset}${string}${lineBreak}`);
  }
  return `{\n${result.join('')}}`;
};

export default genDiff;

// может на множествах сделать?
// const set1 = new Set(keys1);
// const set2 = new Set(keys2);
//
// const changed = new Set([...set1].filter(x => set2.has(x)))
// const deleted = new Set([...set1].filter(x => !set2.has(x)));
// const added = new Set([...set2].filter(x => !set1.has(x)));
