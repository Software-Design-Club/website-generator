const https = require('http')

const port = 3001

const server = https.createServer((request, response) => {
  response.status = 200
  response.setHeader('Content-Type', 'text/html')
  response.end('<h1> Hello World! </h1>')
  console.log(request);
})

server.listen(port, () => {
  console.log('server running on ', port)
})