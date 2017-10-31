require('dotenv').config()
require('./services/passport')

var async = require('async')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var crypto = require('crypto')
var express = require('express')
var jwt = require('jwt-simple')
var logger = require('morgan')
var mongoose = require('mongoose')
var passport = require('passport')
var path = require('path')
var randomstring = require('randomstring')
var session = require('express-session')
var https = require('https')
var fs = require('fs')

var STRIPE_TEST_SECRET_KEY = process.env.STRIPE_TEST_SECRET_KEY
var stripe = require('stripe')(STRIPE_TEST_SECRET_KEY)

var requireAuth = passport.authenticate('jwt', { session: false })
var requireSignin = passport.authenticate('local', { session: false })

var options = {
  key: fs.readFileSync('./summvs.key'),
  cert: fs.readFileSync('./summvs.crt'),
  requestCert: false,
  rejectUnauthorized: false
}

// MongoStore needs to be required *after* session:
var MongoStore = require('connect-mongo')(session)

var app = express()
var server = https.createServer(options, app)

app.use(logger('combined'))
app.use(bodyParser.json({ type: '*/*' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// MODELS //
var Order = require('./models/order')
var Product = require('./models/product')
var User = require('./models/user')

// ////////////////// //
// --->>> APIs <<<--- //
// ////////////////// //
var env = process.env.NODE_ENV || 'development'

if (env === 'development') {
  mongoose.connect(
    'mongodb://localhost:27017/summvs',
    { useMongoClient: true }
  )
} else {
  mongoose.connect(
    `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASS}@ds117995-a0.mlab.com:17995,ds117995-a1.mlab.com:17995/summvs?replicaSet=rs-ds117995`,
    { useMongoClient: true }
  )
}

var db = mongoose.connection
db.on('error', console.error.bind(console, `# MongoDB - connection error: `))

// ==========================
// --->>> SESSIONS API <<<---
app.use(session({
  secret: process.env.SECRET_STRING,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 28
  },
  store: new MongoStore({
    mongooseConnection: db,
    ttl: 28 * 24 * 60 * 60
  })
  // ttl (time-to-leave) & cookie maxAge = 28 days
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
// --->>> END SESSIONS API <<<---
// ==============================

// ======================
// --->>> AUTH API <<<---
function tokenForUser (user) {
  var timestamp = new Date().getTime()
  // when we create a user, they'll always have same id, we can use it to encode. sub = subject (who this JWT belongs to), iat = issued at time.
  return jwt.encode({
    sub: user.id,
    iat: timestamp },
    process.env.SECRET_STRING)
}

app.get('/testauth', requireAuth, function (req, res) {
  res.send({ hi: 'there' })
})

app.post('/signin', requireSignin, function (req, res, next) {
  res.send({
    token: tokenForUser(req.user),
    email: req.body.email,
    _id: req.user._id
  })
})

app.post('/signup', function (req, res, next) {
  var email = req.body.email
  var password = req.body.password

  if (!email || !password) {
    return res.status(412).send({
      error: 'please provide all required information.'
    })
  }

  // see if user w/given email exists:
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) { return next(err) }

    // if user w/email does exist, return 'unprocessable entity' err:
    if (existingUser) {
      return res.status(412).send({
        error: 'this email is already in use.'
      })
    }

    // if NO user w/email exists, create user:
    var user = new User({
      password: password,
      email: email,
      validationString: randomstring.generate({
        length: 12,
        charset: 'alphanumeric',
        capitalization: 'lowercase'
      }),
      verified: false
    })
    // ... & save user
    user.save(function (err) {
      if (err) { return next(err) }
      user.sendEmail(req, function (err) {
        if (err) { console.log(err) }
      })
      // res indicating user creation:
      res.json({
        token: tokenForUser(user),
        email: email
      })
    })
  })
})

app.patch('/signup/:_validationString', function (req, res, next) {
  var validationString = req.params._validationString

  User.findOneAndUpdate(
    { validationString: validationString },
    { verified: true },
    { new: true },
    function (err, doc) {
      if (err) {
        console.log(err)
      } else {
        res.send(doc)
      }
    }
  )
})

app.patch('/reset/:_resetPasswordToken', function (req, res, next) {
  var resetPasswordToken = req.params._resetPasswordToken

  async.waterfall([
    function (done) {
      User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() }},
        function (err, user) {
          if (!user || err) {
            res.status(404).send({error: 'reset password token is expired.'})
          }

          user.password = req.body.resetPassword
          user.resetPasswordToken = undefined
          user.resetPasswordExpires = undefined

          user.save(function (err) {
            if (err) { console.log(err) }
            user.resetPasswordSuccessEmail(user.email, function (err) {
              if (err) { console.log(err) }
            })
            // res indicating user creation:
            res.status(200).json({
              token: tokenForUser(user),
              email: user.email,
              success: 'your password has been reset, you will be redirected to your account page shortly.'
            })
          })
        }
      )
    }
  ],
  function (err) {
    if (err) {
      res.status(404).send({error: 'reset password token is expired or email does not exist.'})
    }
  })
})

