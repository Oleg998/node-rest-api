import User from "../models/User.js";

export function listUsers(filter) {
    return User.find(filter);
  }

  // export function addUser(data) {
  //   return User.create(data);
  // }
  export async function addUser(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.code === 11000) { // Код помилки для дублювання ключа
        throw new Error('Email and event combination already exists');
      }
      throw error; // Для інших помилок
    }
  }


