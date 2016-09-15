var Alldebrid = require('./lib/alldebrid.js');

var debridme = new Alldebrid();

/**
 *
 *
 *
 *
 */

debridme.connect('', '', function(err) {
    if (!err) {
        debridme.debrid();
    }
});
