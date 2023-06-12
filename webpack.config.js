const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCssPresetEnv = require('postcss-preset-env');


const mode = process.env.NODE_ENV || 'development';

const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

//Нет автообновления, пофиксить

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        port: 9000,
        open: true,
        hot: true, 
    },
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src/app/js', 'index.js')],
    output: {
        path: path.resolve(__dirname, 'src/app/dist'),
        clean: true,
        filename: 'index.[contenthash].js',
        assetModuleFilename: 'assets/[name][ext]',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/app', 'index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: 'index.[contenthash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.s?css$/i,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [PostCssPresetEnv],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(ttf|otf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            {
                test: /\.mp3$/,
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                        esModule: false,
                      },
                    },
                  ],
            },
            {
                test: /\.(jpeg|jpg|png|gif|webp|svg)$/i,
                use: [
                    {
                      loader: 'image-webpack-loader',
                      options: {
                        esModule: false,
                        mozjpeg: {
                          progressive: true,
                        },
                        optipng: {
                          enabled: false,
                        },
                        pngquant: {
                          quality: [0.65, 0.90],
                          speed: 4
                        },
                        gifsicle: {
                          interlaced: false,
                        },
                        webp: {
                          quality: 75
                        }
                      }
                    },
                  ],
                type: 'asset/resource',
            },
            {
               test: /\.m?js$/i,
               exclude: /(node_modules|bower_components)/,
               use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
               },
            },
        ],
    },
}