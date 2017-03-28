const Teacher = require('../../lib/teacher');
const bcrypt = require('bcryptjs');

module.exports.post = (req, res) => {
  const email = req.body.useremail;
  const pass = req.body.userpass;
  Teacher
    .findOne({ email })
    .exec((error, doc) => {
      if (error) return res.json({ error: '系统错误' });
      if (!doc) return res.json({ error: '用户不存在' });
      if (bcrypt.compareSync(pass, doc.pass)) {
        return res.json({
          success: '登录成功',
          username: doc.name,
          useremail: doc.email
        });
      } else return res.json({ error: '帐号或密码错误' });
    });
};
