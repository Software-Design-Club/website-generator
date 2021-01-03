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
    fs.mkdirSync(`./${name}`)
    fs.writeFileSync(`./${name}/index.html`, this.htmlTemplate(name.trim()))
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
