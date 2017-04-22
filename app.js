const express = require('express')
const bodyParser = require('body-parser')
const mongoExpress = require('mongo-express/lib/middleware')
const mongoExpressConfig = require('./lib/mongo_express_config')
const expressValidator = require('express-validator')
const compression = require('compression')
const path = require('path')
const router = require('./router')

const config = require(path.resolve('./config'))

const app = express()

const port = config.app.port
const host = config.app.host

app.use(express.static(path.resolve('./static')))
app.use('/mongo', mongoExpress(mongoExpressConfig))

app.use(compression())
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

app.listen(port, host, () => {
  console.log(`Node app is running on http://${host}:${port}`)
})
