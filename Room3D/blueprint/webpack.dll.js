const path = require('path');
const webpack = require('webpack');

console.log('webpack dll start...')
const dllPath = path.join(__dirname, 'dll');
module.exports = {
    mode: 'development',
    entry: {
        dll: ['jquery']
    },
    output: {
        path: dllPath,
        filename: '[name].js',
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: "[name]",
            path: path.join(dllPath, '[name]-manifest.json'),
            context: __dirname
          }),
    ]
};