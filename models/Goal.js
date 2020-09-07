const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GoalSchema = new Schema(
  {
    user: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    status: [Object],
    deleted: {
      type: Boolean,
      required: true,
      default: false
    }
  }
)

module.exports = Goal = mongoose.model('goal', GoalSchema)