import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { Analytics } from "../utils/Analytics.js";


export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    Analytics.updateWeather(station);
    const viewData = {
      name: station.name,
      station: station,
    };
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReading = {
      date: new Date(new Date()).toISOString().replace('T', ' ').replace('Z', ''),
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
};

