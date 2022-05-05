#!/bin/bash

sed -e "s/example.com/`hostname -f`/" values.yaml | helm install --create-namespace --namespace kaboom-games kaboom-games . -f -

