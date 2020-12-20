const WebsiteGenerator = require('../lib/index')
const fs = require('fs')
// Site name: awesomeco
// Author: Max Power
// Do you want a folder for JavaScript? y
// Do you want a folder for CSS? y
// Created ./awesomeco
// Created ./awesomeco/index.html
// Created ./awesomeco/js/
// Created ./awesomeco/css/

describe('WebsiteGenerator', () => {
  const websiteName = 'myWebsite'
  afterEach(async () => {
    await fs.rmdir(`./${websiteName}`, { recursive: true, force: true }, () => {})
  })
  it('creates new directory using given website name', async () => {
    const websiteGenerator = new WebsiteGenerator()

    await websiteGenerator.generate(websiteName)
    const directory = fs.existsSync(`./${websiteName}`)
    expect(directory).toBeTruthy()
  })

  it('creates an index.html file in the website directory', async () => {
    const websiteGenerator = new WebsiteGenerator()

    await websiteGenerator.generate(websiteName)

    const htmlFile = fs.existsSync(`./${websiteName}/index.html`)
    expect(htmlFile).toBeTruthy()
  })

  it('index has the website name as title', async () => {
    const websiteGenerator = new WebsiteGenerator()

    await websiteGenerator.generate(websiteName)
    const fileContents = fs.readFileSync(`./${websiteName}/index.html`, { encoding: 'utf-8' })
    expect(fileContents).toContain(`<title>${websiteName}</title>`)
  })
})
