// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: './lib/currentlyAiringAnime.es2015.js',
  output: [
    {
      file: './lib/currentlyAiringAnime.es2015.js',
      format: 'es'
    },
    {
      file: './lib/currentlyAiringAnime.js',
      format: 'umd',
      name: 'currentlyAiringAnime'
    }
  ],
  plugins: [
    resolve(),
    commonjs()
  ]
};
