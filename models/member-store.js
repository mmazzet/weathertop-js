import { v4 } from "uuid";
import supabase from "../utils/supabase.js";

export const memberStore = {

  async getAllMembers() {
    const { data } = await supabase
      .from("members")
      .select("*");

    return data;
  },

  async addMember(member) {
    const { data, error } = await supabase
      .from("members")
      .insert([{
        firstname: member.firstName,
        lastname: member.lastName,
        email: member.email,
        password: member.password
      }])
      .select();

    if (error) {
      console.log("Supabase insert error:", error);
      return null;
    }

    return data[0];
  },

  async getMemberById(id) {
    const { data } = await supabase
      .from("members")
      .select("*")
      .eq("id", id)
      .single();

    return data;
  },

  async getMemberByEmail(email) {
    const { data } = await supabase
      .from("members")
      .select("*")
      .eq("email", email)
      .single();

    return data;
  },

  async deleteMemberById(id) {
    await supabase
      .from("members")
      .delete()
      .eq("id", id);
  },

  async deleteAll() {
    await supabase
      .from("members")
      .delete()
      .neq("id", "");
  },

  async updateMember(memberId, updatedMember) {
    await supabase
      .from("members")
      .update(updatedMember)
      .eq("id", memberId);
  }

};