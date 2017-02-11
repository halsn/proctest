const Test = require('../../lib/test');

function get(req, res) {
  var uuid = req.query.uuid;
  Test.find()
    .where('uuid').equals(uuid)
    .exec()
    .then(docs => {
      var test = docs[0];
      if (!test) return res.status(404).end('not found');
      return Test
        .find()
        .where('ref_class')
        .equals(test.ref_class)
        .exec();
    })
    .then(docs => {
      return res.json(docs);
    })
    .catch(err => res.status(500).end(err));
}

module.exports.get = get;
