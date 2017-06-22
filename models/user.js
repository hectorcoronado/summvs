var mongoose = require('mongoose')

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
    default: String
  }],
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
})

var User = mongoose.model('User', UserSchema)

module.exports = User
