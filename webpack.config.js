const path = require('path')
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:path.join(__dirname, './src/main.js'),
    output:{
        path:path.join(__dirname, './levelDetail'),
        filename:'bundle.js'
    },
    devServer:{
        open:true, // 默认打开浏览器
        port:3000, // 设置启动运行端口
        // contentBase:'src', // 指定托管的根目录 被弃用
        static: { // static: ['assets']
            directory: path.join(__dirname, 'src')
        },
        hot:true // 配置文件中：启用热更新的第一步，第二步导入webpack；(命令行中直接配置hot即可)
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({ // 根据模板文件在内存中生成html，会自动引入打包后的其他资源文件
            template: "./src/index.html", // path.join(__dirname, './src/index.html'),
            filename:'index.html' // 指定生成页面的名称,      
        })
    ],
    module:{
        rules:[ // 匹配规则
            {
                test:/\.css$/,
                use:['style-loader', 'css-loader']  //  loader的调用规则是从右向左，loader调用完后会将处理结果给webpack打包到出口文件中           
            },
            {
                test:/\.scss$/,
                use:['style-loader', 'css-loader', 'sass-loader']             
            },
            // {
            //     test:/\.(jpe?g|png|gif|bmp)$/,
            //     use:[
            //         {
            //             loader:'url-loader',
            //             options: {
            //                 // 当加载的图片, 小于limit时, 会将图片编译成base64字符串形式.
            //                 // 当加载的图片, 大于limit时, 需要使用file-loader模块进行加载.
            //                 // 图片大小 * 1024 比较 limit
            //                 limit: 10,
            //                 //不使用esModule的语法导出
            //                 esModule: false
            //             }                     
            //         }                 
            //     ],
            //     type: 'javascript/auto'                        
            // },
            {
                test:/\.(jpe?g|png|gif|bmp)$/,
                use:[
                    {
                        loader:'file-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            //不使用esModule的语法导出
                            esModule: false,
                            outputPath: 'assets',
                        }                     
                    }                 
                ],
                type: 'javascript/auto'                 
            },
            {
                // 处理html文件中的img图片（负责引入img，从而能被url-loader进行处理）
                test: /\.html$/,
                use: [{
                    loader: "html-withimg-loader",
                    options: {
                    //处理html中的img图片问题，在webpack5中html-loader中也需要配置，esModule为false,否则还是不生效
                        esModule: false
                    }
                }]
            },
            // {
            //     test:/\.(ttf|eot|svg|woff|woff2)$/,
            //     use:'url-loader'             
            // }
        ]    
    }
}