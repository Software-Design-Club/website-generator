const fs = require('fs')

class WebsiteGenerator {
  async generate (name) {
    await fs.mkdir(`./${name}`, () => {})
    fs.writeFileSync(`./${name}/index.html`, `<title>${name}</title>`, { encoding: 'utf-8' })
  }
}

module.exports = WebsiteGenerator
