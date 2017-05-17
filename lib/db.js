const mongoose = require('mongoose')
const path = require('path')
const uniqueValidater = require('mongoose-unique-validator')
const fs = require('fs')

const config = require(path.resolve('./config'))

<<<<<<< HEAD
const URI = config.db.uri

mongoose.connect(URI, () => {
  console.log(`db connected on ${URI}`)
})
=======
const URI = process.env.MONGODB_CONNECTION || config.db.uri

mongoose.connect(URI)
>>>>>>> 5ac8705abdf032f1b1eb0b52ffa1d49e8022e0e2

const modelFiles = fs.readdirSync(path.resolve('lib/models'))
// 加载model以及注册插件
modelFiles.forEach(file => {
  const schema = require(path.resolve(`lib/models/${file}`))
  schema.plugin(uniqueValidater)
})

module.exports = mongoose

module.exports.getError = (err) => {
  var message = ''

  if (err.error) {
    message = err.error
  } else if (err.message && !err.errors) {
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
