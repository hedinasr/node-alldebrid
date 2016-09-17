var request = require('request');
var debug = require('debug')('alldebrid');
var Alldebrid = function() {
    this.ALLDEBRID_ROOT = 'https://alldebrid.com';
    this.session = request.jar();
    this.logged = false;

    // Website links
    this.infos = {
        login: this.ALLDEBRID_ROOT + '/register/',
        infos: this.ALLDEBRID_ROOT + '/account/',
        rapidDebrid: this.ALLDEBRID_ROOT + '/service.php',
        // TODO do we really need user-agent ?
        ua: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9(KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5'
    };

    /**
     * Log the user to Alldebrid
     */
    this.connect = function(username, password, callback) {
        // Current params used for connection
        var connect_params = {
            action: 'login',
            returnpage: '/account/',
            login_login: username,
            login_password: password
        };

        var self = this;
        // connection
        var connection = request({
            url: self.infos.login,
            jar: self.session,
            headers: {
                'User-Agent': self.infos.ua
            },
            qs: connect_params,
            method: 'GET'
        }, function(error, response, data) {
            debug('Sens GET request to' + self.infos.login);
            if (!error && response.statusCode == 200) {
                if (connection.uri.href != self.infos.infos) {
                    return console.error("error");
                }
                self.logged = true;
                // Retourne un callback sans erreur
                // nous permettant d'enchaîner sur
                // le debridage
                callback(null);
            } else {
                callback(new Error(error));
            }
        });
    };

    /**
     * Debrid function, returning a debrided link or a None value
     */
    this.debrid = function(url, callback) {

        if (!this.logged) {
            return console.error('You must be connected in order to debrid');
        }

        var self = this;

        var debrid_page = request({
            url: self.infos.rapidDebrid,
            jar: self.session,
            headers: {
                'User-Agent': self.infos.ua
            },
            qs: {
                link: url,
                json: 'true'
            },
            method: 'GET'
        }, function(error, response, data) {
            debug('Send GET request to ' + self.infos.rapidDebrid);
            if (!error && response.statusCode == 200) {
                debug('Status 200');
                var json = JSON.parse(data);
                if (!json.error) {
                    callback(null, json);
                } else {
                    callback(json.error);
                }
            }
        });
    };
};

module.exports = Alldebrid;
