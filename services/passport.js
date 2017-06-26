// Passport authenticates user when they visit a protected route:
var passport = require('passport')
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
require('dotenv').config()

var User = require('../models/user')

// set options for JWT strategy:
var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET_STRING
}

// create JWT strategy. func's payload is decoded JWT token, done is cb. does user.id in payload exist in db? if user exists call 'done' w/that user, else call 'done' w/o user obj
var jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.sub, function (err, user) {
    // if our search fails outright:
    if (err) { return done(err, false) }
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
})

// pass strategy to Passport:
passport.use(jwtLogin)
