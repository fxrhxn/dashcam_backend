var express = require('express');
var Router = express.Router();

Router.post('/login', (req,res) => {

  res.send('LOGGED IN!')

})

Router.post('/register', (req,res) => {

  res.send('REGISTERED!')

});




module.exports = Router;
