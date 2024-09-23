import User from "../models/User.js";

export function listUsers(filter) {
    return User.find(filter);
  }

  // export function addUser(data) {
  //   return User.create(data);
  // }
  export async function addUser(data) {
    try {
      console.log('Adding user with data:', data);
      const user = await User.create(data);
      console.log('User added:', user);
      return user;
    } catch (error) {
      console.error('Error adding user:', error);
      if (error.name === 'MongoError' && error.code === 11000) {
        throw new Error('Email and event combination already exists');
      }
      throw error;
    }
  }


