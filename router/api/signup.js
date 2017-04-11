const path = require('path')
const bcrypt = require('bcryptjs')

const db = require(path.resolve('lib/db.js'))
const Teacher = db.model('Teacher')
const getError = db.getError

module.exports.post = (req, res) => {
  const { useremail, userpass, userckps } = req.body
  if (!(useremail && userpass && userckps)) return res.json({ error: '帐号或密码为空' })
  if (userpass !== userckps) {
    return res.json({ error: '两次输入密码不一致' })
  } else {
    const hash = bcrypt.hashSync(userpass, 8)
    const update = new Teacher({ email: useremail, pass: hash })
    update.save()
      .then(() => {
        return res.json({ success: '注册成功' })
      })
      .catch(err => {
        return res.json({ error: getError(err) })
      })
  }
}
