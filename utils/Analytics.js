"use strict";

import { Conversion } from "./Conversions.js";
export const Analytics = {

  updateWeather: function(station) {
    if (station.readings.length > 0) {
      let lastReading = station.readings[station.readings.length - 1];
      station.code = lastReading.code;
      station.weather = Conversion.currentWeather(lastReading.code);
      station.weatherIcon = Conversion.weatherIcon(lastReading.code);
      station.tempC = lastReading.temperature;
      station.tempF = Conversion.tempF(station.tempC);
      station.windBft = Conversion.beaufort(lastReading.windSpeed);
      station.pressure = lastReading.pressure;
      station.windCompass = Conversion.degreesToCompass(lastReading.windDirection);
      let str = Number(Analytics.windChill(lastReading.temperature, lastReading.windSpeed).toFixed(2));
      station.windChill = str;
      station.maxTemp = this.maxTemp(station.readings);
      station.minTemp = this.minTemp(station.readings);
      station.maxWind = this.maxWind(station.readings);
      station.minWind = this.minWind(station.readings);
      station.maxPressure = this.maxPressure(station.readings);
      station.minPressure = this.minPressure(station.readings);
      station.tempTrend = this.tempTrend(station.readings);
      station.windTrend = this.windTrend(station.readings);
      station.pressureTrend = this.pressureTrend(station.readings);
    }
  },
  
  windChill: function(temp, windSpeed) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16).toFixed(2);
  },

  max: function (values) {
    let max = values[0];
    for (let i = 0; i < values.length; i++) {
      if (values[i] > max) {
        max = values[i];
      }
    }
    return max;
  },
  
  min: function (values) {
    let min = values[0];
    for (let i = 0; i < values.length; i++) {
      if (values[i] < min) {
        min = values[i];
      }
    }
    return min;
  },
  
  maxTemp: function (readings) {
    const values = [];
    for (let i = 0; i < readings.length; i++) {
      values[i] = readings[i].temperature;
    }
    return this.max(values);
  },
  
  minTemp: function (readings) {
    const values = [];
    for (let i = 0; i < readings.length; i++) {
      values[i] = readings[i].temperature;
    }
    return this.min(values);
  },
  
  maxWind: function (readings) {
    const values = [];
    for (let i = 0; i < readings.length; i++) {
      values[i] = readings[i].windSpeed;
    }
    return this.max(values);
  },
  
  minWind: function (readings) {
    const values = [];
    for (let i = 0; i < readings.length; i++) {
      values[i] = readings[i].windSpeed;
    }
    return this.min(values);
  },
  
  maxPressure: function (readings) {
    const values = [];
    for (let i = 0; i < readings.length; i++) {
      values[i] = readings[i].pressure;
    }
    return this.max(values);
  },
  
  minPressure: function (readings) {
    const values = [];
    for (let i = 0; i < readings.length; i++) {
      values[i] = readings[i].pressure;
    }
    return this.min(values);
  },

  calcTrend: function (values) {
    let trend = 0;
    if (values.length > 2) {
      if (values[2] > values[1] && values[1] > values[0]) {
        trend = 1;
      } else if (values[2] < values[1] && values[1] < values[0]) {
        trend = -1;
      }
    }
    return trend;
  },

  tempTrend: function (readings) {
    let trend = 0;
    if (readings.length > 2) {
      const values = [
        readings[readings.length - 3].temperature,
        readings[readings.length - 2].temperature,
        readings[readings.length - 1].temperature
      ];
      trend = this.calcTrend(values);
    }
    return trend;
  },
  
   windTrend: function(readings) {
    let trend = 0;
    if (readings.length > 2) {
      const values = [
        readings[readings.length - 3].windSpeed,
        readings[readings.length - 2].windSpeed,
        readings[readings.length - 1].windSpeed
      ];
      trend = this.calcTrend(values);
    }
    return trend;
  },
  
   pressureTrend:  function(readings) {
    let trend = 0;
    if (readings.length > 2) {
      const values = [
        readings[readings.length - 3].pressure,
        readings[readings.length - 2].pressure,
        readings[readings.length - 1].pressure
      ];
      trend = this.calcTrend(values);
    }
    return trend;
  },
};
