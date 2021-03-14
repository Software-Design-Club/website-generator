const readline = require('readline')
const WebsiteGenerator = require('./websiteGenerator')
const CLI = require('./cli')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const configuration = {
  siteName: 'Site Name: ',
  authorName: 'Author: '
}
const generator = new WebsiteGenerator()
const cli = new CLI(rl, generator)
cli.generateWebsite(configuration).then(generatedFiles => cli.outputGeneratedFiles(generatedFiles)).then(() => rl.close())
