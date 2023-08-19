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
      date: new Date().toISOString().replace('T', ' ').replace('Z', ''),
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
    const station = await stationStore.getStationById(request.params.id);
    const lat = Number(request.body.lat);
    const lng = Number(request.body.lng);
    console.log(`adding report ${lat} ${lng}`);
    const api_key = process.env.API_KEY;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${api_key}`;
    const result = await axios.get(requestUrl);
  
    if (result.status === 200) {
      const readingData = result.data.current;
      const newReading = {
        date: new Date().toISOString().replace('T', ' ').replace('Z', ''),
        code: readingData.weather[0].id,
        temperature: readingData.temp,
        windSpeed: readingData.wind_speed,
        windDirection: readingData.wind_deg,
        pressure: readingData.pressure,
      };
  
      await readingStore.addReading(station._id, newReading);
      Analytics.updateWeather(station);
      response.redirect(`/station/${station._id}`);
    } else {
      response.status(500).send("Error retrieving weather data");
    }
  },

  async deleteReading(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log(`Deleting Reading ${readingId} from Station ${stationId}`);
    await readingStore.deleteReading(stationId, readingId);
    const station = await stationStore.getStationById(stationId);
    Analytics.updateWeather(station);
    response.redirect("/station/" + stationId);
  }
};

