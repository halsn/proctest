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
      // TODO:  //
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
