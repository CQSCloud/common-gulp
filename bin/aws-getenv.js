'use strict';

/* eslint no-console:0 */
/* { "Environments": [{
        "ApplicationName": "Cqs-Stats",
        "EnvironmentName": "cqs-stats-test",
        "VersionLabel": "6ee072e220cab614e5445496cb915c7ad7c66c01",
        "Status": "Ready",
        "EnvironmentId": "e-xq9qj9dpiz",
        "EndpointURL": "awseb-e-x-AWSEBLoa-1M2J56G5G50FN-1118978700.eu-west-1.elb.amazonaws.com",
        "SolutionStackName": "64bit Amazon Linux 2015.03 v1.4.4 running Node.js",
        "CNAME": "cqs-stats-test.elasticbeanstalk.com",
        "Health": "Green",
        "AbortableOperationInProgress": false,
        "Tier": {
          "Version": " ",
          "Type": "Standard",
          "Name": "WebServer"
        },
        "DateUpdated": "2015-08-18T11:17:09.925Z",
        "DateCreated": "2015-07-30T11:35:58.199Z"
}]} */

var json = '';

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
  json = json + chunk;
});

process.stdin.on('end', function() {
  var key = process.argv[2];
  var cname = process.argv[3];
  var obj = JSON.parse(json);

  var _logkey = function(env) {
    if (env.CNAME === cname) {
      console.log(env[key]);
    }
  };

  if (obj.Environments) {
    obj.Environments.forEach(_logkey);
  } else {
    _logkey(obj);
  }
});
