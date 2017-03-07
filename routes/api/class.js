const Class = require('../../../lib/class');

function get(req, res) {
  if (!req.session.user) return res.json({ error: '登录超时，请重新登录' });
  const email = req.session.user.email;
  Class.find({ ref_teacher: t_id }).exec((err, data) => {
    if (err) return res.status(500).end('未知错误');
    res.json(data).end();
  });
}

function post(req, res) {
  if (!req.session.user) return res.end('登陆超时，请重新登陆');
  const preAdd = req.body;
  preAdd.ref_teacher = req.session.user._id;
  new Class(preAdd).save(err => {
    if (err) res.status(500).end('内部错误');
    res.status(200).end();
  });
}

function put(req, res) {
  if (!req.session.user) return res.end('登陆超时，请重新登陆');
  Class.update({
    _id: req.body._id
  }, {
    $set: {
      ref_students: req.body.ref_students
    }
  }).exec(err => {
    if (err) return res.status(500).end('内部错误');
    res.status(200).end();
  });
}

function del(req, res) {
  if (!req.session.user) return res.end('登陆超时，请重新登陆');
  Class.remove({
    _id: req.body._id
  }).exec(err => {
    if (err) return res.status(500).end('内部错误');
    res.status(200).end();
  });
}

module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
module.exports.del = del;
