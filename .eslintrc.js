module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        sourceType: 'module'
    },
    rules: {
        'arrow-parens': 0,
        indent: ['error', 4],
        'linebreak-style': ['error', 'windows'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'linebreak-style': [0, 'windows'], //换行风格
        'no-mixed-spaces-and-tabs': [0], //关闭禁止混用tab和空格,
        'no-console': 0
    }
};
