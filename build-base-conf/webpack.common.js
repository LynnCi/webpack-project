const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
    //生成chunk的地方，定义了2个chunk名字，即index 和 other //chunk:代码块
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
            //chunks 表示该页面需要引用哪些 chunk
            chunks:['index','vendor','common'] //考虑代码分割
        }),
        //多入口 - 生成 index.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks:['other','common'] //考虑代码分割
        })
    ]
}
