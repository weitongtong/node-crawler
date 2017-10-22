const fetcher = require('../fetcher')
const db = require('../db')

const service = {}

/**
 * 获取Bt链接
 */
service.getBtLinks = async function() {
  return db.getBtLinks()
}

/**
 * 同步获取Bt链接
 */
service.getBtLinksSync = function() {
  return db.getBtLinksSync()
}

/**
 * 更新Bt链接
 */
service.updateBtLinks = async function() {
  fetcher.getBtLinks().then((list) => {
    db.setBtLinks(list)
  })
}

module.exports = service
