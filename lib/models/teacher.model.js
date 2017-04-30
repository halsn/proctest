const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const schema = new Schema({
  name: {
    type: String,
    required: '名称不能为空'
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: '用户邮箱不能为空',
    unique: '用户以注册'
  },
  pass: {
    type: String,
    required: '密码不能为空'
  }
})

module.exports = schema

mongoose.model('Teacher', schema)
