const fs = require('fs')

class WebsiteGenerator {
  constructor (ui) {
    this.ui = ui
  }

  async prompt () {
    const name = await getWebsiteName(this.ui)
    this.generate(name)
    this.ui.close()
  }

  generate (name) {
    const path = `./${name}`
    fs.mkdirSync(path)
    this.displayGenerated(path)

    fs.writeFileSync(`${path}/index.html`, this.htmlTemplate(name.trim()))
    this.displayGenerated(`${path}/index.html`)
  }

  displayGenerated(path) {
    this.ui.write(`Created ${path}`)
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
