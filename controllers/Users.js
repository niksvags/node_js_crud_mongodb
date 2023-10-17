const UserModel = require('../models/user')




// get add a single User 
exports.getAdd = async (req, res) => {
    try {
		
		 res.render('users/add',{
			 title: 'Add User', 
			 firstName:'',
			 lastName:'',
			 email:'',
			 phone:'',
			 
		 })		 
		
		
    } catch(err) {
            console.log(err);
			req.flash('error', err.message);
			res.redirect('/users');
    }
};


// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {	
		req.flash('error', "Content can not be empty!")
	    res.redirect('/users')
		
    } else {
    
		const user = new UserModel({
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			phone: req.body.phone
		});
    
		await user.save().then(data => {
       		
			req.flash('success', 'User created successfully!!');		
			res.redirect('/users');
		
			}).catch(err => {
				
					console.log(err);
					req.flash('error', err.message);
					res.redirect('/users');
			});
	}
};

// Retrieve all users from the database.

exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        //res.status(200).json(user);
		 res.render('users',{data:user});
    } catch(err) {
            console.log(err);
			req.flash('error', err.message);
			res.redirect('/users');
    }
};


// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
		
		
		 const id = req.params.id;	
		 const user = await UserModel.findById({_id:id});
		 		 
		 res.render('users/edit',{
			 title: 'Edit User', 
			 id:id,
			 firstName:user.firstName,
			 lastName:user.lastName,
			 email:user.email,
			 phone:user.phone,
			 
		 })		 
		
		
    } catch(error) {
        	console.log(err);
			req.flash('error', err.message);
			res.redirect('/users');
    }
};

// Update a user by the id in the request

exports.update = async (req, res) => {
	
		const id = req.params.id;			
	    const user = await UserModel.findByIdAndUpdate({_id:id}, {
											email: req.body.email,
											firstName: req.body.firstName,
											lastName: req.body.lastName,
											phone: req.body.phone
										   })
	
	
	req.flash('success', 'User successfully update!')
	res.redirect('/users')

};	

// Delete a user with the specified id in the request

exports.destroy = async (req, res) => {	
	
	const id = req.params.id;	
	
	await UserModel.findByIdAndRemove({_id: id}).then(result => {
		
        if (!result) {		  
		  	console.log(err);
			req.flash('error', 'User not found.')
			res.redirect('/users')  
		  
        } else {
			req.flash('success', 'User deleted successfully!')
			res.redirect('/users');
        }
    }).catch(err => {		
			console.log(err);
			req.flash('error', err.message)
			res.redirect('/users')
			   
    })
	
	/*
	const id = req.params.id;	
	const user = await UserModel.findByIdAndRemove({_id:id});	
	req.flash('success', 'User deleted successfully!');	
	res.redirect('/users');
	*/	
	
}	