import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { Analytics } from "../utils/Analytics.js";
import axios from "axios";


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
      date: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().replace('T', ' ').replace('Z', ''),
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

