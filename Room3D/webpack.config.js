const path = require('path')
const HtmlWebpalckPlugin = require('html-webpack-plugin')
const uglify = require('uglifyjs-webpack-plugin');
const  Version = new Date().getTime(); 
module.exports = {
    entry:'./src/index.ts',
    output:{
        path:path.resolve(__dirname,'public'),
        filename:`bundle.${Version}.js`
    },
    devtool:'inlin-source-map',
    devServer:{
        contentBase:'./public',
        open:true,
        port:9001
    },
    plugins:[
        new HtmlWebpalckPlugin({
            template:'./src/index.html'            
        }),
        new uglify()
    ],    
    module:{
        rules:[
            {
                test:/\.tsx?$/,
                use:'ts-loader',
                exclude:/node_modules/,
                include:/.\src/
            },{
                test:/\.scss$/,
                use: [
                    {
                        loader: "style-loader" // 将 JS 字符串生成为 style 节点
                    },
                    {
                        loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                    },
                    {
                        loader: "sass-loader" // 将 Sass 编译成 CSS
                    }
                ]
            }
        ]
    },
    resolve:{
        extensions:['.tsx','.ts','.js']
    }, 

}