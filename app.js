var express = require('express')
var favicon = require('serve-favicon')
var httpProxy = require('http-proxy')
var logger = require('morgan')
var path = require('path')

var app = express()

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

// ///////// //
// PROXY API //
// ///////// //
var apiProxy = httpProxy.createProxyServer({
  target: 'http://localhost:3001'
})
// --->>> re-route all reqs to proxy <<<---
app.use('/api', function (req, res) {
  apiProxy.web(req, res)
})
// ///////// //
// END PROXY //
// ///////// //

app.get('*', function (req, res) {
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
