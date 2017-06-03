"use strict";
var express = require('express');
var app = express();
var path = require('path');

// serve static files:
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT || 8080, function() {
  console.log('App is listening on http://localhost:8080/')
})
