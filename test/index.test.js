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
  afterEach(() => {
    fs.rmdirSync(websiteName)
  })
  it('creates new directory using given website name', () => {
    const websiteGenerator = new WebsiteGenerator()

    websiteGenerator.generate(websiteName)
    const directory = fs.existsSync(`./${websiteName}`)
    expect(directory).toBeTruthy()
  })
})
