const model = require('./db').model;
const Schema = require('./db').Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
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
});

schema.index({
  name: 1
}, {
  unique: true
});

const Course = model('course', schema);

module.exports = Course;
