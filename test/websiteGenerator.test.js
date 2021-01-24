
const WebsiteGenerator = require('../lib/websiteGenerator')
const fs = require('fs')
const readline = require('readline')
// Site name: awesomeco
// Author: Max Power
// Do you want a folder for JavaScript? y
// Do you want a folder for CSS? y
// Created ./awesomeco
// Created ./awesomeco/index.html
// Created ./awesomeco/js/
// Created ./awesomeco/js/script.js
// Created ./awesomeco/css/
// Created ./awesomeco/css/styles.css

describe('WebsiteGenerator', () => {
  const websiteName = 'myWebsite'
  const ui = {
    write: jest.fn()
  }
  let websiteGenerator

  beforeEach(() => {
    websiteGenerator = new WebsiteGenerator(ui)
  })

  afterEach(() => {
    fs.rmdirSync(`./${websiteName}`, { recursive: true, force: true })
  })

  describe('generate', () => {
    it('creates new directory using given website name', async () => {
      await websiteGenerator.generate(websiteName)

      const directory = fs.existsSync(`./${websiteName}`)
      expect(directory).toBeTruthy()
    })

    it('creates an index.html file in the website directory', async () => {
      await websiteGenerator.generate(websiteName)

      const htmlFile = fs.existsSync(`./${websiteName}/index.html`)
      expect(htmlFile).toBeTruthy()
    })

    it('creates a valid html file', async () => {
      await websiteGenerator.generate(websiteName)

      const fileContents = fs.readFileSync(`./${websiteName}/index.html`, { encoding: 'utf-8' })

      expect(fileContents).toMatch(/^<html>\s*<head>(.|\s)*<\/head>(\s)*<body>(.|\s)*<\/body>(\s)*<\/html>$/gm)
    })

    it('index has the website name as title', async () => {
      await websiteGenerator.generate(websiteName)

      const fileContents = fs.readFileSync(`./${websiteName}/index.html`, { encoding: 'utf-8' })
      expect(fileContents).toContain(`<title>${websiteName}</title>`)
    })

    it('includes the author name in the html meta tag', async () => {
      await websiteGenerator.generate(websiteName, 'Bobby')

      const fileContents = fs.readFileSync(`./${websiteName}/index.html`, { encoding: 'utf-8' })
      expect(fileContents).toContain('<meta author="Bobby" />')
    })

    it('shows the user the path of the directory', async () => {
      await websiteGenerator.generate(websiteName)

      expect(ui.write).toHaveBeenCalledWith(`Created ./${websiteName}\n`)
    })

    it('shows the user the path to the html file', async () => {
      await websiteGenerator.generate(websiteName)

      expect(ui.write).toHaveBeenCalledWith(`Created ./${websiteName}/index.html\n`)
    })

    it('generates a JS directory if user wants it', async () => {
      await websiteGenerator.generate(websiteName, 'Something', true)

      const directory = fs.existsSync(`./${websiteName}/js`)
      expect(directory).toBeTruthy()
    })

    it('does not generate a JS directory if user opts out', async () => {
      await websiteGenerator.generate(websiteName, 'Something', false)

      const directory = fs.existsSync(`./${websiteName}/js`)
      expect(directory).toBeFalsy()
    })

    it('shows the user the path to the JS directory', async () => {
      await websiteGenerator.generate(websiteName, null, true)

      expect(ui.write).toHaveBeenCalledWith(`Created ./${websiteName}/js\n`)
    })

    it('creates a JS file', async () => {
      await websiteGenerator.generate(websiteName, null, true)

      const jsFile = fs.existsSync(`./${websiteName}/js/script.js`)
      expect(jsFile).toBeTruthy()
    })

    it('shows the user the path to the JS file', async () => {
      await websiteGenerator.generate(websiteName, null, true)

      expect(ui.write).toHaveBeenCalledWith(`Created ./${websiteName}/js/script.js\n`)
    })
  })

  describe('prompt', () => {
    it('passes the user input to Website Generator', async () => {
      const ui = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })
      const websiteGenerator = new WebsiteGenerator(ui)
      websiteGenerator.generate = jest.fn()

      setImmediate(() => ui.write('my_website\n'))
      setImmediate(() => ui.write('Name\n'))
      setImmediate(() => ui.write('Y\n'))

      await websiteGenerator.prompt()

      expect(websiteGenerator.generate).toHaveBeenCalledWith('my_website', 'Name', true)
    })
  })
})
