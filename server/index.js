require('dotenv').config()

/*  eslint-disable */
const PORT    = process.env.PORT || 4001
const server  = require('./server').listen(PORT)
/* eslint-enable */

server.on(
  'listening',
  () => console.log(`Express listening on port ${PORT}`)
)
