const path = require('path')
const _ = require('lodash')
const math = require('mathjs')

const db = require(path.resolve('./lib/db.js'))
const Test = db.model('Test')
const getError = db.getError

module.exports = (data) => {
  return new Promise((resolve, reject) => {
    const { uuid } = data
    const option = { uuid }

    getTest(option)
      .then(updateTest)
      .then(save)
      .then(() => {
        return resolve()
      })
      .catch(err => {
        return reject(getError(err))
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

    function updateTest(option) {
      const { test } = option
      test.refStudents.forEach((s, sIdx) => {
        s.refQuizs.forEach((q, qIdx) => {
          if (q.genre === '问答题') {
            if (q.checkedBy.length >= 2) {
              const scoreList = q.checkedBy.map(q => q.score)
              const std = math.std(scoreList)
              if (std <= 3) {
                test.refStudents[sIdx].refQuizs[qIdx].checked = true
                test.refStudents[sIdx].refQuizs[qIdx].score = math.mean(scoreList)
              }
            }
          }
        })
        if (s.refQuizs.every(q => q.checked)) test.refStudents[sIdx].isChecked = true
      })
      if (test.refStudents.every(s => s.isChecked)) test.stage = 'inFinished'
      else test.stage = 'inCheck'
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
  })
}
