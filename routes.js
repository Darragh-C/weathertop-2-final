"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const station = require("./controllers/station.js");
const accounts = require('./controllers/accounts.js');
const profile = require('./controllers/profile.js')

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.post("/changeemail", accounts.changeEmail);
router.post("/changepassword", accounts.changePassword);
router.post("/changefirstname", accounts.changeFirstName);
router.post("/changelastname", accounts.changeLastName);

router.get("/about", about.index);

router.get("/dashboard", dashboard.index);
router.post('/dashboard/addstation', dashboard.addStation);
router.get("/dashboard/deletestation/:id", dashboard.deleteStation);

router.get("/profile", profile.index);

router.get('/station/:id', station.index);
router.post('/station/:id/addreading', station.addReading);
router.get('/station/:id/deletereading/:readingid', station.deleteReading);
router.get('/station/:id/autogenreading', station.autoGenerateReading);

module.exports = router;
