const GeneratorService = require('../../services/generatorService')
const fs = require('fs')

describe('GeneratorService', () => {
  describe('generateArchive', () => {
    const userConfig = {
      siteName: 'my_website',
      authorName: 'My Name'
    }
    it('calls websiteGenerator with the user configuration', () => {
      const mockWebsiteGenerator = {
        generate: jest.fn().mockResolvedValue([])
      }

      const generatorService = new GeneratorService(userConfig, mockWebsiteGenerator)

      generatorService.generateArchive()

      expect(mockWebsiteGenerator.generate).toHaveBeenCalledWith({ siteName: 'my_website', authorName: 'My Name' })
    })

    it('generates and saves a zip archive', async () => {
      const mockWebsiteGenerator = {
        generate: () => Promise.resolve(['/Users/emmanuelgenard/Workspace/website-generator/test/fixtures/test_website/', '/Users/emmanuelgenard/Workspace/website-generator/test/fixtures/test_website/index.html'])
      }

      const generatorService = new GeneratorService(userConfig, mockWebsiteGenerator)
      await generatorService.generateArchive()

      const archiveExists = fs.existsSync(`${userConfig.siteName}.zip`)
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
