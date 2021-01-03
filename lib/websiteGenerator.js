const fs = require('fs')

class WebsiteGenerator {
  constructor (ui) {
    this.ui = ui
  }

  prompt () {
    this.ui.question('Site name: ', (answer) => {
      this.generate(answer)
      this.ui.close()
    })
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

module.exports = WebsiteGenerator
