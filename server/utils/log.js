const winston = require('winston')

module.exports = function (nameSpace = 'default') {
  winston.loggers.add(nameSpace, {
    console: {
      level: 'silly',
      colorize: true,
      label: 'server',
    },
    file: {
      filename: 'somefile.log'
    },
  })
  return winston.loggers.get(nameSpace)
}