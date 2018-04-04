import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
  input: 'src/react-motive.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
    {
      file: 'lib/react-motive.umd.js',
      format: 'umd',
      name: 'ReactMotive',
      globals: {
        react: 'React',
      },
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [babel({ presets: '../.babelrc.js' })],
};
