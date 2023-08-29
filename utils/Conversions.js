"use strict";

// import { readingStore } from "../models/reading-store.js";

export const Conversion = {
  weatherCodes: {
    200: "Thunderstorm",
    300: "Drizzle",
    500: "Rain",
    600: "Snow",
    700: "Fog",
    800: "Clear",
    801: "Few clouds",
    802: "Scattered clouds",
    803: "Broken clouds",
    804: "Overcast clouds",
  },

  weatherCodeIcons: {
    200: "fa-solid fa-cloud-bolt",
    300: "fa-solid fa-cloud-rain",
    500: "fa-solid fa-cloud-showers-heavy",
    600: "fa-solid fa-snowflake",
    700: "fa-solid fa-smog",
    800: "fa-solid fa-sun",
    801: "fa-solid fa-cloud-sun",
    802: "fa-solid fa-cloud",
    803: "fa-solid fa-cloud-moon",
    804: "fa-solid fa-cloud",
  },

  weatherIcon: function (code) {
    return this.weatherCodeIcons[code];
  },

  currentWeather: function (code) {
    return this.weatherCodes[code];
  },

  tempF: function (tempC) {
    return (tempC * 1.8 + 32).toFixed(2);
  },

  beaufort: function (windspeed) {
    if (windspeed === 0) {
      return 0;
    } else if (windspeed >= 1 && windspeed <= 6) {
      return 1;
    } else if (windspeed >= 7 && windspeed <= 11) {
      return 2;
    } else if (windspeed >= 12 && windspeed <= 19) {
      return 3;
    } else if (windspeed >= 20 && windspeed <= 29) {
      return 4;
    } else if (windspeed >= 30 && windspeed <= 39) {
      return 5;
    } else if (windspeed >= 40 && windspeed <= 50) {
      return 6;
    } else if (windspeed >= 51 && windspeed <= 62) {
      return 7;
    } else if (windspeed >= 63 && windspeed <= 75) {
      return 8;
    } else if (windspeed >= 76 && windspeed <= 87) {
      return 9;
    } else if (windspeed >= 88 && windspeed <= 102) {
      return 10;
    } else if (windspeed >= 103 && windspeed <= 117) {
      return 11;
    } else if (windspeed >= 117) {
      return 12;
    }
    return -1;
  },

  degreesToCompass: function (deg) {
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
};
