const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema(
  {
    user: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false
    }
  }
)

module.exports = Profile = mongoose.model('profile', ProfileSchema)