// module.exports = {
//     module: {
//         loaders: [{ exclude: ['node_modules'], loader: 'babel', test: /\.jsx?$/ }, { loader: 'file-loader', test: /\.(ttf|eot|svg)$/ }]
//     },
//     resolve: {
//         alias: {},
//         extensions: ['', 'js', 'jsx'],
//         modules: ['node_modules']
//     }
// };

const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js' //生成后的文件名 为 a-2ea5b2e9b258a8bbba73.js，main-2ea5b2e9b258a8bbba73.js
    },
    // mode: 'development', //production
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: []
            }
        ]
    }
    // plugins: [
    //     new UglifyJsPlugin({
    //         uglifyOptions: {
    //             compress: {
    //                 warnings: false
    //             }
    //         },
    //         sourceMap: true,
    //         parallel: true
    //     })
    // ]
};
