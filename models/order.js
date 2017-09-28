var mongoose = require('mongoose')
var Schema = mongoose.Schema

var OrderSchema = mongoose.Schema({
  email: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  items: [{
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    price: Number,
    quantity: Number
  }],
  shipping: {
    name: String,
    address: {
      street: String,
      city: String,
      country: String,
      postalCode: String
    }
  }
})

var Order = mongoose.model('Order', OrderSchema)

module.exports = Order
