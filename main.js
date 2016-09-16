var Alldebrid = require('./lib/alldebrid.js');
var fs = require('fs');

var alldebrid = new Alldebrid();

/**
 * How to use : alldebrid <url>
 * You have to put your login informations in user.json file
 *
 * TODO use env var instead of user.json
 * TODO add some options
 *
 */

var argv = require('minimist')(process.argv.slice(2));

if (argv._.length == 0) {
    console.log('Usage: alldebrid <url>');
} else {
    // Check if user is connected
    fs.readFile('./user.json', 'utf-8', function(err, data) {
        if (err)
            return console.log('There is no user.json : ' + err);
        var user = JSON.parse(data);
        alldebrid.connect(user.login, user.password, function(err) {
            if (err)
                return console.log(err);
            var url = argv._[0];
            alldebrid.debrid(url);
        });
    });
}
