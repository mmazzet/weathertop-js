"use strict";


import { Conversion } from "./Conversions.js";
export const Analytics = {

  updateWeather: function(station) {
    if (station.readings.length > 0) {
      let lastReading = station.readings[station.readings.length - 1];
      station.code = lastReading.code;
      station.weather = Conversion.currentWeather(lastReading.code);
      station.tempC = lastReading.temperature;
      station.tempF = Conversion.tempF(station.tempC);
      station.windBft = Conversion.beaufort(lastReading.windSpeed);
      station.pressure = lastReading.pressure;
      station.windCompass = Conversion.degreesToCompass(lastReading.windDirection);
      let str = Number(Analytics.windChill(lastReading.temperature, lastReading.windSpeed).toFixed(2));
      station.windChill = str;
    }
  },
  windChill: function(temp, windSpeed) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16);
  }
};

export default Analytics;