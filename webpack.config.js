// 引入路径链接包
const path = require('path')
const HTMLwebpack = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


// 具体设置
module.exports = {

    // 指定入口文件
    entry: "./src/index.ts",

    // 指定打包文件所在目录
    output: {
        // 目录
        path: path.resolve(__dirname, "dist"),

        // 文件
        filename: "bundle.js",

        // 设置打包环境 - 告诉webpack不使用箭头函数（例如ie浏览器)
        // environment: {
        //     arrowFunction: false
        // }
    },

    // 指定webpack打包时要使用的模块
    module: {

        // 指定要加载的规则
        rules: [
            {
                // 规则对哪些文件生效 - 正则表达式 Expresión regular
                // 所有以ts结尾的文件
                test: /\.ts$/,

                // 使用什么扩展
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: "babel-loader",

                        // 设置babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",

                                    // 配置信息
                                    {
                                        // 浏览器版本（要兼容的的目标浏览器）
                                        targets: {
                                            "chrome": "88",
                                            // 低版本浏览器如：
                                            "ie": "11"
                                        },
                                        // corejs 版本（指定corejs的版本）
                                        "corejs": "3",
                                        // 使用corejs的方法 - usage表示：按需下载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }

                    }
                    // babel设置结束

                    // 加载器
                    , "ts-loader"
                ],

                // 要排除的文件
                // 这个文件夹里的东西不要碰
                exclude: /node-modules/
            },

            //设置less文件的处理

            {
                test: /\.less$/,
                use: [
                    // loader的执行顺序是从下往上
                    "style-loader",
                    "css-loader",
                    // 这里引入postcss, 因为在处理完less文件后，需要处理一些css3上的问题
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                // 插件
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // 配置兼容的浏览器
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]



            }
        ]
    },

    plugins: [
        // 自动清除旧的文件
        new CleanWebpackPlugin(),

        // 自动根据模板生成
        new HTMLwebpack({
            // title: "这是一个自定义的title"

            template: "./src/index.html"
        }),
    ],

    // 设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    },

    // 开发模式
    mode: 'development'

}