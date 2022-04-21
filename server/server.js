const http = require('http')
const app = require('./index')

const config = require('./config/default')

const port = process.env.PORT || config.port

const server = http.createServer(app)

server.listen(port)
console.log('You are connected on port: ', port)
