const path = require('path');
const configs = require('./configs');
const Html = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: "development",
	entry: './client/src/index.js',
	output: {
		filename: './main.js',
		path: path.resolve(__dirname, 'server/dist')
	},
	devServer: {
		contentBase: path.join(__dirname, 'client/dist'),
		compress: true,
		port: 9000
	},
	devtool: "source-map",
	plugins: [
		new Html({template: "./client/public/index.html"}),
		new CopyWebpackPlugin([
			{from: `${configs.client.publicPath}/img`, to: "img"},
		]),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				resolve: {
					extensions: ['.js', '.jsx']
				},
				test: /\.(js|jsx)$/,
				exclude: "/node_modules/",
				use: {
					loader: "babel-loader"
				}
			}
		]
	}
};