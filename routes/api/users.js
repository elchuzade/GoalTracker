const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

// Load Input Validation
const validateSignupInput = require('../../validation/signup')
const validateLoginInput = require('../../validation/login')

const User = require('../../models/User')
const Profile = require('../../models/Profile')

// @route POST api/users/signup
// @desc Signup user
// @access Public
router.post('/signup', (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body)
  // Check for validation errors
  if (!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors)
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        permission: 5
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err

          newUser.password = hash
          new Profile({ user: newUser._id })
            .save()
            .then(newProfile => {
              newUser.profile = newProfile._id
              newUser
                .save()
                .then(user => 
                  res.status(200).json({
                    item: user,
                    source: 'user',
                    status: 'success',
                    message: 'Signed up Successfully!'
                  })
                )
                .catch(err => console.log(err))
            })
        })
      })
    }
  })
})

// @route POST api/users/login
// @desc Login user / Returning JWT Token
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)
  // Check for validation errors
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { email, password } = req.body

  // Find user by email
  User.findOne({ email })
    .then(user => {
      // Check for user
      if (!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors)
      }
      // Check password
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            if (!user.active) {
              errors.activation = 'Account has not been activated yet!'
              return res.status(400).json(errors)
            }
            // User Matched
            const payload = {
              id: user.id,
              name: user.name,
              permission: user.permission,
              profile: user.profile
            } // jwt payload
            // Sign Token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 * 24 * 365 },
              (err, token) => {
                if (err) {
                  console.log(err)
                } else {
                  return res.json({
                    success: true,
                    token: 'Bearer ' + token
                  })
                }
              }
            )
          } else {
            errors.password = 'Password incorrect'
            return res.status(400).json(errors)
          }
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router