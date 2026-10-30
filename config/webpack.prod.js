const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const CopyPublicAssetsPlugin = require('./copy-public-assets-plugin.js')

module.exports = merge(common, {
  mode: 'production',
  plugins: [new CopyPublicAssetsPlugin(path.resolve(__dirname, '../public'))]
})
