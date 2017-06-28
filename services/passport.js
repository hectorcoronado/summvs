// Passport authenticates user when they visit a protected route:
var passport = require('passport')
var ExtractJwt = require('passport-jwt').ExtractJwt
var JwtStrategy = require('passport-jwt').Strategy
var LocalStrategy = require('passport-local')
require('dotenv').config()

var User = require('../models/user')

// create local strategy:
var localOptions = { usernameField: 'email' }
var localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  // verify user's email & pw, call 'done' w/user if correct
  // else, call 'done' w/false
  User.findOne({ email: email }, function (err, user) {
    if (err) { return done(err) }
    if (!user) { return done(null, false) }

    // use comparePassword method (from user.js) to see if submitted password === saved (ie hashed) user.password:
    user.comparePassword(password, function (err, isMatch) {
      if (err) { return done(err) }
      if (!isMatch) { return done(null, false) }

      // after return, we'll have access to user via req.user
      return done(null, user)
    })
  })
})

// set options for JWT strategy:
var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET_STRING
}

// create JWT strategy. fn's 'payload' is decoded JWT token, 'done' is cb. does user.id in payload exist in db? if so, call 'done' w/that user, else call 'done' w/o user obj
var jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.sub, function (err, user) {
    // ...& if search fails:
    if (err) { return done(err, false) }
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
})

// pass strategies to Passport:
passport.use(jwtLogin)
passport.use(localLogin)
