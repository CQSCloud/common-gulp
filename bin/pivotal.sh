#!/usr/bin/env bash

DELIVER=`dirname $0`/pivotal-deliver.js

git --no-pager log --full-history --pretty="%s" --since=2.weeks | node $DELIVER
