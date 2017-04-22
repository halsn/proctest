module.exports.get = (req, res) => {
  console.log(req.user)
  return res.json({ courseList: [] })
}
