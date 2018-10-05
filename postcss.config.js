module.exports = ctx => ({
	map: ctx.options.map,
	parser: false,
	plugins: {
		'postcss-import': {},
		'postcss-potassium': {}
	}
})