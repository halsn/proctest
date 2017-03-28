const Course = require('../../lib/course');

function get(req, res) {
  //if (!req.session.user) return res.json({ error: '登录超时' });
  Course
    .find()
    .exec((err, docs) => {
      if (err) return res.json({ error: '未知错误' });
      res.json({
        success: '查询成功',
        data: docs
      });
    });
}

function post(req, res) {
}

function put(req, res) {
}

function del(req, res) {
}

module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
module.exports.del = del;
