import User from "../models/User.js";

export function listUsers(filter) {
    return User.find(filter);
  }

  export function addUser(data) {
    return User.create(data);
  }



