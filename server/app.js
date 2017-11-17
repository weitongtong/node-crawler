// 应用
const Koa = require('koa')
// const Router = require('koa-router')
const serve = require('koa-static')
const logger = require('koa-logger')
const path = require('path')
const log = require('./utils/log')()
const schedule = require('./schedule')
const service = require('./service')
const config = require('./config')

const app = new Koa()

// app.use(serve(path.join(__dirname, './public')))
app.use(logger())
app.use(async (ctx, next) => {
  log.debug('just test.')
  next()
})

app.use( async (ctx) => {
  // 从 service 上获取Bt数据
  // 必须要用同步的方式去获取
  // 不知道有没有其他的处理方式
  ctx.body = service.getBtLinksSync().toString('utf-8')
})

app.listen(config.port)
log.info(`server is starting at port ${config.port}`)
log.info(`open http://127.0.0.1:${config.port}`)

// 启动定时任务（指定时间点更新库里的数据）
schedule.start()