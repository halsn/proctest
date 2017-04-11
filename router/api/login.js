const path = require('path')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const db = require(path.resolve('lib/db.js'))
const Teacher = db.model('Teacher')
const getError = db.getError

module.exports.post = (req, res) => {
  const { useremail, userpass, token } = req.body
  if (token) {
    jwt.verify(token, 'jwt', (err, decoded) => {
      if (err) return res.json({ tokenFail: '请重新登录' })
      else return res.json({ success: '登录成功', name: decoded.name, id: decoded.id })
    })
  } else {
    Teacher
      .findOne({ email: useremail })
      .then(doc => {
        if (!doc || !bcrypt.compareSync(userpass, doc.pass)) return res.json({ error: '帐号或密码错误' })
        else {
          const token = jwt.sign({ id: doc._id, name: doc.name }, 'jwt', { expiresIn: '2h' })
          return res.json({ success: '登录成功', token, id: doc._id, name: doc.name })
        }
      })
      .catch(err => {
        return res.json({ error: getError(err) })
      })
  }
}
