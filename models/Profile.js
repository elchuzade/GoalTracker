const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema(
  {
    user: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false
    }
  }
)

module.exports = Profile = mongoose.model('profile', ProfileSchema)