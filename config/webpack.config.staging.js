var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackProdConfig = require('./webpack.config.prod')

module.exports = Object.assign({}, webpackProdConfig, {
    plugins: [
        new ExtractTextPlugin({
            filename: 'app.[chunkhash].css',
            allChunks: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('staging')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: '[name].[hash].js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                'screw_ie8': true,
                'warnings': false,
                'unused': true,
                'dead_code': true,
            },
            output: {
                comments: false,
            },
            sourceMap: false
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../index.html'),
            filename: 'index.html',
            inject: 'body'
        })
    ]
})

