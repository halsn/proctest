const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const schema = new Schema({
  className: String,
  classTerm: String,
  classBrief: String,
  coursename: String,
  refTeacher: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
    required: '教师不能为空'
  },
  createAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  answerExpireAt: {
    type: Date,
    default: Date.now() + (1000 * 60 * 10),
    required: true
  },
  expireAt: {
    type: Date,
    default: Date.now() + (1000 * 60 * 60 * 24),
    required: true
  },
  judgeNum: Number,
  singleNum: Number,
  multiNum: Number,
  askNum: Number,
  correctNum: Number,
  toCorrectQuizs: {
    type: Array,
    default: []
  },
  stage: {
    type: String,
    enum: ['inAnswer', 'inCorrect', 'inCheck', 'inFinished'],
    default: 'inAnswer'
  },
  refStudents: [{
    name: String,
    sno: String,
    //专业
    major: String,
    //专业班级
    className: String,
    canGetAnswers: {
      type: Boolean,
      default: false
    },
    postChecked: {
      type: Boolean,
      default: false
    },
    isChecked: {
      type: Boolean,
      default: false
    },
    //关联的习题
    refQuizs: [{
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
      answered: [{
        type: String,
        trim: true
      }],
      refQoint: [String],
      isRight: {
        type: Boolean,
        default: false
      },
      score: {
        type: Number,
        default: 0
      },
      checked: {
        type: Boolean,
        default: false
      },
      checkedBy: [{
        score: Number,
        checkSno: String
      }]
    }],
    toCheckQuizs: Array
  }],
  uuid: {
    type: String,
    required: true
  }
})

module.exports = schema

mongoose.model('Test', schema)
