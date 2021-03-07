const CLI = require('../lib/cli.js')
const readline = require('readline')

describe('CLI', () => {
  it('calls generator with user input', async () => {
    const generator = { generate: jest.fn() }
    const io = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    const cli = new CLI(io, generator)
    setImmediate(() => io.write('My Website\n'))
    setImmediate(() => io.write('Name\n'))
    const promptConfigurations = {
      siteName: 'Site Name: ',
      authorName: 'Author: '
    }

    await cli.generateWebsite(promptConfigurations)

    const options = { siteName: 'My Website', authorName: 'Name' }

    expect(generator.generate).toHaveBeenCalledWith(options)
  })
})
