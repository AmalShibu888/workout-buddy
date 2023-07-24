
const express = require('express');

const {loginFun , SignupFun} = require('../controllers/UserController');
const Router = express.Router();

Router.post('/login' , loginFun);

Router.post('/signup' , SignupFun);
module.exports = Router;