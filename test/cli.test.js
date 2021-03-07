const CLI = require('../lib/cli.js')
const readline = require('readline')

describe('CLI', () => {
  it('calls generator with user input', async () => {
    const generator = { generate: jest.fn().mockResolvedValue([]) }
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

  it('outputs generated', async () => {
    const generator = { generate: jest.fn() }
    const io = {
      write: jest.fn()
    }
    const cli = new CLI(io, generator)

    io.write = jest.fn()

    cli.outputGeneratedFiles(['path1', 'path2'])

    expect(io.write.mock.calls[0][0]).toEqual('Created path1')
    expect(io.write.mock.calls[1][0]).toEqual('Created path2')
  })
  // Created ./awesomeco
// Created ./awesomeco/index.html
// Created ./awesomeco/js/
// Created ./awesomeco/js/script.js
// Created ./awesomeco/css/
// Created ./awesomeco/css/styles.css
})
