#! /bin/bash

# in the environment where heroku config:set BACK_END=true
if [ $FRONT_END == true ]
then
  ./bin/www
else
  node server.js
fi

set -e

sourceApp="$summvsclient"
targetApp="$summvsserver"
config=""

while read line; do
  config="$config $line"
done  < <(heroku config --app "$sourceApp" --shell )

eval "heroku config:set $config --app $targetApp"
