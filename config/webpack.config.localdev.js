var webpack = require('webpack');
var chalk = require('chalk');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var path = require('path');
var globalConfig = require('./global');
const port = globalConfig.expressPort;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackProdConfig = require('./webpack.config.prod')

const config = Object.assign({}, webpackProdConfig, {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            '../app/common/components/Vendors/Vendors',
            '../index'
        ],
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'redux',
            'lodash',
            'moment'
        ]
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].[hash].js',
        publicPath: '/static'
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /\.jsx|js$/,
                exclude: /node_modules/,
                use: [
                    {   loader: 'babel-loader'  }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {   loader: 'style-loader'  },
                    {   loader: 'css-loader'    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {   loader: 'style-loader'  },
                    {   loader: 'css-loader'    },
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded'
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                use: [
                    {   loader: "json-loader"   }
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            },
            {
                test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new ProgressBarPlugin({
            format: chalk.blue.bold('Please wait until Webpack bundle finished: ') + ' [' + chalk.gray.bgCyan.bold(':bar') + '] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            clear: true,
            callback: function () {
                console.log('\n')
                console.log(chalk.magenta(' Express server listening on ') + chalk.bold(port));
                console.log('\n')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: '[name].[hash].js'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../index.html'),
            filename: 'index.html',
            inject: 'body'
        })
    ],
})

module.exports = config

