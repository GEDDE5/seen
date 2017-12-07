require('dotenv').config()

const PORT    = process.env.PORT || 4001
const server  = require('./server').listen(PORT)

server.on('listening',
  () => console.log(`Express listening on port ${PORT}`)
)