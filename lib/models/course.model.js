const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: '课程名称不能重复'
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
      img: {
        data: Buffer,
        format: String
      }
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

module.exports = schema

mongoose.model('Course', schema)
