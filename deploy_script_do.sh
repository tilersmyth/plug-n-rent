#! /bin/bash
yarn build:server
heroku container:push --app=protected-escarpment-21267 web
heroku container:release --app=protected-escarpment-21267 web