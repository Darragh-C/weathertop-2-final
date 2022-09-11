'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');
const uuid = require('uuid');
const stationAnalytics = require('../utils/station-analytics');
const metricConversion = require('../utils/metric-conversion');
const axios = require("axios");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug('Station id = ' + stationId);
    const station = stationStore.getStation(stationId);

    if (station.readings.length > 0) {
      stationAnalytics.updateWeather(station);
      stationAnalytics.updateGraphs(station).then();
    }

    const viewData = {
      title: 'Station',
      station: station,
    };
    response.render('station', viewData);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);

    const newReading = {
      id: uuid.v1(),
      date: metricConversion.formatDate(new Date()),
      openWeatherApi : false,
      code: request.body.code,
      temp: request.body.temp,
      windSpeed: request.body.windSpeed,
      windDir: request.body.windDir,
      pressure: request.body.pressure,
    };

    stationStore.addReading(stationId, newReading);

    stationAnalytics.updateGraphs(station).then();
    response.redirect('/station/' + stationId);
  },

  async autoGenerateReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const lon = station.longitude;
    const lat = station.latitude;
    const apiKey = "05969512638dad101c18cf78b4bce256"
    const apiCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + apiKey;
    const result = await axios.get(apiCall);
    const newReading = {
      id: uuid.v1(),
      date: metricConversion.formatDate(new Date()),
      openWeatherApi : true,
    };
    if (result.status == 200) {
      const reading = result.data.current;
      newReading.code = reading.weather[0].id;
      newReading.temp = reading.temp;
      newReading.windSpeed = reading.wind_speed;
      newReading.pressure = reading.pressure;
      newReading.windDir = reading.wind_deg;
      newReading.openWeatherDesc = reading.weather[0].description;
      newReading.openWeatherIcon = reading.weather[0].icon;
      }

      stationStore.addReading(stationId, newReading);
    stationAnalytics.updateGraphs(station).then();
      response.redirect('/station/' + stationId);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug('Deleting reading ${readingId} from Playlist ${playlistId}');
    stationStore.removeReading(stationId, readingId);
    response.redirect('/station/' + stationId);
  },
};

module.exports = station;