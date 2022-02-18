const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: "development",
	devtool: "none", 
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist")
	},
plugins: [new HtmlWebpackPlugin()],
module: {
	rules: [
		{
			test:/\\.css$/,
			use: ["style-loader", "css-loader"] // this array is ordered rtl 
		},
		{
			test: /\\html$/,
			use: ["html-loader"]
		},
		{
			test: /\\.(svg|png|jpg|gif)$/,
			use: {
				loader: "file-loader",
				options: {
					name: "[name].[hash].[ext]",
					outputPath: "imgs"
			}
		}
	]
}
}