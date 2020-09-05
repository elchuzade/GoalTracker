const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GoalSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    status: [Object]
  }
)

module.exports = Goal = mongoose.model('goal', GoalSchema)