
const webpack = require('webpack');

module.exports = {
  // your existing webpack configuration goes here
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]
};
