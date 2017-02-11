const model = require('./db').model;
const Schema = require('./db').Schema;
const Class = require('./class');
const Course = require('./course');

const schema = new Schema({
  name: {
    type: String,
    default: 'Test'
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    unique: true
  },
  pass: {
    type: String,
    required: true
  }
});

const Teacher = model('teacher', schema);

module.exports = Teacher;
