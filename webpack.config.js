// const webpack = require('webpack')
const path = require('path')
const webpack = require('webpack')

process.traceDeprecation = true

module.exports = (env, argv = { mode: 'development' }) => {
  const { mode } = argv
  return {
    context: path.resolve('./src'),
    entry: ['babel-polyfill', './index.js'],
    resolve: {
      modules: [
        path.resolve('./src'),
        path.resolve('./node_modules')
      ]
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        MODE: mode
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: path.resolve('./node_modules'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['env', 'stage-0'],
                plugins: ['transform-object-assign', 'rewire']
              }
            }
          ]
        }
      ]
    },
    node: {
      fs: 'empty',
      module: 'empty'
    }
  }
}
