const path = require('path')
// const _ = require('lodash')

const db = require(path.resolve('lib/db.js'))
const Course = db.model('Course')
const getError = db.getError

module.exports.get = (req, res) => {
  const { id } = req.user
  Course.find({ owner_id: id, creater_id: id })
    .then(courses => {
      courses = courses.map(c => ({
        _id: c._id,
        name: c.name,
        creater: c.creater
      }))
      return res.json({ success: 'get', courseList: courses })
    })
    .catch(err => {
      return res.json({ error: getError(err) })
    })
}

module.exports.del = (req, res) => {
  return res.json({ success: 'del' })
}

module.exports.put = (req, res) => {
  const { quizs, selectCourse: id } = req.body
  const filterData = quizs.map(q => q.describe.content)

  pull()
    .then(push)
    .then(() => {
      return res.json({ success: '添加成功' })
    })
    .catch(err => {
      return res.json({ error: getError(err) })
    })

  function pull() {
    return Course.update({ $or: [{ _id: id }, { origin_id: id }] }, {
      $pull: { quizs: { 'describe.content': { $in: filterData } } }
    }, { upsert: true, multi: true })
      .then(() => {
        return Promise.resolve()
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }

  function push() {
    return Course.update({ $or: [{ _id: id }, { origin_id: id }] }, {
      $push: { quizs: { $each: quizs } }
    }, { upsert: true, multi: true })
      .then(() => {
        return Promise.resolve()
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}

module.exports.post = (req, res) => {
  return res.json({ success: 'post' })
}
