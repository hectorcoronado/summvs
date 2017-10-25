#! /bin/bash

# in the environment where heroku config:set BACK_END=true
if [ $FRONT_END == true ]
then
  ./bin/www
fi

if [ $BACK_END == true ]
then
  node server.js
fi
