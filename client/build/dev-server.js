const config = require('../config')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const log = require('../utils/log')()

const webpackConfig = require('./webpack.config')

const port = config.port

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})


app.use(hotMiddleware)


// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join('/', 'static')
app.use(staticPath, express.static('./static'))

log.info('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  log.info(`> Listening at http://127.0.0.1:${port}`)
  const server = app.listen(port)
})