var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var express = require('express')
var logger = require('morgan')
var mongoose = require('mongoose')

var app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// ////////////////// //
// --->>> APIs <<<--- //
// ////////////////// //
mongoose.connect('mongodb://localhost:27017/summvs')

var Product = require('./models/product.js')

// --->>> POST PRODUCTS <<<---
// TODO: figure out why ingredients array isn't posting!!!
app.post('/products', function (req, res) {
  var product = req.body
  var ingredients = req.body.ingredients
  console.log(ingredients)

  Product.create(product, function (err, products) {
    if (err) {
      throw err
    }
    res.json(products)
  })
})

// --->>> GET PRODUCTS <<<---
app.get('/products', function (req, res) {
  Product.find(function (err, products) {
    if (err) {
      throw err
    }
    res.json(products)
  })
})

// --->>> UPDATE PRODUCT <<<---
app.put('/products/:_id', function (req, res) {
  var product = req.body
  var query = req.params._id

  var update = {
    '$set': {
      name: product.name,
      image: product.image,
      price: product.price,
      description: product.description,
      ingredients: product.ingredients,
      inventory: product.inventory
    }
  }

  // this option returns the updated document:
  var options = { new: true }

  Product.findOneAndUpdate(query, update, options, function (err, products) {
    if (err) {
      throw err
    }
    res.json(products)
  })
})

// --->>> DELETE PRODUCT <<<---
app.delete('/products/:_id', function (req, res) {
  var query = { _id: req.params._id }

  Product.remove(query, function (err, products) {
    if (err) {
      console.log(err)
    }
    res.json(products)
  })
})

// ////////////////////// //
// --->>> END APIs <<<--- //
// ////////////////////// //

app.listen(3001, function (err) {
  if (err) {
    return console.log(err)
  }
  console.log('API Server is listening on http://localhost:3001')
})
