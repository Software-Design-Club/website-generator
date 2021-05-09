const GeneratorService = require('../../services/generatorService')
const settings = require('../../settings')
const fs = require('fs')
const path = require('path')

describe('GeneratorService', () => {
  describe('generateArchive', () => {
    const userConfig = {
      siteName: 'valid_zip',
      authorName: 'My Name'
    }
    // '/Users/emmanuelgenard/Workspace/website-generator/my_website.zip'
    afterEach(() => {
      fs.rmSync(`./${userConfig.siteName}.zip`, { force: false })
    })
    it('calls websiteGenerator with the user configuration', () => {
      const mockWebsiteGenerator = {
        generate: jest.fn().mockResolvedValue([])
      }

      const generatorService = new GeneratorService(userConfig, mockWebsiteGenerator)

      generatorService.generateArchive()

      expect(mockWebsiteGenerator.generate).toHaveBeenCalledWith({ siteName: 'valid_zip', authorName: 'My Name' })
    })

    it('generates and saves a zip archive', async () => {
      const mockWebsiteGenerator = {
        generate: () => Promise.resolve(['/Users/emmanuelgenard/Workspace/website-generator/test/fixtures/test_website/', '/Users/emmanuelgenard/Workspace/website-generator/test/fixtures/test_website/index.html'])
      }

      const generatorService = new GeneratorService(userConfig, mockWebsiteGenerator)
      await generatorService.generateArchive()

      const filePath = path.resolve(settings.PROJECT_DIR, `${userConfig.siteName}.zip`)
      const archiveExists = fs.existsSync(filePath)
      expect(archiveExists).toBeTruthy()
    })

    it('returns the file name and file path of the zip archive', async () => {
      const mockWebsiteGenerator = {
        generate: () => Promise.resolve(['/Users/emmanuelgenard/Workspace/website-generator/test/fixtures/test_website/', '/Users/emmanuelgenard/Workspace/website-generator/test/fixtures/test_website/index.html'])
      }

      const generatorService = new GeneratorService(userConfig, mockWebsiteGenerator)

      const fileName = `${userConfig.siteName}.zip`
      expect(await generatorService.generateArchive()).toEqual({ fileName: fileName, filePath: `./${fileName}` })
    })
  })
})
