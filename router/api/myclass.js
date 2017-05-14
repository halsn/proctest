const path = require('path')
const _ = require('lodash')

const db = require(path.resolve('lib/db.js'))
const Class = db.model('Class')
const Course = db.model('Course')
const getError = db.getError

module.exports.get = (req, res) => {
  const { id } = req.user
  const option = { id }

  getCourse(option)
    .then(getClass)
    .then(option => {
      const { courseList, classList } = option
      return res.json({ success: 'get', courseList, classList })
    })
    .catch(err => {
      return res.json({ error: getError(err) })
    })

  function getCourse(option) {
    const { id } = option
    return Course.find({ owner_id: id })
      .then(courses => {
        const courseList = courses.map(c => ({
          _id: c._id,
          name: c.name
        }))
        option = _.assign({ courseList }, option)
        return Promise.resolve(option)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }

  function getClass(option) {
    const { id } = option
    return Class.find({ refTeacher: id })
      .then(classes => {
        option = _.assign({ classList: classes }, option)
        return Promise.resolve(option)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}

module.exports.del = (req, res) => {
  const { id } = req.query
  Class.findOneAndRemove({ _id: id })
    .then(() => {
      return res.json({ success: '删除成功' })
    })
    .catch(err => {
      return res.json({ error: getError(err) })
    })
}

module.exports.put = (req, res) => {
  const { id } = req.user
  const { name, term, brief, refCourse } = req.body
  const update = new Class({ name, term, brief, refCourse, refTeacher: id })
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
  Class.update({ _id: id }, {
    $set: { name, brief }
  }, { upsert: true })
    .then(() => {
      return res.json({ success: '更新成功' })
    })
    .catch(err => {
      return res.json({ error: getError(err) })
    })
}
