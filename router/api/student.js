const path = require('path')
// const _ = require('lodash')

const db = require(path.resolve('lib/db.js'))
const Class = db.model('Class')
const getError = db.getError

module.exports.get = (req, res) => {
  const { id } = req.user
  Class.find({ refTeacher: id })
    .populate('refCourse')
    .populate('refTeacher')
    .then(classes => {
      const classList = classes.map(c => ({
        _id: c._id,
        name: c.name,
        course: c.refCourse.name,
        teacher: c.refTeacher.name
      }))
      console.log(classList)
      return res.json({ success: 'get', classList })
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
  const { selectClass, students } = req.body
  Class.update({ _id: selectClass }, {
    $set: { refStudents: students }
  }, { upsert: true })
    .then(() => {
      return res.json({ success: '添加成功' })
    })
    .catch(err => {
      return res.json({ error: getError(err) })
    })
}
