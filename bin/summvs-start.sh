#! /bin/bash

# in the environment where heroku config:set BACK_END=true
set -x
if [ $FRONT_END == true ]
then
  echo "front end"
  ./bin/www
  echo "Setting process.env.PORT=$PORT"
  heroku config:set PORT=$PORT --app summvsserver
else
  echo "back end"
  node server.js
fi
