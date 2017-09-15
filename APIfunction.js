'use strict';

var AWS = require('aws-sdk');
var path = require('path');

var esDomain = {
    region: 'us-west-1',
    endpoint: 'https://search-personalcapital-project-hdozxslht4qju7yzkfj3oimuea.us-west-1.es.amazonaws.com/',
    index: 'plans',
    doctype: 'apache'
};
var endpoint = new AWS.Endpoint(esDomain.endpoint);
var creds = new AWS.EnvironmentCredentials('AWS');

exports.handler = (event, context, callback) => {
    //console.log("something");
    var planName=event.planName;
    var sponsorName=event.sponsorName;
    var sponsorState=event.sponsorState;
    var query='';
    if(planName){
        query='PLAN_NAME:"'+planName+'"';
    }
    if(sponsorName){
         query='SPONSOR_DFE_NAME:"'+sponsorName+'"';
    }
    if(sponsorState){
        query='SPONS_DFE_MAIL_US_STATE:"'+sponsorState+'"';
    }
    var path = '/plans/_search?q='+encodeURIComponent(query);
    var creds = new AWS.EnvironmentCredentials('AWS');
    var endpoint =  new AWS.Endpoint(esDomain.endpoint);
    var req = new AWS.HttpRequest(endpoint);
     req.method = 'GET';
     req.path = path;
     //console.log(path);
     req.region = esDomain.region;
     req.headers['presigned-expires'] = false;
     req.headers['Host'] = endpoint.host;
     var send = new AWS.NodeHttpClient();
     var result='';
     send.handleRequest(req, null, function(httpResp) {
        var body = [];
        httpResp.on('data', function (chunk) {
            body.push(chunk);
            result+=chunk;
        });
        httpResp.on('end', function (chunk) {
           callback(null, JSON.parse(result));

        });
    }, function(err) {
        console.log('Error: ' + err);
    });
  // callback(null, path);
};
