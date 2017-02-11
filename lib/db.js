const mongoose = require('mongoose');

let URI = '';

if (process.env.MONGODB_CONNECTION) {
  URI = 'mongodb://' + process.env.MONGODB_CONNECTION;
} else {
  URI = 'mongodb://0.0.0.0:27017/proctest';
}

mongoose.connect(URI);

module.exports.model = (name, schema) => {
  return mongoose.model(name, schema);
};

module.exports.Schema = mongoose.Schema;
