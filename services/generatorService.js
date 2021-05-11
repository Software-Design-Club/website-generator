const WebsiteGenerator = require('../lib/websiteGenerator')
const settings = require('../settings')
const archiver = require('archiver')
const fs = require('fs')

class GeneratorService {
  constructor (userConfig, websiteGenerator) {
    this.userConfig = userConfig
    this.websiteGenerator = websiteGenerator || new WebsiteGenerator()
  }

  async generateArchive () {
    const createdFiles = await this.websiteGenerator.generate(this.userConfig)
    const fileName = `${this.userConfig.siteName}.zip`
    const output = fs.createWriteStream(`${settings.PROJECT_DIR}/${fileName}`)

    const zip = archiver('zip')
    zip.pipe(output)
    createdFiles.forEach((path, index) => {
      if (index > 0) { // Do not try to archive directories
        const readStream = fs.createReadStream(path)
        zip.append(readStream, { name: `${index}` })
        readStream.close()
      }
    })
    output.on('close', function () {
      console.log('Created extension.zip')
      process.exit(0)
    })

    console.log('Zip Finalize', await zip.finalize())

    return Promise.resolve({ fileName: fileName, filePath: output.path }
    )
  }
}

module.exports = GeneratorService
