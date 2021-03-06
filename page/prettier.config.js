
module.exports = {
  // 一行的字符数，如果超过会进行换行，默认为80
  printWidth: 80,
  // tab缩进大小,默认为2
  tabWidth: 2,
  // 使用tab缩进，默认false
  useTabs: false,
  // 使用分号, 默认true
  semi: true,
  // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
  singleQuote: true,
  // 对象中的空格 默认true
  // true: { foo: bar }
  // false: {foo: bar}
  bracketSpacing: true,
  trailingComma:'all',
  // JSX标签闭合位置 默认false
  // false: <div
  //          className=""
  //          style={{}}
  //       >
  // true: <div
  //          className=""
  //          style={{}} >
  jsxBracketSameLine: false,
  // 箭头函数参数括号 默认avoid 可选 avoid| always
  // avoid 能省略括号的时候就省略 例如x => x
  // always 总是有括号
  arrowParens: 'always',
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'lf',
  overrides: [
    {
      files: 'prettier.config.js',
      options: {
        parser: 'json'
      }
    },
    {
      files: 'stylelint.config.js',
      options: {
        parser: 'json'
      }
    }
  ]
};
