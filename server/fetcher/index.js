const http = require('http')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const bt = require('./bt')
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
  return getHref().then((hrefs) => {
    return Promise.all(getBtLink(hrefs)).then((list) => {
      return list
    })
  })
}

/**
 * request 发送请求
 * @param {string} url url
 * @param {string} encode 编码格式
 * @returns {promise} resolve 字符串
 */
function getRequestChunk(url, encode) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, (res) => {
      const chunks = []
    
      res.on('data', (chunk) => {
        chunks.push(chunk)
      })
    
      res.on('end', () => {
        resolve(iconv.decode(Buffer.concat(chunks), encode))
      })
    })
    req.end()
  })
}

/**
 * 获取href
 * @returns {promise} promise
 */
function getHref() {
  return Promise.all(
    [1, 2].map((i) => {
      return getRequestChunk(`http://www.ygdy8.net/html/gndy/dyzz/list_23_${i}.html`, 'gb2312')
    })
  ).then((results) => {
    return results.reduce((hrefs, str) => {
      const $ = cheerioLoad(str)
      return hrefs.concat(Array.from($('.co_content8 .ulink')).map((element) => {
        return $(element).attr('href')
      }))
    }, [])
  })
}

/**
 * 获取电影的bt
 * @param {any} hrefs 
 * @returns 
 */
function getBtLink(hrefs) {
  return hrefs.map((val) => {
    return getRequestChunk(`http://www.ygdy8.net/${val}`, 'gb2312').then((str) => {
      const $ = cheerioLoad(str)
      return $('#Zoom td a').eq(0).attr('href')
    })
  })
}

module.exports = config.fetcher.type === 'bt' ? bt : fetcher
