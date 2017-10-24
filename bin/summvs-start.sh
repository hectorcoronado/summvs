#! /bin/bash

# in the environment where heroku config:set BACK_END=true
if [ $FRONT_END == true ]
then
  ./bin/www
  echo "Setting process.env.PORT=$PORT"
  heroku config:set "PORT=$PORT" --app "summvsserver"
else
  node server.js
fi
