'use strict';

const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    logger.info('rendering signup');
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('station', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    logger.info('rendering signup');
    response.render('signup', viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user.password === request.body.password) {
      response.cookie('station', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/dashboard');
    } else {
      response.redirect('/login');
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.station;
    return userstore.getUserByEmail(userEmail);
  },

  changeEmail(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user.email === request.body.email && user.password === request.body.password) {
       userstore.updateEmail(user, request.body.newemail);
     }
     response.redirect('/profile');
   },

   changePassword(request, response) {
     const user = userstore.getUserByEmail(request.body.email);
     if (user.email === request.body.email && user.password === request.body.password) {
       userstore.updatePassword(user, request.body.newpassword);
     }
     response.redirect('/profile');
  },

  changeFirstName(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user.email === request.body.email && user.password === request.body.password) {
      userstore.updateFirstName(user, request.body.newfirstname);
    }
    response.redirect('/profile');
  },

  changeLastName(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user.email === request.body.email && user.password === request.body.password) {
      userstore.updateLastName(user, request.body.newlastname);
    }
    response.redirect('/profile');
  },

};

module.exports = accounts;