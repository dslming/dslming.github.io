const path = require('path');
const webpack = require('webpack');
console.log('webpack prod start...')
module.exports = {
    mode: 'development',
    entry: './test.ts',
    output: {
        filename: 'test.js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [{
            test: /\.ts$/,
            use: "ts-loader"
        }]
    },
    resolve: {
        extensions: [
            '.ts','js'
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            name:'dll',
            context: __dirname,
            manifest: require('./dll/dll-manifest.json')
        })
    ]
};