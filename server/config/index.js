module.exports = {
  port: 3001,
  fetcher: {
    type: 'bt', // index/bt
    keyword: 'aa', // 搜索关键字
  },
  db: {
    fileName: 'bt', //  资源文件名
    type: 'local', // 持久化数据方式
  },
}
