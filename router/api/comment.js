const path = require('path')
// const is = require('is_js')
const _ = require('lodash')

const db = require(path.resolve('lib/db.js'))
const Test = db.model('Test')
const getError = db.getError

module.exports.get = (req, res) => {
  return res.json({ success: 'get' })
}

module.exports.del = (req, res) => {
  return res.json({ success: 'del' })
}

module.exports.put = (req, res) => {
  return res.json({ success: 'put' })
}

module.exports.post = (req, res) => {
  const { data, uuid, sno } = req.body
  if (!data || !uuid || !sno) return res.json({ error: '提交的数据有误' })
  const updateData = data.map(d => ({
    _id: d.data._id,
    checkSno: d.checkSno,
    score: d.score * 2,
    sno: d.sno
  }))
  const option = { uuid, updateData, sno, data }

  getTest(option)
    .then(updateCheckStudent)
    .then(updateQuizs)
    .then(save)
    .then((option) => {
      const { student } = option
      return res.json({ success: '提交成功', student })
    })
    .catch(err => {
      return res.json({ error: getError(err) })
    })

  function getTest(option) {
    const { uuid } = option
    return Test.findOne({ uuid })
      .then(test => {
        if (!test) return Promise.reject({ error: '测试编号有误' })
        option = _.assign({ test }, option)
        return Promise.resolve(option)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }

  function updateCheckStudent(option) {
    const { sno, test, data } = option
    const sIdx = test.refStudents.findIndex(s => s.sno === sno)
    test.refStudents[sIdx].postChecked = true
    test.refStudents[sIdx].toCheckQuizs = data
    const student = test.refStudents[sIdx]
    option = _.assign({ student }, option)
    return Promise.resolve(option)
  }

  function updateQuizs(option) {
    const { updateData, test } = option
    updateData.forEach(u => {
      const { sno, _id } = u
      const sIdx = test.refStudents.findIndex(s => s.sno === sno)
      const qIdx = test.refStudents[sIdx].refQuizs.findIndex(q => String(q._id) === String(_id))
      test.refStudents[sIdx].refQuizs[qIdx].checkedBy.push(u)
    })
    return Promise.resolve(option)
  }

  function save(option) {
    const { test } = option
    return test.save()
      .then(() => {
        return Promise.resolve(option)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}
