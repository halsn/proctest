const path = require('path')
// const _ = require('lodash')

const db = require(path.resolve('lib/db.js'))
const Course = db.model('Course')
const getError = db.getError

module.exports.get = (req, res) => {
  const { id } = req.user
  const { courseId } = req.query
  Course.find({ $or: [{ owner_id: id }, { _id: courseId }] })
    .then(courses => {
      var quizList = []
      const courseList = courses.map(c => ({
        _id: c._id,
        name: c.name,
        creater: c.creater
      }))
      if (courseId) {
        quizList = courses.find(c => String(c._id) === String(courseId)).quizs
      }
      return res.json({ success: 'get', quizList, courseList })
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
  return res.json({ success: 'post' })
}
