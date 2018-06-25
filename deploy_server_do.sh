#! /bin/bash
yarn build:server
docker build -t tilersmyth/plugnrent:latest .
docker push tilersmyth/plugnrent:latest
ssh root@206.81.6.87 "docker pull tilersmyth/plugnrent:latest && docker tag tilersmyth/plugnrent:latest dokku/plugnrent:latest && dokku/plugnrent:latest && dokku tags:deploy plugnrent latest"