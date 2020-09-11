const express = require('express')
const router = express.Router()
const passport = require('passport')
const Goal = require('../../models/Goal')
const validateGoalsInput = require('../../validation/goals')

// @route GET api/goals/
// @desc Get all goals
// @access Private
router.get(
  '/',
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

// @route GET api/goals/:id
// @desc Get all goals
// @access Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
  Goal.findById(req.params.id)
    .then(goal => {
      if (goal.deleted) {
        errors.message = 'Goal is deleted'
        return res.status(400).json(errors)
      }

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
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
  const { errors, isValid } = validateGoalsInput(req.body)
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const newGoal = {}
  newGoal.user = req.user.id
  newGoal.title = req.body.title
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

// @route PUT api/goals/:id
// @desc Update goal
// @access Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
  const { errors, isValid } = validateGoalsInput(req.body)
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  Goal.findById(req.params.id)
    .then(goal => {
      if (goal.deleted) {
        errors.message = 'Goal is deleted'
        return res.status(400).json(errors)
      }

      if (req.body.title) goal.title = req.body.title
      if (req.body.description) goal.description = req.body.description

      goal
        .save()
        .then(savedGoal => {
          return res.status(200).json(savedGoal)
        })
    })
    .catch(err => {
      errors.message = 'Goal not found'
        console.log(err)
        return res.status(404).json(errors)
    })
})

// @route DELETE api/goals/:id
// @desc Delete goal
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
  const { errors, isValid } = validateGoalsInput(req.body)
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }
  Goal.findById(req.params.id)
    .then(goal => {
      if (goal.deleted) {
        errors.message = 'Goal is deleted'
        return res.status(400).json(errors)
      }

      goal.deleted = true
      goal
        .save()
        .then(savedGoal => {
          return res.status(200).json(savedGoal)
        })
    })
    .catch(err => {
      errors.message = 'Goal not found'
        console.log(err)
        return res.status(404).json(errors)
    })
})

var CronJob = require('cron').CronJob;
var job = new CronJob('0 10 * * *', function() {
  console.log('Updating goals for the next day');
  Goal
    .find()
    .then(goals => {
      goals.forEach(goal => {
        let updatedStatus = [...goal.status, {
          date: Date.now(),
          complete: false
        }]
        goal.status = updatedStatus
        goal.save()
      })
    })
    .catch(err => {
      console.log(err)
    })

}, null, true, 'America/Los_Angeles');

job.start();

module.exports = router