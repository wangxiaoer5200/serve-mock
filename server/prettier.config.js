module.exports = {
  // 一行的字符数，如果超过会进行换行，默认为80
  printWidth: 100,
  // tab 用两个空格代替
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 使用分号, 默认true
  semi: true,
  // 在Vue文件中缩进脚本和样式标签。
  vueIndentScriptAndStyle: true,
  // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // 对象中的空格 默认true
  // true: { foo: bar }
  // false: {foo: bar}
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // 有效的结尾逗号（对象，数组等）
  trailingComma: 'es5',
  // JSX标签闭合位置 默认false
  // false: <div
  //          className=""
  //          style={{}}
  //       >
  // true: <div
  //          className=""
  //          style={{}} >
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: true, // jsx 标签的反尖括号需要换行

  // 箭头函数参数括号 默认avoid 可选 avoid| always
  // avoid 能省略括号的时候就省略 例如x => x
  // always 总是有括号
  arrowParens: 'always',
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 使用默认的折行标准
  // proseWrap: "preserve",
  proseWrap: 'never',
  // 根据显示样式决定 html 要不要折行
  // htmlWhitespaceSensitivity: "css",
  htmlWhitespaceSensitivity: 'strict',
  // 换行符使用 lf
  endOfLine: 'lf',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  overrides: [
    // {
    //   files: 'prettier.config.js',
    //   options: {
    //     parser: 'js'
    //   }
    // },
    {
      files: '*.md',
      options: {
        tabWidth: 2
      }
    }
    // {
    //   files: 'stylelint.config.js',
    //   options: {
    //     parser: 'json'
    //   }
    // }
  ]
};
