const fs = require('fs/promises')

class WebsiteGenerator {
  async generate ({ siteName, authorName, generateJS, generateCSS }) {
    const path = `./${siteName}`
    await fs.mkdir(path)

    if (generateJS) {
      const jsPath = `./${siteName}/js`
      await fs.mkdir(jsPath)
      await fs.writeFile(`${jsPath}/script.js`, '')
    }

    if (generateCSS) {
      const cssPath = `./${siteName}/css`
      await fs.mkdir(cssPath)
      await fs.writeFile(`${cssPath}/style.css`, '')
    }

    await fs.writeFile(`${path}/index.html`, this.htmlTemplate(siteName.trim(), authorName))
    return Promise.resolve([path, `${path}/index.html`])
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
