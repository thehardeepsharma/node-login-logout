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
	app.get('/user/new', requireLogin, function(req, res) {
		userModule.add(req,res);
	});
	
	// Save an user
	app.post('/user/save', requireLogin, function(req, res) {
		userModule.save(req,res);		
	});
	
	// View an user
	app.get('/user/view/:id', requireLogin, function(req, res) {
		userModule.view(req,res);
	});
		
	// Edit an user
	app.get('/user/edit/:id', requireLogin, function(req, res) {
		userModule.edit(req,res);
	});
	
	// Update user
	app.post('/user/update/:id', requireLogin, function(req, res) {
		userModule.update(req,res);
	});
	
	// Delete an user
	app.get('/user/delete/:id', requireLogin, function(req, res) {
		userModule.delete(req,res);		
	});
	
	function requireLogin (req, res, next) {
		if (!req.user) {
			res.redirect('/');
		} else {
			next();
		}
	};
};