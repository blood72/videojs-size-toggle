import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.ts'];

export default [{
  external: ['video.js'],
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/videojs-size-toggle.js',
      format: 'umd',
      sourcemap: true,
      name: 'videojs-size-toggle',
      globals: { 'video.js': 'videojs' },
    },
    {
      file: 'dist/videojs-size-toggle.min.js',
      format: 'umd',
      name: 'videojs-size-toggle',
      sourcemap: false,
      globals: { 'video.js': 'videojs' },
      plugins: [terser()],
    },
    {
      file: 'dist/videojs-size-toggle.es.js',
      format: 'esm',
      sourcemap: true,
      name: 'videojs-size-toggle',
      globals: { 'video.js': 'videojs' },
    },
    {
      file: 'dist/videojs-size-toggle.es.min.js',
      format: 'esm',
      name: 'videojs-size-toggle',
      sourcemap: false,
      globals: { 'video.js': 'videojs' },
      plugins: [terser()],
    },
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      extensions,
      include: ['src/**/*.ts'],
      exclude: ['./node_modules/**'],
    }),
  ],
}];
