/*

ABOUT - A model for the database to create a new general user. General users will consist of all of our users, at the BEGINNING. They will later turn into marketers or influencers.

*/

var mongoose = require('mongoose');
var bcrypt = require('bcrypt')

//Account types that the general users will use.
var account_types = ['admin', 'marketer', 'influencer', 'new']

//Current statuses that we can have.
var current_statuses = ['marketer', 'influencer', 'admin', 'new']

//Create the schema for the general users.
var GeneralUser_Schema = new mongoose.Schema({
  username : String,
  password : String,
});


// Hash the user's password before inserting a new user
GeneralUser_Schema.pre('save', function(next) {

  var user = this;

  //Check if the username is new.
  if (this.isNew) {

        bcrypt.genSalt(10, function(err, salt) {
          if (err) {
            return next(err);
          }

        // Hash the password.
          bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
              return next(err);
            }

            user.password = hash;
            next();
          })

       })






  } else {
    return next();
  }




});



// Compare password input to password saved in database
GeneralUser_Schema.methods.comparePassword = function(pw, callback) {

  //Compare with bcrypt.
  bcrypt.compare(pw, this.password, function(err, matched) {

    //Returns a error.
    if (err) {
      return callback(err);
    }

    //Returns a bollean.
    callback(null, matched);
  });

};


GeneralUser_Schema.methods.newPassword = function(str, callback){

 bcrypt.genSalt(10, function(err, salt) {

   if (err) {
     callback(err, null)
   }

 // Hash the string.
   bcrypt.hash(str, salt, function(err, hash) {

     if (err) {
       callback(err, null)
     }


     callback(null, hash)

   })
 })

}

//Mongoose model for the general users.
var GeneralUser = mongoose.model('GeneralUser', GeneralUser_Schema);

//Export the mongoose model.
module.exports = GeneralUser;
