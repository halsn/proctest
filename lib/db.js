const mongoose = require('mongoose')
const path = require('path')
const uniqueValidater = require('mongoose-unique-validator')
const fs = require('fs')

const config = require(path.resolve('./config'))

const URI = process.env.MONGODB_CONNECTION || config.db.uri

mongoose.connect(URI)

const modelFiles = fs.readdirSync(path.resolve('lib/models'))
// 加载model以及注册插件
modelFiles.forEach(file => {
  const schema = require(path.resolve(`lib/models/${file}`))
  schema.plugin(uniqueValidater)
})

module.exports = mongoose

module.exports.getError = (err) => {
  var message = ''

  if (err.message && !err.errors) {
    message = err.message
  } else {
    for (const errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message
        break
      }
    }
  }

  return message
}
