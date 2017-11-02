var aws = require('aws-sdk')
var bcrypt = require('bcrypt-nodejs')
var mongoose = require('mongoose')
require('dotenv').config()

var UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  isAdmin: false,
  password: String,
  validationString: String,
  verified: Boolean,
  resetPasswordExpires: Date,
  resetPasswordToken: String
})

// ENCRYPTION METHODS:
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

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  var user = this

  // user.password is the hashed + salted password; bcrypt will internally salt/hash candidatePassword & compare for us (if they're equal, isMatch === true):
  bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
    if (err) { return callback(err) }

    callback(null, isMatch)
  })
}

// EMAIL/AWS-SES METHODS (in alphabetical order):
UserSchema.methods.forgotPasswordEmail = function (req, email, resetPasswordToken) {
  aws.config = new aws.Config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'us-west-2'
  })

  var ses = new aws.SES({apiVersion: '2010-12-01'})

  var to = [email]

  var from = 'summvs@summvs.com'

  var htmlData = "<h4>you are receiving this because you have requested to reset your account's password.<h4>" + '<h4>please click on the following link, or paste this into your browser to complete the process:<h4>' + 'https://' + req.headers.host + '/reset/' + resetPasswordToken + '<h4>if you did not request this, please ignore this email and your password will remain unchanged.</h4>' + '<h4>-s u m m v s</h4>'

  ses.sendEmail({
    Source: from,
    Destination: { ToAddresses: to },
    Message: {
      Subject: {
        Data: 's u m m v s - password reset'
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

  var htmlData = '<h4>hello,<h4>' + '<h4>this is confirmation that the password for your account ' + user.email + ' has been changed.</h4>' + '<h4>-s u m m v s</h4>'

  ses.sendEmail({
    Source: from,
    Destination: { ToAddresses: to },
    Message: {
      Subject: {
        Data: 's u m m v s - password changed.'
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
  var htmlData = '<h3>thank you.</h3><h4>to verify your email address, please click below.</h4><h4><a href="https://' + req.headers.host + '/signup/' + user.validationString + '">verify email</a></h4>' + '<h4>-s u m m v s</h4>'

  ses.sendEmail({
    Source: from,
    Destination: { ToAddresses: to },
    Message: {
      Subject: {
        Data: 's u m m v s - welcome'
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

var User = mongoose.model('User', UserSchema)

module.exports = User
