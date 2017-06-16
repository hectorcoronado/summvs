var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var express = require('express')
var logger = require('morgan')
var mongoose = require('mongoose')
var path = require('path')
var session = require('express-session')
require('dotenv').config()

var MongoStore = require('connect-mongo')(session)

var app = express()

app.use(logger('combined'))
app.use(bodyParser.json({ type: '*/*' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// MODELS //
var Product = require('./models/product')
var User = require('./models/user')

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
      console.log(`Error POSTING to cart: ${err}`)
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

// AUTH //
app.post('/signup', function (req, res, next) {
  var email = req.body.email
  var password = req.body.password

  // see if user w/given email exists:
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) { return next(err) }

    // if user w/email does exist, return 'unprocessable entity' err:
    if (existingUser) {
      return res.status(422).send({
        error: 'Email is in use.'
      })
    }

    // if NO user w/email exists, create & save user:
    var user = new User({
      email: email,
      password: password
    })

    user.save(function (err) {
      if (err) { return next(err) }
      // res indicating user creation:
      res.json(user)
    })
  })
})
// ==========================
// --->>> PRODUCTS API <<<---

// --->>> POST PRODUCTS <<<---
app.post('/products', function (req, res) {
  var product = req.body

  Product.create(product, function (err, products) {
    if (err) {
      console.log(`Error POSTING product: ${err}`)
    }
    res.json(products)
  })
})

// --->>> GET PRODUCTS <<<---
app.get('/products', function (req, res) {
  Product.find(function (err, products) {
    if (err) {
      console.log(`Error GETTING products: ${err}`)
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
      console.log(`Error UPDATING product: ${err}`)
    }
    res.json(products)
  })
})

// --->>> DELETE PRODUCT <<<---
app.delete('/products/:_id', function (req, res) {
  var query = { _id: req.params._id }

  Product.remove(query, function (err, products) {
    if (err) {
      console.log(`Error DELETING product: ${err}`)
    }
    res.json(products)
  })
})
// --->>> END PRODUCTS API <<<---
// ==============================

// ================================
// --->>> PRODUCT IMAGES API <<<---
app.get('/images', function (req, res) {
  var imgFolder = path.join(__dirname, '/public/images/')

  // require file system & read all files in img folder:
  var fs = require('fs')
  fs.readdir(imgFolder, function (err, files) {
    if (err) {
      return console.log(`Error READING images folder: ${err}`)
    }

    var filesArr = []

    // iterate over imgs & add to filesArr:
    files.forEach(function (file) {
      filesArr.push({ name: file })
    })

    res.json(filesArr)
  })
})
// --->>> END PRODUCT IMAGES API <<<---
// ====================================

// ////////////////////// //
// --->>> END APIs <<<--- //
// ////////////////////// //

app.listen(3001, function (err) {
  if (err) {
    return console.log(err)
  }
  console.log('API Server is listening on http://localhost:3001')
})
