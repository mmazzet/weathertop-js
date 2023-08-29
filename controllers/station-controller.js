import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { Analytics } from "../utils/Analytics.js";
import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    Analytics.updateWeather(station);
    const viewData = {
      title: station.name,
      name: station.name,
      station: station,
    };
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReading = {
      date: new Date().toISOString().replace("T", " ").replace("Z", ""),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    console.log(`adding reading ${newReading.code}`);
    await readingStore.addReading(station._id, newReading);
    Analytics.updateWeather(station);
    response.redirect("/station/" + station._id);
  },

  async addReport(request, response) {
    let report = {};
    const station = await stationStore.getStationById(request.params.id);
    const lat = Number(request.body.lat);
    const lng = Number(request.body.lng);
    console.log(`adding report ${lat} ${lng}`);
    const api_key = process.env.API_KEY;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${api_key}`;
    const result = await axios.get(requestUrl);

    if (result.status === 200) {
      // console.log(result.data);
      const reading = result.data.current;
      report.code = reading.weather[0].id;
      report.date = new Date(reading.dt * 1000).toISOString().replace("T", " ").replace("Z", "");
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.windDirection = reading.wind_deg;
      report.pressure = reading.pressure;

      report.tempTrendG = [];
      console.log(report.tempTrendG);
      report.trendLabels = [];
      console.log(report.trendLabels);
      const trends = result.data.daily;

      console.log(trends);
      for (let i = 0; i < trends.length; i++) {
        report.tempTrendG.push(trends[i].temp.day);
        const date = new Date(trends[i].dt * 1000);
        report.trendLabels.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
      }
    }
    // console.log(report);
    const viewData = {
      title: "New Report",
      reading: report
    };
    
    await readingStore.addReading(station._id, report);
      Analytics.updateWeather(station);
      response.redirect(`/station/${station._id}`);

  },

  async deleteReading(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log(`Deleting Reading ${readingId} from Station ${stationId}`);
    await readingStore.deleteReading(stationId, readingId);
    const station = await stationStore.getStationById(stationId);
    Analytics.updateWeather(station);
    response.redirect("/station/" + stationId);
  },
};
