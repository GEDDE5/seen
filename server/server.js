const express         = require('express')
const server          = express()

const cors            = require('cors')
const bodyParser      = require('body-parser')
const compression     = require('compression')

const poweredBy       = require('./middlewares/powered-by')
const logger          = require('./middlewares/logger')

const serviceRoutes   = require('./routes/services')

server
  .use(cors())
  .use(bodyParser.json())
  .use(compression())
  .use(poweredBy())
  .use(logger())
  .use('/', serviceRoutes)
  .use('/*', (req, res) => res.status(418).send('Oops'))

module.exports = server
