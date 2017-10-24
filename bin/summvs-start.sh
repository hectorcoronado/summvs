#! /bin/bash

# in the environment where heroku config:set BACK_END=true
if [ $FRONT_END == true ]
then
  ./bin/www
  eval "heroku config:set PORT=$PORT --app summvsserver"
else
  node server.js
fi
