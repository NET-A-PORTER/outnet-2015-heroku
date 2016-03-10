#!/usr/bin/env node

var request = require('request');

var isPullRequest = process.env.TRAVIS_PULL_REQUEST;
var herokuApiToken = process.env.HEROKU_API_TOKEN;
var branch = process.env.TRAVIS_BRANCH;

if(isPullRequest) {
    console.log("Creating test environment")
    var options = {
        method: "POST",
        url: "https://api.heroku.com/app-setups",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/vnd.heroku+json; version=3",
            "Authorization": "Bearer " + herokuApiToken
        },
        body: '{"source_blob": { "url": "https://github.com/jay-a-porter/preston/tarball/' + branch + '"} }'
    };
    request(options, function(error, response, body) {
        console.log('Creating...');
        if(response.statusCode == 202) {
            var id = JSON.parse(body).id;
            var interval = setInterval(function(){
                appInfo(id, function(info) {
                    if(info.status != "pending") clearInterval(interval);
                    if(info.status == "succeeded") {
                        appInfo(id, function(info) {
                            console.log(info.resolved_success_url);
                        });
                    } else if (info.status != "succeeded" && info.status != "pending") {
                        console.log('Failed to create envionment. Error:', info.failure_message);
                    }
                });
            }, 5000);
        } else {
            console.log('Failed to create envionment. Error:', JSON.parse(body).message);
        }
    });
}

function appInfo(id, callback) {

    var options = {
        method: "GET",
        url: "https://api.heroku.com/app-setups/" + id,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/vnd.heroku+json; version=3",
            "Authorization": "Bearer " + herokuApiToken
        }
    };

    request(options, function(error, response, body) {
        console.log('polling...');
        var isPending = JSON.parse(body).status != "succeeded";
        callback(JSON.parse(body));
    });

}