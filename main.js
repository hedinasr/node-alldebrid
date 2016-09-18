#!/usr/bin/env node

'use strict';

var Alldebrid = require('./lib/alldebrid.js');
var debug = require('debug')('main');
var alldebrid = new Alldebrid();

/**
 * How to use : alldebrid <url>
 * For download => wget $(alldebrid http://mylink/myfilm.avi)
 */

var rl = require('readline').createInterface(process.stdin, process.stdout);
var argv = process.argv.slice(2);
var url = argv[0];
var login, password;
var prompts = ['login', 'password'];
var p = 0;
var data = {};

/**
 * User object
 */
var User = function(login, password) {
    this._login = login;
    this._password = password;
}

var get = function() {
    rl.setPrompt(prompts[p] + '>');
    rl.prompt();
    p++;
};

var ask_and_store_infos = function(callback) {
    get();
    rl.on('line', function(line) {
        data[prompts[p - 1]] = line;
        if (p === prompts.length)
            return rl.close();
        get();
    }).on('close', function() {
        require('fs').writeFile('infos.json', JSON.stringify(data), function(err, user) {
            if (!err)
                callback(null, data);
            else
                callback(err);
        });
    });
}

/**
 * Read user info from infos.json file
 */
var get_infos = function(callback) {
    var infos_json = require('fs').readFile('infos.json', 'utf-8', function(err, content) {
        if (!err) {
            debug('Reading infos.json successfully');
            callback(null, JSON.parse(content));
        } else {
            debug('Error while reading infos.json');
            callback(err);
        }
    });
};

var connect_and_debrid = function(login, password, url) {
    alldebrid.connect(login, password, function(err) {
        if (!err) {
            alldebrid.debrid(url, function(err, data) {
                if (!err) {
                    debug('Receive correctly');
                    console.log(data.link);
                    process.exit(0);
                } else {
                    debug('Receive with error');
                    console.error(err);
                    process.exit(1);
                }
            });
        }
    });
};


if (argv.length != 1) {
    console.error('Usage: alldebrid <url>');
    process.exit(1);
} else {
    debug('Here we go!');
    get_infos(function(err, user) {
        if (!err) {
            debug(user);
            connect_and_debrid(user.login, user.password, url);
        } else {
            debug('No infos.json file found');
            ask_and_store_infos(function(err, user) {
                debug(user);
                if (!err) {
                    connect_and_debrid(user.login, user.password, url);
                } else {
                    console.log(err);
                    process.exit(1);
                }
            });
        }
    });
}
