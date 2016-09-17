<div id="table-of-contents">
<h2>Table of Contents</h2>
<div id="text-table-of-contents">
<ul>
<li><a href="#orgheadline1">1. Install</a></li>
<li><a href="#orgheadline2">2. Usage</a></li>
</ul>
</div>
</div>


# Install<a id="orgheadline1"></a>

-   For library using :

    npm install node-alldebrid --save

-   For command line tool :

    npm install -g node-alldebrid

# Usage<a id="orgheadline2"></a>

-   Library :

    var Alldebrid = require('node-alldebrid');
    
    var alldebrid = new Alldebrid();
    
    alldebrid.connect('login', 'password', function(err) {
        if (err)
            return console.log(err);
        alldebrid.debrid('mylink');
    });

-   Command line tool :

    alldebrid <url>

-   For file downloading :

    wget $(alldebrid <url>)
