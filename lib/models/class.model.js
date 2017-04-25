const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: '班级名不能重复'
  },
  term: {
    type: String,
    required: '请选择学期'
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
})

module.exports = schema

mongoose.model('Class', schema)
