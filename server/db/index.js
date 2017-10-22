const log = require('../utils/log')()
const fs = require('fs')
const config = require('../config')

const db = {}

/**
 * 获取
 * @returns {promise} resolve 数据
 */
db.getBtLinks = function() {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/${config.db.fileName}.json`, (err, data) => {
      if (err) {
        throw err
      }
      resolve(data)
      log.silly('getBtLinks success!')
    })
  })
}

/**
 * 同步获取
 * @returns {object} data
 */
db.getBtLinksSync = function() {
  return fs.readFileSync(`${__dirname}/${config.db.fileName}.json`, { encoding: 'utf-8' })
}

/**
 * 全部覆盖
 * @param {Array} btLinks bt链接
 */
db.setBtLinks = function(btLinks) {
  fs.writeFile(`${__dirname}/${config.db.fileName}.json`, JSON.stringify(btLinks), 'utf-8', (err) => {
    if (err) {
      throw err
    }
    log.silly('setBtLinks success!')
  })
}

/**
 * 全部删除
 */
db.delBtLinks = function() {
  fs.writeFile(`${__dirname}/${config.db.fileName}.json`, '', 'utf-8', (err) => {
    if (err) {
      throw err
    }
    log.silly('delBtLinks success!')
  })
}

module.exports = config.db.type === 'local' ? db : require('./radie')
