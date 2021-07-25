#!/bin/bash

docker stop kaboom-games
docker rm kaboom-games

docker run -d -p 9001:80 --name kaboom-games kaboom-games

