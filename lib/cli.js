
class CLI {
  constructor (io) {
    this.io = io
    this.websiteOptions = {}
  }

  async prompt (question) {
    this.websiteOptions.siteName = await this.getWebsiteName(question, this.io)

    this.io.close()
  }

  getWebsiteName (question) {
    return new Promise((resolve) => {
      this.io.question(question, (answer) => {
        resolve(answer)
      })
    })
  }
}

// const getWebsiteName = (question, readline) => {
//   return new Promise((resolve) => {
//     readline.question(question, (answer) => {
//       resolve(answer)
//     })
//   })
// }

module.exports = CLI
