var express = require('express');
var Router = express.Router()


//Get all of the routes.
var newAPI = require('./new');

Router.use('/new', newAPI);


module.exports = Router;
