var aws = require('aws-sdk')
var bcrypt = require('bcrypt-nodejs')
var mongoose = require('mongoose')
require('dotenv').config()

// TODO: add paymentMethod to schema once you figure out how Stripe (or other payment thing) works, and add orderHistory.

var UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  addresses: [{
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    // default: String
    verified: false
  }],
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
})

// On save hook, encrypt password:
UserSchema.pre('save', function (next) {
  // context here is user model ('user' is an instance of user model):
  var user = this

  // generate salt, then run cb:
  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err) }

    // hash (encrypt) pw using the salt:
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) { return next(err) }

      // overwrite plain text pw w/encrypted one:
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.sendEmail = function (email, callback) {
  aws.config = new aws.Config({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    region: 'us-west-2'
  })

  var user = this
  // load AWS SES
  var ses = new aws.SES({apiVersion: '2010-12-01'})

  // send to list
  var to = [user.email]

  // this must relate to a verified SES account
  var from = 'summvs@summvs.com'

  ses.sendEmail({
    Source: from,
    Destination: { ToAddresses: to },
    Message: {
      Subject: {
        Data: 'WELCOME TO SUMMVS'
      },
      Body: {
        Html: {
          Data:
            '<h4>Thank you.</h4><h6>To confirm your account, click below.</h6><a href="http://localhost:3000/cart" target="_blank" rel="noopener noreferrer">SUMMVS</a>'
        }
      }
    }
  },
  function (err, data) {
    if (err) { throw err }
    console.log('Email sent:')
    console.log(data)
  })
}

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  var user = this

  // user.password is the hashed + salted password; bcrypt will internally salt/hash candidatePassword & compare for us (if they're equal, isMatch === true):
  bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
    if (err) { return callback(err) }

    callback(null, isMatch)
  })
}

var User = mongoose.model('User', UserSchema)

module.exports = User
