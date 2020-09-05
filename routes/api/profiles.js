const express = require('express')
const router = express.Router()
const passport = require('passport')
const Profile = require('../../models/Profile')

// @route GET api/profiles/:id
// @desc Get profile by id
// @access Public
router.get('/:id', (req, res) => {
  const errors = {}
  Profile.findById(req.params.id)
    .then(foundProfile => {
      if (foundProfile.deleted) {
        errors.profile = 'Profile is deleted'
        return res.status(404).json(errors)
      }
      return res.status(200).json(foundProfile)
    })
    .catch(err => {
      errors.profile = 'Profile not found'
      console.log(err)
      res.status(404).json(errors)
    })
})

// @route PUT api/profiles/:id
// @desc Update profile by id
// @access Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body)
    if (!isValid) {
      // If any errors, send 400 with errors obj
      return res.status(400).json(errors)
    }
    Profile.findById(req.params.id)
      .then(foundProfile => {
        if (foundProfile.deleted) {
          errors.profile = 'Profile is deleted'
          return res.status(404).json(errors)
        }
        if (foundProfile.user !== req.user.id) {
          errors.profile = 'You are not authorized'
          return res.status(400).json(errors)
        }
        if (req.body.name) foundProfile.name = req.body.name
        foundProfile
          .save()
          .then(savedProfile =>
            res.status(200).json({
              item: savedProfile,
              source: 'profile',
              status: 'success',
              message: 'Updated profile successfully!'
            })
          )
          .catch(err => {
            errors.profile = 'Profile can not be updated'
            console.log(err)
            return res.status(400).json(errors)
          })
      })
      .catch(err => {
        errors.profile = 'Profile not found'
        console.log(err)
        res.status(404).json(errors)
      })
  }
)