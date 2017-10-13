var path = require('path')
var env = process.env.NODE_ENV || 'development'

const watch = (env) => {
  if (env === 'development') {
    return true
  }
  return false
}

module.exports = {
  entry: './src/Client.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  watch: watch(env),
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  }
}
