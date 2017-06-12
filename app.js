var express = require('express')
var favicon = require('serve-favicon')
var httpProxy = require('http-proxy')
var path = require('path')

var app = express()

var router = require('./router')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))

// ///////// //
// PROXY API //
// ///////// //
var apiProxy = httpProxy.createProxyServer({
  target: 'http://localhost:3001'
})

// --->>> re-route all reqs to apiProxy <<<---
app.use('/api', function (req, res) {
  apiProxy.web(req, res)
})
// ///////// //
// END PROXY //
// ///////// //

router(app)

module.exports = app
