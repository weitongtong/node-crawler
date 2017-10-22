
let axios = require('axios')
const https = require('https')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const config = require('../config')

const cheerioLoad = function(str) {
  return cheerio.load(str, {
    decodeEntities: false,
  })
}

const fetcher = {}

/**
 * 获取Bt链接
 */
fetcher.getBtLinks = function() {
  return getBtLink(config.fetcher.keyword || 'q00', 1).then((list) => {
    return list
  })
}

/**
 * 获取电影的bt
 * @param {any} hrefs 
 * @returns 
 */
function getBtLink(keyword, pageNo) {
  const url = `https://www.torrentkitty.tv/search/${keyword}/${pageNo}`
  return axios.get(url).then(res => {
    const $ = cheerioLoad(res.data)
    return Array.from($(".action a[rel='magnet']")).map((element) => {
      return $(element).attr('href')
    })
  }).catch(err => {
    log.error('request failed')
  })
}

module.exports = fetcher
