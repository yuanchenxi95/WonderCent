var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// set ejs
app.set('view engine', 'ejs');

/// secret
var secret = "MySecret";

if (process.env.SESSION_SECRET) {
    secret = process.env.SESSION_SECRET
}

app.use(session({ secret: secret}));

// passport must occur after the session
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


// load assignment module
// var assignment = require('./assignment/app.js');
// assignment(app);

// require ("./test/app.js")(app);

// load wondercent server module
var wondercent = require('./wondercent.server/app.js');
wondercent(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
