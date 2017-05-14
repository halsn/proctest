const path = require('path')
const _ = require('lodash')
const uuidV1 = require('uuid/v1')

const db = require(path.resolve('./lib/db.js'))
const Class = db.model('Class')
const Test = db.model('Test')
const getError = db.getError
const agenda = require(path.resolve('./lib/agenda.js'))

const PERIOD = 1000 * 60

module.exports.get = (req, res) => {
  const { id } = req.user
  const { classId } = req.query
  const option = { id, classId }

  getClassList(option)
    .then(getClass)
    .then(option => {
      const { studentsCount, classList, maxSingleNum, maxMultiNum, maxJudgeNum, maxAskNum } = option
      return res.json({ success: 'get', studentsCount, classList, maxSingleNum, maxMultiNum, maxJudgeNum, maxAskNum })
    })
    .catch(err => {
      return res.json({ error: getError(err) })
    })

  function getClassList(option) {
    const { id } = option
    return Class.find({ refTeacher: id })
      .then(classes => {
        const classList = classes.map(c => ({
          _id: c._id,
          name: c.name
        }))
        option = _.assign({ classList }, option)
        return Promise.resolve(option)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }

  function getClass(option) {
    const { classId } = option
    if (!classId) return Promise.resolve(option)
    return Class.findOne({ _id: classId })
      .populate('refCourse')
      .then(clas => {
        function getNum(quizs) {
          return genre => quizs.filter(q => q.genre === genre).length
        }
        const { quizs } = clas.refCourse
        const maxSingleNum = getNum(quizs)('单选题')
        const maxMultiNum = getNum(quizs)('多选题')
        const maxJudgeNum = getNum(quizs)('判断题')
        const maxAskNum = getNum(quizs)('问答题')
        const studentsCount = clas.refStudents.length
        option = _.assign({ studentsCount, maxSingleNum, maxMultiNum, maxJudgeNum, maxAskNum }, option)
        return Promise.resolve(option)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}

module.exports.del = (req, res) => {
  return res.json({ success: 'del' })
}

module.exports.put = (req, res) => {
  const { id } = req.user
  const { postAt, singleNum, multiNum, judgeNum, askNum, answerTime, expireTime, curClass, correctNum } = req.body
  const option = { id, postAt, singleNum, multiNum, judgeNum, askNum, answerTime, expireTime, curClass, correctNum }

  getClass(option)
    .then(genQuizs)
    .then(createTest)
    .then(save)
    .then(registerEvent)
    .then(() => {
      return res.json({ success: '发布成功' })
    })
    .catch(err => {
      return res.json({ error: getError(err) })
    })

  function getClass(option) {
    const { curClass } = option
    return Class.findOne({ _id: curClass })
      .populate('refCourse')
      .then(clas => {
        const { name: className, term: classTerm, brief: classBrief, refStudents } = clas
        const { name: coursename, quizs } = clas.refCourse
        option = _.assign({ className, classTerm, classBrief, refStudents, coursename, quizs }, option)
        return Promise.resolve(option)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }

  function genQuizs(option) {
    const {
      refStudents,
      quizs,
      singleNum,
      multiNum,
      judgeNum,
      askNum
    } = option
    const singleQuizs = quizs.filter(q => q.genre === '单选题')
    const multiQuizs = quizs.filter(q => q.genre === '多选题')
    const judgeQuizs = quizs.filter(q => q.genre === '判断题')
    const askQuizs = quizs.filter(q => q.genre === '问答题')
    const updateStudents = refStudents.map(s => {
      var single = _.shuffle(singleQuizs).splice(0, singleNum)
      var multi = _.shuffle(multiQuizs).splice(0, multiNum)
      const judge = _.shuffle(judgeQuizs).splice(0, judgeNum)
      const ask = _.shuffle(askQuizs).splice(0, askNum)
      single = single.map(s => {
        const { genre, describe, answers } = s
        var { selections } = s
        selections = _.shuffle(selections)
        return { genre, describe, answers, selections }
      })
      multi = multi.map(s => {
        const { genre, describe, answers } = s
        var { selections } = s
        selections = _.shuffle(selections)
        return { genre, describe, answers, selections }
      })
      return {
        name: s.name,
        sno: s.sno,
        major: s.major,
        className: s.className,
        refQuizs: [...single, ...multi, ...judge, ...ask]
      }
    })
    option = _.omit(option, 'refStudents')
    option = _.assign({ refStudents: updateStudents }, option)
    return Promise.resolve(option)
  }

  function createTest(option) {
    const {
      className,
      classTerm,
      classBrief,
      coursename,
      id: refTeacher,
      postAt: createAt,
      answerTime,
      expireTime,
      judgeNum,
      singleNum,
      multiNum,
      askNum,
      correctNum,
      refStudents
    } = option
    const answerExpireAt = createAt + (answerTime * PERIOD)
    const expireAt = expireTime
    const uuid = uuidV1()
    const update = new Test({
      className,
      classTerm,
      classBrief,
      coursename,
      refTeacher,
      createAt,
      answerExpireAt,
      expireAt,
      judgeNum,
      singleNum,
      multiNum,
      askNum,
      correctNum,
      uuid,
      refStudents
    })
    option = _.assign({ update }, option)
    return Promise.resolve(option)
  }

  function save(option) {
    const { update } = option
    return update.save()
      .then(() => {
        return Promise.resolve(option)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }

  function registerEvent(option) {
    const { update } = option
    const { answerExpireAt, expireAt } = update
    const data = { uuid: update.uuid }
    agenda.schedule(answerExpireAt, 'answerExpire', data)
    agenda.schedule(expireAt, 'testExpire', data)
    return Promise.resolve(option)
  }
}

module.exports.post = (req, res) => {
  return res.json({ success: 'post' })
}
