const path = require('path')
const router = require('express').Router()
const Login = require('./api/login')
const Signup = require('./api/signup')
const Course = require('./api/course')
const QR = require('./api/qr.js')
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
  .all(jwtAuth)
  .get(Course.get)

router
  .route('/api/qr')
  .all(jwtAuth)
  .get(QR.get)

router.get('*', (req, res) => res.redirect('/'))
