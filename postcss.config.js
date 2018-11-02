module.exports = ctx => ({
	map: { inline: false },
	parser: false,
	plugins: {
		'postcss-import': {},
		'postcss-potassium': {}
	}
})