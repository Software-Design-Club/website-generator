const CLI = require('../lib/cli.js')
const readline = require('readline')

describe('CLI', () => {
  it('returns a users desired website configuration', async () => {
    const io = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    const cli = new CLI(io)
    setImmediate(() => io.write('My Website\n'))
    setImmediate(() => io.write('Name\n'))
    const promptConfigurations = {
      siteName: 'Site Name: ',
      authorName: 'Author: '
    }

    const websiteOptions = await cli.generateWebsiteOptions(promptConfigurations)

    expect(websiteOptions).toEqual({ siteName: 'My Website', authorName: 'Name' })
  })
})
