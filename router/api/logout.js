module.exports.get = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.json({ error: '注销失败' });
    } else {
      res.json({ success: '注销成功' });
    }
  });
};
