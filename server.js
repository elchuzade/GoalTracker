const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')
const goals = require('./routes/api/goals')
const MongoClient = require('mongodb').MongoClient;

const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('- MongoDB Error - ', err))

// Passport middleware
app.use(passport.initialize())

// Use routes
app.use('/api/users', users)
app.use('/api/profiles', profiles)
app.use('/api/goals', goals)

// Serve static assets if in production (Heroku stuff)
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5001

app.listen(port, () => console.log(`server running on port ${port}`))