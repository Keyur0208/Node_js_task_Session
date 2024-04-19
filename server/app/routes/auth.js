var express = require('express');
var routes = express.Router();
var {singup,login,logout} = require('../controller/auth.controller');

routes.post('/singup',singup);

routes.post('/login',login);

routes.delete('/logout',logout);

module.exports = routes;
