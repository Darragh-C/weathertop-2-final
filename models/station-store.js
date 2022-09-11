'use strict';

const _ = require("lodash")
const JsonStore = require("./json-store");

const stationStore = {
  store: new JsonStore("./models/station-store.json", {
    stationCollection: [],
  }),
  collection: "stationCollection",

  getAllStations() {
    return this.store.findAll(this.collection);
  },
  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  getLatestReading(station) {
    let latestReading = null;
    if (station.readings.length > 1) {
      latestReading = station.readings[station.readings.length - 1];
    } else {
      latestReading = station.readings[0];
    }
    return latestReading;
  },
  addStation(station) {
    this.store.add(this.collection, station);
    this.store.save();
  },
  removeStation(stationId) {
    this.store.remove(this.collection, { id: stationId});
    this.store.save();
  },
  addReading(stationId, reading) {
    const station = this.getStation(stationId);
    station.readings.push(reading);
    this.store.save();
  },
  removeReading(id, readingId) {
    const station = this.getStation(id);
    const readings = station.readings;
    _.remove(readings, { id: readingId});
    this.store.save();
  },
  getUserStations(userId) {
    return this.store.findBy(this.collection, { userid: userId})
  },

}

module.exports = stationStore;