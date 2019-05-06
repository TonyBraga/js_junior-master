const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const config = require('./webpack.config')

let app = express()

const compiler = webpack(config) 
const devMiddleware = require('webpack-dev-middleware')(
  compiler,
  config.devServer
)
const hotMiddleware = require('webpack-hot-middleware')(compiler)
app.use(devMiddleware)
app.use(hotMiddleware)

app.use(express.static('dist'))

app.get('/tasks', (req, res) => {
  const tasks = require('./tasks.json')
  res.json(tasks)
})

app.get('/users', (req, res) => {
  const users = require('./users.json')
  res.json(users)
})

app.get('/statuses', (req, res) => {
  const statuses = require('./statuses.json')
  res.json(statuses)
})

const PORT = 3000
app.listen(PORT, () => console.log(`listen server on ${PORT}`))