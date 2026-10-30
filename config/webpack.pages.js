const HtmlWebpackPlugin = require('html-webpack-plugin')

function createPages(template, filename, chunks) {
  return new HtmlWebpackPlugin({
    template: template,
    filename: filename,
    chunks: chunks
  })
}

const htmlPages = [
  createPages('./src/index.html', './index.html', ['index']),
  createPages('./src/pages/about.html', './about.html', ['about']),
  createPages('./src/pages/placeholder.html', './placeholder.html', ['placeholder'])
]

module.exports = htmlPages
