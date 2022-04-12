const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
    entry: { //配置多入口
        index:path.join(srcPath,'index.js'),
        other:path.join(srcPath,'other.js')
    },
    module: {
        rules: [
            {
                test: /\.js$/, //验证规则，通过 js 文件处理
                loader: ['babel-loader'], //处理 es6   //babel 需要配置 .babelrc
                include: srcPath, //处理哪个文件夹下的内容
                exclude: /node_modules/ //排除的文件夹
            },
            // {
            //     test: /\.vue$/,
            //     loader: ['vue-loader'],
            //     include: srcPath
            // },
            // {
            //     test: /\.css$/,
            //     // loader 的执行顺序是：从后往前（知识点）
            //     loader: ['style-loader', 'css-loader']    //css-loader：.css文件解析为css；style-loader：把它插入到页面中；
            // },
            // {

            //拆分common里的css。dev环境不动，主要处理prod环境的css
            //     test: /\.css$/,
            //     // loader 的执行顺序是：从后往前
            //     //postcss-loader：浏览器兼容性；css-loader：.css文件解析为css；style-loader：把它插入到页面中；
            //     loader: ['style-loader', 'css-loader', 'postcss-loader']
            // },
            // {
            //     test: /\.less$/,
            //     // 增加 'less-loader' ，注意顺序
            //     loader: ['style-loader', 'css-loader', 'less-loader']
            // }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: path.join(srcPath, 'index.html'),
        //     filename: 'index.html'
        // })

        //针对每个入口都要 new 一个实例

        //多入口 - 生成 index.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            chunks:['index'] //只引入index.js。如果不写，默认把entry的所有文件都引入
        }),
        //多入口 - 生成 index.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks:['index'] //只引入other.js
        })
    ]
}
