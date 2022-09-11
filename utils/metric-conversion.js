'use strict';

const metricConversion = {

  weatherCodes: {
    100: "Clear",
    200: "Partial Clouds",
    300: "Cloudy",
    400: "Light Showers",
    500: "Heavy Showers",
    600: "Rain",
    700: "Snow",
    800: "Thunder",
  },

  weatherIcons: {
    100: "sun",
    200: "cloud sun",
    300: "cloud",
    400: "cloud sun rain",
    500: "cloud showers heavy",
    600: "cloud rain",
    700: "snowflake",
    800: "bolt",
  },

  currentWeather(weatherCode) {
    return this.weatherCodes[weatherCode];
  },

  weatherIcon(weatherCode) {
    return this.weatherIcons[weatherCode];
  },
  tempFar(tempCel) {
    const tempFar = (tempCel * 1.8) + 32;
    return tempFar.toFixed(1);
  },

  beaufourtScale(windSpeed) {
    if (windSpeed == 0) {
      return 0;
    } else if (windSpeed >= 1 && windSpeed <= 6) {
      return 1;
    } else if (windSpeed >= 7 && windSpeed <= 11) {
      return 2;
    } else if (windSpeed >= 12 && windSpeed <= 19) {
      return 3;
    } else if (windSpeed >= 20 && windSpeed <= 29) {
      return 4;
    } else if (windSpeed >= 30 && windSpeed <= 39) {
      return 5;
    } else if (windSpeed >= 40 && windSpeed <= 50) {
      return 6;
    } else if (windSpeed >= 51 && windSpeed <= 62) {
      return 7;
    } else if (windSpeed >= 63 && windSpeed <= 75) {
      return 8;
    } else if (windSpeed >= 76 && windSpeed <= 87) {
      return 9;
    } else if (windSpeed >= 88 && windSpeed <= 102) {
      return 10;
    } else if (windSpeed >= 103 && windSpeed <= 117) {
      return 11;
    } else if (windSpeed >= 117) {
      return 12;
    }
    return -1;
  },

  windDirCalc(deg) {
    if (deg > 11.25 && deg <= 33.75) {
      return "North North East";
    } else if (deg > 33.75 && deg <= 56.25) {
      return "East North East";
    } else if (deg > 56.25 && deg <= 78.75) {
      return "East";
    } else if (deg > 78.75 && deg <= 101.25) {
      return "East South East";
    } else if (deg > 101.25 && deg <= 123.75) {
      return "East South East";
    } else if (deg > 123.75 && deg <= 146.25) {
      return "South East";
    } else if (deg > 146.25 && deg <= 168.75) {
      return "South South East";
    } else if (deg > 168.75 && deg <= 191.25) {
      return "South";
    } else if (deg > 191.25 && deg <= 213.75) {
      return "South South West";
    } else if (deg > 213.75 && deg <= 236.25) {
      return "South West";
    } else if (deg > 236.25 && deg <= 258.75) {
      return "West South West";
    } else if (deg > 258.75 && deg <= 281.25) {
      return "West";
    } else if (deg > 281.25 && deg <= 303.75) {
      return "West North West";
    } else if (deg > 303.75 && deg <= 326.25) {
      return "North West";
    } else if (deg > 326.25 && deg <= 348.75) {
      return "North North West";
    } else {
      return "North";
    }
  },
  formatDate(date) {
    //special thanks to one Bambam on stack exchange for the mins trick to get double digits for minutes < 10 (https://stackoverflow.com/questions/8935414/getminutes-0-9-how-to-display-two-digit-numbers)
    const mins = ('0' + date.getMinutes()).slice(-2);
    const formatedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + mins;
    return formatedDate;
  }

}

module.exports = metricConversion;