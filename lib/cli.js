
class CLI {
  constructor (io) {
    this.io = io
    this.websiteOptions = {}
  }

  async generateWebsiteOptions (configuration) {
    const websiteOptions = Object.entries(configuration).reduce(async (previousWebsiteOptions, config) => {
      const options = await previousWebsiteOptions
      options[config[0]] = await this.prompt(config[1])
      return options
    }, Promise.resolve({}))

    this.io.close()

    return websiteOptions
  }

  prompt (question) {
    return new Promise((resolve) => {
      this.io.question(question, (answer) => {
        resolve(answer)
      })
    })
  }
}

module.exports = CLI
