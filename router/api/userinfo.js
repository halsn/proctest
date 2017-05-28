const path = require('path')
const axios = require('axios')

const db = require(path.resolve('lib/db.js'))
const Course = db.model('Course')
const Test = db.model('Test')
const getError = db.getError
module.exports.get = (req, res) => {
  const { id } = req.user
  Course.find({ owner_id: id })
    .then(courses => {
      var quizNum = 0
      var cs = courses.map(c => c.quizs)
      if (cs.length) {
        quizNum = cs.reduce((p, c) => [...p, ...c]).length
      }
      const courseNum = courses.length
      Test.find({ refTeacher: id })
        .sort({ createAt: -1 })
        .then(tests => {
          const testNum = tests.length
          const mapStatus = {
            'inAnswer': 1,
            'inCorrect': 2,
            'inCheck': 3,
            'inFinished': 4
          }
          const testData = tests.slice(0, 5).map(test => ({
            date: test.createAt,
            status: mapStatus[test.stage],
            class: test.className,
            key: test._id
          }))
          axios.get('http://www.sojson.com/open/api/weather/json.shtml?city=%E9%87%8D%E5%BA%86')
            .then(ret => {
              const { data } = ret
              const { data: weatherInfo } = data
              const today = weatherInfo.forecast[0]
              const { type: weatherName } = today
              const { wendu: temp } = weatherInfo
              const mapIcon = {
                '晴': 'CLEAR_DAY',
                '阴': 'PARTLY_CLOUDY_DAY',
                '多云': 'CLOUDY',
                '阵雨': 'RAIN',
                '雷阵雨': 'SLEET'
              }
              const weatherIcon = mapIcon[weatherName]
              return res.json({ success: 'get', quizNum, courseNum, testNum, data: testData, temp, weatherName, weatherIcon })
            })
            .catch(() => {
              return res.json({ success: 'get', quizNum, courseNum, testNum, data: testData })
            })
        })
        .catch(err => {
          return res.json({ error: getError(err) })
        })
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
