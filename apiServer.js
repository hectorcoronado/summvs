var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var dotenv = require('dotenv').config()
var express = require('express')
var logger = require('morgan')
var mongoose = require('mongoose')
var session = require('express-session')

var MongoStore = require('connect-mongo')(session)

var app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// ////////////////// //
// --->>> APIs <<<--- //
// ////////////////// //
mongoose.connect('mongodb://localhost:27017/summvs')
var db = mongoose.connection
db.on('error', console.error.bind(console, `# MongoDB - connection error: `))

// ==========================
// --->>> SESSIONS API <<<---
app.use(session({
  secret: process.env.SECRET_STRING,
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({
    mongooseConnection: db,
    ttl: 28 * 24 * 60 * 60
  })
  // ttl (time-to-leave) = 28 days
}))

// --->>> POST CART SESSION <<<---
app.post('/cart', function (req, res) {
  var cart = req.body
  // store cart data in session:
  req.session.cart = cart
  req.session.save(function (err) {
    if (err) {
      throw err
    }
    res.json(req.session.cart)
  })
})

//  --->>> GET CART SESSION <<<---
app.get('/cart', function (req, res) {
  if (typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart)
  }
})

// --->>> UPDATE CART SESSION <<<---
app.put('/cart', function (req, res) {
  var cart = req.body
  req.session.cart = cart
  req.session.save(function (err) {
    if (err) {
      throw err
    }
    res.json(req.session.cart)
  })
})
// --->>> END SESSIONS <<<---
// ==========================

// ==========================
// --->>> PRODUCTS API <<<---
var Product = require('./models/product.js')

// --->>> POST PRODUCTS <<<---
app.post('/products', function (req, res) {
  var product = req.body

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

  // return the updated document:
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
// --->>> END PRODUCTS API <<<---
// ==============================

// ////////////////////// //
// --->>> END APIs <<<--- //
// ////////////////////// //

app.listen(3001, function (err) {
  if (err) {
    return console.log(err)
  }
  console.log('API Server is listening on http://localhost:3001')
})
