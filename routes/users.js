var User = require('../models/UserModel');
var userModule = require('../modules/users.js')

module.exports = function(app) {
	
	// User Login
	app.get('/', function(req, res) {
		userModule.login(req,res);
	});
	
	// User Login
	app.post('/authenticate', function(req, res) {
		userModule.authenticate(req,res);
	});
	
	app.get('/logout', function(req, res) {
		userModule.logout(req,res);		
	});
	
	// Listing of Users
	app.get('/users', requireLogin, function(req, res) {
		userModule.list(req,res);
	});
	
	// Show user Form for adding
	app.get('/dashboard', requireLogin, function(req, res) {
		userModule.dashboard(req,res);
	});
	
	function requireLogin (req, res, next) {
		if (!req.user) {
			res.redirect('/');
		} else {
			next();
		}
	};
};