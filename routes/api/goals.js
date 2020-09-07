const express = require('express')
const router = express.Router()
const passport = require('passport')
const Goal = require('../../models/Goal')
const validateGoalsInput = require('../../validation/goals')

// @route GET api/goals/
// @desc Get all goals
// @access Private
router.get(
  '',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
  Goal.find({ deleted: false, user: req.user.id })
    .then(goals => {
      return res.status(200).json(goals)
    })
    .catch(err => {
      errors.message = 'Goals not found'
      console.log(err)
      return res.status(404).json(errors)
    })
})

// @route GET api/goals/
// @desc Get all goals
// @access Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
  Goal.findById(req.params.id)
    .then(goal => {
      return res.status(200).json(goal)
    })
    .catch(err => {
      errors.message = 'Goal not found'
      console.log(err)
      return res.status(404).json(errors)
    })
})

// @route POST api/goals/
// @desc Post new goal
// @access Private
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
  const { errors, isValid } = validateGoalsInput(req.body)
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const newGoal = {}
  newGoal.user = req.user.id
  newGoal.name = req.body.name
  newGoal.description = req.body.description
  newGoal.status = [{
    date: Date.now(),
    complete: false
  }]
  new Goal(newGoal)
    .save()
    .then(savedGoal => {
      return res.status(200).json(savedGoal)
    })
})

module.exports = router