const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

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
})

module.exports = schema

mongoose.model('Student', schema)
