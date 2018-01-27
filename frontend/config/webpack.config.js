var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', __dirname + '/../src/index.js'],
    output: {
        path: __dirname + '/../src/compiled/',
        publicPath: '/compiled/',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/i,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        ['env', 'stage-0']
                    ]
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*)?$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash].[ext]'
                }
            },
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader?sourceMap',
                    use: 'css-loader!sass-loader'
                })
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'bundle.css',
        }),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery'
        })
    ]
};
