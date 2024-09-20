import Event from "../models/Events.js";

export function listEvent(filter, setting = {}) {
  return Event.find(filter, "-createdAt -updatedAt", setting);
}
export function countEvent(filter) {
  return Event.countDocuments(filter);
}

export function getEventById(filter) {
  const data = Event.findOne(filter);
  return data;
}

export function addEvent(data) {
  return Event.create(data);
}

export function removeEvent(filter) {
  return Event.findOneAndDelete(filter);
}

export function updateEventByid(filter, data) {
  return Event.findOneAndUpdate(filter, data);
}
