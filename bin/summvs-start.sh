#! /bin/bash

# in the environment where heroku config:set BACK_END=true
if [ $BACK_END == true ]
then
  node server.js
  process.env.PORT == $PORT
else
  ./bin/www
fi
