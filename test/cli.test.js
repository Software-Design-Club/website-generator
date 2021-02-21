const CLI = require('../lib/cli.js')
const readline = require('readline')

describe('CLI', () => {
  it('prompts for site name', () => {
    const io = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    io.question = jest.fn()

    const cli = new CLI(io)
    io.question = jest.fn()

    cli.prompt('Site Name: ')
    expect(io.question.mock.calls[0][0]).toBe('Site Name: ')
    io.question.mockRestore()
  })

  it('stores the answers to the prompt', async () => {
    const io = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    const cli = new CLI(io)
    setImmediate(() => io.write('My Website\n'))
    await cli.prompt('Site Name: ')

    expect(cli.websiteOptions).toEqual({ siteName: 'My Website' })
  })
})
