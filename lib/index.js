const fs = require('fs')

class WebsiteGenerator {
  generate (name) {
    fs.mkdirSync(`./${name}`)
    fs.writeFileSync(`./${name}/index.html`, `<title>${name}</title>`)
  }
}

module.exports = WebsiteGenerator
