var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var express = require('express')
var favicon = require('serve-favicon')
var logger = require('morgan')
var mongoose = require('mongoose')
var path = require('path')

// var index = require('./routes/index')
// var users = require('./routes/users')

var app = express()

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

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
/*
_id: 1,
name: 'Soap',
image: 'Image',
price: 10,
description: 'Simple Soap',
ingredients: ['Soap'],
inventory: 10
*/
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

app.get('*', function (req, res) {
  console.log('***')
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
