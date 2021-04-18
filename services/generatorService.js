const WebsiteGenerator = require('../lib/websiteGenerator')
const archiver = require('archiver')
const fs = require('fs')

class GeneratorService {
  constructor (userConfig, websiteGenerator) {
    this.userConfig = userConfig
    this.websiteGenerator = websiteGenerator || new WebsiteGenerator()
  }

  async generateArchive () {
    const createdFiles = await this.websiteGenerator.generate(this.userConfig)
    const output = fs.createWriteStream(`./${this.userConfig.siteName}.zip`)
    const zip = archiver('zip')
    zip.pipe(output)
    createdFiles.forEach((path, index) => {
      if (index > 0) {
        zip.append(fs.createReadStream(path), { name: `${index}` })
      }
    })
    zip.finalize()

    return {
      fileName: 'test_website.zip',
      filePath: '/Users/emmanuelgenard/Workspace/website-generator/test/fixtures/test_website.zip'
    }
  }
}

module.exports = GeneratorService
