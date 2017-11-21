var express = require('express');
var Router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../../models/user');
var config = require('../../config');
var moment = require('moment');
var axios = require('axios');
var uuid = require('uuid/v4');



// Register new users
Router.post('/register', function(req, res) {


  //Check if anything is undefined.
  if (!req.body.username || !req.body.password) {

    res.json({
      success: false,
      message: 'Please enter email and password.'
    });

  } else {


    User.findOne({ username : req.body.username } , function(err,username){
      if(username != undefined){

        //Send a response that a new user is created with the token.
        res.json({
          success: false,
          message: 'User already exists.',
        });

      }else{
        //Create a new user object.
        let newUser = new User({
          username : req.body.username,
          password: req.body.password,
        });

        // Attempt to save the user
        newUser.save(function(err,user) {

          if (err) {

            return res.json({
              success: false,
              message: 'Someone registered with that email, or you are not using a valid email address.'
            });
          }else{

            //Get some information to provide to the token.
            var tokenInformation =  {
              username : user.username,
              _id : user._id
            };

            //Token that expires in 30 days.
              // Ex - '2 days', '60s', '10h', '7d'
        var token = jwt.sign(tokenInformation, config.auth.secret, {
              expiresIn: "30d"
            });


            //Send a response that a new user is created with the token.
            res.json({
              success: true,
              message: 'Successfully created new user.',
              token : token
            });


          }





        });
      }
    })



  }
});


// Authenticate the user and get a JSON Web Token to include in the header of future requests.
Router.post('/login', (req, res) => {



  User.findOne({
    username: req.body.username
  }, function(err, user) {


      //Send a message if there is an error.
    if(err){
      res.send({
        sucess : false,
        message : 'Error. :('
      })
    }



      //If there is no user found, send this error.
    if (user == undefined) {
      res.send({
        success: false,
        message: 'User not found. Try signing up.'
      });
    } else {



      // Check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {




        if (isMatch && !err) {


    //Edit out the password, so -people don't see that.
          var tokenInformation =  {
            email : user.username,
            _id : user._id
          };


          //Token that expires in 7 days.
            // Ex - '2 days', '60s', '10h', '7d'
      var token = jwt.sign(tokenInformation, config.auth.secret, {
            expiresIn: "7d"
          });

          //Send success of true, and json web token.
          res.json({
            success: true,
            message: 'Authentication successfull',
            token : token,
            userInfo : tokenInformation,
          });



        } else {

          //The passwords didn't match you fucker.
          res.send({
            success: false,
            message: 'Passwords did not match.'
          });
        }
      });
    }
  });
});




module.exports = Router;
