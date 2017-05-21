var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    context: __dirname,
    entry: {
        app: [
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
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx|js$/,
                exclude: /node_modules/,
                use: [
                    {   loader: 'babel-loader'  }
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {   loader: 'css-loader'    }
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
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
                'NODE_ENV': JSON.stringify('development')
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
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
