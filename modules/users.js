var User = require('../models/UserModel');

module.exports = {
	login: function(req,res) {
		res.render('users/login.twig');
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
					return res.redirect('/users');
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
				res.render('users/index.twig', {
					title: 'List of Users',
					users: users,
					username: username
				});
			}
		});
	},
	
	add: function(req,res) { 
		res.render('users/new.twig', {
			title: 'New User',
		});
	},
	
	save: function(req,res) {
		var userClass = new User(req.body.user);
		userClass.save(function(err) {
			if(err) {
				req.flash('error', 'User not added');
			} else {
				req.flash('info', 'User added successfully');				
			}
			res.redirect('/users');
		});
	},
	
	edit: function(req,res) {
		User.findOne({ _id : req.params.id }, function(err,userData) {
			if (err) console.log(err);
			if (!userData) return next(new Error('Failed to load user ' + req.params.id));
			res.render('users/edit.twig', {
				user: userData
			});
		});
	},
	
	update: function(req,res) {
		objectId = req.body.user._id;
		if(objectId != '') {
			User.findOneAndUpdate({_id: objectId }, req.body.user, function(err) {
				if(err) {
					req.flash('error', 'User not updated.');
				} else {
					req.flash('info', 'User updated successfully');
				}
				res.redirect('/users');
			});
		}
	},
	
	delete: function(req,res) {
		if(req.params.id != '') {
			User.findByIdAndRemove({_id: req.params.id }, function(err) {
				if(err) {
					req.flash('error', 'User not deletion');
				} else {
					req.flash('info', 'User Deleted successfully');
				}
				res.redirect('/users');
			});
		}
	}
}