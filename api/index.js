var express = require('express');
var Router = express.Router();


//Get routes from everywhere.
var accountAPI = require('./accounts');
var authentication = require('./authentication');

// Use all of the routes.
Router.use('/account', accountAPI);
Router.use('/authentication', authentication)


module.exports = Router;
