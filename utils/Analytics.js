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
    }
  },
  
  windChill: function(temp, windSpeed) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16);
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
  }
};

export default Analytics;