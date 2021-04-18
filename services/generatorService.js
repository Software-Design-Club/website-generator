const WebsiteGenerator = require('../lib/websiteGenerator')

class GeneratorService {
  constructor (userConfig, websiteGenerator) {
    this.userConfig = userConfig
    this.websiteGenerator = websiteGenerator || new WebsiteGenerator()
  }

  generateArchive () {
    this.websiteGenerator.generate(this.userConfig)
    return {
      fileName: 'test_website.zip',
      filePath: '/Users/emmanuelgenard/Workspace/website-generator/test/fixtures/test_website.zip'
    }
  }
}

module.exports = GeneratorService
