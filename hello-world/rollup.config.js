import replace from 'rollup-plugin-replace';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: './hello-world/app.js',
  output: {
    file: './hello-world/build.js',
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
