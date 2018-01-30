const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const appPath = path.resolve(__dirname, '../');

module.exports = {
    entry: __dirname + '/../src/index.js',
    context: appPath,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash].js'
    },
    target: 'web',
    devtool: 'source-map',
    resolve: {
        modules: [
            path.resolve(__dirname, '../src'),
            'node_modules',
        ]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/i,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [['env', { targets: { ie: 9 } }]],
                    plugins: [
                        'transform-runtime'
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
                test: /\.html$/i,
                loader: 'raw-loader',
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                minimize: {
                                    discardComments: {
                                        removeAll: true,
                                    },
                                },
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer')
                                ],
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ]
                }),
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'app',
            minify: {
                collapseWhitespace: true,
                preserveLineBreaks: true
            }
        }),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery'
        }),
        new WebpackPwaManifest({
            name: 'Paysera FastEnough Workshop',
            short_name: 'FastEnough?',
            background_color: '#007bff',
            start_url: '/index.html',
            display: 'fullscreen',
            orientation: 'portrait',
            icons: [
                {
                    src: path.resolve('src/icons/launcher-icon-1x.png'),
                    size: '48x48',
                },
                {
                    src: path.resolve('src/icons/launcher-icon-2x.png'),
                    size: '96x96',
                },
                {
                    src: path.resolve('src/icons/launcher-icon-3x.png'),
                    size: '144x144',
                },
                {
                    src: path.resolve('src/icons/launcher-icon-4x.png'),
                    size: '192x192',
                },
            ],
        }),
        new OfflinePlugin({
            safeToUseOptionalCaches: true,
            caches: {
                main: [
                    ':rest:'
                ],
                additional: [
                    ':externals:',
                ],
            },
            externals: [
                '/',
                '/manifest.json',
            ],
            responseStrategy: 'cache-first',
        }),
        new CleanWebpackPlugin(['dist'], { root: appPath }),
        //new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    ]
};

