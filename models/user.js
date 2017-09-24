var aws = require('aws-sdk')
var bcrypt = require('bcrypt-nodejs')
var mongoose = require('mongoose')
require('dotenv').config()

// TODO: add orderHistory.

var UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  addresses: [{
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
    // default: String
  }],
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  verified: Boolean,
  password: String,
  validationString: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
})

// HELPER METHODS:

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

UserSchema.methods.sendEmail = function (req, callback) {
  aws.config = new aws.Config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'us-west-2'
  })

  var user = this
  // load AWS SES
  var ses = new aws.SES({apiVersion: '2010-12-01'})

  // send to list
  var to = [user.email]

  // this must relate to a verified SES account
  var from = 'summvs@summvs.com'

  // create html string to send in mail:
  var htmlData = '<h3>Thank you.</h3><h4>To verify your email address, please click below.</h4><h4><a href="https://' + req.headers.host + '/signup/' + user.validationString + '">Verify Email</a></h4>' + '<h4>-SUMMVS</h4>'

  ses.sendEmail({
    Source: from,
    Destination: { ToAddresses: to },
    Message: {
      Subject: {
        Data: 'WELCOME TO SUMMVS'
      },
      Body: {
        Html: {
          Data: htmlData
        }
      }
    }
  },
  function (err, data) {
    if (err) { console.log(err) }
  })
}

UserSchema.methods.forgotPasswordEmail = function (req, email, resetPasswordToken) {
  aws.config = new aws.Config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'us-west-2'
  })

  var ses = new aws.SES({apiVersion: '2010-12-01'})

  var to = [email]

  var from = 'summvs@summvs.com'

  var htmlData = "<h4>You are receiving this because you have requested to reset your account's password.<h4>" + '<h4>Please click on the following link, or paste this into your browser to complete the process:<h4>' + 'https://' + req.headers.host + '/reset/' + resetPasswordToken + '<h4>If you did not request this, please ignore this email and your password will remain unchanged.</h4>' + '<h4>-SUMMVS</h4>'

  ses.sendEmail({
    Source: from,
    Destination: { ToAddresses: to },
    Message: {
      Subject: {
        Data: 'SUMMVS Password Reset'
      },
      Body: {
        Html: {
          Data: htmlData
        }
      }
    }
  },
  function (err, data) {
    if (err) { console.log(err) }
  })
}

UserSchema.methods.resetPasswordSuccessEmail = function (req, callback) {
  aws.config = new aws.Config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'us-west-2'
  })

  var user = this

  var ses = new aws.SES({apiVersion: '2010-12-01'})

  var to = [user.email]

  var from = 'summvs@summvs.com'

  var htmlData = '<h4>Hello,<h4>' + '<h4>This is a confirmation that the password for your account ' + user.email + ' has just been changed.</h4>' + '<h4>-SUMMVS</h4>'

  ses.sendEmail({
    Source: from,
    Destination: { ToAddresses: to },
    Message: {
      Subject: {
        Data: 'Your SUMMVS password has been changed.'
      },
      Body: {
        Html: {
          Data: htmlData
        }
      }
    }
  },
  function (err, data) {
    if (err) { console.log(err) }
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
