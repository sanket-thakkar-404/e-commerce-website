require('dotenv').config()
const http = require('http');
const app = require('./src/app')
const connectedToDb = require('./src/config/database.config')
const debug = require('debug')('development:server')


const PORT = process.env.PORT
connectedToDb()


const server = http.createServer(app);




server.listen(PORT, () => {
  debug(`server is running in the port ${PORT}`)
})