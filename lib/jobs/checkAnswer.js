const path = require('path')
const _ = require('lodash')

const db = require(path.resolve('./lib/db.js'))
const Test = db.model('Test')
const getError = db.getError
const removeCheckJob = require(path.resolve('./lib/jobs/removeCheckJob.js'))

module.exports = (data) => {
  return new Promise((resolve, reject) => {
    const { uuid } = data
    const option = { uuid }

    getTest(option)
      .then(checkAskNum)
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
          var hasAsk = false
          const { askNum } = test
          if (askNum > 0) hasAsk = true
          option = _.assign({ hasAsk, test }, option)
          return Promise.resolve(option)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }

    function checkAskNum(option) {
      const { hasAsk } = option
      if (hasAsk) return withAsk(option)
      else return withoutAsk(option)
    }

    function withAsk(option) {
      const { test } = option
      test.stage = 'inCorrect'
      const { toCorrectQuizs, refStudents } = test
      const checkNum = Math.ceil((toCorrectQuizs.length * 5) / refStudents.length)
      const quizs = toCorrectQuizs.sort(() => Math.random() - 0.5)
      // 这点分配题目的逻辑需要特别清楚
      // 整理逻辑时一定要弄清需要什么信息,注意判定条件
      quizs.forEach(q => {
        const consumeQuizs = Array(5).fill(q)
        while (consumeQuizs.length) {
          for (let i = 0; i < refStudents.length; i += 1) {
            if (refStudents[i].sno !== q.sno && consumeQuizs.length) {
              if (test.refStudents[i].toCheckQuizs.length < checkNum) {
                test.refStudents[i].toCheckQuizs.push(consumeQuizs.pop())
              }
            }
          }
        }
      })
      return Promise.resolve(option)
    }

    function withoutAsk(option) {
      const { test, uuid } = option
      test.stage = 'inFinished'
      removeCheckJob(uuid)
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
