"use strict";

const logger = require("../utils/logger.js");
const stationStore = require('../models/station-store.js');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const profile = {

  index(request, response) {
    const viewData = {
      title: 'Change your password or email address',
    };
    logger.info('rendering profile');
    response.render('profile', viewData);
  },
}

module.exports = profile;