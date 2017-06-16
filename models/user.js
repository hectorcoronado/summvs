var mongoose = require('mongoose')

var UserSchema = mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
})

var User = mongoose.model('User', UserSchema)

module.exports = User
