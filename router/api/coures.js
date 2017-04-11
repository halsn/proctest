module.exports.get = (req, res) => {
  console.log(req.user)
  return res.json({ success: 'success', courseList: [] })
}
