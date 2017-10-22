const service = require('../service')
const log = require('../utils/log')()

const schedule = {}

/**
 * start
 */
schedule.start = function() {
  log.info('waiting for update date...')
  // 通知 serveice 更新数据
  service.updateBtLinks()
}

module.exports = schedule
