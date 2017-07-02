var User = require('../models/UserModel');

module.exports = {
	login: function(req,res) {
		res.render('users/login.twig');
	},
	
	dashboard: function(req,res) {
		res.render('users/dashboard.twig');
	},
	
	logout: function(req,res) {
		req.session.destroy(function(err){
			if(err) {
				console.log(err);
			} else {
				res.redirect('/');
			}
		});
	},
	
	authenticate: function(req,res) {
		username = req.body.username;
		password = req.body.password;
		User.findOne({'username': username}, function(err, user) {
			if(err) { console.log(err); } 
			if(user === null || user.length == 0) { 
				req.flash('error', 'Incorrect username.');				
			}
			if(user) {
				if(password != user.password) {
					req.flash('error', 'Incorrect password.');
				} else {
					req.flash('success', 'Successfull logged in .');
					req.session.user = user;  // Store data in session
					return res.redirect('/dashboard');
				}
			}
			return res.redirect('/?username='+ username);
		});
	},
	
	
	list: function(req,res) {
		username = req.session.username;
		User.find({}, function(err, users) {
			if(err) {
				console.log(err);
			} else {
				res.render('users/list.twig', {
					title: 'List of Users',
					users: users,
					username: username
				});
			}
		});
	},	
	
}