const reqInfo = require('./info')
const reqBody = require('./body')

const logger = (options = {}) => (req, res, next) => {
  output = reqInfo(req, res) + reqBody(req._body, req.body)
  console.log(output);

  next()
}

module.exports = logger