const readline = require('readline')
const WebsiteGenerator = require('./websiteGenerator')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const websiteGenerator = new WebsiteGenerator(rl)
websiteGenerator.prompt()
