// NO ES6 HERE! //
var mongoose = require('mongoose')

var ProductSchema = mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  description: String,
  ingredients: [{ type: String }],
  inventory: Number
})

var Product = mongoose.model('Products', ProductSchema)

module.exports = Product