app.post('/forgot', function (req, res, next) {
  var email = req.body.email

  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var resetPasswordToken = buf.toString('hex')
        done(err, resetPasswordToken)
      })
    },

    function (resetPasswordToken, done) {
      User.findOne({ email: email }, function (err, user) {
        if (!user || err) {
          return res.status(404).send({error: 'email does not exist.'})
        }

        var tokenAndExpiration = {
          resetPasswordToken: resetPasswordToken,
          resetPasswordExpires: Date.now() + 3600000 // 1 hour expiration
        }

        user.update(tokenAndExpiration, function (err, user) {
          if (err) {
            res.status(404).send({error: 'email does not exist.'})
          }
          res.status(200).send({success: 'thank you, you will receive an email with further instructions briefly.'})
        })

        user.forgotPasswordEmail(req, email, resetPasswordToken)
      })
    }
  ],
  function (err) {
    if (err) {
      res.status(404).send({error: 'there was an error in attempting to reset your password.'})
    }
  })
})
// --->>> END AUTH API <<<---
// ==========================

// ========================
// --->>> STRIPE API <<<---
app.post('/charge', function (req, res) {
  stripe.customers.create({
    email: req.body.token.email,
    card: req.body.token.id,
    shipping: {
      address: {
        country: req.body.address.shipping_address_country,
        postal_code: req.body.address.shipping_address_zip,
        line1: req.body.address.shipping_address_line1,
        city: req.body.address.shipping_address_city,
        state: req.body.address.shipping_address_state
      },
      name: req.body.address.shipping_name
    }
  })
    .then(function (customer) {
      stripe.charges.create({
        amount: req.body.amount,
        description: 'sample charge',
        currency: 'usd',
        customer: customer.id
      })
    })
    .then(function (charge) {
      res.send(charge)
    })
    .catch(function (err) {
      console.log('Error:')
      console.log(err)
      res.status(500).send({ error: 'purchase failed' })
    })
})
// --->>> END STRIPE API <<<---
// ============================

// ========================
// --->>> ORDERS API <<<---
app.post('/orders', function (req, res) {
  console.log(req.body.cart)
  var items = req.body.cart.map(function (item) {
    return {
      quantity: item.quantity,
      price: item.price,
      product: item._id
    }
  })
  var order = {
    email: req.body.token.email,
    items: items,
    user: req.body._id,
    shipping: {
      name: req.body.token.card.name,
      address: {
        street: req.body.token.card.address_line1,
        city: req.body.token.card.address_city,
        country: req.body.token.card.address_country,
        postalCode: req.body.token.card.address_zip
      }
    }
  }

  Order.create(order, function (err, orders) {
    if (err) {
      console.log('error posting order:')
      console.log(err)
    }
    res.json(orders)
  })
})
// --->>> END ORDERS API <<<---
// ============================

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
app.patch('/products/:_id', function (req, res) {
  var update = {
    '$set': {
      inventory: req.body.inventory
    }
  }
  var options = { new: true }
  var id = req.body._id
  Product.findOneAndUpdate(
    {_id: id},
    update,
    options,
    function (err, products) {
      if (err) {
        console.log(`Error PUTTING products: ${err}`)
      } else {
        res.json(products)
      }
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

var port = process.env.PORT || 3001
server.listen(port, function (err) {
  if (err) {
    return console.log(err)
  }
  console.log(`API Server is listening on ${port}`)
})
