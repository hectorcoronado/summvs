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

app.get('/signin', function (req, res, next) {
  res.send({ hi: 'there' })
})

app.post('/signin', requireSignin, function (req, res, next) {
  // user has already had email & pw auth'd
  // we just need to give them a token
  res.send({ token: tokenForUser(req.user) })
})

app.post('/signup', function (req, res, next) {
  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var email = req.body.email
  var password = req.body.password
  var addresses = {
    street: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    country: req.body.country
  }

  if (!firstName || !lastName || !addresses || !password || !email) {
    return res.status(412).send({
      error: 'Please provide all required information.'
    })
  }

  // see if user w/given email exists:
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) { return next(err) }

    // if user w/email does exist, return 'unprocessable entity' err:
    if (existingUser) {
      return res.status(412).send({
        error: 'This email is already in use!'
      })
    }

    // if NO user w/email exists, create user:
    var user = new User({
      firstName: firstName,
      lastName: lastName,
      addresses: addresses,
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
      res.json({ token: tokenForUser(user) })
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
            res.status(404).send({error: 'Reset Password Token is expired.'})
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
              success: 'Your password has been reset, you will be redirected to your account page shortly.'
            })
          })
        }
      )
    }
  ],
  function (err) {
    if (err) {
      res.status(404).send({error: 'Reset Password Token is expired or email does not exist.'})
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
          return res.status(404).send({error: 'Email does not exist.'})
        }

        var tokenAndExpiration = {
          resetPasswordToken: resetPasswordToken,
          resetPasswordExpires: Date.now() + 3600000 // 1 hour expiration
        }

        user.update(tokenAndExpiration, function (err, user) {
          if (err) {
            res.status(404).send({error: 'Email does not exist.'})
          }
          res.status(200).send({success: 'Thank you, you will receive an email with further instructions briefly.'})
        })

        user.forgotPasswordEmail(req, email, resetPasswordToken)
      })
    }
  ],
  function (err) {
    if (err) {
      res.status(404).send({error: 'There was an error in attempting to reset your password.'})
    }
  })
})
// --->>> END AUTH API <<<---
// ==========================

// ========================
// --->>> STRIPE API <<<---
app.post('/charge', function (req, res) {
  console.log('req.body:')
  console.log(req.body)
  var amount = 500

  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
    .then(function (customer) {
      stripe.charges.create({
        amount: amount,
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
      res.status(500).send({ error: 'Purchase failed' })
    })
})
// --->>> END STRIPE API <<<---
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

server.listen(3001, function (err) {
  if (err) {
    return console.log(err)
  }
  console.log('API Server is listening on http://localhost:3001')
})
