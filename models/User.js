const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    profile: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    permission: {
      type: Number,
      required: true
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false
    }
  }
)