const service = require('../service')
const log = require('../utils/log')()

const schedule = {}

/**
 * start 定时任务
 */
schedule.start = function() {
  log.info('waiting for update date...')
  // 通知 serveice 更新数据
  setTimeout(() => {
    service.updateBtLinks()
  }, 3600)
}

module.exports = schedule
