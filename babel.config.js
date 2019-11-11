const IS_PROD = process.env.NODE_ENV === 'production';
const IS_DEBUG = process.argv.includes('--debug');
const plugins = ['@babel/plugin-proposal-optional-chaining'];

if (IS_PROD && !IS_DEBUG) {
  plugins.unshift([
    'transform-remove-console',
    {
      exclude: ['error', 'warn'],
    },
  ]);
}

module.exports = {
  presets: [
    '@vue/app',
  ],
  plugins,
};
