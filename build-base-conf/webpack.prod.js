const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractplugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')


module.exports = smart(webpackCommonConf, {
    mode: 'production',
    output: {
        // filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳，hash目的：命中缓存，加载更快
        filename:'[name].[contentHash:8].js', //配置多入口。name依赖entry的index,other等属性名
        path: distPath,
        // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
    },
    module: {
        rules: [
            // 图片 - 考虑 base64 编码的情况
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 小于 5kb 的图片用 base64 格式产出
                        // 否则，依然延用 file-loader 的形式，产出 url 格式
                        limit: 5 * 1024,

                        // url 方式的打包到 img 目录下
                        outputPath: '/img1/',

                        // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
                        // publicPath: 'http://cdn.abc.com'
                    }
                }
            },
            //抽离css
            {
                test:/\.css$/,
                loader:[
                    MiniCssExtractplugin.loader, //注意，这里不再使用 style-loader
                    'css-loader',
                    'postcss-loader'
                ]
            },
            //抽离less less -> css
            //postcss-loader:做兼容性；less-loader：.less文件解析为.css文件；css-loader：.css文件解析为css
            {
                test:/\.less$/,
                loader:[
                    MiniCssExtractplugin.loader, //注意，这里不再使用 style-loader
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹，即每次都会清空 dist 文件夹内容
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify('production')
        }),
        //抽离 css 文件
        new MiniCssExtractplugin({
            filename:'css/main.[contentHash:8].css' //打包后的文件名 css目录下main.xxx.css
        })
    ],
    optimization:{
        //压缩 css
        minimizer:[new TerserJSPlugin({}),new OptimizeCssAssetsPlugin({})]
    }
})
