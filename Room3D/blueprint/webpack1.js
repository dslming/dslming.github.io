// const path = require('path');
// const webpack = require('webpack');

// module.exports = {
//     mode: 'development',

//     entry: './1.js',
//     output: {
//         filename: '[name].dll.js',
//         path: path.resolve(__dirname, 'ddl'),
//         library: '[name]',
//     },
//     plugins: [
//         // new webpack.DllPlugin({
//         //     name: '[name].dll.js',
//         //     path: path.join(__dirname, '../static/dll/manifest.json'),
//         // }),
//     ],
// };

const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',

    entry: './1.js',
    output: {
        filename: 'test.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [{
            test: /\.ts$/,
            use: "ts-loader"
        }]
    },
    resolve: {
        extensions: [
            '.ts'
        ]
    },
    plugins: [
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: require('../static/dll/vendor-manifest.json')
        // }),
    ]
    // externals: {
    //     three: 'jQuery'
    // }
};