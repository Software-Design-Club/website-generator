const fs = require('fs/promises')

class WebsiteGenerator {
  async generate ({ siteName, authorName, generateJS, generateCSS }) {
    const path = `./${siteName}`
    const created = []
    await fs.mkdir(path).then(() => created.push(path))
    await fs.writeFile(`${path}/index.html`, this.htmlTemplate(siteName.trim(), authorName)).then(() => created.push(`${path}/index.html`))

    if (generateJS) {
      const jsPath = `./${siteName}/js`
      await fs.mkdir(jsPath).then(() => created.push(jsPath))
      await fs.writeFile(`${jsPath}/script.js`, '').then(() => created.push(`${jsPath}/script.js`))
    }

    if (generateCSS) {
      const cssPath = `./${siteName}/css`
      await fs.mkdir(cssPath).then(() => created.push(cssPath))
      await fs.writeFile(`${cssPath}/style.css`, '').then(() => created.push(`${cssPath}/style.css`))
    }

    return Promise.resolve(created)
  }

  htmlTemplate (websiteName, authorName) {
    return (
   `<html>
    <head>
      <meta author="${authorName}" />
      <title>${websiteName}</title>
    </head>
    <body></body>
    </html>`)
  }
}

module.exports = WebsiteGenerator
