const app = require('../../app')
const supertest = require('supertest')
const GeneratorService = require('../../services/generatorService')
const request = supertest(app)
jest.mock('../../services/generatorService')

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
      .expect('Content-disposition', 'attachment;filename=my_website.zip')
      .expect(200)
  })
})
