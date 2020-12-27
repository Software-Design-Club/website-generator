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
    fs.rmdirSync(`./${websiteName}`, { recursive: true, force: true })
  })
  it('creates new directory using given website name', () => {
    const websiteGenerator = new WebsiteGenerator()

    websiteGenerator.generate(websiteName)
    const directory = fs.existsSync(`./${websiteName}`)
    expect(directory).toBeTruthy()
  })

  it('creates an index.html file in the website directory', () => {
    const websiteGenerator = new WebsiteGenerator()

    websiteGenerator.generate(websiteName)

    const htmlFile = fs.existsSync(`./${websiteName}/index.html`)
    expect(htmlFile).toBeTruthy()
  })

  it('creates a valid html file', () => {
    const websiteGenerator = new WebsiteGenerator()

    websiteGenerator.generate(websiteName)

    const fileContents = fs.readFileSync(`./${websiteName}/index.html`, { encoding: 'utf-8' })

    expect(fileContents).toMatch(/^<html>\s*<head>(.|\s)*<\/head>(\s)*<body>(.|\s)*<\/body>(\s)*<\/html>$/gm)
  })

  it('index has the website name as title', () => {
    const websiteGenerator = new WebsiteGenerator()
    websiteGenerator.generate(websiteName)
    const fileContents = fs.readFileSync(`./${websiteName}/index.html`, { encoding: 'utf-8' })
    expect(fileContents).toContain(`<title>${websiteName}</title>`)
  })
})
