const path = require('path')                            //path是Nodejs中的基本包,用来处理路径
const HTMLPlugin = require('html-webpack-plugin')       //引入html-webpack-plugin
const webpack = require("webpack")                      //引入webpack
const ExtractPlugin = require("extract-text-webpack-plugin")
const merge = require('webpack-merge')
const baseConfig = require("./webpack.config.base");
const VueClientPlugin = require('vue-server-renderer/client-plugin');

const isDev = process.env.NODE_ENV === "development";    //判断是否为测试环境,在启动脚本时设置的环境变量都是存在于process.env这个对象里面的

const devServer = {
  port: 8000,                                     //访问的端口号
  host: '0.0.0.0',                              //可以设置0.0.0.0 ,这样设置你可以通过127.0.0.1或则localhost去访问
  overlay: {
    errors: true,                               //编译中遇到的错误都会显示到网页中去
  },
  historyApiFallback: {
    index: '/public/index.html'
  },
  open: true,
  hot: true
};
const defaultPlugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template:path.join(__dirname,'template.html')
  }),
  new VueClientPlugin()// 会生成vue-ssr-client-manifest.json文件
]

var config;


if (isDev) {
  config = merge(baseConfig, {
    devtool: "#cheap-module-eval-source-map",
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  });

} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'

    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',                       //css-loader处理css
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,            //stylus-loader和postcss-loader自己都会生成sourceMap,如果前面stylus-loader已生成了sourceMap
                }                               //那么postcss-loader可以直接引用前面的sourceMap
              },
              'stylus-loader'                     //处理stylus的css预处理器的问题件,转换成css后,抛给上一层的css-loader
            ]
          })
        },
      ]
    },
    plugins: [
      new ExtractPlugin('styles.[contentHash:8].css'),   //定义打包分离出的css文件名
      new webpack.optimize.CommonsChunkPlugin({          //定义静态文件打包
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({         //将app.js文件中一些关于webpack文件的配置单独打包出为一个文件,用于解决部分浏览器长缓存问题
        name: 'runtime'
      })
    ]
  })
}

module.exports = config;                                 //声明一个config的配置,用于对外暴露