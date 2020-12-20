const fs = require('fs')

class WebsiteGenerator {
  generate (name) {
    fs.mkdirSync(`./${name}`)
    fs.writeFileSync(`./${name}/index.html`, 'hello')
  }
}

module.exports = WebsiteGenerator
