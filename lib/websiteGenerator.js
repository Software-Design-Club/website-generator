const fs = require('fs/promises')

class WebsiteGenerator {
  constructor (ui) {
    this.ui = ui
  }

  async prompt () {
    const name = await getWebsiteName(this.ui)
    this.generate(name)
    this.ui.close()
  }

  async generate (name) {
    const path = `./${name}`
    await fs.mkdir(path).then(() => this.displayGenerated(path))

    await fs.writeFile(`${path}/index.html`, this.htmlTemplate(name.trim()))
      .then(() => this.displayGenerated(`${path}/index.html`))
  }

  displayGenerated (path) {
    this.ui.write(`Created ${path}\n`)
  }

  htmlTemplate (websiteName) {
    return (
   `<html>
    <head>
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

module.exports = WebsiteGenerator
