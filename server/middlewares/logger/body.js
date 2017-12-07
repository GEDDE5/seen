module.exports = (hasBody, body) => {
  let output = ''
  if(hasBody) {
    const keys = Object.keys(body)
    output = output + ' └  BODY --------------- \n'
    keys.forEach(
      key => output =
        `${output}     ` +
        `${key}: ${String(JSON.stringify(body[key]).substr(0, 100))}` +
        `${(body[key].length > 100 ? '…' : '')}\n`
    )
    output = output + '    --------------------'
  }
  return output
}
