const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {

	// Bundling mode
	mode: 'production',

	// Entry files
	entry: './static/src/script/main.ts',

	// Output bundles (location)
	output: {
		path: path.resolve(__dirname + '/static/dist/'),
		filename: 'bundle.js'
	},

	// File resolutions
	resolve: {
		extensions: ['.ts', '.js']
	},

	// Loaders
	module: {
		rules: [
			{
				test: /\.tsx?/,
				use: [
					{
						loader: 'ts-loader'
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [

		new MiniCssExtractPlugin({
			filename: 'bundle.css'
		})

	]
};
