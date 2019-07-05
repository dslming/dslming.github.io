const path = require('path');
const webpack = require('webpack');
console.log('webpack dev start...')
module.exports = {
    mode: 'development',
    entry: './test.ts',
    output: {
        filename: 'test.js',
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: "ts-loader"
        }]
    },
    resolve: {
        extensions: [
            '.ts', '.js'
        ]
    },
    // 这里仅仅用了代码热编译,没有使用html
    devServer:{
        port: 8080,
        contentBase: path.join(__dirname, "dist"),
        overlay: false,
        open: false, //启动webpack-dev-server时自动打开浏览器
        hot: true //启用热更
    },
};