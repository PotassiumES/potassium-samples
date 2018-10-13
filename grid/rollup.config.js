import cleanup from 'rollup-plugin-cleanup'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

const production = !process.env.ROLLUP_WATCH

export default {
	input: './grid/app.js',
	output: {
		file: './grid/build.js',
		format: 'es'
	},
	plugins: [
		commonjs(),
		resolve(),
		cleanup({
			comments: 'none'
		})
	]
}
