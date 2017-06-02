const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const schema = new Schema({
  name: {
    type: String,
    required: true
    // unique: '班级名不能重复'
  },
  term: {
    type: String,
    required: '请选择学期'
  },
  brief: {
    type: String,
    required: '班级描述不能为空'
  },
  refTeacher: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
    required: '教师不能为空'
  },
  refCourse: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: '课程不能为空'
  },
  refStudents: [{
    name: String,
    sno: String,
    major: String,
    className: String
  }]
})

schema.index({
  name: 1,
  refCourse: 1
}, {
  unique: '课程重复'
})

module.exports = schema

mongoose.model('Class', schema)
