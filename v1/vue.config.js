// const path = require('path');
// outputDir: path.resolve(__dirname, '../priv/static'),

console.log( 'NODE_ENV: ' + process.env.NODE_ENV )

module.exports = {
	outputDir: './../dist',
	assetsDir: 'assets',
	productionSourceMap: true,
	parallel: undefined,
	css: {
		extract: process.env.NODE_ENV !== 'development',
		sourceMap: true,
	},
	indexPath: './index.html',
	filenameHashing: true,
	lintOnSave: 'error',
	devServer: {
		port: 3000,
		proxy: 'http://wp-kickstart-vue:8080/',
		overlay: {
			warnings: true,
			errors: true,
		},
	},
}
