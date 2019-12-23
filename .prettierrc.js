// .prettierrc.js
module.exports = {
    //最大换行
    printWidth: 165,
    tabWidth: 4,
    //转换器javascript
    parser: 'babylon',
    //未位分号
    semi: true,
    //未位逗号
    trailingComma: 'none',
    //单引号
    singleQuote: true,
    //(x) => {} 是否要有小括号
    arrowParens: 'avoid',
    //对象留空格
    bracketSpacing: true,
    // jsx > 是否另起一行
    jsxBracketSameLine: true,
    //是否要换行
    proseWrap: 'preserve',
    //指定的样式覆盖
    overrides: [
        {
            files: ['*.json', '.eslintrc', '.prettierrc', '.babelrc'],
            options: {
                parser: 'json',
                tabWidth: 4
            }
        },
        {
            files: '*.{css,sass,scss,less}',
            options: {
                parser: 'postcss',
                tabWidth: 4
            }
        }
    ]
};
