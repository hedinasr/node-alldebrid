'use strict';

const request = require('request');

class Alldebrid {
    constructor() {
        this.session = request.jar();
    }

    /**
      * Authentication at alldebrid.com.
      * @param {string} user the user login
      * @param {string} password the user password
      *
      * @returns {Promise} Promise object represents a boolean (true if the user was correctly logged).
      */
    connect(user, password) {
        // Query string parameters
        let params = {
            action: 'login',
            returnpage: '/account/',
            login_login: user,
            login_password: password
        };

        // Request options
        let options = {
            url: "https://alldebrid.com/register",
            jar: this.session,
            qs: params
        };

        return new Promise(function(resolve, reject) {
            function callback(error, response, data) {
                if (error) reject(error);
                else if (response.statusCode == 200) {
                    let condition = response.request.href == "https://alldebrid.com//account/";

                    if (condition) resolve(data);
                    else reject("Login failed");
                }
            }

            request(options, callback);
        });
    }

    /**
     * Downloader.
     * @param {string} url the url to debrid
     *
     * @returns {Promise} Promise object represents the link.
     */
    debrid(url) {
        let params = {
            link: url,
            json: 'true'
        };

        let options = {
            url: "https://alldebrid.com/service.php",
            jar: this.session,
            qs: params
        };

        return new Promise(function(resolve, reject) {
            function callback(error, response, data) {
                if (error) reject(error);
                else if (response.statusCode == 200) {
                    resolve(JSON.parse(data).link);
                }
            }

            request(options, callback);
        });
    }
}

module.exports = Alldebrid;
