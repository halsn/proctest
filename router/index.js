const path = require('path')
const router = require('express').Router()
const Login = require('./api/login')
const Signup = require('./api/signup')
const Course = require('./api/course')
const Cloud = require('./api/cloud')
const Quiz = require('./api/quiz.js')
const QuizInfo = require('./api/quizinfo.js')
const myClass = require('./api/myclass.js')
const Student = require('./api/student.js')
const Test = require('./api/test.js')
const UserInfo = require('./api/userinfo.js')
const TestInfo = require('./api/testinfo.js')
const Comment = require('./api/comment.js')
const QR = require('./api/qr.js')
const openTest = require('./api/opentest.js')
const jwt = require('express-jwt')

const config = require(path.resolve('./config'))
const jwtAuth = jwt({ secret: config.jwt.secret })

module.exports = router

router
  .route('/')
  .get((req, res) => res.sendFile('/index.html'))

router
  .route('/api/login')
  .post(Login.post)

router
  .route('/api/signup')
  .post(Signup.post)

router
  .route('/api/course')
  .all(jwtAuth, (err, req, res, next) => {
    if (err.status === 401) {
      return res.json({ error: '请重新登录' })
    } else {
      next()
    }
  })
  .get(Course.get)
  .put(Course.put)
  .post(Course.post)
  .delete(Course.del)

router
  .route('/api/cloud')
  .all(jwtAuth, (err, req, res, next) => {
    if (err.status === 401) {
      return res.json({ error: '请重新登录' })
    } else {
      next()
    }
  })
  .get(Cloud.get)
  .put(Cloud.put)
  .post(Cloud.post)
  .delete(Cloud.del)

router
  .route('/api/quiz')
  .all(jwtAuth, (err, req, res, next) => {
    if (err.status === 401) {
      return res.json({ error: '请重新登录' })
    } else {
      next()
    }
  })
  .get(Quiz.get)
  .put(Quiz.put)
  .post(Quiz.post)
  .delete(Quiz.del)

router
  .route('/api/quizinfo')
  .all(jwtAuth, (err, req, res, next) => {
    if (err.status === 401) {
      return res.json({ error: '请重新登录' })
    } else {
      next()
    }
  })
  .get(QuizInfo.get)
  .put(QuizInfo.put)
  .post(QuizInfo.post)
  .delete(QuizInfo.del)

router
  .route('/api/myclass')
  .all(jwtAuth, (err, req, res, next) => {
    if (err.status === 401) {
      return res.json({ error: '请重新登录' })
    } else {
      next()
    }
  })
  .get(myClass.get)
  .put(myClass.put)
  .post(myClass.post)
  .delete(myClass.del)

router
  .route('/api/student')
  .all(jwtAuth, (err, req, res, next) => {
    if (err.status === 401) {
      return res.json({ error: '请重新登录' })
    } else {
      next()
    }
  })
  .get(Student.get)
  .put(Student.put)
  .post(Student.post)
  .delete(Student.del)

router
  .route('/api/test')
  .all(jwtAuth, (err, req, res, next) => {
    if (err.status === 401) {
      return res.json({ error: '请重新登录' })
    } else {
      next()
    }
  })
  .get(Test.get)
  .put(Test.put)
  .post(Test.post)
  .delete(Test.del)

router
  .route('/api/userinfo')
  .all(jwtAuth, (err, req, res, next) => {
    if (err.status === 401) {
      return res.json({ error: '请重新登录' })
    } else {
      next()
    }
  })
  .get(UserInfo.get)
  .put(UserInfo.put)
  .post(UserInfo.post)
  .delete(UserInfo.del)

router
  .route('/api/testinfo')
  .all(jwtAuth, (err, req, res, next) => {
    if (err.status === 401) {
      return res.json({ error: '请重新登录' })
    } else {
      next()
    }
  })
  .get(TestInfo.get)
  .put(TestInfo.put)
  .post(TestInfo.post)
  .delete(TestInfo.del)

router
  .route('/api/qr')
  .get(QR.get)

router
  .route('/test')
  .get(openTest.get)
  .post(openTest.post)
  .put(openTest.put)

router
  .route('/comment')
  .post(Comment.post)

router.get('*', (req, res) => res.redirect('/'))
