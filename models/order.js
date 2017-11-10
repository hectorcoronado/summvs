var aws = require('aws-sdk')
var mongoose = require('mongoose')
var Schema = mongoose.Schema
require('dotenv').config()

var OrderSchema = mongoose.Schema({
  email: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  items: [{
    name: String,
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
  },
  createdOn: Date
})

// purchaseComplete HELPER METHOD:
OrderSchema.methods.purchaseCompleteEmail = function (order) {
  aws.config = new aws.Config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'us-west-2'
  })

  var ses = new aws.SES({apiVersion: '2010-12-01'})

  var to = [order.email]
  var itemsHtml = order.items.map(function (item) {
    return `<div>${item.name}, qty: ${item.quantity}</div>`
  })

  var shippingHtml = `<div>${order.shipping.address.street}</div><div>${order.shipping.address.city}</div><div>${order.shipping.address.postalCode}</div><div>${order.shipping.address.country}</div>`

  var from = 'summvs@summvs.com'

  var htmlData = '<h4>thank you for your order, ' + order.shipping.name + '.</h4><h4>order summary:</h4>' + itemsHtml + '<h4>shipping address:</h4><div>' + shippingHtml + '</div><h4>-s u m m v s</h4>'

  ses.sendEmail({
    Source: from,
    Destination: { ToAddresses: to },
    Message: {
      Subject: {
        Data: 's u m m v s - order confirmation'
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

var Order = mongoose.model('Order', OrderSchema)

module.exports = Order
