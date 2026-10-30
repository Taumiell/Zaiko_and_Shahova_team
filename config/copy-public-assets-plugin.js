const fs = require('fs')
const path = require('path')

class CopyPublicAssetsPlugin {
  constructor(sourceDirectory) {
    this.sourceDirectory = sourceDirectory
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('CopyPublicAssetsPlugin', (compilation) => {
      const outputDirectory = compilation.outputOptions.path || compiler.options.output.path
      const destination = path.join(outputDirectory, 'public')

      fs.rmSync(destination, { recursive: true, force: true })
      fs.cpSync(this.sourceDirectory, destination, { recursive: true })
    })
  }
}

module.exports = CopyPublicAssetsPlugin
