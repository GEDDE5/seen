const colour = require('./colours')

module.exports = (req, res) => {
  const date = (new Date).toLocaleDateString()
  const time = (new Date).toLocaleTimeString()
  const httpVersion = `HTTP/${req.httpVersion}`
  const statusCode = `${res.statusCode < 400 ? colour.green : color.red}${res.statusCode}${colour.reset}`
  const method = `${req.method}`
  const url = `${req.url}`
  return `\n${date} @ ${time} - ${httpVersion} - ${statusCode} ${method} => ${url}\n`
}
