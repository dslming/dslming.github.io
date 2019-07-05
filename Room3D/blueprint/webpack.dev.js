const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

console.log('webpack start...')
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
    devServer:{
        port: 8080,
        contentBase: path.join(__dirname, "public"),
        overlay: false,
        open: true, //启动webpack-dev-server时自动打开浏览器
        hot: true //启用热更
    },
};