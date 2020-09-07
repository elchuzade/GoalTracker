const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput (data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''

  if (!Validator.isEmpty(data.name)) {
    errors.name = 'Name is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
