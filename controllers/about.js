"use strict";

const logger = require("../utils/logger.js");

const about = {
  index(request, response) {
    logger.info("about rendering");
    const viewData = {
      title: "About Weathertop 2.0 baseline",
    };
    response.render("about", viewData);
  },
};

module.exports = about;
