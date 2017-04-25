const path = require('path')
const _ = require('lodash')

const db = require(path.resolve('lib/db.js'))
const Course = db.model('Course')
const Teacher = db.model('Teacher')
const getError = db.getError

module.exports.get = (req, res) => {
  Course.find()
    .then(courses => {
      const data = courses.map(c => {
        const userCount = courses.filter(course => {
          return (course.creater_id + course.name) === (c.creater_id + c.name)
        }).length
        return {
          _id: c._id,
          name: c.name,
          brief: c.brief,
          creater: c.creater,
          creater_id: c.creater_id,
          owner: c.owner,
          owner_id: c.owner_id,
          userCount
        }
      }).filter(d => d.creater === d.owner)
      return res.json({ success: 'get', courseList: data })
    })
    .catch(err => {
      return res.json({ error: getError(err) })
    })
}

module.exports.del = (req, res) => {
  return res.json({ success: 'del' })
}

module.exports.put = (req, res) => {
  const { id } = req.user
  const ids = req.body.map(d => d._id)
  const option = { id, ids }

  getUser(option)
    .then(getCourse)
    .then(save)
    .then(() => {
      return res.json({ success: '添加成功' })
    })
    .catch(err => {
      return res.json({ error: getError(err) })
    })

  function getUser(option) {
    const { id } = option
    return Teacher.findOne({ _id: id })
      .then(user => {
        option = _.assign({ user }, option)
        return Promise.resolve(option)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }

  function getCourse(option) {
    const { ids } = option
    return Course.find({ _id: { $in: ids } })
      .then(courses => {
        const { user } = option
        const updates = courses.map(c => new Course({
          origin_id: c._id,
          owner_id: user._id,
          owner: user.name,
          creater: c.creater,
          creater_id: c.creater_id,
          name: c.name,
          brief: c.brief,
          quizs: c.quizs
        }))
        option = _.assign({ updates }, option)
        return Promise.resolve(option)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }

  function save(option) {
    const { updates } = option
    const saveTasks = updates.map(u => u.save())
    return Promise.all(saveTasks)
      .then(() => {
        return Promise.resolve(option)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}

module.exports.post = (req, res) => {
  return res.json({ success: 'post' })
}
