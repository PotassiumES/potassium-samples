import replace from 'rollup-plugin-replace';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: './single-page-app/app.js',
  output: {
    file: './single-page-app/build.js',
    format: 'es'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    commonjs(),
    resolve(),
    cleanup({
      comments: 'none',
    })
  ]
};
