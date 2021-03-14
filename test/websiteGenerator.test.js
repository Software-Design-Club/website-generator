
const WebsiteGenerator = require('../lib/websiteGenerator')
const fs = require('fs')

describe('WebsiteGenerator', () => {
  const websiteName = 'myWebsite'
  let websiteGenerator

  beforeEach(() => {
    websiteGenerator = new WebsiteGenerator()
  })

  afterEach(() => {
    fs.rmdirSync(`./${websiteName}`, { recursive: true, force: true })
  })

  describe('generate', () => {
    it('creates new directory using given website name', async () => {
      await websiteGenerator.generate({ siteName: websiteName })

      const directory = fs.existsSync(`./${websiteName}`)
      expect(directory).toBeTruthy()
    })

    it('creates an index.html file in the website directory', async () => {
      await websiteGenerator.generate({ siteName: websiteName })

      const htmlFile = fs.existsSync(`./${websiteName}/index.html`)
      expect(htmlFile).toBeTruthy()
    })

    it('creates a valid html file', async () => {
      await websiteGenerator.generate({ siteName: websiteName })

      const fileContents = fs.readFileSync(`./${websiteName}/index.html`, { encoding: 'utf-8' })

      expect(fileContents).toMatch(/^<html>\s*<head>(.|\s)*<\/head>(\s)*<body>(.|\s)*<\/body>(\s)*<\/html>$/gm)
    })

    it('index has the website name as title', async () => {
      await websiteGenerator.generate({ siteName: websiteName })

      const fileContents = fs.readFileSync(`./${websiteName}/index.html`, { encoding: 'utf-8' })
      expect(fileContents).toContain(`<title>${websiteName}</title>`)
    })

    it('includes the author name in the html meta tag', async () => {
      await websiteGenerator.generate({ siteName: websiteName, authorName: 'Bobby' })

      const fileContents = fs.readFileSync(`./${websiteName}/index.html`, { encoding: 'utf-8' })
      expect(fileContents).toContain('<meta author="Bobby" />')
    })

    describe('Creating JS directory and file', () => {
      it('generates a JS directory if user wants it', async () => {
        await websiteGenerator.generate({ siteName: websiteName, generateJS: true })

        const directory = fs.existsSync(`./${websiteName}/js`)
        expect(directory).toBeTruthy()
      })

      it('does not generate a JS directory if user opts out', async () => {
        await websiteGenerator.generate({ siteName: websiteName, generateJS: false })

        const directory = fs.existsSync(`./${websiteName}/js`)
        expect(directory).toBeFalsy()
      })

      it('creates a JS file', async () => {
        await websiteGenerator.generate({ siteName: websiteName, generateJS: true })

        const jsFile = fs.existsSync(`./${websiteName}/js/script.js`)
        expect(jsFile).toBeTruthy()
      })
    })

    describe('Creating CSS directory and file', () => {
      it('generates a CSS directory if user wants it', async () => {
        await websiteGenerator.generate({ siteName: websiteName, generateCSS: true })

        const directory = fs.existsSync(`./${websiteName}/css`)
        expect(directory).toBeTruthy()
      })

      it('does not generate a CSS directory if user opts out', async () => {
        await websiteGenerator.generate({ siteName: websiteName, generateCSS: false })

        const directory = fs.existsSync(`./${websiteName}/css`)
        expect(directory).toBeFalsy()
      })

      it('creates a CSS file', async () => {
        await websiteGenerator.generate({ siteName: websiteName, generateCSS: true })

        const jsFile = fs.existsSync(`./${websiteName}/css/style.css`)
        expect(jsFile).toBeTruthy()
      })
    })

    it('outputs a list of directories and files created', async () => {
      const websiteOptions = { siteName: websiteName, generateJS: true, generateCSS: true }
      await expect(websiteGenerator.generate(websiteOptions)).resolves.toEqual(
        [`./${websiteName}`,
        `./${websiteName}/index.html`,
        `./${websiteName}/js`,
        `./${websiteName}/js/script.js`,
        `./${websiteName}/css`,
        `./${websiteName}/css/style.css`
        ]
      )
    })
  })
})
