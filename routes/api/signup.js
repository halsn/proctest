const bcrypt = require('bcryptjs');
const Teacher = require('../../lib/teacher');

module.exports.get = (req, res) => {
  res.json({ success: 'get signup' });
};

module.exports.post = (req, res) => {
  const email = req.body.useremail;
  const pass = req.body.userpass;
  const ckps = req.body.userckps;
  if (!(email && pass && ckps)) return res.json({ error: '帐号或密码为空' });
  if (pass !== ckps) {
    return res.json({ error: '两次输入密码不一致' });
  } else {
    Teacher.findOne({ email })
      .exec((error, doc) => {
        if (error) return res.json({ error: '系统错误' });
        if (doc) return res.json({ error: '用户已注册' });
        const preAdd = new Teacher();
        const hash = bcrypt.hashSync(pass, 10);
        preAdd.email = email;
        preAdd.pass = hash;
        preAdd.save(error => {
          if (error) return res.json({ error: '系统错误' });
          res.json({ success: '注册成功' });
        });
      });
  }
};
