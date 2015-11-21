#!/usr/bin/env bash

# desc:
#   deploys the version in dist/* to Elastic Beanstalk
# usage:
#   awseb.sh <appenv> <cname>

# setup locale (locally, i.e. testing on OS X, it breaks without - doesn't hurt)
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

# aws config
AWS_REGION=eu-west-1
EB_BUCKET=circleci

# read the variables passed in
EB_DATE=`date +"%y%m%d-%H%M%S"`
EB_VER="$CIRCLE_BRANCH-$EB_DATE"
EB_APP=$1
EB_CNAME=$2

#Our helper function
GET_ENV=`dirname $0`/aws-getenv.js

# determine the environment name from the cname
EB_ENV=`aws elasticbeanstalk \
  describe-environments \
  --region $AWS_REGION \
  | node $GET_ENV EnvironmentName $EB_CNAME`

# create the deployment zip file based on the version specified
ZIP_FILE=$EB_ENV-$EB_VER.zip
pushd dist
zip -r ../$ZIP_FILE .
popd

# copy the zip to S3
aws s3 cp \
  $ZIP_FILE s3://$EB_BUCKET/$ZIP_FILE \
  --region $AWS_REGION

# make sure we are ready
EB_STATUS="Waiting"
while [ "$EB_STATUS" != "Ready" ]; do
  # no tight loops on CircleCI
  sleep 5

  # get status via describe
  EB_STATUS=`aws elasticbeanstalk \
    describe-environments \
    --region $AWS_REGION \
    | node $GET_ENV Status $EB_CNAME`
done

# Create new Elastic Beanstalk version
aws elasticbeanstalk \
  create-application-version \
  --application-name $EB_APP \
  --version-label $EB_VER \
  --source-bundle S3Bucket=$EB_BUCKET,S3Key=$ZIP_FILE \
  --region $AWS_REGION

# Update Elastic Beanstalk environment to new version
EB_STATUS=`aws elasticbeanstalk \
  update-environment \
  --environment-name $EB_ENV \
  --version-label $EB_VER \
  --region $AWS_REGION \
  | node $GET_ENV Status $EB_CNAME`

# check deployment status, until we are not "Updating" & "Ready"
while true; do
  # Not updating anymore? "Ready" == success, "..." == oops
  if [ "$EB_STATUS" != "Updating" ]; then
    if [ "$EB_STATUS" == "Ready" ]; then
      exit 0
    fi
    exit 1
  fi

  # hang back a bit to give it more time (not too much to timeout CircleCI)
  sleep 5

  # get status via describe
  EB_STATUS=`aws elasticbeanstalk \
    describe-environments \
    --region $AWS_REGION \
    | node $GET_ENV Status $EB_CNAME`
done
