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
    }
  }
};

export default Analytics;