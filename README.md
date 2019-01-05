# node-alldebrid

[![NPM](https://nodei.co/npm/node-alldebrid.png)](https://nodei.co/npm/node-alldebrid/)

[![Build Status](https://travis-ci.com/Ananasr/node-alldebrid.svg?branch=master)](https://travis-ci.com/Ananasr/node-alldebrid)
[![Coverage Status](https://coveralls.io/repos/github/Ananasr/node-alldebrid/badge.svg?branch=master)](https://coveralls.io/github/Ananasr/node-alldebrid?branch=master)

This project provide a library and a command line interface to use Alldebrid.

## Installation

* For library using :

    ```bash
    $ npm install node-alldebrid --save
    ```

* For command line tool :

    ```bash
    $ npm install -g node-alldebrid
    ```

## Usage

* Library :

    ```javascript
    const Alldebrid = require('node-alldebrid');

    let alldebrid = new Alldebrid();

    alldebrid.connect('login', 'password')
    .then(() => {
        return alldebrid.debrid('https://mymovie.mkv');
    })
    .then(link => console.log(link));
    ```

* Command line tool :

    ```bash
    $ export ALLDEBRID_LOGIN=<login>
    $ export ALLDEBRID_PASSWORD=<password>
    $ alldebrid <url>
    ```

* Download or stream video :

    ```bash
    $ wget $(alldebrid <url>) # Download
    $ mpv $(alldebrid <url>)  # Video
    ```
