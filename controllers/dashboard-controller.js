import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInMember = await accountsController.getLoggedInMember(request);
    const stations = await stationStore.getStationsByMemberId(loggedInMember._id);

    stations.sort((stationA, stationB) => {
      const nameA = stationA.name.toUpperCase();
      const nameB = stationB.name.toUpperCase();
      return nameA.localeCompare(nameB);
    });

    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stations,
      loggedInMember: loggedInMember,
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const loggedInMember = await accountsController.getLoggedInMember(request);
    const newStation = {
      name: request.body.name,
      lat: Number(request.body.lat),
      lng: Number(request.body.lng),
      memberid: loggedInMember._id,
    };
    console.log(`adding station ${newStation.name}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Deleting Station ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },
};
