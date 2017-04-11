import classnames from 'classnames'
import config from './config'
import menu from './menu'
import { request, axios } from './request'
import didmount from './didmount'
import { color } from './theme'

String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, function () {
    return arguments[1].toUpperCase()
  })
}
// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

module.exports = {
  config,
  menu,
  request,
  color,
  classnames,
  didmount,
  axios
}
