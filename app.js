const express = require('express')
const bodyParser = require('body-parser')
const mongoExpress = require('mongo-express/lib/middleware')
const mongoExpressConfig = require('./lib/mongo_express.config.default.js')
const expressValidator = require('express-validator')
const compression = require('compression')
const path = require('path')
const router = require('./router')

const config = require(path.resolve('./config'))

const app = express()
const port = config.app.port
app.use(compression())
app.use(express.static(path.resolve('./static')))
app.use('/mongo', mongoExpress(mongoExpressConfig))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(expressValidator({
  customValidators: {
    isArray(value) {
      return Array.isArray(value)
    },
    isEmailList(value) {
      return value.every(v => expressValidator.validator.isEmail(v))
    }
  },
  customSanitizers: {
    toArray(value) {
      if (Array.isArray(value)) return value
      else return [value]
    }
  }
}))

app.use(router)

// global error handler
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).end(err.inner)
  next()
})

app.listen(port, () => {
  console.log(`Node app is running on http://localhost:${port}`)
})

process.on('unhandledRejection', (reason) => {
  console.log('Reason: ' + reason.toString())
})

process.on('error', (err) => {
  console.log(err)
})
