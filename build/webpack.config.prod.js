const webpack = require('webpack')
const configBase = require('./webpack.config.base')

configBase.optimization.minimize = true

const plugins = [
  // let react know to ignore debugging info
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify('false'),
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.OccurrenceOrderPlugin(true)
].concat(configBase.plugins)

module.exports = Object.assign({}, configBase, { plugins })
