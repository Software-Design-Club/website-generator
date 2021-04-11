const app = require('../../app')
const supertest = require('supertest')
const GeneratorService = require('../../services/generatorService')
const request = supertest(app)

const serviceOutput = {
  fileName: 'test_website.zip',
  filePath: '/Users/emmanuelgenard/Workspace/website-generator/test/fixtures/test_website.zip'
}
jest.mock('../../services/generatorService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      generateArchive: () => Promise.resolve(serviceOutput)
    }
  })
})

describe('/', () => {
  beforeEach(() => {
    GeneratorService.mockClear()
  })
  it('calls GeneratorService with transformed input', async () => {
    const transformedInput = {
      siteName: 'my_website'
    }
    await request.post('/')
      .send('siteName=my_website')

    expect(GeneratorService).toHaveBeenCalledWith(transformedInput)
  })

  it('sends  a file to the user', async () => {
    await request.post('/')
      .send('siteName=my_website')
      .expect('Content-Type', 'application/zip')
      .expect('Content-disposition', `attachment;filename=${serviceOutput.fileName}`)
      .expect(200)
  })
})
