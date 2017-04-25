const path = require('path')
const _ = require('lodash')

const db = require(path.resolve('lib/db.js'))
const Course = db.model('Course')
const getError = db.getError

module.exports.get = (req, res) => {
  const { id } = req.user
  Course.find({ owner_id: id })
    .then(courses => {
      const myCourses = courses.filter(course => String(course.creater_id) === id)
      const otherCourses = courses.filter(course => String(course.creater_id) !== id)
      return res.json({ success: 'get', myCourses, otherCourses })
    })
    .catch(err => {
      return res.json({ error: getError(err) })
    })
}

module.exports.put = (req, res) => {
  const { id, name } = req.user
  const update = new Course(_.assign({ owner_id: id, creater_id: id, creater: name, owner: name }, req.body))
  update.save()
    .then(() => {
      return res.json({ success: '添加成功' })
    })
    .catch(err => {
      return res.json({ error: getError(err) })
    })
}

module.exports.post = (req, res) => {
  const { id, name, brief } = req.body
  Course.update({ _id: id }, {
    $set: { name, brief }
  })
    .then(() => {
      return res.json({ success: '修改成功' })
    })
    .catch(err => {
      return res.json({ error: getError(err) })
    })
}

module.exports.del = (req, res) => {
  const { id: owner_id } = req.user
  const { id: course_id } = req.query
  Course.findOneAndRemove({ _id: course_id, owner_id })
    .then(() => {
      return res.json({ success: '删除成功' })
    })
    .catch(err => {
      return res.json({ error: getError(err) })
    })
}
