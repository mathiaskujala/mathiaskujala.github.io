var request = require('xhr-request');
var sleep = require('sleep');
var async = require('async');

var authorization = '',
    cookie = '',
    csrf = '';

if (process.argv[2] === '-i' && process.argv[3]) {
    
    function retweet() {
        request('https://api.twitter.com/1.1/statuses/retweet.json', {
            method: "POST",
            headers: {
                'authority':               'api.twitter.com',
                'path':                    '/1.1/statuses/retweet.json',
                'authorization':           authorization,
                'content-type':            'application/x-www-form-urlencoded',
                'cookie':                  cookie,
                'dnt':                     '1',
                'x-csrf-token':            csrf,
                'x-twitter-active-user':   'yes',
                'x-twitter-auth-type':     'OAuth2Session'
            },
            query: {
                'id':                      process.argv[3],
                'tweet_stat_count':        '10000'
            }
        }, function(err, data) {
            if (err) {
                throw (err);
            } else {
                return data;
            }
        });
    }

    function unretweet() {
        request('https://api.twitter.com/1.1/statuses/unretweet.json', {
            method: "POST",
            headers: {
                'authority':               'api.twitter.com',
                'path':                    '/1.1/statuses/unretweet.json',
                'authorization':           authorization,
                'content-type':            'application/x-www-form-urlencoded',
                'cookie':                  cookie,
                'dnt':                     '1',
                'x-csrf-token':            csrf,
                'x-twitter-active-user':   'yes',
                'x-twitter-auth-type':     'OAuth2Session'
            },
            query: {
                'method':                 'DELETE',
                'id':                      process.argv[3],
                'tweet_stat_count':        '10000'
            }
        }, function(err, data) {
            if (err) {
                throw (err);
            } else {
                return data;
            }
        });
    }

    // Retweets
    async.parallel({
        one: function(callback) {
            for (var i = 0; i < 15; i++) {
                setTimeout(function() {
                    // callback(null, i);
                    retweet();
                }, 1);
            }
        },
        two: function(callback) {
            for (var i = 0; i < 50; i++) {
                setTimeout(function() {
                    // callback(null, i);
                    unretweet();
                }, 2);
            }
        }
    }, function(err, results) {
        console.log(":)");
    });

} else {
    console.log("Usage: node twitter.js [-i id]");
    console.log("Example: https://twitter.com/maxxarmino/status/\x1b[32m955722260978991104\x1b[0m <-- ID")
}