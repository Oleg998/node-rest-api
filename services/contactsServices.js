import Contact from "../models/Contact.js";

export function listContacts(filter,setting={}) {
  return Contact.find(filter,"-createdAt -updatedAt",setting);
}
export function countContacts (filter){
  return Contact.countDocuments(filter)
}

export function getContactById(filter) {
  const data = Contact.findOne(filter);
  return data;
}

export function addContact(data) {
  return Contact.create(data);
}

export function removeContact(filter) {
  return Contact.findOneAndDelete(filter)}

export  function updateContactByid(filter , data ){
    return  Contact.findOneAndUpdate(filter , data)
}
export  function updateFavoriteByid(filter , data ){
    return  Contact.findOneAndUpdate(filter , data)
}