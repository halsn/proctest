const model = require('./db').model;
const Schema = require('./db').Schema;
const Class = require('./class');

const schema = new Schema({
  name: {
    type: String,
    default: 'Proc'
  },
  sno: {
    type: String,
    trim: true,
    match: /^\d+$/,
    unique: true,
    sparse: true
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
  },
  classes: [{
    type: Schema.Types.ObjectId,
    ref: 'Class'
  }]
});

const Student = model('student', schema);

module.exports = Student;
