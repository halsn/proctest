const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const schema = new Schema({
  name: {
    type: String,
    required: '姓名不能为空'
  },
  origin_id: {
    type: Schema.Types.ObjectId
  },
  owner: String,
  creater: String,
  owner_id: {
    type: Schema.Types.ObjectId,
    required: '教师不能为空'
  },
  creater_id: {
    type: Schema.Types.ObjectId,
    required: '创建者不能为空'
  },
  brief: {
    type: String,
    required: '描述不能为空'
  },
  quizs: [{
    genre: {
      type: String,
      enum: ['单选题', '多选题', '判断题', '问答题'],
      required: true
    },
    describe: {
      content: {
        type: String,
        required: true,
        trim: true
      },
      img: [{
        data: Buffer,
        format: String
      }]
    },
    selections: [{
      type: String,
      trim: true
    }],
    answers: [{
      type: String,
      trim: true
    }],
    groupId: String,
    refPoint: String
  }]
})

schema.index({
  name: 1,
  creater_id: 1,
  owner_id: 1
}, {
  unique: '课程以添加'
})

module.exports = schema

mongoose.model('Course', schema)
