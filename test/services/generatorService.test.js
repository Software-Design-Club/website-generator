const GeneratorService = require('../../services/generatorService')

describe('GeneratorService', () => {
  describe('generateArchive', () => {
    it('calls websiteGenerator with the user configuration', () => {
      const mockWebsiteGenerator = {
        generate: jest.fn()
      }

      const userConfig = {
        siteName: 'my_website',
        authorName: 'My Name'
      }

      const generatorService = new GeneratorService(userConfig, mockWebsiteGenerator)

      generatorService.generateArchive()

      expect(mockWebsiteGenerator.generate).toHaveBeenCalledWith({ siteName: 'my_website', authorName: 'My Name' })
    })
  })
})
