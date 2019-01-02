#!/usr/bin/env node

'use strict';

const Alldebrid = require('./lib/alldebrid.js');
const fs = require('fs');

let alldebrid = new Alldebrid();

const [,, ...args] = process.argv;

let help = `
Alldebrid CLI.

Usage:
  alldebrid <url>

Options:
  -h --help       Show this help screen.
  --version       Show version.
`;

let username = process.env.ALLDEBRID_LOGIN;
let password = process.env.ALLDEBRID_PASSWORD;

//
let url = args[0];

function main(login, password, url) {
    alldebrid.connect(login, password)
        .then(() => {
            return alldebrid.debrid(url);
        })
        .then(link => console.log(link))
        .catch(err => console.error(err));
}

function version() {
    fs.readFile('package.json', (err, data) => {
        if (err) throw err;
        let ver = JSON.parse(data).version;
        console.log(ver);
    });
}

if (args.length != 1) {
    console.error(help);
    process.exit(1);
} else {
    switch (args[0]) {
    case '-h':
    case '--help':
        console.log(help);
        break;
    case '--version':
        version();
        break;
    default:
        main(username, password, url);
    }
}
