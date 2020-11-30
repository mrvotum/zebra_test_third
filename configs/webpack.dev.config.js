const PATHS = require('./path.config.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
// импортунть класс плагина очистки
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
// формирование файлов стилей в dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// анализ бандла
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = require('../src/files/menu.json');

module.exports = {
	// мод сборки по умолчанию
	mode: 'development',

	// указывает целевую дирректорию, от которой указываются все пути подключаемых файлов
	context: PATHS.src,

	entry: ['./scripts/main.js', './styles/main.scss'],
	output: {
		filename: 'js/bundle.js',
		path: PATHS.dist
	},

	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},

	module: {
		rules: [
			{
				test: /\.(sa|sc)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../',
						},
					}, {
						loader: 'css-loader',
						options: { sourceMap: true, importLoaders: 2 }
					},
					{
						loader: 'postcss-loader',
						options: { sourceMap: true, postcssOptions: {config: PATHS.post} }
					},
					{
						loader: 'sass-loader',
						options: { sourceMap: true }
					}
				]
			},

			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							cacheDirectory: 'cache/babel'
						}
					},
				]
			},

			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					// включает картинку в js как esMoudle
					// esModule: false,
					name: '[name].[ext]',
					// отменить создание файлов средствами file-loader
					emitFile: false,
					outputPath: (url, resourcePath, context) => {
						// `resourcePath` is original absolute path to asset
						// `context` is directory where stored asset (`rootContext`) or `context` option
						// To get relative path you can use
						// const relativePath = path.relative(context, resourcePath);
						let result = '';

						switch (true) {
							case /\.jpg/.test(url):
								console.log(context);
								result = `images/jpg/${url}`;
								break;

							case /\.png/.test(url):
								result = `images/png/${url}`;
								break;

							case /\.svg/.test(url):
								result = `images/svg/${url}`;
								break;

							default:
								result = `images/${url}`
								break;
						}

						return result;
					},
				}
			},

			{
				test: /\.(ttf|eot|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'fonts/',
					emitFile: false,
					// publicPath: '../static/fonts/'
				},
			},

			{
				test: /\.(svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath:'images/svg/',
					emitFile: false,
				},
			},

			{
				test: /\.pug$/,
				loader: 'pug-loader'
			},
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			// hash: false,
			filename:`index.html`,
			template:`${PATHS.src}/index.pug`,
			menuConfig: config.menu
		}),

		new HtmlWebpackInlineSVGPlugin({
			runPreEmit: true,
		}),

		new CleanWebpackPlugin(),

		// плагин переноса статики
		new CopyWebpackPlugin({
			patterns: [
				{ from: `${PATHS.src}/fonts`, to: `${PATHS.dist}/fonts` },
				{ from: `${PATHS.src}/images`, to: `${PATHS.dist}/images` },
			],
		}),

		new MiniCssExtractPlugin({
			// set output
			filename: `styles/[name].css`
		}),

		// поднимает дэв-вервер с визуализацией анализа бандла
		// new BundleAnalyzerPlugin(),
	],

	devServer: {
		port: 4200,
		contentBase: PATHS.dist,
		hot: true
	},

	devtool: 'source-map'
}
