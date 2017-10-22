const winston = require('winston')

winston.loggers.add('default', {
  console: {
    level: 'silly', // { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
    colorize: true, // true 上颜色
    label: 'test...', // 前缀(一般写模块名吧)
  },
  file: {
    filename: 'somefile.log' // log的输出文件
  },
})

module.exports = function() {
  return winston.loggers.get('default')
}