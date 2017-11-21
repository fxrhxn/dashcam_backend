var express = require('express');
var Router = express.Router();

//Import the login register API.
var loginRegisterAPI = require('./login-register');

//Use the login register api.
Router.use('/', loginRegisterAPI);

module.exports = Router;
