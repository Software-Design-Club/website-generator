
class CLI {
  constructor (io) {
    this.io = io
    this.websiteOptions = {}
  }

  async prompt (configuration) {
    const websiteOptions = Object.entries(configuration).reduce(async (websiteOptions, config) => {
      websiteOptions[config[0]] = await this.getWebsiteName(config[1])
      return websiteOptions
    }, {})

    this.io.close()

    return websiteOptions
  }

  getWebsiteName (question) {
    return new Promise((resolve) => {
      this.io.question(question, (answer) => {
        resolve(answer)
      })
    })
  }
}

module.exports = CLI
