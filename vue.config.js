const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
	chainWebpack: config => {
		// 添加别名
		config.resolve.alias
			.set('@', resolve('src'))
			.set('@assets', resolve('src/assets'))
			.set('@scss', resolve('src/assets/scss'))
			.set('@components', resolve('src/components'))
			.set('@store', resolve('src/store'))
			.set('@utils', resolve('src/utils'))
			.set('@pages', resolve('src/pages'))
	}
}
