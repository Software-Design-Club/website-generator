const fs = require('fs/promises')

class WebsiteGenerator {
  constructor (ui) {
    this.ui = ui
  }

  async prompt () {
    const name = await getWebsiteName(this.ui)
    const authorName = await getAuthorName(this.ui)
    const shouldGenerateJS = await getJsPreference(this.ui)
    await this.generate(name, authorName, shouldGenerateJS)
    this.ui.close()
  }

  async generate (name, authorName, generateJs, generateCSS) {
    const path = `./${name}`
    await fs.mkdir(path).then(() => this.displayGenerated(path))

    if (generateJs) {
      const jsPath = `./${name}/js`
      await fs.mkdir(jsPath).then(() => this.displayGenerated(jsPath))
      await fs.writeFile(`${jsPath}/script.js`, '').then(() => this.displayGenerated(`${jsPath}/script.js`))
    }

    if (generateCSS) {
      const cssPath = `./${name}/css`
      await fs.mkdir(cssPath).then(() => this.displayGenerated(cssPath))
      await fs.writeFile(`${cssPath}/style.css`, '').then(() => this.displayGenerated(`${cssPath}/style.css`))
    }

    await fs.writeFile(`${path}/index.html`, this.htmlTemplate(name.trim(), authorName)).then(() => this.displayGenerated(`${path}/index.html`))
  }

  displayGenerated (path) {
    this.ui.write(`Created ${path}\n`)
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

const getWebsiteName = (readline) => {
  return new Promise((resolve) => {
    readline.question('Site name: ', (answer) => {
      resolve(answer)
    })
  })
}
const getAuthorName = (readline) => {
  return new Promise((resolve) => {
    readline.question('Author name: ', (answer) => {
      resolve(answer)
    })
  })
}
const getJsPreference = (readline) => {
  return new Promise((resolve) => {
    readline.question('Create JS?(Y/N)', (answer) => {
      resolve(answer === 'Y')
    })
  })
}

module.exports = WebsiteGenerator
