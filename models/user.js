var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

// TODO: add paymentMethod to schema once you figure out how Stripe (or other payment thing) works, and add orderHistory.

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
