const path = require('path')
// const _ = require('lodash')

const db = require(path.resolve('lib/db.js'))
// const Course = db.model('Course')
const Test = db.model('Test')
const getError = db.getError
const moment = require('moment')

module.exports.get = (req, res) => {
  const { id } = req.user
  const { searchDate } = req.query
  if (!searchDate) return res.json({ success: 'searchDate' })
  const originDay = moment(new Date(Number(searchDate))).startOf('day')
  const nextDay = moment(originDay).add('1', 'day')
  const originTime = originDay.valueOf()
  const nextTime = nextDay.valueOf()
  Test.find({ $and: [
    { createAt: { $lt: nextTime } },
    { createAt: { $gt: originTime } },
    { refTeacher: id }
  ] })
    .then(tests => {
      const testList = tests.map(t => ({
        uuid: t.uuid,
        createAt: moment(t.createAt).locale('zh-cn').format('MMM Do h:mm:ss a')
      }))
      return res.json({ success: 'get', testList })
    })
    .catch(err => {
      return res.json({ error: getError(err) })
    })
}

module.exports.del = (req, res) => {
  return res.json({ success: 'del' })
}

module.exports.put = (req, res) => {
  return res.json({ success: 'put' })
}

module.exports.post = (req, res) => {
  const { uuid } = req.body
  if (!uuid) return res.json({ error: '测试ID不能为空' })
  Test.findOne({ uuid })
    .then(test => {
      if (!test) return res.json({ error: '测试不存在' })
      return res.json({ success: 'post', test })
    })
    .catch(err => {
      return res.json({ error: getError(err) })
    })
}
