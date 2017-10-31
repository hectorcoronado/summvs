#! /bin/bash

# in the environmenbt where heroku config:set WEBPACK=prod
if [ $WEBPACK == 'prod' ]
then
  webpack --config webpack.config.prod.js
else
  webpack --config webpack.config.dev.js --watch
fi
