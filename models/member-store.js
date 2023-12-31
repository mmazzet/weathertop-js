import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("members");

export const memberStore = {
  async addMember(member) {
    await db.read();
    member._id = v4();
    db.data.members.push(member);
    await db.write();
    return member;
  },

  async getMemberById(id) {
    await db.read();
    return db.data.members.find((member) => member._id === id);
  },

  async getMemberByEmail(email) {
    await db.read();
    return db.data.members.find((member) => member.email === email);
  },

  async deleteMemberById(id) {
    await db.read();
    const index = db.data.members.findIndex((member) => member._id === id);
    db.data.members.splice(index, 1);
    await db.write();
  },

  async updateMember(memberId, updatedMember) {
    const member = await this.getMemberById(memberId);
    member.firstName = updatedMember.firstName;
    member.lastName = updatedMember.lastName;
    member.password = updatedMember.password;
    await db.write();
  }
};