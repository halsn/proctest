const qr = require('qr-image')

function get(req, res) {
  var url = req.query.url
  if (!url) res.json({ error: 'url is empty' })
  else {
    const img = qr.image(url, {
      type: 'svg'
    })
    res.type('svg')
    img.pipe(res)
  }
}

module.exports.get = get
