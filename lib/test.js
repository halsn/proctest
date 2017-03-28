const model = require('./db').model;
const Schema = require('./db').Schema;

const schema = new Schema({
  refClass: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required: true
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
  checkExpireAt: {
    type: Date,
    default: Date.now() + (1000 * 60 * 5),
    required: true
  },
  expireNum: Number,
  judgeNum: Number,
  singleNum: Number,
  multiNum: Number,
  askNum: Number,
  checkNum: Number,
  refStudents: [{
    name: String,
    no: String,
    //专业
    major: String,
    //专业班级
    className: String,
    canGetAnswers: {
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
      score: Number,
      checked: {
        type: Boolean,
        default: false
      },
      checkedBy: [{
        name: String,
        score: Number
      }]
    }]
  }],
  uuid: {
    type: String,
    required: true
  }
});

const Test = model('test', schema);

module.exports = Test;
