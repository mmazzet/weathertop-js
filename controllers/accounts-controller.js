import { memberStore } from "../models/member-store.js";

export const accountsController = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login-view", viewData);
  },

  logout(request, response) {
    response.cookie("station", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("signup-view", viewData);
  },

  async register(request, response) {
    const member = request.body;
    await memberStore.addMember(member);
    console.log(`registering ${member.email}`);
    response.redirect("/");
  },

  async authenticate(request, response) {
    const member = await memberStore.getMemberByEmail(request.body.email);
    if (member) {
      response.cookie("station", member.email);
      console.log(`logging in ${member.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  async getLoggedInMember(request) {
    const memberEmail = request.cookies.station;
    return await memberStore.getMemberByEmail(memberEmail);
  },
};
