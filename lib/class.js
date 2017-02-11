const model = require('./db').model;
const Schema = require('./db').Schema;
const Teacher = require('./teacher');
const Course = require('./course');
const Student = require('./student');

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  term: {
    type: String,
    required: true
  },
  refTeacher: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  refCourse: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  refStudents: [{
    name: String,
    no: String,
    major: String,
    className: String
  }]
});

schema.index({
  name: 1,
  refCourse: 1,
  refTeacher: 1
}, {
  unique: true
});

const Class = model('class', schema);

module.exports = Class;
