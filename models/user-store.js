'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },

  updatePassword(user, updatedPassword) {
    user.password = updatedPassword;
    this.store.save();
  },

  updateEmail(user, updatedEmail) {
    user.email = updatedEmail;
    this.store.save();
  },

  updateFirstName(user, updatedFirstName) {
    user.firstName = updatedFirstName;
    this.store.save();
  },

  updateLastName(user, updatedLastName) {
    user.lastName = updatedLastName;
    this.store.save();
  },
};

module.exports = userStore;