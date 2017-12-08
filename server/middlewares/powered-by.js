require('dotenv').config()

const { version } = require('../package.json')

const poweredBy = (options = { description: 'Express' }) => (req, res, next) => {
  // eslint-disable-next-line
  options.disabled
    ? res.removeHeader('X-Powered-By')
    : res.setHeader(
      'X-Powered-By',
      `${process.env.APP_NAME} - ${version}` || options.description
    )
  next()
}

module.exports = poweredBy
