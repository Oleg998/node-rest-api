import Contact from "../models/Contact.js";

export function listContacts() {
  return Contact.find();
}

export function getContactById(contactId) {
  const data = Contact.findById(contactId);
  return data;
}

export function addContact(data) {
  return Contact.create(data);
}

export function removeContact(contactId) {
  return Contact.findByIdAndDelete(contactId);}

export  function updateContactByid(contactId , data ){
    return  Contact.findByIdAndUpdate(contactId , data)
}
export  function updateFavoriteByid(contactId , data ){
    return  Contact.findByIdAndUpdate(contactId , data)
}