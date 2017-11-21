/*

About - APIs to create a general account in Echo. Basically the first account that gets created before other accounts such as and Influencer Account and Marketing Account get linked.


*/

//The basic express necessities.
var express = require('express');
var Router = express.Router();

//Model in database for General Users.
var User = require('../../models/user');


/*
{ /api/accounts/general/new }
Creates a new genera account.
*/
Router.post('/new', (req,res) => {

  //Error response to be sent.
  var error_response = {
    success : false,
  };

  //Success response to be sent.
  var success_response = {
    success : true,
  };

  //Data from the body.
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;

  //Boolean if data is undefined.
  var is_undefined = username == undefined || password == undefined || email == undefined;

  //Check if the data that is sent is undefined or not.
  if(is_undefined){

    error_response.message = 'Undefined Fields.'
    error_response.fields = ['username', 'password', 'email']

    //Send the error Response.
    res.send(error_response)

  }else{

// Step 1 - Check if the username is taken.
  User.findOne({ username : username}, function(err,general_acct){

    //Check for errors.
    if(err){

      //Send an error response.
      error_response.message = 'Error finding the user that is saved.'
      res.send(error_response)
    }else{

    //Check if user actually exists.
    if(general_acct != null || username == ''){

      error_response.message = 'User already exists.'
      res.send(error_response)

    }else{

    //Create a new user.
    var new_user = new User({
      username : username,
      password : password,
      email : email,
      email_verified : false,
      account_type : ['new'],
    });

    //Save the new user in the database.
    new_user.save(function(err,saved){

      //Check for errors.
      if(err){

      error_response.message = 'Error saving the new user.'
      res.send(error_response)

      }else{

      // User data to send.
      var user_data = {
        username : saved.username,
        _id : saved._id,
        account_type : saved.account_type,
        email : saved.email,
        email_verified : saved.email_verified,
      };


      success_response.data = user_data;
      success_response.message = 'Saved a new user.';
      res.send(success_response);

      }

          });
        }
      }
    });
  }
});


module.exports = Router;
