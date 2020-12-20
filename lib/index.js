const fs = require('fs')

class WebsiteGenerator {
  generate (name) {
    fs.mkdirSync(`./${name}`)
  }
}

module.exports = WebsiteGenerator
