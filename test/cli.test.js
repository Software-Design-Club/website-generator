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
    const configuration = {
      siteName: 'Site Name: '
    }

    const websiteOptions = await cli.prompt(configuration)

    expect(websiteOptions).toEqual({ siteName: 'My Website' })
  })
})
