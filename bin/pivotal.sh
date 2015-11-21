#!/usr/bin/env bash

DELIVER=`dirname $0`/pivotal.js

git --no-pager log --full-history --pretty="%s" --since=2.weeks | node $DELIVER
