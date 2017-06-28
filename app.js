var Twig = require("twig")
var bodyParser = require('body-parser')
var express = require('express')
var session = require('express-session');
var app = express()
var User = require('./models/UserModel');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'twig');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ 
  extended: true
}));

app.set("twig options", {
    strict_variables: false,
	debug: false
});

app.use(session({
	cookieName: 'session',
	secret: 'random_string_goes_here',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	resave: true,
    saveUninitialized: true
}));				  
				  
app.use(require('connect-flash')());

app.use(function (req, res, next) {
	res.locals.messages = require('express-messages')(req, res);
	if (req.session && req.session.user) {
		User.findOne({ username: req.session.user.username }, function(err, user) {
			if (user) {
				req.user = user;
				delete req.user.password; // delete the password from the session
				res.locals.sess = req.session.user;  // Store data in locals for accessing any where in the app
			}
			next();
		});
	} else {
		next();
	}
});

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})

require('./routes/users')(app)